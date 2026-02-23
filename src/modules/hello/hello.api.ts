import { apiGet } from "@/lib/api/client";
import type {
    CallSelfResponse,
    HeadersResponse,
    HealthResponse,
    TimeResponse,
    TraceResponse,
    ValidationDemoResponse,
} from "./hello.types";

export const HelloApi = {
    health(): Promise<HealthResponse> {
        return apiGet<HealthResponse>("/hello/health");
    },

    ping(): Promise<string> {
        return apiGet<string>("/hello/ping");
    },

    hello(): Promise<string> {
        return apiGet<string>("/hello/hello");
    },

    time(): Promise<TimeResponse> {
        return apiGet<TimeResponse>("/hello/time");
    },

    trace(): Promise<TraceResponse> {
        return apiGet<TraceResponse>("/hello/trace");
    },

    headers(): Promise<HeadersResponse> {
        return apiGet<HeadersResponse>("/hello/headers");
    },

    validateDemo(q?: string): Promise<ValidationDemoResponse> {
        const qs = q ? `?q=${encodeURIComponent(q)}` : "";
        return apiGet<ValidationDemoResponse>(`/hello/validate-demo${qs}`);
    },

    callSelf(): Promise<CallSelfResponse> {
        return apiGet<CallSelfResponse>("/hello/call-self");
    },
};