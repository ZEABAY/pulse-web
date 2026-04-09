"use client";

import { useTranslations } from "next-intl";
import { PulseLogo } from "@/components/ui/PulseLogo";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("System");

  useEffect(() => {
    // TODO: Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md p-8 bg-error-soft rounded-2xl shadow-lg border border-error flex flex-col items-center text-center">
        <PulseLogo className="w-16 h-16 mb-6 bg-error" />
        <h2 className="text-2xl font-bold text-error mb-2">{t("errorTitle")}</h2>
        <p className="text-sm text-error-foreground mb-8 opacity-80">{t("errorSubtitle")}</p>
        <button
          onClick={() => reset()}
          className="w-full h-10 bg-error hover:opacity-90 text-error-foreground font-medium rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-error focus-visible:ring-offset-2 ring-offset-background"
        >
          {t("tryAgainButton")}
        </button>
      </div>
    </div>
  );
}
