"use client";

import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { PulseButton } from "@/components/ui/PulseButton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PulsePasswordInput } from "@/components/ui/PulsePasswordInput";
import { PulsePasswordStrength } from "@/components/ui/PulsePasswordStrength";
import { cn } from "@/lib/utils";
import { ResetPasswordSchema, type ResetPasswordInput } from "@/lib/validations/auth";

export interface ResetPasswordCardProps extends Omit<HTMLAttributes<HTMLDivElement>, "onSubmit"> {
  email: string;
  otp: string;
  onSubmit: (data: ResetPasswordInput) => Promise<void> | void;
  isLoading?: boolean;
  formError?: string | null;
}

export function ResetPasswordCard({ className, email, otp, onSubmit, isLoading, formError, ...props }: ResetPasswordCardProps) {
  const t = useTranslations("Auth");

  const fieldError = (msg?: string) => msg ? t(msg as any) : undefined;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(ResetPasswordSchema),
    mode: "onChange",
    defaultValues: {
      email,
      otp,
    }
  });

  const passwordValue = watch("password") || "";

  return (
    <div className={cn("w-full max-w-md p-6 sm:p-8 bg-surface rounded-2xl shadow-lg border flex flex-col items-center transition-colors", formError ? "border-error" : "border-border", className)} {...props}>
      <h2 className="text-2xl font-bold text-foreground mb-1 mt-2">{t("resetPasswordTitle")}</h2>
      <p className={cn(
        "text-sm mb-5 text-center transition-colors px-4",
        formError ? "text-error font-medium" : "text-foreground-muted"
      )}>
        {formError || t("resetPasswordSubtitle")}
      </p>

      <form className="w-full space-y-3" onSubmit={handleSubmit(onSubmit)}>
        {/* Hidden inputs to pass validation for full schema */}
        <input type="hidden" {...register("email")} />
        <input type="hidden" {...register("otp")} />

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">{t("newPasswordLabel")}</label>
          <PulsePasswordInput
            placeholder={t("newPasswordPlaceholder")}
            error={fieldError(errors.password?.message)}
            {...register("password")}
          />
          <PulsePasswordStrength password={passwordValue} />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">{t("confirmPasswordLabel")}</label>
          <PulsePasswordInput
            placeholder={t("confirmPasswordPlaceholder")}
            error={fieldError(errors.confirmPassword?.message)}
            {...register("confirmPassword")}
          />
        </div>

        <PulseButton
          type="submit"
          disabled={!isValid || isSubmitting}
          isLoading={isLoading || isSubmitting}
        >
          {t("resetPasswordButton")}
        </PulseButton>
      </form>
    </div>
  );
}
