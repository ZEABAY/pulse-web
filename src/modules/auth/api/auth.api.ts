import { apiPost } from "@/lib/api/client";
import { LoginInput, RegisterInput, ForgotPasswordInput, VerifyResetOtpInput, ResetPasswordInput } from "@/lib/validations/auth";
import { setTokens } from "@/lib/auth/token";

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  refreshExpiresIn: number;
}

export type RegisterResponse = string;

export interface VerifyInput {
  email: string;
  token: string;
}

export const authApi = {
  login: async (data: LoginInput): Promise<LoginResponse> => {
    const res = await apiPost<Omit<LoginInput, 'emailOrUsername'> & { usernameOrEmail: string }, LoginResponse>("/api/v1/auth/login", {
      usernameOrEmail: data.emailOrUsername,
      password: data.password,
    });

    if (res?.accessToken) {
      setTokens(res.accessToken, res.refreshToken, res.expiresIn, res.refreshExpiresIn, data.rememberMe);
    }
    return res;
  },

  register: async (data: RegisterInput): Promise<RegisterResponse> => {
    const { confirmPassword, ...payload } = data;
    const res = await apiPost<Omit<RegisterInput, 'confirmPassword'>, RegisterResponse>("/api/v1/auth/register", {
      username: payload.username,
      email: payload.email,
      password: payload.password,
    });
    return res;
  },

  verify: async (data: VerifyInput): Promise<string> => {
    const res = await apiPost<VerifyInput, string>("/api/v1/auth/verify", data);
    return res;
  },

  forgotPassword: async (data: ForgotPasswordInput): Promise<string> => {
    const res = await apiPost<ForgotPasswordInput, string>("/api/v1/auth/forgot-password", data);
    return res;
  },

  verifyResetOtp: async (data: VerifyResetOtpInput): Promise<string> => {
    const res = await apiPost<VerifyResetOtpInput, string>("/api/v1/auth/verify-reset-otp", data);
    return res;
  },

  resetPassword: async (data: ResetPasswordInput): Promise<string> => {
    const { confirmPassword, ...payload } = data;
    const res = await apiPost<Omit<ResetPasswordInput, 'confirmPassword'>, string>("/api/v1/auth/reset-password", payload);
    return res;
  },

  logout: async (): Promise<void> => {
    await apiPost<null, void>("/api/v1/auth/logout", null);
  },
};
