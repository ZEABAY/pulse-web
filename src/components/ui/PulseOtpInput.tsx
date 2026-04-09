import React, { useRef } from "react";
import { cn } from "@/lib/utils";

interface OtpInputProps {
  length?: number;
  value?: string;
  onChange?: (val: string) => void;
  error?: string;
  disabled?: boolean;
}

export function PulseOtpInput({ length = 6, value = "", onChange, error, disabled }: OtpInputProps) {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const val = e.target.value;
    if (/[^0-9]/.test(val)) return;

    let newValue = value.split("");
    // Ensure the array has the correct length
    while (newValue.length < length) newValue.push("");
    
    newValue[index] = val.substring(val.length - 1);
    const combined = newValue.join("");
    
    onChange?.(combined);

    if (val && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").slice(0, length).replace(/[^0-9]/g, "");
    if (pastedData) {
      onChange?.(pastedData);
      const focusIndex = Math.min(pastedData.length, length - 1);
      inputsRef.current[focusIndex]?.focus();
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex gap-2 justify-center w-full">
        {Array.from({ length }).map((_, index) => (
          <input
            key={index}
            ref={(el) => {
              inputsRef.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={value[index] || ""}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            disabled={disabled}
            className={cn(
              "flex h-12 w-10 text-center rounded-md border border-border bg-input-bg text-lg text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-border-hover disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
              error && "border-error focus-visible:ring-error"
            )}
          />
        ))}
      </div>
      <div className="min-h-[1.25rem] mt-1 text-center">
        {error && <p className="text-[12px] text-error leading-tight">{error}</p>}
      </div>
    </div>
  );
}
