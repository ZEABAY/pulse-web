import { redirect } from 'next/navigation';
import { routing } from '@/i18n/routing';

// This page intercepts the root `/` and redirects to the default locale (e.g., `/tr`)
export default function RootPage() {
    redirect(`/${routing.defaultLocale}`);
}
