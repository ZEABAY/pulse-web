"use client";

import { usePathname, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { cn } from "@/lib/utils";

export function PulseLanguageToggle({ className }: { className?: string }) {
    const pathname = usePathname();
    const locale = useLocale();
    const router = useRouter();

    const switchLocale = () => {
        const nextLocale = locale === "tr" ? "en" : "tr";
        router.replace(pathname, { locale: nextLocale });
    };

    return (
        <button
            onClick={switchLocale}
            className={cn("inline-flex items-center justify-center bg-surface-hover hover:bg-surface-active text-foreground h-8 rounded-xl px-3 text-xs uppercase font-semibold transition-colors focus:ring-2 focus:ring-ring outline-none", className)}
            title={`Switch to ${locale === "tr" ? "English" : "Türkçe"}`}
        >
            {locale}
        </button>
    );
}
