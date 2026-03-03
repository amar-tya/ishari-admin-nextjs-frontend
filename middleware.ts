// Next.js hanya membaca file bernama `middleware.ts` dengan export `middleware`.
// Logika autentikasi ada di `src/proxy.ts` — di-wire di sini.
export { proxy as middleware } from './src/proxy';

// config harus didefinisikan langsung di sini, tidak bisa di-re-export
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\..*|api).*)'],
};
