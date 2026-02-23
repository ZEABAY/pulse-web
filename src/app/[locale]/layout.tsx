import type { ReactNode } from "react";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

export default async function LocaleLayout({
    children,
    params: paramsPromise
}: Readonly<{
    children: ReactNode;
    params: Promise<{ locale: string }>;
}>) {
    const params = await paramsPromise;
    const { locale } = params;

    // Ensure that the incoming `locale` is valid
    if (!routing.locales.includes(locale as any)) {
        notFound();
    }

    // Since this layout is inside the dynamic [locale] segment,
    // Next.js will re-fetch 'messages' and re-render this component 
    // seamlessly on route changes without unmounting the parent <html> tree
    const messages = await getMessages();

    return (
        <NextIntlClientProvider messages={messages} locale={locale}>
            {children}
        </NextIntlClientProvider>
    );
}
