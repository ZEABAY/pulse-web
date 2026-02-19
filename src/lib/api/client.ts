import type {ApiResponse, ErrorResponse} from "./types";
import {getAccessToken} from "../auth/token";

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
    const base = process.env.NEXT_PUBLIC_PULSE_API_BASE_URL;
    if (!base) throw new ApiError("API base URL is not set (NEXT_PUBLIC_PULSE_API_BASE_URL)");
    new URL(base);
    return base;
}

function isApiResponse(x: any): x is ApiResponse<any> {
    return (
        x &&
        typeof x === "object" &&
        typeof x.success === "boolean" &&
        "data" in x &&
        "error" in x &&
        typeof x.traceId === "string"
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

/**
 * Contract: backend ALWAYS returns ApiResponse<T>.
 * If success=false => throws ApiError (includes traceId + error).
 */
export async function apiRequest<T>(
    path: string,
    init?: RequestInit
): Promise<{ data: T; traceId: string; envelope: ApiResponse<T>; status: number }> {
    const baseUrl = resolveBaseUrl();
    const url = new URL(path, baseUrl).toString();

    const token = await getAccessToken();

    const headers = mergeHeaders(init?.headers, {
        Accept: "application/json",
        ...(token ? {Authorization: `Bearer ${token}`} : {}),
    });

    const res = await fetch(url, {
        ...init,
        cache: "no-store",
        headers,
    });

    const text = await res.text();

    let parsed: unknown;
    try {
        parsed = text ? JSON.parse(text) : null;
    } catch {
        throw new ApiError("Response is not valid JSON (expected ApiResponse<T>)", {status: res.status});
    }

    if (!isApiResponse(parsed)) {
        throw new ApiError("Response is not ApiResponse<T> shape", {status: res.status});
    }

    const envelope = parsed as ApiResponse<T>;

    if (!envelope.success) {
        throw new ApiError(envelope.error?.message ?? "Request failed", {
            status: res.status,
            traceId: envelope.traceId,
            error: envelope.error ?? undefined,
        });
    }

    if (envelope.data === null || envelope.data === undefined) {
        throw new ApiError("ApiResponse.success=true but data is null", {
            status: res.status,
            traceId: envelope.traceId,
        });
    }

    return {data: envelope.data, traceId: envelope.traceId, envelope, status: res.status};
}

export function apiGet<T>(path: string, init?: RequestInit) {
    return apiRequest<T>(path, {...init, method: "GET"});
}

export function apiPost<TReq, TRes>(path: string, body: TReq, init?: RequestInit) {
    const headers = mergeHeaders(init?.headers, {"Content-Type": "application/json"});
    return apiRequest<TRes>(path, {
        ...init,
        method: "POST",
        headers,
        body: JSON.stringify(body),
    });
}
