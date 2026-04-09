import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface CountdownTimerProps {
  initialSeconds: number;
  onComplete?: () => void;
  onResend?: () => void;
  isResending?: boolean;
  className?: string;
  resendText?: string;
}

export function PulseCountdownTimer({
  initialSeconds,
  onComplete,
  onResend,
  isResending,
  className,
  resendText = "Kodu Yeniden Gönder",
}: CountdownTimerProps) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const isCompleted = seconds === 0;

  useEffect(() => {
    if (seconds > 0) {
      const timer = setTimeout(() => setSeconds(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (seconds === 0 && onComplete) {
      onComplete();
    }
  }, [seconds, onComplete]);

  const handleResend = () => {
    if (onResend) {
      onResend();
      setSeconds(initialSeconds);
    }
  };

  const formatTime = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  if (isCompleted) {
    return (
      <button
        type="button"
        onClick={handleResend}
        disabled={!onResend || isResending}
        className={cn(
          "text-sm font-medium text-foreground hover:underline disabled:opacity-50 disabled:cursor-not-allowed",
          className
        )}
      >
        {isResending ? "..." : resendText}
      </button>
    );
  }

  return (
    <div className={cn("text-sm text-foreground-placeholder font-mono", className)}>
      {formatTime(seconds)}
    </div>
  );
}
