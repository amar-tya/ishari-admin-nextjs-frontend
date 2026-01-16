import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

/**
 * POST /api/auth/logout
 *
 * Dedicated logout endpoint yang:
 * 1. Memanggil backend untuk invalidate session
 * 2. Menghapus cookies
 * 3. Return success meskipun backend gagal (graceful degradation)
 */
export async function POST() {
  // Validasi API_BASE_URL
  if (!API_BASE_URL) {
    console.error("NEXT_PUBLIC_API_BASE_URL is not configured");
    return NextResponse.json(
      { status: "error", message: "Server configuration error" },
      { status: 500 }
    );
  }

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const refreshToken = cookieStore.get("refresh_token")?.value;

  // Try to call backend logout (optional - graceful if fails)
  if (accessToken) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });

      if (!response.ok) {
        // Log but don't fail - still clear local tokens
        console.warn("Backend logout failed:", response.status);
      }
    } catch (error) {
      // Log but don't fail - still clear local tokens
      console.warn("Backend logout error:", error);
    }
  }

  // Clear cookies (always do this regardless of backend response)
  const response = NextResponse.json(
    { status: "success", message: "Logout successful" },
    { status: 200 }
  );

  // Delete cookies by setting expired date
  response.cookies.set("access_token", "", {
    expires: new Date(0),
    path: "/",
  });
  response.cookies.set("refresh_token", "", {
    expires: new Date(0),
    path: "/",
  });

  return response;
}
