"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { CheckIcon } from "@/components/icons/CheckIcon";

import { useMemo } from "react";

interface PasswordStrengthProps {
  password?: string;
}

export function PulsePasswordStrength({ password = "" }: PasswordStrengthProps) {
  const t = useTranslations("Auth");

  const { requirements, score } = useMemo(() => {
    const hasMinLength = password.length >= 8;
    const hasUppercase = /[A-ZÇĞİÖŞÜ]/.test(password);
    const hasLowercase = /[a-zçğıöşü]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[^A-Za-z0-9ÇĞİÖŞÜçğıöşü]/.test(password);

    let score = 0;
    if (hasMinLength) score += 1;
    if (hasLowercase) score += 1;
    if (hasUppercase) score += 1;
    if (hasNumber) score += 1;
    if (hasSpecial) score += 1;

    return {
      requirements: [
        { met: hasMinLength },
        { met: hasLowercase },
        { met: hasUppercase },
        { met: hasNumber },
        { met: hasSpecial },
      ],
      score,
    };
  }, [password]);

  // Time to Crack Estimation Logic
  const getTimeToCrack = () => {
    if (password.length === 0) return "";
    if (score <= 1) return t("crackInstant");
    if (score === 2) return t("crackMinutes");
    if (score === 3) return t("crackDays");
    if (score === 4) return t("crackYears");
    return t("crackCenturies");
  };

  const strengthColors = [
    "var(--surface-disabled)",
    "var(--error)",
    "var(--warning)",
    "var(--accent)",
    "var(--primary)",
    "var(--success)"
  ];

  const strengthKeys = [
    "strengthVeryWeak",
    "strengthVeryWeak",
    "strengthWeak",
    "strengthFair",
    "strengthGood",
    "strengthStrong"
  ];

  return (
    <div className="mt-1.5 space-y-1.5 w-full">
      {/* Strength Bar & Info */}
      <div className="space-y-1">
        <div className="flex justify-between items-end h-7">
          <div className="flex flex-col justify-end">
            <span className="text-[10px] uppercase tracking-wider font-bold text-foreground-muted opacity-70 leading-none mb-1">
              {t("passwordLabel")}
            </span>
            <div className="h-4">
              <AnimatePresence mode="wait">
                {password.length > 0 && (
                  <motion.span
                    key={getTimeToCrack()}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-[10px] font-medium text-foreground-muted/60 block"
                  >
                    {getTimeToCrack()}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>
          <div className="h-4 flex items-end justify-end">
            <AnimatePresence mode="wait">
              {password.length > 0 && (
                <motion.span
                  key={score}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  style={{ color: strengthColors[score] }}
                  className="text-[11px] font-bold"
                >
                  {t(strengthKeys[score] as any)}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Dynamic Multi-segment Bar */}
        <div className="flex gap-1.5 h-1.5 w-full">
          {[1, 2, 3, 4, 5].map((tier) => (
            <motion.div
              key={tier}
              initial={false}
              animate={{
                backgroundColor: score >= tier ? strengthColors[score] : "rgba(var(--surface-disabled-rgb), 0.2)",
                scaleY: score >= tier ? 1 : 0.8,
                opacity: score >= tier ? 1 : 0.3
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
                delay: tier * 0.05 // Staggered fill effect
              }}
              className="flex-1 rounded-full shadow-sm origin-bottom"
            />
          ))}
        </div>
      </div>

      {/* Checklist */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 pt-1.5 border-t border-border/10">
        {requirements.map((req, idx) => {
          const labels = [t("reqMinLength"), t("reqLowercase"), t("reqUppercase"), t("reqNumber"), t("reqSpecial")];
          return (
          <div key={idx} className="flex items-center gap-2 h-5">
            <motion.div
              initial={false}
              animate={{
                backgroundColor: req.met ? "var(--success)" : "color-mix(in srgb, var(--success), transparent 100%)",
                borderColor: req.met ? "var(--success)" : "var(--border)",
                scale: req.met ? [1, 1.05, 1] : 1
              }}
              className="w-3 h-3 rounded-full border flex items-center justify-center transition-none"
            >
              {req.met && <CheckIcon className="w-2 h-2 text-white" />}
            </motion.div>
            <motion.span
              animate={{
                color: req.met ? "var(--foreground)" : "var(--foreground-muted)",
                fontWeight: req.met ? 600 : 400
              }}
              className="text-[10px]"
            >
              {labels[idx]}
            </motion.span>
          </div>
          );
        })}
      </div>
    </div>
  );
}
