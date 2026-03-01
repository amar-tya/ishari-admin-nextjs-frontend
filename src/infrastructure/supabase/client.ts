import { createBrowserClient } from '@supabase/ssr';

/**
 * Supabase Browser Client
 *
 * Dipakai di Client Components ('use client').
 * Menggunakan @supabase/ssr agar session otomatis di-sync via cookies.
 */
export function createSupabaseBrowserClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// Singleton instance untuk penggunaan di client side
export const supabaseBrowserClient = createSupabaseBrowserClient();
