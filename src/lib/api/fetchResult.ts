import {ApiError, apiGet} from "./client";
import type {ApiResponse} from "./types";

export type FetchOk<T> = {
    ok: true;
    url: string;
    status: number;
    traceId?: string;
    api?: ApiResponse<T>;
    data?: T;
};

export type FetchErr = {
    ok: false;
    url: string;
    status?: number;
    traceId?: string;
    message: string;
    cause?: string;
};

export type FetchResult<T> = FetchOk<T> | FetchErr;

function buildUrl(path: string): string {
    const base = process.env.NEXT_PUBLIC_PULSE_API_BASE_URL;
    if (!base) return path;

    try {
        return new URL(path, base).toString();
    } catch {
        return `${base}${path}`;
    }
}


/**
 * apiGet -> FetchResult adapter (tek yerde)
 */
export async function apiGetResult<T>(path: string): Promise<FetchResult<T>> {
    const url = buildUrl(path);

    try {
        const {data, traceId, envelope, status} = await apiGet<T>(path);
        return {ok: true, url, status, traceId, api: envelope, data};
    } catch (e: any) {
        if (e instanceof ApiError) {
            return {
                ok: false,
                url,
                status: e.status,
                traceId: e.traceId,
                message: e.message,
                cause: e.error ? JSON.stringify(e.error) : undefined,
            };
        }

        return {
            ok: false,
            url,
            message: String(e?.message ?? e),
            cause: e?.cause ? String(e.cause) : undefined,
        };
    }
}
