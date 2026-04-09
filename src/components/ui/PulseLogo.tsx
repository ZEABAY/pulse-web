import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface LogoProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function PulseLogo({ className, ...props }: LogoProps) {
  return (
    <div
      className={cn("bg-primary transition-colors duration-300", className)}
      style={{
        maskImage: `url('/logo.svg')`,
        WebkitMaskImage: `url('/logo.svg')`,
        maskSize: "contain",
        WebkitMaskSize: "contain",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
      }}
      aria-label="Pulse PulseLogo"
      role="img"
      {...props}
    />
  );
}
