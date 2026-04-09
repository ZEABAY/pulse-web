import type { ReactNode } from "react";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { ToasterProvider } from '@/lib/providers/ToasterProvider';

export default async function LocaleLayout({
    children,
    params: paramsPromise
}: Readonly<{
    children: ReactNode;
    params: Promise<{ locale: string }>;
}>) {
    const params = await paramsPromise;
    const { locale } = params;

    if (!routing.locales.includes(locale as any)) {
        notFound();
    }

    const messages = await getMessages();

    return (
        <NextIntlClientProvider messages={messages} locale={locale}>
            <ToasterProvider />
            {children}
        </NextIntlClientProvider>
    );
}
