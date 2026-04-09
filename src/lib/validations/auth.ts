import { z } from "zod";

/**
 * Shared validation rules for consistency
 */
export const passwordRules = z
  .string()
  .min(8, "passwordMinLength")
  .max(100, "passwordMaxLength")
  .regex(/[A-ZÇĞİÖŞÜ]/, "passwordUppercase")
  .regex(/[a-zçğıöşü]/, "passwordLowercase")
  .regex(/[0-9]/, "passwordNumber")
  .regex(/[^A-Za-z0-9ÇĞİÖŞÜçğıöşü]/, "passwordSpecial");

/**
 * Login Form Validation Schema
 */
export const LoginSchema = z.object({
  emailOrUsername: z
    .string()
    .min(3, "idMinLength")
    .max(254, "idMaxLength"),
  password: z.string().min(1, "passwordRequired"),
  rememberMe: z.boolean().optional(),
});

/**
 * Register Form Validation Schema
 */
export const RegisterSchema = z.object({
  username: z
    .string()
    .min(3, "usernameMinLength")
    .max(30, "usernameMaxLength")
    .regex(/^(?![.])[a-zA-Z0-9ÇĞİÖŞÜçğıöşü_]+(?:\.[a-zA-Z0-9ÇĞİÖŞÜçğıöşü_]+)*$/, "usernameFormat"),
  email: z.string().email("emailInvalid").max(254, "emailMaxLength"),
  password: passwordRules,
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "passwordsMismatch",
  path: ["confirmPassword"],
});

export const ForgotPasswordSchema = z.object({
  email: z.string().email("emailInvalid").max(254, "emailMaxLength"),
});

export const VerifyResetOtpSchema = z.object({
  email: z.string().email("emailInvalid").max(254, "emailMaxLength"),
  otp: z.string().length(6, "tokenInvalid").regex(/^\d+$/, "tokenInvalid"),
});

export const ResetPasswordSchema = z.object({
  email: z.string().email("emailInvalid").max(254, "emailMaxLength"),
  otp: z.string().length(6, "tokenInvalid").regex(/^\d+$/, "tokenInvalid"),
  password: passwordRules,
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "passwordsMismatch",
  path: ["confirmPassword"],
});

export type LoginInput = z.infer<typeof LoginSchema>;
export type RegisterInput = z.infer<typeof RegisterSchema>;
export type ForgotPasswordInput = z.infer<typeof ForgotPasswordSchema>;
export type VerifyResetOtpInput = z.infer<typeof VerifyResetOtpSchema>;
export type ResetPasswordInput = z.infer<typeof ResetPasswordSchema>;
