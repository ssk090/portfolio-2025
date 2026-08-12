import { renderOgImage } from "@/lib/og-image"

export const runtime = "edge"

export async function GET(request: Request) {
  const title = new URL(request.url).searchParams.get("title")
  return renderOgImage(title ? `shiv • ${title}` : "shiv • home")
}
