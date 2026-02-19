// file: src/modules/hello/HelloModule.tsx
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { FetchResult } from "@/lib/api/fetchResult";
import { HelloApi } from "./hello.api";
import type {
    CallSelfResponse,
    HeadersResponse,
    HealthResponse,
    TimeResponse,
    TraceResponse,
    ValidationDemoResponse,
} from "./hello.types";
import s from "./hello.module.scss";

function cx(...xs: Array<string | false | undefined | null>) {
    return xs.filter(Boolean).join(" ");
}

function Badge({ ok, text }: { ok: boolean; text: string }) {
    return (
        <span
            className={cx(
                "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium border",
                ok
                    ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-100"
                    : "border-rose-400/30 bg-rose-400/10 text-rose-100"
            )}
        >
      {text}
    </span>
    );
}

function pretty(x: unknown) {
    try {
        return JSON.stringify(x, null, 2);
    } catch {
        return String(x);
    }
}

function ResultBox<T>({ r }: { r?: FetchResult<T> }) {
    if (!r) return <div className={s.mono}>-</div>;

    if (!r.ok) {
        return (
            <pre className={cx(s.mono, "text-rose-100/90 text-xs")}>
        {`❌ ${r.message}\n`}
                {r.status ? `status: ${r.status}\n` : ""}
                {r.traceId ? `traceId: ${r.traceId}\n` : ""}
                {r.cause ? `cause: ${r.cause}\n` : ""}
                {`url: ${r.url}\n\n`}
                {pretty((r as any).error)}
      </pre>
        );
    }

    return (
        <pre className={cx(s.mono, "text-white/80 text-xs")}>
      {`✅ status: ${r.status}\n`}
            {r.traceId ? `traceId: ${r.traceId}\n` : ""}
            {`url: ${r.url}\n\n`}
            {pretty(r.data)}
    </pre>
    );
}

