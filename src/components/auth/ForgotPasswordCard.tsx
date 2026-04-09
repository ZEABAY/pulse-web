"use client";

import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { ArrowLeft } from "lucide-react";
import { PulseButton } from "@/components/ui/PulseButton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PulseTextInput } from "@/components/ui/PulseTextInput";
import { cn } from "@/lib/utils";
import { ForgotPasswordSchema, type ForgotPasswordInput } from "@/lib/validations/auth";

export interface ForgotPasswordCardProps extends Omit<HTMLAttributes<HTMLDivElement>, "onSubmit"> {
  onSubmit: (data: ForgotPasswordInput) => Promise<void> | void;
  isLoading?: boolean;
  formError?: string | null;
  onBackToLogin?: () => void;
}

export function ForgotPasswordCard({ className, onSubmit, isLoading, formError, onBackToLogin, ...props }: ForgotPasswordCardProps) {
  const t = useTranslations("Auth");

  const fieldError = (msg?: string) => msg ? t(msg as any) : undefined;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(ForgotPasswordSchema),
    mode: "onChange",
  });

  return (
    <div className={cn("w-full max-w-md p-6 sm:p-8 bg-surface rounded-2xl shadow-lg border flex flex-col items-center transition-colors", formError ? "border-error" : "border-border", className)} {...props}>
      <h2 className="text-2xl font-bold text-foreground mb-1 mt-2">{t("forgotPasswordTitle")}</h2>
      <p className={cn(
        "text-sm mb-5 text-center transition-colors px-4",
        formError ? "text-error font-medium" : "text-foreground-muted"
      )}>
        {formError || t("forgotPasswordSubtitle")}
      </p>

      <form className="w-full space-y-3" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">{t("emailLabel")}</label>
          <PulseTextInput
            type="email"
            placeholder={t("emailPlaceholder")}
            error={fieldError(errors.email?.message)}
            {...register("email")}
          />
        </div>

        <PulseButton
          type="submit"
          disabled={!isValid || isSubmitting}
          isLoading={isLoading || isSubmitting}
        >
          {t("sendCodeButton")}
        </PulseButton>
      </form>

      <div className="mt-8 flex items-center justify-center">
        <button
          type="button"
          onClick={onBackToLogin}
          className="flex items-center gap-2 text-sm font-medium text-foreground-muted hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {t("backToLogin")}
        </button>
      </div>
    </div>
  );
}
