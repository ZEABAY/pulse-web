"use client";

import { usePathname as useNextPathname } from "next/navigation";
import { useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function LanguageToggle({ className }: { className?: string }) {
    const locale = useLocale();
    const router = useRouter();
    // Use raw Next.js pathname (e.g., "/en/about") to avoid next-intl double-prefix bugs
    const rawPathname = useNextPathname();

    const switchLocale = () => {
        const nextLocale = locale === "tr" ? "en" : "tr";

        // Strip the existing locale prefix from the raw path so next-intl's router 
        // doesn't concatenate them. (e.g. "/en/dashboard" -> "/dashboard")
        const strippedPathname = rawPathname?.replace(/^\/(en|tr)(\/|$)/, "/") || "/";

        // Let next-intl seamlessly transition the layout context
        router.replace(strippedPathname, { locale: nextLocale });
    };

    return (
        <Button
            variant="secondary"
            size="sm"
            onClick={switchLocale}
            className={cn("h-8 rounded-xl px-3 text-xs uppercase font-semibold", className)}
            title={`Switch to ${locale === "tr" ? "English" : "Türkçe"}`}
        >
            {locale}
        </Button>
    );
}
