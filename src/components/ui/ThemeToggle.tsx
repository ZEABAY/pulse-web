"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

export function ThemeToggle({ className }: { className?: string }) {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const t = useTranslations('Index');

    // Ensure we don't render mismatching HTML on the server vs client
    useEffect(() => {
        const timer = setTimeout(() => setMounted(true), 0);
        return () => clearTimeout(timer);
    }, []);

    // Placeholder during SSR hydration
    if (!mounted) {
        return <div className={cn("inline-flex h-8 w-[100px] rounded-xl bg-secondary border border-border animate-pulse", className)} />;
    }

    // Determine the next state to cycle to
    const handleToggle = () => {
        if (theme === "system") {
            setTheme("light");
        } else if (theme === "light") {
            setTheme("dark");
        } else {
            setTheme("system");
        }
    };

    // Determine the active icon and text
    const getThemeConfig = () => {
        if (theme === "system") {
            return { icon: "💻", text: t('themeSystem') };
        } else if (theme === "light") {
            return { icon: "☀️", text: t('themeLight') };
        } else {
            return { icon: "🌙", text: t('themeDark') };
        }
    };

    const activeState = getThemeConfig();

    return (
        <Button
            variant="secondary"
            size="sm"
            onClick={handleToggle}
            className={cn(
                "h-8 rounded-xl px-3 text-xs uppercase font-semibold gap-2",
                theme === "dark" || theme === "light" ? "bg-primary/20 text-primary border-primary/30 hover:bg-primary/30" : "",
                className
            )}
            title={`Current theme: ${activeState.text}. Click to change.`}
        >
            <span className="text-xs">{activeState.icon}</span>
            <span>{activeState.text}</span>
        </Button>
    );
}
