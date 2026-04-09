"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowLeft } from "lucide-react";
import { PulseButton } from "@/components/ui/PulseButton";
import { cn } from "@/lib/utils";
import { PulseOtpInput } from "@/components/ui/PulseOtpInput";
import { PulseCountdownTimer } from "@/components/ui/PulseCountdownTimer";

export interface OtpCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSubmit"> {
  email?: string;
  length?: number;
  onSubmit: (otp: string) => Promise<void> | void;
  onResend?: () => Promise<void> | void;
  isResending?: boolean;
  isLoading?: boolean;
  formError?: string | null;
  onBack?: () => void;
  titleKey?: string;
  subtitleKey?: string;
}

export function OtpCard({ 
  email = "user@example.com", 
  length = 6, 
  onSubmit, 
  onResend, 
  isResending,
  isLoading, 
  formError, 
  onBack,
  titleKey = "otpTitle",
  subtitleKey = "otpSubtitle",
  className, 
  ...props 
}: OtpCardProps) {
  const t = useTranslations("Auth");
  const [otp, setOtp] = useState("");

  const isOtpComplete = otp.length === length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isOtpComplete && !isLoading) {
      onSubmit(otp);
    }
  };

  return (
    <div className={cn("w-full max-w-md p-6 sm:p-8 bg-surface rounded-2xl shadow-lg border flex flex-col items-center text-center transition-colors", formError ? "border-error" : "border-border", className)} {...props}>
      <h2 className="text-2xl font-bold text-foreground mb-1 mt-2">{t(titleKey)}</h2>
      <p className={cn(
        "text-sm mb-5 transition-colors px-4",
        formError ? "text-error font-medium" : "text-foreground-muted"
      )}>
        {formError || t(subtitleKey, { email, length })}
      </p>

      <form className="w-full space-y-5" onSubmit={handleSubmit}>
        <PulseOtpInput
          length={length}
          value={otp}
          onChange={setOtp}
          disabled={isLoading}
        />

        <PulseButton
          type="submit"
          disabled={!isOtpComplete}
          isLoading={isLoading}
        >
          {t("verifyButton")}
        </PulseButton>
      </form>

      <div className="mt-8 flex flex-col gap-4 items-center justify-center w-full">
        <PulseCountdownTimer
          initialSeconds={120}
          onResend={onResend}
          isResending={isResending}
          resendText={t("resendCode")}
        />

        {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="flex items-center gap-2 text-sm font-medium text-foreground-muted hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {t("backToEmail")}
            </button>
        )}
      </div>
    </div>
  );
}
