"use client";

import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { PulseButton } from "@/components/ui/PulseButton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PulseTextInput } from "@/components/ui/PulseTextInput";
import { PulsePasswordInput } from "@/components/ui/PulsePasswordInput";
import { cn } from "@/lib/utils";
import { LoginSchema, type LoginInput } from "@/lib/validations/auth";

export interface LoginCardProps extends Omit<HTMLAttributes<HTMLDivElement>, "onSubmit"> {
  onSubmit: (data: LoginInput) => Promise<void> | void;
  isLoading?: boolean;
  formError?: string | null;
  onSwitchToRegister?: () => void;
  onSwitchToForgotPassword?: () => void;
}

export function LoginCard({ className, onSubmit, isLoading, formError, onSwitchToRegister, onSwitchToForgotPassword, ...props }: LoginCardProps) {
  const t = useTranslations("Auth");

  const fieldError = (msg?: string) => msg ? t(msg as any) : undefined;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),
    mode: "onChange",
  });

  return (
    <div className={cn("w-full max-w-md p-6 sm:p-8 bg-surface rounded-2xl shadow-lg border flex flex-col items-center transition-colors", formError ? "border-error" : "border-border", className)} {...props}>
      <h2 className="text-2xl font-bold text-foreground mb-1 mt-2">{t("loginTitle")}</h2>
      <p className={cn(
        "text-sm mb-5 text-center transition-colors px-4",
        formError ? "text-error font-medium" : "text-foreground-muted"
      )}>
        {formError || t("loginSubtitle")}
      </p>

      <form className="w-full space-y-3" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">{t("emailOrUserLabel")}</label>
          <PulseTextInput
            placeholder={t("emailOrUserPlaceholder")}
            error={fieldError(errors.emailOrUsername?.message)}
            {...register("emailOrUsername")}
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">{t("passwordLabel")}</label>
          <PulsePasswordInput
            placeholder={t("passwordPlaceholder")}
            error={fieldError(errors.password?.message)}
            {...register("password")}
          />
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="rounded border-border text-primary focus:ring-primary h-4 w-4" {...register("rememberMe")} />
            <span className="text-foreground-muted">{t("rememberMe")}</span>
          </label>
          <button 
            type="button" 
            onClick={onSwitchToForgotPassword}
            className="font-medium text-primary hover:text-primary-hover transition-colors"
          >
            {t("forgotPassword")}
          </button>
        </div>

        <PulseButton
          type="submit"
          disabled={!isValid || isSubmitting}
          isLoading={isLoading || isSubmitting}
        >
          {t("loginButton")}
        </PulseButton>
      </form>

      <p className="mt-8 text-sm text-foreground-muted">
        {t("noAccount")}{" "}
        <button
          type="button"
          onClick={onSwitchToRegister}
          className="relative font-medium text-primary hover:text-primary-hover transition-colors after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0 hover:after:w-full after:bg-primary after:transition-all after:duration-300"
        >
          {t("registerLink")}
        </button>
      </p>
    </div>
  );
}
