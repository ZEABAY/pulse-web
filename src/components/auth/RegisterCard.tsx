"use client";

import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { PulseButton } from "@/components/ui/PulseButton";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { PulseTextInput } from "@/components/ui/PulseTextInput";
import { PulsePasswordInput } from "@/components/ui/PulsePasswordInput";
import { PulsePasswordStrength } from "@/components/ui/PulsePasswordStrength";
import { cn } from "@/lib/utils";
import { RegisterSchema, type RegisterInput } from "@/lib/validations/auth";

export interface RegisterCardProps extends Omit<HTMLAttributes<HTMLDivElement>, "onSubmit"> {
    onSubmit: (data: RegisterInput) => Promise<void> | void;
    isLoading?: boolean;
    formError?: string | null;
    onSwitchToLogin?: () => void;
}

export function RegisterCard({ className, onSubmit, isLoading, formError, onSwitchToLogin, ...props }: RegisterCardProps) {
  const t = useTranslations("Auth");

  const fieldError = (msg?: string) => msg ? t(msg as any) : undefined;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(RegisterSchema),
    mode: "onChange",
  });

  const passwordValue = useWatch({
    control,
    name: "password",
    defaultValue: "",
  });

  return (
    <div className={cn("w-full max-w-md p-4 sm:p-5 bg-surface rounded-2xl shadow-lg border flex flex-col items-center transition-colors", formError ? "border-error" : "border-border", className)} {...props}>
      <h2 className="text-xl font-bold text-foreground mb-0.5 mt-1">{t("registerTitle")}</h2>
      <p className={cn(
        "text-xs mb-4 text-center transition-colors px-2",
        formError ? "text-error font-medium" : "text-foreground-muted"
      )}>
        {formError || t("registerSubtitle")}
      </p>

      <form className="w-full space-y-1.5" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-1">
          <label className="text-[11px] font-semibold text-foreground/80 uppercase tracking-tight ml-1">{t("usernameLabel")}</label>
          <PulseTextInput 
            placeholder={t("usernamePlaceholder")} 
            error={fieldError(errors.username?.message)}
            {...register("username")}
          />
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-semibold text-foreground/80 uppercase tracking-tight ml-1">{t("emailLabel")}</label>
          <PulseTextInput 
            type="email"
            placeholder={t("emailPlaceholder")}
            error={fieldError(errors.email?.message)}
            {...register("email")}
          />
        </div>
        
        <div className="space-y-1">
          <label className="text-[11px] font-semibold text-foreground/80 uppercase tracking-tight ml-1">{t("passwordLabel")}</label>
          <PulsePasswordInput 
            placeholder={t("passwordPlaceholder")} 
            error={fieldError(errors.password?.message)}
            {...register("password")}
          />
          <PulsePasswordStrength password={passwordValue} />
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-semibold text-foreground/80 uppercase tracking-tight ml-1">{t("confirmPasswordLabel")}</label>
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
          {t("registerButton")}
        </PulseButton>
      </form>

      <p className="mt-4 text-[13px] text-foreground-muted text-center">
        {t("hasAccount")}{" "}
        <button 
          type="button" 
          onClick={onSwitchToLogin} 
          className="relative font-medium text-primary hover:text-primary-hover transition-colors after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0 hover:after:w-full after:bg-primary after:transition-all after:duration-300"
        >
          {t("loginLink")}
        </button>
      </p>
    </div>
  );
}