export function HelloModule() {
    const [health, setHealth] = useState<FetchResult<HealthResponse>>();
    const [ping, setPing] = useState<FetchResult<string>>();
    const [hello, setHello] = useState<FetchResult<string>>();
    const [time, setTime] = useState<FetchResult<TimeResponse>>();
    const [trace, setTrace] = useState<FetchResult<TraceResponse>>();
    const [headers, setHeaders] = useState<FetchResult<HeadersResponse>>();
    const [validate, setValidate] = useState<FetchResult<ValidationDemoResponse>>();
    const [callSelf, setCallSelf] = useState<FetchResult<CallSelfResponse>>();

    const baseUrl = useMemo(
        () =>
            process.env.NEXT_PUBLIC_PULSE_API_BASE_URL ??
            "(NEXT_PUBLIC_PULSE_API_BASE_URL not set)",
        []
    );

    const run = useCallback(async (fn: () => Promise<any>, setter: (r: any) => void) => {
        const r = await fn();
        setter(r);
    }, []);

    const refreshAll = useCallback(async () => {
        await Promise.all([
            run(() => HelloApi.health(), setHealth),
            run(() => HelloApi.ping(), setPing),
            run(() => HelloApi.hello(), setHello),
            run(() => HelloApi.time(), setTime),
            run(() => HelloApi.trace(), setTrace),
            run(() => HelloApi.headers(), setHeaders),
            run(() => HelloApi.validateDemo(undefined), setValidate),
            run(() => HelloApi.callSelf(), setCallSelf),
        ]);
    }, [run]);

    useEffect(() => {
        void refreshAll();
    }, [refreshAll]);

    const healthOk = !!(health?.ok && health.data?.status?.toUpperCase() === "UP");

    const cardClass =
        "rounded-2xl border border-white/10 bg-white/5 p-4 shadow-sm";

    const btnClass =
        "rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/90 hover:bg-white/10";

    return (
        <main className="px-6 py-8">
            <header className="mb-5 space-y-1">
                <h1 className="text-xl font-bold text-white">Hello Module</h1>
                <p className="text-xs text-white/60">
                    Base URL: <span className={cx(s.mono, "text-white/80")}>{baseUrl}</span>
                </p>
            </header>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <section className={cardClass}>
                    <div className="mb-3 flex items-baseline justify-between gap-3">
                        <div className="text-sm font-semibold text-white">Backend Health</div>
                        <Badge ok={healthOk} text={healthOk ? "UP" : "NOT OK"} />
                    </div>

                    <div className="mb-3 flex flex-wrap gap-2">
                        <button className={btnClass} onClick={() => run(() => HelloApi.health(), setHealth)}>
                            Refresh health
                        </button>
                        <button className={btnClass} onClick={refreshAll}>
                            Refresh all
                        </button>
                    </div>

                    <ResultBox r={health} />
                </section>

                <section className={cardClass}>
                    <div className="mb-3 flex items-baseline justify-between gap-3">
                        <div className="text-sm font-semibold text-white">Trace Propagation</div>
                        <Badge ok={!!callSelf?.ok} text={callSelf?.ok ? "OK" : "CHECK"} />
                    </div>

                    <div className="mb-3 flex flex-wrap gap-2">
                        <button className={btnClass} onClick={() => run(() => HelloApi.callSelf(), setCallSelf)}>
                            GET /call-self
                        </button>
                    </div>

                    <ResultBox r={callSelf} />
                </section>

                <section className={cardClass}>
                    <div className="mb-3 flex items-baseline justify-between gap-3">
                        <div className="text-sm font-semibold text-white">Basic Endpoints</div>
                        <Badge ok={!!(ping?.ok && hello?.ok)} text="ping/hello/time/trace" />
                    </div>

                    <div className="mb-3 flex flex-wrap gap-2">
                        <button className={btnClass} onClick={() => run(() => HelloApi.ping(), setPing)}>
                            GET /ping
                        </button>
                        <button className={btnClass} onClick={() => run(() => HelloApi.hello(), setHello)}>
                            GET /hello
                        </button>
                        <button className={btnClass} onClick={() => run(() => HelloApi.time(), setTime)}>
                            GET /time
                        </button>
                        <button className={btnClass} onClick={() => run(() => HelloApi.trace(), setTrace)}>
                            GET /trace
                        </button>
                    </div>

                    <div className="space-y-3">
                        <div>
                            <div className="mb-1 text-xs text-white/60">ping</div>
                            <ResultBox r={ping} />
                        </div>
                        <div>
                            <div className="mb-1 text-xs text-white/60">hello</div>
                            <ResultBox r={hello} />
                        </div>
                        <div>
                            <div className="mb-1 text-xs text-white/60">time</div>
                            <ResultBox r={time} />
                        </div>
                        <div>
                            <div className="mb-1 text-xs text-white/60">trace</div>
                            <ResultBox r={trace} />
                        </div>
                    </div>
                </section>

                <section className={cardClass}>
                    <div className="mb-3 flex items-baseline justify-between gap-3">
                        <div className="text-sm font-semibold text-white">Headers + Validation</div>
                        <Badge ok={!!headers?.ok} text="headers / validate" />
                    </div>

                    <div className="mb-3 flex flex-wrap gap-2">
                        <button className={btnClass} onClick={() => run(() => HelloApi.headers(), setHeaders)}>
                            GET /headers
                        </button>
                        <button className={btnClass} onClick={() => run(() => HelloApi.validateDemo(undefined), setValidate)}>
                            GET /validate-demo (missing q)
                        </button>
                        <button className={btnClass} onClick={() => run(() => HelloApi.validateDemo("test"), setValidate)}>
                            GET /validate-demo?q=test
                        </button>
                    </div>

                    <div className="space-y-3">
                        <div>
                            <div className="mb-1 text-xs text-white/60">headers</div>
                            <ResultBox r={headers} />
                        </div>
                        <div>
                            <div className="mb-1 text-xs text-white/60">validate</div>
                            <ResultBox r={validate} />
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
