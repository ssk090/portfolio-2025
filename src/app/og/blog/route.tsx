import { renderOgImage } from "@/lib/og-image"

export const runtime = "edge"

export async function GET(request: Request) {
  const title = new URL(request.url).searchParams.get("title") ?? "writings"
  return renderOgImage(title)
}
