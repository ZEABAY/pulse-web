"use client";

import { Toaster } from "sonner";
import { useTheme } from "next-themes";

export function ToasterProvider() {
  const { theme } = useTheme();

  return (
    <Toaster
      position="bottom-right"
      richColors
      theme={theme as "light" | "dark" | "system"}
      closeButton
      toastOptions={{
        style: {
          borderRadius: "12px",
          border: "1px solid var(--border)",
        },
        className: "pulse-toast",
      }}
    />
  );
}
