import type { ApiResponse } from "@/lib/api/types";

export type HealthResponse = {
    status: string;
    groups?: string[];
};

export type TimeResponse = {
    now: string;
};

export type TraceResponse = {
    traceId: string;
    ctxKey: string;
};

export type ValidationDemoResponse = {
    q: string;
    length: number;
};

export type HeaderItem = {
    name: string;
    values: string[];
};

export type HeadersResponse = {
    headers: HeaderItem[];
};

export type CallSelfResponse = {
    traceId: string;
    downstreamTraceId: string | null;
    downstreamBody: ApiResponse<string>;
};