'use client';

import { useState, useEffect } from 'react';
import { User } from '@/core/entities';
import { supabaseBrowserClient } from '@/infrastructure/supabase';

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
    let mounted = true;

    async function fetchUser() {
      // Get the current session user directly from Supabase
      const {
        data: { user: supabaseUser },
        error,
      } = await supabaseBrowserClient.auth.getUser();

      if (!mounted) return;

      if (error || !supabaseUser) {
        setUser(null);
        return;
      }

      // Map Supabase User to our App User entity
      const appUser: User = {
        id: supabaseUser.id,
        email: supabaseUser.email ?? '',
        username:
          supabaseUser.user_metadata?.username ?? supabaseUser.email ?? '',
        role: supabaseUser.user_metadata?.role ?? 'user',
        is_active: true,
        last_login_at: supabaseUser.last_sign_in_at ?? new Date().toISOString(),
        created_at: supabaseUser.created_at ?? '',
        updated_at: supabaseUser.updated_at ?? '',
      };

      setUser(appUser);
    }

    fetchUser();

    // Set up auth state listener to update user when auth state changes (e.g. login/logout)
    const {
      data: { subscription },
    } = supabaseBrowserClient.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;

      if (session?.user) {
        const supabaseUser = session.user;
        setUser({
          id: supabaseUser.id,
          email: supabaseUser.email ?? '',
          username:
            supabaseUser.user_metadata?.username ?? supabaseUser.email ?? '',
          role: supabaseUser.user_metadata?.role ?? 'user',
          is_active: true,
          last_login_at:
            supabaseUser.last_sign_in_at ?? new Date().toISOString(),
          created_at: supabaseUser.created_at ?? '',
          updated_at: supabaseUser.updated_at ?? '',
        });
      } else {
        setUser(null);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return user;
}
