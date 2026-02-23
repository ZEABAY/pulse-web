import { cn } from "@/lib/utils";

const PALETTE = [
    { name: "Background", var: "--background", light: "#F0F8FF", dark: "#0B1026" },
    { name: "Foreground", var: "--foreground", light: "#003459", dark: "#E0E6ED" },
    { name: "Card", var: "--card", light: "#FFFFFF", dark: "#151E3F" },
    { name: "Border", var: "--border", light: "#D1D9E6", dark: "rgba(224, 230, 237, 0.1)" },
    { name: "Primary", var: "--primary", light: "#00A8E8", dark: "#00A8E8" },
    { name: "Secondary", var: "--secondary", light: "#F1F5F9", dark: "#1E293B" },
    { name: "Accent", var: "--accent", light: "#FF9F1C", dark: "#FFBE0B" },
    { name: "Success", var: "--success", light: "#059669", dark: "#34D399" },
    { name: "Destructive", var: "--destructive", light: "#DC2626", dark: "#F87171" },
    { name: "Warning", var: "--warning", light: "#D97706", dark: "#FBBF24" },
    { name: "Info", var: "--info", light: "#2563EB", dark: "#60A5FA" },
    { name: "Muted", var: "--muted", light: "#F1F5F9", dark: "#1E293B" },
    { name: "Popover", var: "--popover", light: "#FFFFFF", dark: "#151E3F" },
    { name: "Input", var: "--input", light: "#D1D9E6", dark: "rgba(224, 230, 237, 0.1)" },
    { name: "Ring", var: "--ring", light: "#00A8E8", dark: "#00A8E8" },
    { name: "Radius", var: "--radius", light: "0.5rem (8px)", dark: "0.5rem (8px)" },
    { name: "Chart 1", var: "--chart-1", light: "hsl(197 100% 45%)", dark: "hsl(197 100% 45%)" },
    { name: "Chart 2", var: "--chart-2", light: "hsl(35 100% 55%)", dark: "hsl(45 100% 51%)" },
    { name: "Chart 3", var: "--chart-3", light: "hsl(161 94% 30%)", dark: "hsl(158 64% 52%)" },
    { name: "Chart 4", var: "--chart-4", light: "hsl(221 83% 53%)", dark: "hsl(217 91% 60%)" },
    { name: "Chart 5", var: "--chart-5", light: "hsl(262 83% 58%)", dark: "hsl(263 70% 50%)" },
    { name: "Sidebar Bg", var: "--sidebar-background", light: "#FFFFFF", dark: "#151E3F" },
    { name: "Sidebar Accent", var: "--sidebar-accent", light: "#F1F5F9", dark: "#1E293B" },
];

import { useTranslations } from "next-intl";

export function ThemeShowcase() {
    const t = useTranslations('Index');

    return (
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm w-full">
            <h2 className="text-lg font-bold text-foreground mb-1">{t('themeShowcaseTitle')}</h2>
            <p className="text-sm text-muted-foreground mb-6">
                {t('themeShowcaseDesc')}
            </p>

            <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-sm">
                    <thead>
                        <tr className="border-b border-border text-foreground">
                            <th className="py-3 font-semibold w-1/4">{t('varCol')}</th>
                            <th className="py-3 font-semibold w-1/4">{t('nameCol')}</th>
                            <th className="py-3 font-semibold">{t('lightCol')}</th>
                            <th className="py-3 font-semibold">{t('darkCol')}</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border/50">
                        {PALETTE.map((c) => (
                            <tr key={c.var} className="group hover:bg-muted/50 transition-colors">
                                <td className="py-3 font-mono text-xs text-foreground/80">{c.var}</td>
                                <td className="py-3 font-medium text-foreground">{c.name}</td>
                                <td className="py-3">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="h-8 w-12 rounded-md shadow-inner border border-black/10"
                                            style={{ backgroundColor: c.light }}
                                        />
                                        <span className="font-mono text-xs text-foreground/70">{c.light}</span>
                                    </div>
                                </td>
                                <td className="py-3">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="h-8 w-12 rounded-md shadow-inner border border-white/10"
                                            style={{ backgroundColor: c.dark }}
                                        />
                                        <span className="font-mono text-xs text-foreground/70">{c.dark}</span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
