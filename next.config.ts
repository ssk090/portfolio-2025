import type { NextConfig } from "next"

/** Negotiated HTML/markdown routes need Accept in Vary (Next may overwrite middleware). */
const NEGOTIATE_VARY =
  "Accept, Accept-Encoding, RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Router-Segment-Prefetch"

const negotiateSources = [
  "/",
  "/about",
  "/contact",
  "/privacy",
  "/docs",
  "/writings",
  "/writings/:path*",
  "/projects",
  "/api/markdown",
  "/api/markdown/:path*",
]

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        port: "",
        pathname: "/a/09ir0bgwfb/**",
      },
    ],
  },
  async headers() {
    return negotiateSources.map((source) => ({
      source,
      headers: [{ key: "Vary", value: NEGOTIATE_VARY }],
    }))
  },
}

export default nextConfig
