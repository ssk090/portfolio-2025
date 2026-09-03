import { NextResponse, type NextRequest } from "next/server"
import {
  appendVaryAccept,
  notAcceptableResponse,
  preferredType,
} from "@/lib/accept"

/** Paths that intentionally serve HTML only (no markdown variant). */
function isHtmlOnly(pathname: string): boolean {
  if (pathname === "/work") return true
  if (pathname.startsWith("/og/")) return true
  if (pathname.startsWith("/api/")) return true
  return false
}

/**
 * Negotiated routes plus unknown paths (markdown / HTML 404).
 * Skip Next internals, static-ish assets, and HTML-only routes.
 */
function shouldNegotiate(pathname: string): boolean {
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/_vercel") ||
    pathname.startsWith("/api/") ||
    pathname.startsWith("/og/")
  ) {
    return false
  }
  // Static files under public/ (favicon, images)
  if (/\.[a-zA-Z0-9]+$/.test(pathname) && !pathname.endsWith(".txt")) {
    return false
  }
  if (isHtmlOnly(pathname)) return false
  return true
}

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname

  if (!shouldNegotiate(pathname)) {
    return NextResponse.next()
  }

  // llms.txt is its own route; do not rewrite it through markdown API.
  if (pathname === "/llms.txt") {
    const res = NextResponse.next()
    appendVaryAccept(res.headers)
    return res
  }

  const acceptHeader = req.headers.get("accept")
  const chosen = preferredType(acceptHeader)

  if (chosen === "text/markdown") {
    const url = req.nextUrl.clone()
    const slugPath =
      pathname === "/" ? "" : pathname.replace(/^\//, "")
    url.pathname = slugPath
      ? `/api/markdown/${slugPath}`
      : "/api/markdown"
    const rewritten = NextResponse.rewrite(url)
    appendVaryAccept(rewritten.headers)
    return rewritten
  }

  if (chosen === null && acceptHeader) {
    return notAcceptableResponse()
  }

  // Next App Router overwrites middleware/next.config Vary on HTML
  // (vercel/next.js#85999, #85852). Keep appendVaryAccept for when that
  // lands, and disable Vercel CDN store so Accept: text/markdown cannot
  // be poisoned by a cached HTML document meanwhile.
  const res = NextResponse.next()
  appendVaryAccept(res.headers)
  res.headers.set("Vercel-CDN-Cache-Control", "no-store")
  return res
}

export const config = {
  matcher: ["/((?!_next/|_vercel/).*)"],
}
