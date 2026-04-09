"use client";

import { useState, forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

export interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const PulsePasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, error, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="w-full">
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            className={cn(
              "flex h-9 w-full rounded-md border border-border bg-input-bg px-2.5 py-1 text-[13px] text-foreground ring-offset-background placeholder:text-foreground-placeholder focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-border-hover disabled:cursor-not-allowed disabled:opacity-50 pr-10 transition-colors",
              error && "border-error ring-error focus-visible:ring-error [&:not(:placeholder-shown)]:border-error [&:not(:placeholder-shown)]:focus-visible:ring-error",
              className
            )}
            ref={ref}
            {...props}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground-muted hover:text-foreground transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
        <div className="min-h-[0.875rem] mt-0.5">
          {error && <p className="text-[10px] text-error leading-tight">{error}</p>}
        </div>
      </div>
    );
  }
);
PulsePasswordInput.displayName = "PulsePasswordInput";
