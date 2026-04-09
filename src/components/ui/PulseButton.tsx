import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { PulseSpinner } from "./PulseSpinner";

export interface PulseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  children: ReactNode;
}

export function PulseButton({ 
  className, 
  isLoading, 
  disabled, 
  children, 
  ...props 
}: PulseButtonProps) {
  return (
    <button
      disabled={disabled || isLoading}
      className={cn(
        "flex items-center justify-center gap-2",
        "w-full h-10 mt-4",
        "bg-primary text-primary-foreground font-medium rounded-md",
        "hover:bg-primary-hover active:scale-[0.98]",
        "transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background",
        "disabled:bg-surface-disabled disabled:text-foreground-disabled disabled:cursor-default disabled:hover:bg-surface-disabled disabled:shadow-none disabled:active:scale-100",
        className
      )}
      {...props}
    >
      {isLoading ? <PulseSpinner /> : null}
      {children}
    </button>
  );
}
