import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { QueryProvider } from "@/lib/providers/QueryProvider";
import { ThemeProvider } from "@/lib/providers/ThemeProvider";
import { getLocale } from "next-intl/server";
import "./globals.css";

const inter = Inter({
    subsets: ['latin', 'latin-ext'],
    weight: ['400', '500', '700'],
    display: 'swap',
    variable: '--font-family-base',
});

export const metadata: Metadata = {
    title: {
        default: "Pulse",
        template: "%s | Pulse",
    },
    description: "Pulse — Connect, share, and discover. A modern social media platform built for meaningful interactions.",
    keywords: ["social media", "pulse", "connect", "share", "community"],
    openGraph: {
        type: "website",
        siteName: "Pulse",
        title: "Pulse — Social Media Platform",
        description: "Connect, share, and discover on Pulse.",
        locale: "en_US",
    },
    twitter: {
        card: "summary_large_image",
        title: "Pulse",
        description: "Connect, share, and discover on Pulse.",
    },
    robots: { index: true, follow: true },
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const locale = await getLocale();

    return (
        <html lang={locale} suppressHydrationWarning>
            <body className={`${inter.variable} antialiased`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <QueryProvider>
                        {children}
                    </QueryProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
