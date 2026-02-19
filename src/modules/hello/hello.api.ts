import { apiGetResult } from "@/lib/api/fetchResult";
import type { FetchResult } from "@/lib/api/fetchResult";
import type {
    CallSelfResponse,
    HeadersResponse,
    HealthResponse,
    TimeResponse,
    TraceResponse,
    ValidationDemoResponse,
} from "./hello.types";

export const HelloApi = {
    health(): Promise<FetchResult<HealthResponse>> {
        return apiGetResult<HealthResponse>("/health");
    },

    ping(): Promise<FetchResult<string>> {
        return apiGetResult<string>("/ping");
    },

    hello(): Promise<FetchResult<string>> {
        return apiGetResult<string>("/hello");
    },

    time(): Promise<FetchResult<TimeResponse>> {
        return apiGetResult<TimeResponse>("/time");
    },

    trace(): Promise<FetchResult<TraceResponse>> {
        return apiGetResult<TraceResponse>("/trace");
    },

    headers(): Promise<FetchResult<HeadersResponse>> {
        return apiGetResult<HeadersResponse>("/headers");
    },

    validateDemo(q?: string): Promise<FetchResult<ValidationDemoResponse>> {
        const qs = q ? `?q=${encodeURIComponent(q)}` : "";
        return apiGetResult<ValidationDemoResponse>(`/validate-demo${qs}`);
    },

    callSelf(): Promise<FetchResult<CallSelfResponse>> {
        return apiGetResult<CallSelfResponse>("/call-self");
    },
};