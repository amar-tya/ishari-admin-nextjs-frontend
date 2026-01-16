"use client";

import { useState, useEffect } from "react";
import { User } from "@/core/entities";
import { AuthService } from "@/infrastructure/services";

const authService = new AuthService();

/**
 * useUser Hook
 *
 * Hook untuk mendapatkan user data dari localStorage.
 * Handles SSR/hydration dengan benar - mulai dengan null,
 * lalu update setelah component mount di client.
 */
export function useUser(): User | null {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Fetch user data after component mounts (client-side only)
    // Using setTimeout to defer the state update and avoid React's cascading render warning
    const timeoutId = setTimeout(() => {
      setUser(authService.getUser());
    }, 0);

    return () => clearTimeout(timeoutId);
  }, []);

  return user;
}
