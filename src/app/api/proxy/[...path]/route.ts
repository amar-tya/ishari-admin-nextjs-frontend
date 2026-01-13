import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const REQUEST_TIMEOUT = 30000; // 30 seconds

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export const GET = (req: NextRequest) => handleRequest(req, "GET");
export const POST = (req: NextRequest) => handleRequest(req, "POST");
export const PUT = (req: NextRequest) => handleRequest(req, "PUT");
export const DELETE = (req: NextRequest) => handleRequest(req, "DELETE");
export const PATCH = (req: NextRequest) => handleRequest(req, "PATCH");

/**
 * Handle proxy request ke backend API
 * Route ini berfungsi sebagai proxy untuk menyembunyikan token dari client
 */
async function handleRequest(request: NextRequest, method: HttpMethod) {
  // Validasi API_BASE_URL
  if (!API_BASE_URL) {
    console.error("NEXT_PUBLIC_API_BASE_URL is not configured");
    return NextResponse.json(
      { error: "Server configuration error" },
      { status: 500 }
    );
  }

  const { pathname, search } = request.nextUrl;
  const path = pathname.replace("/api/proxy", "");

  const targetUrl = `${API_BASE_URL}${path}${search}`;

  // Ambil token dari HttpOnly cookie
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  if (!token) {
    return NextResponse.json(
      {
        error: "Unauthorized",
        message: "Sesi Anda telah berakhir, silakan login kembali",
      },
      { status: 401 }
    );
  }

  // Build headers
  const headers = new Headers();
  headers.set("Authorization", `Bearer ${token}`);

  // Forward relevant headers dari client, exclude sensitive headers
  const excludedHeaders = new Set([
    "host",
    "connection",
    "authorization",
    "content-length",
    "transfer-encoding",
  ]);

  request.headers.forEach((value, key) => {
    if (!excludedHeaders.has(key.toLowerCase())) {
      headers.set(key, value);
    }
  });

  // Handle request body
  let body: string | undefined;
  if (["POST", "PUT", "PATCH"].includes(method)) {
    body = await request.text();
    // Set Content-Type jika belum ada
    if (!headers.has("content-type")) {
      headers.set("Content-Type", "application/json");
    }
  }

  // Setup timeout dengan AbortController
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

  try {
    const response = await fetch(targetUrl, {
      method,
      headers,
      body,
      signal: controller.signal,
      redirect: "follow",
    });

    clearTimeout(timeoutId);

    // Parse response berdasarkan content-type
    const contentType = response.headers.get("content-type");

    if (contentType?.includes("application/json")) {
      const data = await response.json();
      return NextResponse.json(data, { status: response.status });
    }

    // Non-JSON response
    const text = await response.text();
    return new NextResponse(text, {
      status: response.status,
      headers: {
        "Content-Type": contentType || "text/plain",
      },
    });
  } catch (error) {
    clearTimeout(timeoutId);

    // Handle timeout
    if (error instanceof Error && error.name === "AbortError") {
      return NextResponse.json(
        { error: "Timeout", message: "Request timeout" },
        { status: 504 }
      );
    }

    // Handle network errors
    console.error("Proxy error:", error);
    return NextResponse.json(
      { error: "Internal Error", message: "Tidak dapat terhubung ke server" },
      { status: 500 }
    );
  }
}
