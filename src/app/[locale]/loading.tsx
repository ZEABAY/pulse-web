import { PulseSpinner } from "@/components/ui/PulseSpinner";

export default function Loading() {
  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center">
      <div className="flex flex-col items-center gap-4 text-primary">
        <PulseSpinner className="w-12 h-12" />
      </div>
    </main>
  );
}
