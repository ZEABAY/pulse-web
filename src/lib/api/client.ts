import type { ApiResponse, ErrorResponse } from "./types";
import { getAccessToken, getRefreshToken, setTokens, clearTokens } from "../auth/token";
import { routing } from "@/i18n/routing";

export class ApiError extends Error {
    public readonly status?: number;
    public readonly traceId?: string;
    public readonly error?: ErrorResponse;

    constructor(message: string, opts?: { status?: number; traceId?: string; error?: ErrorResponse }) {
        super(message);
        this.name = "ApiError";
        this.status = opts?.status;
        this.traceId = opts?.traceId;
        this.error = opts?.error;
    }
}

function resolveBaseUrl(): string {
    const base = process.env.NEXT_PUBLIC_PULSE_API_BASE_URL || 'http://localhost:8080';

    new URL(base);
    return base;
}

function isApiResponse(x: any): x is ApiResponse<any> {
    return (
        x &&
        typeof x === "object" &&
        typeof x.success === "boolean" &&
        "data" in x
    );
}

function mergeHeaders(...sources: Array<HeadersInit | undefined>): Headers {
    const h = new Headers();
    for (const src of sources) {
        if (!src) continue;
        const next = new Headers(src);
        next.forEach((v, k) => h.set(k, v));
    }
    return h;
}

// Queue for preventing race conditions when multiple queries get 401 simultaneously
let isRefreshing = false;
let failedQueue: Array<{ resolve: (token: string) => void, reject: (err: any) => void }> = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else if (token) {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

async function forceLogout() {
    clearTokens();
    if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
        const pathParts = window.location.pathname.split('/');
        const locale = pathParts.length > 1 && routing.locales.includes(pathParts[1] as any)
            ? pathParts[1]
            : routing.defaultLocale;
        window.location.href = `/${locale}/login`;
    }
}

async function triggerRefreshToken(): Promise<string | null> {
    if (typeof window === 'undefined') return null; // We don't refresh server side for now
    
    const token = await getRefreshToken();
    if (!token) return null;

    try {
        const baseUrl = resolveBaseUrl();
        const res = await fetch(`${baseUrl}/api/v1/auth/refresh`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken: token })
        });
        
        if (!res.ok) {
            throw new Error("Refresh token expired or invalid");
        }

        const parsed = await res.json();
        
        if (parsed.success && parsed.data?.accessToken) {
            setTokens(parsed.data.accessToken, parsed.data.refreshToken, parsed.data.expiresIn, parsed.data.refreshExpiresIn);
            return parsed.data.accessToken;
        }
        throw new Error("Refresh payload invalid");
    } catch (e) {
        console.error("[Auth] Fail to refresh token", e);
        return null;
    }
}

export async function apiRequest<T>(
    path: string,
    init?: RequestInit,
    isRetry = false
): Promise<T> {
    const baseUrl = resolveBaseUrl();
    const url = new URL(path, baseUrl).toString();

    let token = await getAccessToken();

    const headers = mergeHeaders(init?.headers, {
        Accept: "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    });

    const res = await fetch(url, {
        ...init,
        cache: "no-store",
        headers,
    });

    // Ignore auto-refresh logic if the user is explicitly trying to login, which naturally returns 401 on failure
    const isLoginCall = path.includes('/login');

    // Handle 401 Auto Refreshing (Infinite Loop Protection via isRetry)
    if (res.status === 401 && !isRetry && !isLoginCall) {
        if (isRefreshing) {
            try {
                // Wait for the main refresher to finish
                const newToken = await new Promise<string>((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                });
                
                const retryHeaders = mergeHeaders(init?.headers, {
                    Accept: "application/json",
                    Authorization: `Bearer ${newToken}`,
                });
                return apiRequest<T>(path, { ...init, headers: retryHeaders }, true);
            } catch (err) {
                // The refresher failed, return error locally to end stream
                throw new ApiError("error.token_expired", { status: 401 });
            }
        }

        isRefreshing = true;
        const newToken = await triggerRefreshToken();
        
        if (newToken) {
            isRefreshing = false;
            processQueue(null, newToken);
            // Execute actual retry with isRetry=true (Prevents loop if backend continues returning 401)
            const retryHeaders = mergeHeaders(init?.headers, {
                Accept: "application/json",
                Authorization: `Bearer ${newToken}`,
            });
            return apiRequest<T>(path, { ...init, headers: retryHeaders }, true);
        } else {
            isRefreshing = false;
            processQueue(new Error('Session Expired'));
            await forceLogout();
            throw new ApiError("error.token_expired", { status: 401 });
        }
    } 
    
    // If it's a 401 and isRetry is true, it means even the new token failed (Backend error). Loop prevention:
    if (res.status === 401 && (isRetry || isLoginCall)) {
        if (!isLoginCall) {
            await forceLogout();
        }
        // Throw 401 standard error; caller parses messageKey safely
    }

    const text = await res.text();
    let parsed: unknown;
    try {
        parsed = text ? JSON.parse(text) : null;
    } catch {
        if (!res.ok) {
            throw new ApiError("error.bad_request", { status: res.status });
        }
        return null as T;
    }

    if (!parsed) return null as T;

    if (!isApiResponse(parsed)) {
        if (!res.ok) throw new ApiError("error.bad_request", { status: res.status });
        return parsed as T;
    }

    const envelope = parsed as ApiResponse<T>;

    if (!envelope.success) {
        throw new ApiError(envelope.error?.messageKey ?? "error.internal_error", {
            status: res.status,
            traceId: envelope.traceId,
            error: envelope.error ?? undefined,
        });
    }

    return envelope.data as T;
}

export function apiGet<T>(path: string, init?: RequestInit) {
    return apiRequest<T>(path, { ...init, method: "GET" });
}

export function apiPost<TReq, TRes>(path: string, body: TReq, init?: RequestInit) {
    const headers = mergeHeaders(init?.headers, { "Content-Type": "application/json" });
    return apiRequest<TRes>(path, {
        ...init,
        method: "POST",
        headers,
        body: JSON.stringify(body),
    });
}
