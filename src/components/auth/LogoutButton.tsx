"use client";


import { LogOut } from "lucide-react";
import { authApi } from "@/modules/auth/api/auth.api";
import { clearTokens } from "@/lib/auth/token";
import { useState } from "react";
import { PulseSpinner } from "@/components/ui/PulseSpinner";
import { useRouter } from "@/i18n/routing";

export function LogoutButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await authApi.logout();
    } catch (e) {
      console.error("Logout API failed, but clearing local session anyway.", e);
    } finally {
      await clearTokens();
      router.push("/login");
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      title="Logout"
      className="inline-flex items-center justify-center rounded-md w-10 h-10 text-sm font-medium transition-colors hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ring-offset-background"
    >
      {isLoading ? <PulseSpinner className="w-5 h-5 text-error" /> : <LogOut className="w-5 h-5 text-foreground hover:text-error transition-colors" />}
    </button>
  );
}
