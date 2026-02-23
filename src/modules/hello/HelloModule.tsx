"use client";

import { useQuery } from "@tanstack/react-query";
import { HelloApi } from "./hello.api";
import { ApiError } from "@/lib/api/client";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { ThemeShowcase } from "@/components/ui/ThemeShowcase";
import { useTranslations } from "next-intl";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

function Badge({ ok, text }: { ok: boolean; text: string }) {
    return (
        <span
            className={cn(
                "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold border transition-colors",
                ok
                    ? "border-success/50 bg-success/10 text-success"
                    : "border-destructive/50 bg-destructive/10 text-destructive"
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

function ResultBox({
    data,
    error,
    isPending,
    isFetching,
}: {
    data?: unknown;
    error?: Error | null;
    isPending: boolean;
    isFetching: boolean;
}) {
    const t = useTranslations('Index');

    if (isPending) {
        return <div className="font-mono text-muted-foreground text-xs animate-pulse">{t('loading')}</div>;
    }

    if (error) {
        const isApiError = error instanceof ApiError;
        return (
            <pre className={cn("font-mono text-destructive text-[10px] sm:text-xs text-wrap break-all whitespace-pre-wrap", isFetching && "opacity-50")}>
                {`❌ ${error.message}\n`}
                {isApiError && error.status ? `status: ${error.status}\n` : ""}
                {isApiError && error.traceId ? `traceId: ${error.traceId}\n` : ""}
                {isApiError && error.error ? `\n${pretty(error.error)}` : ""}
            </pre>
        );
    }

    if (!data) return <div className="font-mono text-muted-foreground text-xs">-</div>;

    return (
        <pre className={cn("font-mono text-foreground/90 text-[10px] sm:text-xs text-wrap break-all whitespace-pre-wrap", isFetching && "opacity-50")}>
            {pretty(data)}
        </pre>
    );
}

const formSchema = z.object({
    query: z.string().min(2, {
        message: "Query must be at least 2 characters.",
    }).max(20, {
        message: "Query too long."
    }),
});

export function HelloModule() {
    const t = useTranslations('Index');

    const baseUrl = useMemo(
        () => process.env.NEXT_PUBLIC_PULSE_API_BASE_URL ?? "(NEXT_PUBLIC_PULSE_API_BASE_URL not set)",
        []
    );

    const healthQuery = useQuery({ queryKey: ["hello", "health"], queryFn: () => HelloApi.health() });
    const pingQuery = useQuery({ queryKey: ["hello", "ping"], queryFn: () => HelloApi.ping() });
    const helloQuery = useQuery({ queryKey: ["hello", "hello"], queryFn: () => HelloApi.hello() });
    const timeQuery = useQuery({ queryKey: ["hello", "time"], queryFn: () => HelloApi.time() });
    const traceQuery = useQuery({ queryKey: ["hello", "trace"], queryFn: () => HelloApi.trace() });
    const headersQuery = useQuery({ queryKey: ["hello", "headers"], queryFn: () => HelloApi.headers() });
    const callSelfQuery = useQuery({ queryKey: ["hello", "callSelf"], queryFn: () => HelloApi.callSelf() });

    // Custom Form State to trigger identical fetch logic
    const [searchQuery, setSearchQuery] = useState("test");
    const validateQuery = useQuery({
        queryKey: ["hello", "validate", searchQuery],
        queryFn: () => HelloApi.validateDemo(searchQuery),
        retry: false,
        enabled: !!searchQuery
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            query: "test",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        setSearchQuery(values.query);
        // Next refresh cycle will be triggered by react-query noticing the queryKey change
    }

    const refreshAll = () => {
        healthQuery.refetch();
        pingQuery.refetch();
        helloQuery.refetch();
        timeQuery.refetch();
        traceQuery.refetch();
        headersQuery.refetch();
        callSelfQuery.refetch();
        validateQuery.refetch();
    };

    const healthOk = Boolean(healthQuery.isSuccess && healthQuery.data?.status?.toUpperCase() === "UP");

    return (
        <main className="px-4 py-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
            <header className="flex flex-col sm:flex-row sm:items-start justify-between border-b pb-6 gap-4">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                        {t('baseUrl')}: <code className="bg-muted px-2 py-0.5 rounded text-xs font-mono">{baseUrl}</code>
                    </p>
                    <div className="pt-2">
                        <Button variant="secondary" size="sm" onClick={refreshAll}>
                            {t('refreshAll')}
                        </Button>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <LanguageToggle />
                    <ThemeToggle />
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <div className="space-y-1">
                            <CardTitle className="text-base">{t('backendHealth')}</CardTitle>
                            <CardDescription>Server status and healthcheck</CardDescription>
                        </div>
                        <Badge ok={healthOk} text={healthOk ? "UP" : "NOT OK"} />
                    </CardHeader>
                    <CardContent className="space-y-4 pt-4">
                        <Button variant="outline" size="sm" onClick={() => healthQuery.refetch()} className="w-full">
                            {t('refetch')}
                        </Button>
                        <div className="bg-muted rounded-md p-4 min-h-[100px] overflow-x-auto border">
                            <ResultBox {...healthQuery} />
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-primary/50 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-primary/5 rounded-t-xl border-b border-primary/10">
                        <div className="space-y-1">
                            <CardTitle className="text-base text-primary">Zod + Shadcn Form Validation</CardTitle>
                            <CardDescription>Type-safe form linked to /validate-demo API</CardDescription>
                        </div>
                        <Badge ok={validateQuery.isSuccess} text="API" />
                    </CardHeader>
                    <CardContent className="space-y-4 pt-6">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-start gap-2">
                                <FormField
                                    control={form.control}
                                    name="query"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormControl>
                                                <Input placeholder="Enter strict query object..." {...field} />
                                            </FormControl>
                                            <FormMessage className="text-[10px]" />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" size="sm" disabled={validateQuery.isFetching}>Send Request</Button>
                            </form>
                        </Form>
                        <div className="bg-muted rounded-md p-4 min-h-[120px] overflow-x-auto border relative">
                            <div className="absolute top-2 right-2 flex gap-1">
                                {validateQuery.isFetching && <span className="animate-spin text-muted-foreground text-xs">⏳</span>}
                            </div>
                            <ResultBox {...validateQuery} />
                        </div>
                    </CardContent>
                </Card>

                <Card className="col-span-1 lg:col-span-2">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <div className="space-y-1">
                            <CardTitle className="text-base">{t('basicEndpoints')}</CardTitle>
                            <CardDescription>General REST mappings and Trace ID Propagation</CardDescription>
                        </div>
                        <Badge ok={pingQuery.isSuccess && callSelfQuery.isSuccess} text="ping/call-self" />
                    </CardHeader>
                    <CardContent className="pt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="space-y-2 border p-3 rounded-xl bg-card">
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-muted-foreground font-mono">/ping</span>
                                <Button size="sm" variant="ghost" className="h-6" onClick={() => pingQuery.refetch()}>{t('refetch')}</Button>
                            </div>
                            <div className="bg-muted rounded-md p-2 min-h-[60px] overflow-x-auto">
                                <ResultBox {...pingQuery} />
                            </div>
                        </div>

                        <div className="space-y-2 border p-3 rounded-xl bg-card">
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-muted-foreground font-mono">/trace</span>
                                <Button size="sm" variant="ghost" className="h-6" onClick={() => traceQuery.refetch()}>{t('refetch')}</Button>
                            </div>
                            <div className="bg-muted rounded-md p-2 min-h-[60px] overflow-x-auto">
                                <ResultBox {...traceQuery} />
                            </div>
                        </div>

                        <div className="space-y-2 border p-3 rounded-xl bg-card">
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-muted-foreground font-mono">/headers</span>
                                <Button size="sm" variant="ghost" className="h-6" onClick={() => headersQuery.refetch()}>{t('refetch')}</Button>
                            </div>
                            <div className="bg-muted rounded-md p-2 min-h-[60px] overflow-x-auto">
                                <ResultBox {...headersQuery} />
                            </div>
                        </div>

                        <div className="space-y-2 border p-3 rounded-xl border-secondary/50 bg-secondary/20">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-semibold text-primary font-mono">/call-self</span>
                                <Button size="sm" variant="outline" className="h-6" onClick={() => callSelfQuery.refetch()}>{t('refetch')}</Button>
                            </div>
                            <div className="bg-card rounded-md p-2 min-h-[60px] border overflow-x-auto">
                                <ResultBox {...callSelfQuery} />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <section className="pt-8 border-t border-border">
                <ThemeShowcase />
            </section>
        </main>
    );
}
