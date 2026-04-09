import { cn } from "@/lib/utils";
import { PulseSkeleton } from "@/components/ui/PulseSkeleton";

interface AuthCardSkeletonProps {
  className?: string;
}

export function AuthCardSkeleton({ className }: AuthCardSkeletonProps) {
  return (
    <div className={cn("p-8 bg-surface border border-border rounded-xl flex flex-col items-center gap-4 w-full max-w-md", className)}>
      {/* Logo Skeleton */}
      <PulseSkeleton className="w-16 h-16 rounded-2xl" />
      
      {/* Title & Subtitle */}
      <div className="space-y-2 w-full flex flex-col items-center">
        <PulseSkeleton className="h-8 w-48" />
        <PulseSkeleton className="h-4 w-64" />
      </div>

      {/* Inputs */}
      <div className="w-full space-y-4 pt-4">
        <div className="space-y-2">
          <PulseSkeleton className="h-4 w-20" />
          <PulseSkeleton className="h-10 w-full" />
        </div>
        <div className="space-y-2">
          <PulseSkeleton className="h-4 w-20" />
          <PulseSkeleton className="h-10 w-full" />
        </div>
      </div>

      {/* Button */}
      <PulseSkeleton className="h-10 w-full mt-4" />

      {/* Footer link */}
      <PulseSkeleton className="h-4 w-32 mt-2" />
    </div>
  );
}
