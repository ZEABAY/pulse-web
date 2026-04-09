"use client";

import { useTranslations } from "next-intl";
import { PulseThemeToggle } from "@/components/ui/PulseThemeToggle";
import { PulseLanguageToggle } from "@/components/ui/PulseLanguageToggle";
import { PulseLogo } from "@/components/ui/PulseLogo";
import { useState } from "react";
import { useRouter } from "@/i18n/routing";
import { toast } from "sonner";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { RegisterCard } from "@/components/auth/RegisterCard";
import { OtpCard } from "@/components/auth/OtpCard";
import { LoginCard } from "@/components/auth/LoginCard";
import { AuthCardSkeleton } from "@/components/auth/AuthCardSkeleton";

export function HelloModule() {
    const t = useTranslations('Index');
    const tSystem = useTranslations('System');
    const router = useRouter();
    const [shouldError, setShouldError] = useState(false);

    if (shouldError) {
        throw new Error("Pulse Test Error: System Error Boundary caught this!");
    }

    return (
        <main className="min-h-screen bg-background text-foreground transition-colors duration-normal py-10 px-4">
            <div className="max-w-6xl mx-auto space-y-12">
                {/* Header Section */}
                <header className="flex flex-col sm:flex-row items-center justify-between border-b pb-6 gap-4 border-border">
                    <div className="flex items-center gap-4">
                        <PulseLogo className="w-16 h-16" />
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Pulse Design System</h1>
                            <p className="text-sm text-foreground-muted mt-2">
                                Global CSS Variables & Tailwind v4 Integration Showcase
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <PulseLanguageToggle />
                        <PulseThemeToggle />
                        <LogoutButton />
                    </div>
                </header>

                {/* 1. SURFACES & BACKGROUNDS */}
                <section className="space-y-4">
                    <h2 className="text-xl font-bold border-b border-border pb-2">1. Surfaces & Backgrounds</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        <div className="p-4 border border-border rounded-lg bg-background flex flex-col items-center justify-center text-center">
                            <span className="text-xs font-mono text-foreground-muted">bg-background</span>
                        </div>
                        <div className="p-4 border border-border rounded-lg bg-surface flex flex-col items-center justify-center text-center shadow-sm">
                            <span className="text-xs font-mono text-foreground-muted">bg-surface</span>
                        </div>
                        <div className="p-4 border border-border rounded-lg bg-surface-hover flex flex-col items-center justify-center text-center">
                            <span className="text-xs font-mono text-foreground-muted">bg-surface-hover</span>
                        </div>
                        <div className="p-4 border border-border rounded-lg bg-surface-active flex flex-col items-center justify-center text-center">
                            <span className="text-xs font-mono text-foreground-muted">bg-surface-active</span>
                        </div>
                        <div className="p-4 border border-border rounded-lg bg-surface-elevated flex flex-col items-center justify-center text-center shadow-lg">
                            <span className="text-xs font-mono text-foreground-muted">bg-surface-elevated</span>
                        </div>
                        <div className="p-4 border border-border rounded-lg bg-surface-disabled flex flex-col items-center justify-center text-center opacity-70">
                            <span className="text-xs font-mono text-foreground-muted">bg-surface-disabled</span>
                        </div>
                    </div>
                </section>

                {/* 2. SEMANTIC COLORS */}
                <section className="space-y-4">
                    <h2 className="text-xl font-bold border-b border-border pb-2">2. Brand & Semantic Colors</h2>

                    {/* Primary */}
                    <div className="space-y-2">
                        <div className="text-sm font-semibold capitalize">Primary</div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="p-4 rounded-lg bg-primary text-primary-foreground flex flex-col items-center shadow-md">
                                <span className="text-xs font-mono">bg-primary</span>
                            </div>
                            <div className="p-4 rounded-lg bg-primary-hover text-primary-foreground flex flex-col items-center shadow-md">
                                <span className="text-xs font-mono">bg-primary-hover</span>
                            </div>
                            <div className="p-4 rounded-lg bg-primary-active text-primary-foreground flex flex-col items-center shadow-md">
                                <span className="text-xs font-mono">bg-primary-active</span>
                            </div>
                        </div>
                    </div>

                    {/* Accent */}
                    <div className="space-y-2">
                        <div className="text-sm font-semibold capitalize">Accent</div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="p-4 rounded-lg bg-accent text-accent-foreground flex flex-col items-center shadow-md">
                                <span className="text-xs font-mono">bg-accent</span>
                            </div>
                            <div className="p-4 rounded-lg bg-accent-hover text-accent-foreground flex flex-col items-center shadow-md">
                                <span className="text-xs font-mono">bg-accent-hover</span>
                            </div>
                        </div>
                    </div>

                    {/* Status Colors: Success, Error, Warning */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                        <div className="space-y-2">
                            <div className="text-sm font-semibold">Success</div>
                            <div className="p-4 rounded-lg bg-success text-success-foreground flex justify-between shadow-sm">
                                <span className="text-xs font-mono">bg-success</span>
                            </div>
                            <div className="p-4 rounded-lg bg-success-soft text-success shadow-sm">
                                <span className="text-xs font-mono">bg-success-soft</span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="text-sm font-semibold">Error</div>
                            <div className="p-4 rounded-lg bg-error text-error-foreground flex justify-between shadow-sm">
                                <span className="text-xs font-mono">bg-error</span>
                            </div>
                            <div className="p-4 rounded-lg bg-error-soft text-error shadow-sm">
                                <span className="text-xs font-mono">bg-error-soft</span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="text-sm font-semibold">Warning</div>
                            <div className="p-4 rounded-lg bg-warning text-warning-foreground flex justify-between shadow-sm">
                                <span className="text-xs font-mono">bg-warning</span>
                            </div>
                            <div className="p-4 rounded-lg bg-warning-soft text-warning shrink-0 shadow-sm">
                                <span className="text-xs font-mono">bg-warning-soft</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. TEXT & TYPOGRAPHY */}
                <section className="space-y-4">
                    <h2 className="text-xl font-bold border-b border-border pb-2">3. Typography & Text Colors</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Text Colors */}
                        <div className="space-y-4 bg-surface p-6 rounded-xl border border-border shadow-sm">
                            <div className="text-foreground">
                                <div className="text-sm font-mono text-primary mb-1">text-foreground</div>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            </div>
                            <div className="text-foreground-muted">
                                <div className="text-sm font-mono text-primary mb-1">text-foreground-muted</div>
                                Vestibulum auctor risus ut velit accumsan, ac laoreet lorem pellentesque.
                            </div>
                            <div className="text-foreground-disabled">
                                <div className="text-sm font-mono text-primary mb-1">text-foreground-disabled</div>
                                Aliquam erat volutpat. Nam nec eros quis enim tempus lacinia.
                            </div>
                            <div className="text-foreground-placeholder">
                                <div className="text-sm font-mono text-primary mb-1">text-foreground-placeholder</div>
                                Phasellus egestas quam in lacus gravida...
                            </div>
                        </div>

                        {/* Sizes */}
                        <div className="space-y-2 bg-surface p-6 rounded-xl border border-border shadow-sm flex flex-col justify-center">
                            <div className="text-xs"><span className="font-mono text-primary-hover w-24 inline-block">text-xs (12px)</span> The quick brown fox jumps...</div>
                            <div className="text-sm"><span className="font-mono text-primary-hover w-24 inline-block">text-sm (14px)</span> The quick brown fox jumps...</div>
                            <div className="text-base"><span className="font-mono text-primary-hover w-24 inline-block">text-base (16px)</span> The quick brown fox jumps...</div>
                            <div className="text-lg"><span className="font-mono text-primary-hover w-24 inline-block">text-lg (18px)</span> The quick brown fox...</div>
                            <div className="text-xl"><span className="font-mono text-primary-hover w-24 inline-block">text-xl (20px)</span> The quick brown fox...</div>
                            <div className="text-2xl mt-2"><span className="font-mono text-primary-hover w-24 inline-block text-base">text-2xl (24px)</span> The quick brown fox...</div>
                        </div>
                    </div>
                </section>

                {/* 4. COMPONENT STATES & BORDERS */}
                <section className="space-y-4">
                    <h2 className="text-xl font-bold border-b border-border pb-2">4. Component States & Borders</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-6 rounded-lg bg-surface border border-border">
                            <span className="text-xs font-mono text-foreground-muted mb-2 block">border-border</span>
                            <div className="text-sm text-foreground">Normal state border</div>
                        </div>
                        <div className="p-6 rounded-lg bg-surface border border-border-hover">
                            <span className="text-xs font-mono text-foreground-muted mb-2 block">border-border-hover</span>
                            <div className="text-sm text-foreground">Hover state border</div>
                        </div>
                        <div className="p-6 rounded-lg bg-surface border-2 border-border-strong">
                            <span className="text-xs font-mono text-foreground-muted mb-2 block">border-border-strong</span>
                            <div className="text-sm text-foreground">Strong / Active border</div>
                        </div>
                    </div>

                    <div className="p-6 rounded-lg bg-surface border border-border mt-4 flex items-center gap-4">
                        <div className="flex-1">
                            <span className="text-xs font-mono text-foreground-muted mb-2 block">Interactive Input Example (bg-input-bg, focus:ring-ring)</span>
                            <input
                                type="text"
                                placeholder="text-foreground-placeholder..."
                                className="w-full bg-input-bg border border-border px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-ring focus:border-border-hover transition-all text-sm text-foreground placeholder-foreground-placeholder"
                            />
                        </div>
                        <button className="bg-primary hover:bg-primary-hover text-primary-foreground px-4 py-2 mt-6 rounded-md text-sm font-medium transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background">
                            Action Button
                        </button>
                    </div>
                </section>

                {/* 5. GEOMETRY (RADIUS & SHADOW) */}
                <section className="space-y-4">
                    <h2 className="text-xl font-bold border-b border-border pb-2">5. Geometry (Radius & Shadows)</h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        <div className="bg-surface border border-border p-4 rounded-sm flex flex-col items-center">
                            <span className="text-xs font-mono">rounded-sm</span>
                        </div>
                        <div className="bg-surface border border-border p-4 rounded-md flex flex-col items-center">
                            <span className="text-xs font-mono">rounded-md</span>
                        </div>
                        <div className="bg-surface border border-border p-4 rounded-lg flex flex-col items-center">
                            <span className="text-xs font-mono">rounded-lg</span>
                        </div>
                        <div className="bg-surface border border-border p-4 rounded-full flex flex-col items-center">
                            <span className="text-xs font-mono">rounded-full</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-surface border border-border p-8 rounded-lg shadow-sm flex flex-col items-center">
                            <span className="text-xs font-mono">shadow-sm</span>
                        </div>
                        <div className="bg-surface border border-border p-8 rounded-lg shadow-md flex flex-col items-center">
                            <span className="text-xs font-mono">shadow-md</span>
                        </div>
                        <div className="bg-surface border border-border p-8 rounded-lg shadow-lg flex flex-col items-center">
                            <span className="text-xs font-mono">shadow-lg</span>
                        </div>
                    </div>
                </section>

                <section className="space-y-4 pt-8">
                    <h2 className="text-xl font-bold border-b border-border pb-2">6. Authentication UI (Real vs PulseSkeleton)</h2>
                    <div className="flex flex-col gap-12 rounded-xl p-4 sm:p-8 border border-border bg-surface-hover">
                        {/* Login Comparison */}
                        <div className="flex flex-col md:flex-row gap-8 items-start justify-center w-full">
                            <div className="w-full max-w-md space-y-3">
                                <p className="text-xs font-bold text-primary uppercase tracking-widest text-center mb-4">Gerçek Görünüm (Loaded)</p>
                                <LoginCard onSubmit={async () => { }} />
                            </div>
                            <div className="w-full max-w-md space-y-3">
                                <p className="text-xs font-bold text-foreground-muted uppercase tracking-widest text-center mb-4">İskelet Görünüm (PulseSkeleton)</p>
                                <AuthCardSkeleton />
                            </div>
                        </div>

                        <hr className="border-border opacity-50" />

                        {/* Register & Other */}
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start justify-items-center w-full">
                            <RegisterCard onSubmit={async () => { }} />
                            <OtpCard onSubmit={async () => { }} />
                        </div>
                    </div>
                </section>

                {/* 7. SYSTEM TESTING */}
                <section className="space-y-4 pt-8">
                    <h2 className="text-xl font-bold border-b border-border pb-2">7. System Testing</h2>
                    <div className="p-8 bg-surface border border-border rounded-xl flex flex-col items-center gap-4">
                        <p className="text-sm text-foreground-muted text-center max-w-sm">
                            Click the buttons below to verify each system-level state (PulseSkeleton, Redirect 404, Error Boundary).
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl px-4">
                            {/* 1. Test Loading (Skeleton) */}
                            <button
                                onClick={() => window.location.reload()}
                                className="flex flex-col items-center justify-center p-4 bg-surface border border-border rounded-xl hover:border-primary/50 hover:bg-surface-hover transition-all group"
                            >
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                <span className="text-xl">⏳</span>
                                </div>
                                <span className="text-sm font-semibold">Test Loading (Skeleton)</span>
                                <p className="text-xs text-foreground-muted mt-1 text-center">Refreshes page to show 3s skeleton</p>
                            </button>

                            {/* 2. Test 404 (Not Found) */}
                            <button
                                onClick={() => router.push("/not-found-test-" + Math.floor(Math.random() * 1000))}
                                className="flex flex-col items-center justify-center p-4 bg-surface border border-border rounded-xl hover:border-warning/50 hover:bg-surface-hover transition-all group"
                            >
                                <div className="w-10 h-10 rounded-full bg-warning/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                <span className="text-xl">🔍</span>
                                </div>
                                <span className="text-sm font-semibold">Test 404 (Not Found)</span>
                                <p className="text-xs text-foreground-muted mt-1 text-center">Redirects to a random invalid URL</p>
                            </button>

                            {/* 3. Test Error (Boundary) */}
                            <button
                                onClick={() => setShouldError(true)}
                                className="flex flex-col items-center justify-center p-4 bg-surface border border-border rounded-xl hover:border-error/50 hover:bg-surface-hover transition-all group"
                            >
                                <div className="w-10 h-10 rounded-full bg-error/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                <span className="text-xl">⚠️</span>
                                </div>
                                <span className="text-sm font-semibold">Test Error (Boundary)</span>
                                <p className="text-xs text-foreground-muted mt-1 text-center">Triggers a simulation runtime error</p>
                            </button>

                            {/* 4. Test Success Toast */}
                            <button
                                onClick={() => toast.success("İşlem Başarılı!", { description: "Verileriniz güvenli bir şekilde kaydedildi." })}
                                className="flex flex-col items-center justify-center p-4 bg-surface border border-border rounded-xl hover:border-success/50 hover:bg-surface-hover transition-all group"
                            >
                                <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                <span className="text-xl">✅</span>
                                </div>
                                <span className="text-sm font-semibold">Success Toast</span>
                                <p className="text-xs text-foreground-muted mt-1 text-center">Shows a success notification</p>
                            </button>

                            {/* 5. Test Error Toast */}
                            <button
                                onClick={() => toast.error("Bir Hata Oluştu!", { description: "Sunucu bağlantısı kurulamadı. Lütfen tekrar deneyin." })}
                                className="flex flex-col items-center justify-center p-4 bg-surface border border-border rounded-xl hover:border-error/50 hover:bg-surface-hover transition-all group"
                            >
                                <div className="w-10 h-10 rounded-full bg-error/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                <span className="text-xl">❌</span>
                                </div>
                                <span className="text-sm font-semibold">Error Toast</span>
                                <p className="text-xs text-foreground-muted mt-1 text-center">Shows an error notification</p>
                            </button>

                            {/* 6. Test Info Toast */}
                            <button
                                onClick={() => toast.info("Bilgi", { description: "Yeni bir güncelleme mevcut. Sayfayı yenileyebilirsiniz." })}
                                className="flex flex-col items-center justify-center p-4 bg-surface border border-border rounded-xl hover:border-primary/50 hover:bg-surface-hover transition-all group"
                            >
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                <span className="text-xl">ℹ️</span>
                                </div>
                                <span className="text-sm font-semibold">Info Toast</span>
                                <p className="text-xs text-foreground-muted mt-1 text-center">Shows an info notification</p>
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
