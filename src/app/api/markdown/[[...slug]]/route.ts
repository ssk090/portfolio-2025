import { markdownHeaders } from "@/lib/accept"
import { resolveMarkdownPath } from "@/lib/markdown-pages"

type RouteProps = {
  params: Promise<{ slug?: string[] }>
}

export async function GET(_req: Request, { params }: RouteProps) {
  const { slug = [] } = await params
  const pathname = slug.length === 0 ? "/" : `/${slug.join("/")}`
  const result = resolveMarkdownPath(pathname)

  return new Response(result.body, {
    status: result.status,
    headers: markdownHeaders(),
  })
}
