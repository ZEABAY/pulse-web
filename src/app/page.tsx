export const dynamic = "force-dynamic";

export default async function Page() {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    if (!baseUrl) {
        return (
            <main className="p-8">
                <pre className="text-sm">NEXT_PUBLIC_API_BASE_URL is not set</pre>
            </main>
        );
    }

    const url = new URL("/actuator/health", baseUrl);

    try {
        const res = await fetch(url, { cache: "no-store" });
        const body = await res.text();

        const traceId = res.headers.get("x-trace-id");
        const traceparent = res.headers.get("traceparent");

        return (
            <main className="min-h-screen p-8">
                <h1 className="text-2xl font-semibold">Pulse Web (Sprint 0)</h1>

                <div className="mt-6 rounded-xl border p-4">
                    <div className="text-sm opacity-70">Backend health</div>
                    <div className="mt-2 font-mono text-sm">
                        <div>URL: {url.toString()}</div>
                        <div>Status: {res.status}</div>
                        <div>x-trace-id: {traceId ?? "-"}</div>
                        <div>traceparent: {traceparent ?? "-"}</div>
                    </div>

                    <pre className="mt-4 overflow-auto rounded-lg bg-black/5 p-3 text-xs">
            {body}
          </pre>
                </div>
            </main>
        );
    } catch (e: any) {
        const cause = e?.cause ? String(e.cause) : "-";
        return (
            <main className="p-8">
                <h1 className="text-xl font-semibold">Fetch failed</h1>
                <pre className="mt-4 rounded-lg bg-black/5 p-3 text-xs">
          URL: {url.toString()}
                    {"\n"}Message: {String(e?.message ?? e)}
                    {"\n"}Cause: {cause}
        </pre>
            </main>
        );
    }
}
