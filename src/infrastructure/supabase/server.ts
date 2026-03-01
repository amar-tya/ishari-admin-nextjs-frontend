import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

/**
 * Supabase Server Client
 *
 * Dipakai di Server Components, Route Handlers, dan Middleware.
 * Membaca/menulis cookies dari Next.js untuk session management.
 */
export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // setAll dipanggil dari Server Component, bisa diabaikan
            // jika punya middleware untuk refresh session
          }
        },
      },
    }
  );
}
