import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createSupabaseServerClient } from '@/infrastructure/supabase/server';

/**
 * OAuth Callback Route Handler
 *
 * Menerima code dari Supabase setelah Google OAuth consent.
 * Exchange code menjadi session, lalu redirect ke dashboard.
 */
export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const next = requestUrl.searchParams.get('next') ?? '/dashboard';
  const origin = requestUrl.origin;

  if (code) {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Redirect ke halaman yang dituju setelah login berhasil
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Jika error atau tidak ada code, redirect ke login dengan error message
  return NextResponse.redirect(
    `${origin}/login?error=Gagal+login+dengan+Google`
  );
}
