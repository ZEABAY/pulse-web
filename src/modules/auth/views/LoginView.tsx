"use client";

import { motion, AnimatePresence } from "framer-motion";
import { LoginCard } from "@/components/auth/LoginCard";
import { RegisterCard } from "@/components/auth/RegisterCard";
import { OtpCard } from "@/components/auth/OtpCard";
import { ForgotPasswordCard } from "@/components/auth/ForgotPasswordCard";
import { ResetPasswordCard } from "@/components/auth/ResetPasswordCard";
import { AnimatedAuthCard } from "@/components/auth/AnimatedAuthCard";
import { PulseLogo } from "@/components/ui/PulseLogo";
import { useAuthFlow } from "../hooks/useAuthFlow";

interface LoginViewProps {
    isResetSuccess?: boolean;
}

export function LoginView({ isResetSuccess }: LoginViewProps) {
    const {
        mode, isInitialLoad, formError,
        verifyEmail, resetEmail, resetOtp, mutations, switchMode,
        handleLogin, handleRegister, handleVerify,
        handleForgotPassword, handleVerifyReset, handleResetPassword,
    } = useAuthFlow({ isResetSuccess });

    return (
        <div className={`flex w-full h-screen overflow-hidden relative transition-colors duration-500 ${isInitialLoad ? "bg-surface" : "bg-background"}`}>
            {/* Sol Panel: Logo + Intro Animasyonu */}
            <motion.div
                layout
                initial={false}
                animate={{ width: isInitialLoad ? "100%" : "50%", borderRightWidth: isInitialLoad ? 0 : 1 }}
                transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
                className="hidden lg:flex flex-col items-center justify-center bg-surface border-border relative overflow-hidden z-20"
            >
                <div className="absolute inset-0 bg-primary/2 dark:bg-primary/5" />
                <motion.div
                    layout
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: isInitialLoad ? 1.2 : 1, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative z-10"
                >
                    <motion.div
                        animate={{ scale: isInitialLoad ? 1 : [1, 1.08, 1] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <PulseLogo className="w-60 h-60 text-primary" />
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Sağ Panel: Auth Kartları */}
            <AnimatePresence>
                {!isInitialLoad && (
                    <motion.div
                        key="right-panel"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex-1 overflow-y-auto bg-background z-10 flex flex-col"
                    >
                        <div className="flex-1 w-full flex flex-col items-center justify-center p-4 sm:p-8 lg:p-12 min-h-full">
                            <div className="w-full max-w-md relative flex flex-col justify-center">
                                {/* Mobil Logo */}
                                <div className="lg:hidden flex justify-center mb-6">
                                    <motion.div
                                        animate={{ scale: [1, 1.08, 1] }}
                                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    >
                                        <PulseLogo className="w-20 h-20 text-primary" />
                                    </motion.div>
                                </div>

                                <AnimatePresence mode="wait">
                                    {mode === "login" && (
                                        <AnimatedAuthCard motionKey="login">
                                            <LoginCard
                                                onSubmit={handleLogin}
                                                isLoading={mutations.loginMutation.isPending}
                                                formError={formError}
                                                onSwitchToRegister={() => switchMode("register")}
                                                onSwitchToForgotPassword={() => switchMode("forgot_password")}
                                            />
                                        </AnimatedAuthCard>
                                    )}

                                    {mode === "register" && (
                                        <AnimatedAuthCard motionKey="register">
                                            <RegisterCard
                                                onSubmit={handleRegister}
                                                isLoading={mutations.registerMutation.isPending}
                                                formError={formError}
                                                onSwitchToLogin={() => switchMode("login")}
                                            />
                                        </AnimatedAuthCard>
                                    )}

                                    {mode === "verify" && (
                                        <AnimatedAuthCard motionKey="verify">
                                            <OtpCard
                                                email={verifyEmail}
                                                onSubmit={handleVerify}
                                                isLoading={mutations.verifyMutation.isPending}
                                                formError={formError}
                                            />
                                        </AnimatedAuthCard>
                                    )}

                                    {mode === "forgot_password" && (
                                        <AnimatedAuthCard motionKey="forgot_password">
                                            <ForgotPasswordCard
                                                onSubmit={handleForgotPassword}
                                                isLoading={mutations.forgotPasswordMutation.isPending}
                                                formError={formError}
                                                onBackToLogin={() => switchMode("login")}
                                            />
                                        </AnimatedAuthCard>
                                    )}

                                    {mode === "verify_reset" && (
                                        <AnimatedAuthCard motionKey="verify_reset">
                                            <OtpCard
                                                email={resetEmail}
                                                onSubmit={handleVerifyReset}
                                                isLoading={mutations.verifyResetOtpMutation.isPending}
                                                formError={formError}
                                                titleKey="verifyResetOtpTitle"
                                                subtitleKey="verifyResetOtpSubtitle"
                                                onBack={() => switchMode("forgot_password")}
                                            />
                                        </AnimatedAuthCard>
                                    )}

                                    {mode === "reset_password" && (
                                        <AnimatedAuthCard motionKey="reset_password">
                                            <ResetPasswordCard
                                                email={resetEmail}
                                                otp={resetOtp}
                                                onSubmit={handleResetPassword}
                                                isLoading={mutations.resetPasswordMutation.isPending}
                                                formError={formError}
                                            />
                                        </AnimatedAuthCard>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
