import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { PulseLogo } from "@/components/ui/PulseLogo";

export default function NotFound() {
  const t = useTranslations("System");

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md p-8 bg-surface rounded-2xl shadow-lg border border-border flex flex-col items-center text-center">
        <PulseLogo className="w-16 h-16 mb-6 bg-foreground-muted" />
        <h2 className="text-2xl font-bold text-foreground mb-2">{t("notFoundTitle")}</h2>
        <p className="text-sm text-foreground-muted mb-8">{t("notFoundSubtitle")}</p>
        <Link
          href="/"
          className="flex flex-row items-center justify-center w-full h-10 bg-primary hover:bg-primary-hover text-primary-foreground font-medium rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background"
        >
          {t("goHomeButton")}
        </Link>
      </div>
    </div>
  );
}
