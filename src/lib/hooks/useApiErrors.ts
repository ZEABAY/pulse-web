"use client";

import { useTranslations } from "next-intl";

/**
 * Centralised hook for resolving backend API error messages via i18n.
 *
 * Backend returns two kinds of keys (see docs/api/error-codes.md):
 *   • System errors  → "error.invalid_credentials", "error.token_expired" …
 *   • Validation errors → "validation.password.Size", "validation.email.Email" …
 *
 * Both live under the "ApiErrors" i18n namespace so any module
 * (auth, profile, timeline …) can resolve them without duplication.
 */
export function useApiErrors() {
    const tErrors = useTranslations("ApiErrors");

    /**
     * Resolve a backend API error response into a user-facing string.
     *
     * @param error      — the raw error object thrown by apiPost / apiGet
     * @param fallback   — a static fallback string to show when messageKey is missing
     */
    const resolveApiError = (error: any, fallback: string): string => {
        // Priority 1: structured ErrorResponse messageKey
        const messageKey: string | undefined = error?.error?.messageKey;
        if (messageKey) {
            try {
                return tErrors(messageKey as any);
            } catch {
                /* key not found in i18n – fall through */
            }
        }
        // Priority 2: ApiError.message may itself be a valid messageKey (e.g. "error.token_expired")
        const rawMessage: string | undefined = error?.message;
        if (rawMessage?.startsWith("error.")) {
            try {
                return tErrors(rawMessage as any);
            } catch {
                /* key not found in i18n – fall through */
            }
        }
        return fallback;
    };

    return { resolveApiError };
}
