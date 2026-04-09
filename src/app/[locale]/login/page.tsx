import { LoginView } from "@/modules/auth/views/LoginView";

import { getTranslations } from "next-intl/server";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Auth" });
    return {
        title: `${t("loginTitle")} - Pulse`,
    };
}

interface LoginPageProps {
    searchParams: Promise<{ reset?: string }>;
}

export default async function LoginPage(props: LoginPageProps) {
    const searchParams = await props.searchParams;
    const isResetSuccess = searchParams?.reset === "success";

    return <LoginView isResetSuccess={isResetSuccess} />;
}
