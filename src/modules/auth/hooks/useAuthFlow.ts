"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useAuthMutations } from "./useAuthMutations";
import { useApiErrors } from "@/lib/hooks/useApiErrors";
import { toast } from "sonner";
import type { LoginInput, RegisterInput, ForgotPasswordInput, ResetPasswordInput } from "@/lib/validations/auth";

export type AuthMode = "login" | "register" | "verify" | "forgot_password" | "verify_reset" | "reset_password";

interface UseAuthFlowOptions {
    isResetSuccess?: boolean;
}

/**
 * Manages the entire auth page state machine:
 *   mode transitions, form handlers, error state, and intro animation.
 *
 * Keeps LoginView as a pure layout/composition component.
 */
export function useAuthFlow({ isResetSuccess }: UseAuthFlowOptions = {}) {
    // ── State ──────────────────────────────────────────────────────────
    const [mode, setMode] = useState<AuthMode>("login");
    const [verifyEmail, setVerifyEmail] = useState("");
    const [resetEmail, setResetEmail] = useState("");
    const [resetOtp, setResetOtp] = useState("");
    const [formError, setFormError] = useState<string | null>(null);
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    // ── Hooks ──────────────────────────────────────────────────────────
    const t = useTranslations("Auth");
    const { resolveApiError } = useApiErrors();
    const mutations = useAuthMutations();

    // ── Effects ────────────────────────────────────────────────────────
    useEffect(() => {
        const timer = setTimeout(() => setIsInitialLoad(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (isResetSuccess) {
            toast.success(t("resetSuccess"), {
                description: t("resetSuccessDesc"),
                duration: 5000,
            });
            window.history.replaceState(null, "", window.location.pathname);
        }
    }, [isResetSuccess, t]);

    // ── Helpers ────────────────────────────────────────────────────────
    const clearErrors = () => {
        setFormError(null);
    };

    const switchMode = (next: AuthMode) => {
        clearErrors();
        setMode(next);
    };

    // ── Handlers ───────────────────────────────────────────────────────
    const handleLogin = (data: LoginInput) => {
        clearErrors();
        mutations.loginMutation.mutate(data, {
            onError: (error) => {
                // Whitelist: only these errors get their specific i18n message (actionable for the user)
                const actionableKeys = ["error.email_not_verified", "error.account_disabled"];
                const key = error?.error?.messageKey;

                setFormError(key && actionableKeys.includes(key)
                    ? resolveApiError(error, t("loginError"))
                    : t("loginError")
                );
            },
        });
    };

    const handleRegister = (data: RegisterInput) => {
        clearErrors();
        mutations.registerMutation.mutate(data, {
            onSuccess: () => {
                setVerifyEmail(data.email);
                switchMode("verify");
            },
            onError: (error) => {
                setFormError(resolveApiError(error, t("registerError")));
            },
        });
    };

    const handleVerify = (otp: string) => {
        setFormError(null);
        if (!verifyEmail) return;
        mutations.verifyMutation.mutate({ email: verifyEmail, token: otp }, {
            onSuccess: () => {
                toast.success(t("verifySuccess"));
                switchMode("login");
            },
            onError: (error) => {
                setFormError(resolveApiError(error, t("verifyError")));
            },
        });
    };

    const handleForgotPassword = (data: ForgotPasswordInput) => {
        clearErrors();
        mutations.forgotPasswordMutation.mutate(data, {
            onSuccess: () => {
                setResetEmail(data.email);
                switchMode("verify_reset");
            },
            onError: (error) => {
                setFormError(resolveApiError(error, t("forgotPasswordError")));
            },
        });
    };

    const handleVerifyReset = (otp: string) => {
        setFormError(null);
        if (!resetEmail) return;
        mutations.verifyResetOtpMutation.mutate({ email: resetEmail, otp }, {
            onSuccess: () => {
                setResetOtp(otp);
                switchMode("reset_password");
            },
            onError: (error) => {
                setFormError(resolveApiError(error, t("verifyError")));
            },
        });
    };

    const handleResetPassword = (data: ResetPasswordInput) => {
        clearErrors();
        mutations.resetPasswordMutation.mutate(data, {
            onSuccess: () => {
                toast.success(t("resetSuccess"), {
                    description: t("resetSuccessDesc"),
                    duration: 5000,
                });
                switchMode("login");
            },
            onError: (error) => {
                setFormError(resolveApiError(error, t("resetPasswordError")));
            },
        });
    };

    // ── Return ─────────────────────────────────────────────────────────
    return {
        // State
        mode,
        isInitialLoad,
        formError,
        verifyEmail,
        resetEmail,
        resetOtp,

        // Mutations (for isPending checks)
        mutations,

        // Actions
        switchMode,
        handleLogin,
        handleRegister,
        handleVerify,
        handleForgotPassword,
        handleVerifyReset,
        handleResetPassword,
    };
}
