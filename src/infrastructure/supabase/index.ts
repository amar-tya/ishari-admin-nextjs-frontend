// CATATAN: createSupabaseServerClient TIDAK di-export dari sini
// karena menggunakan 'next/headers' yang hanya tersedia di Server Components.
// Import langsung dari: @/infrastructure/supabase/server

export { createSupabaseBrowserClient, supabaseBrowserClient } from './client';
