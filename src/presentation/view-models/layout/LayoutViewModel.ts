"use client";

import { useState, useCallback } from "react";
import { useAuth } from "@/presentation/hooks";
import type { LayoutViewModel } from "./LayoutViewModel.types";

// Re-export types
export type {
  LayoutViewModel,
  LayoutViewModelState,
  LayoutViewModelActions,
} from "./LayoutViewModel.types";

/**
 * useLayoutViewModel
 *
 * Presenter/ViewModel untuk Layout components (Sidebar, Navbar).
 * Menggunakan useAuth hook untuk logout action.
 */
export function useLayoutViewModel(): LayoutViewModel {
  const { logout } = useAuth();

  // State
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Actions
  const handleLogout = useCallback(async () => {
    setIsLoggingOut(true);
    try {
      await logout();
    } finally {
      setIsLoggingOut(false);
    }
  }, [logout]);

  return {
    isLoggingOut,
    handleLogout,
  };
}
