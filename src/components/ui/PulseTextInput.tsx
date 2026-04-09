import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const PulseTextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          type={props.type || "text"}
          className={cn(
            "flex h-9 w-full rounded-md border border-border bg-input-bg px-2.5 py-1 text-[13px] text-foreground ring-offset-background placeholder:text-foreground-placeholder focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-border-hover disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
            error && "border-error ring-error focus-visible:ring-error [&:not(:placeholder-shown)]:border-error [&:not(:placeholder-shown)]:focus-visible:ring-error",
            className
          )}
          ref={ref}
          {...props}
        />
        <div className="min-h-[0.875rem] mt-0.5">
          {error && <p className="text-[10px] text-error leading-tight">{error}</p>}
        </div>
      </div>
    );
  }
);
PulseTextInput.displayName = "PulseTextInput";
