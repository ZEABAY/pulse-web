import { useMutation } from "@tanstack/react-query";
import { authApi, LoginResponse, RegisterResponse, VerifyInput } from "../api/auth.api";
import { LoginInput, RegisterInput, ForgotPasswordInput, VerifyResetOtpInput, ResetPasswordInput } from "@/lib/validations/auth";
import { ApiError } from "@/lib/api/client";
import { useRouter } from "@/i18n/routing";

export const useAuthMutations = () => {
    const router = useRouter();
    const loginMutation = useMutation<LoginResponse, ApiError, LoginInput>({
        mutationFn: authApi.login,
        onSuccess: () => {
            router.push("/test");
        },
    });

    const registerMutation = useMutation<RegisterResponse, ApiError, RegisterInput>({
        mutationFn: authApi.register,
    });

    const verifyMutation = useMutation<string, ApiError, VerifyInput>({
        mutationFn: authApi.verify,
    });

    const forgotPasswordMutation = useMutation<string, ApiError, ForgotPasswordInput>({
        mutationFn: authApi.forgotPassword,
    });

    const verifyResetOtpMutation = useMutation<string, ApiError, VerifyResetOtpInput>({
        mutationFn: authApi.verifyResetOtp,
    });

    const resetPasswordMutation = useMutation<string, ApiError, ResetPasswordInput>({
        mutationFn: authApi.resetPassword,
    });

    return {
        loginMutation,
        registerMutation,
        verifyMutation,
        forgotPasswordMutation,
        verifyResetOtpMutation,
        resetPasswordMutation,
    };
};
