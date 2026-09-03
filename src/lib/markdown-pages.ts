/**
 * Markdown bodies for Accept-negotiated pages.
 * Honest agent surface only: real pages and contact. No product API docs.
 */

import { all } from "@/lib/projects"
import { absoluteUrl, site } from "@/lib/site"
import { pageModel, published } from "@/lib/writings"

function contactBlock(): string {
  return [
    "## Contact",
    "",
    `- Email: ${site.email}`,
    `- GitHub: ${site.sameAs[0]}`,
    `- LinkedIn: ${site.sameAs[1]}`,
    `- X: ${site.sameAs[2]}`,
    `- Book a call: ${site.sameAs[3]}`,
  ].join("\n")
}

function pagesBlock(): string {
  return [
    "## Pages",
    "",
    `- [Home](${absoluteUrl("/")})`,
    `- [Writings](${absoluteUrl("/writings")})`,
    `- [Projects](${absoluteUrl("/projects")})`,
    `- [Work](${absoluteUrl("/work")})`,
    `- [Docs](${absoluteUrl("/docs")})`,
    `- [llms.txt](${absoluteUrl("/llms.txt")})`,
  ].join("\n")
}

export function homeMarkdown(): string {
  return [
    `# ${site.name}`,
    "",
    site.description,
    "",
    pagesBlock(),
    "",
    contactBlock(),
    "",
  ].join("\n")
}

export function writingsIndexMarkdown(): string {
  const posts = published()
  const lines = [
    "# Writings",
    "",
    "Notes on programming, tools, and building with AI.",
    "",
  ]

  if (posts.length === 0) {
    lines.push("No published writings yet.", "")
  } else {
    for (const post of posts) {
      lines.push(
        `- [${post.metadata.title}](${absoluteUrl(`/writings/${post.slug}`)}): ${post.metadata.description}`,
      )
    }
    lines.push("")
  }

  lines.push(`[Home](${absoluteUrl("/")}) · [Docs](${absoluteUrl("/docs")})`, "")
  return lines.join("\n")
}

export function writingMarkdown(slug: string): string | null {
  const model = pageModel(slug)
  if (!model) return null

  const { writing, readingTime, dateLabelLong } = model
  return [
    `# ${writing.metadata.title}`,
    "",
    `${dateLabelLong} · ${readingTime}`,
    "",
    writing.metadata.description,
    "",
    writing.content.trim(),
    "",
    `---`,
    "",
    `[All writings](${absoluteUrl("/writings")}) · [Home](${absoluteUrl("/")})`,
    "",
  ].join("\n")
}

export function projectsMarkdown(): string {
  const projects = all()
  const lines = [
    "# Projects",
    "",
    "Selected projects. More on GitHub.",
    "",
  ]

  for (const project of projects) {
    lines.push(`## ${project.title}`, "")
    lines.push(project.description, "")
    if (project.achievements.length > 0) {
      for (const item of project.achievements) {
        lines.push(`- ${item}`)
      }
      lines.push("")
    }
    if (project.technologies.length > 0) {
      lines.push(`Tech: ${project.technologies.join(", ")}`, "")
    }
    lines.push(`Link: ${project.href}`, "")
  }

  lines.push(
    `[GitHub](${site.sameAs[0]}) · [Home](${absoluteUrl("/")}) · [Docs](${absoluteUrl("/docs")})`,
    "",
  )
  return lines.join("\n")
}

export function docsMarkdown(): string {
  return [
    "# Docs",
    "",
    "This is a personal portfolio site. There is no public product API, OpenAPI, or MCP surface.",
    "",
    "Agents can use content negotiation (`Accept: text/markdown`) on home, writings, projects, docs, and missing pages. Start with `/llms.txt`.",
    "",
    pagesBlock(),
    "",
    contactBlock(),
    "",
    "## Agent discovery",
    "",
    `- [${absoluteUrl("/llms.txt")}](${absoluteUrl("/llms.txt")})`,
    `- [${absoluteUrl("/docs")}](${absoluteUrl("/docs")})`,
    `- [${absoluteUrl("/sitemap.xml")}](${absoluteUrl("/sitemap.xml")})`,
    `- [${absoluteUrl("/robots.txt")}](${absoluteUrl("/robots.txt")})`,
    "",
  ].join("\n")
}

export function llmsTxt(): string {
  return [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    site.origin,
    "",
    "## Pages",
    "",
    `- Home: ${absoluteUrl("/")}`,
    `- Writings: ${absoluteUrl("/writings")}`,
    `- Projects: ${absoluteUrl("/projects")}`,
    `- Work: ${absoluteUrl("/work")}`,
    `- Docs: ${absoluteUrl("/docs")}`,
    "",
    "## Optional",
    "",
    `- Sitemap: ${absoluteUrl("/sitemap.xml")}`,
    `- Robots: ${absoluteUrl("/robots.txt")}`,
    "",
    "## Contact",
    "",
    `- Email: ${site.email}`,
    `- GitHub: ${site.sameAs[0]}`,
    `- LinkedIn: ${site.sameAs[1]}`,
    `- X: ${site.sameAs[2]}`,
    `- Book a call: ${site.sameAs[3]}`,
    "",
    "## Notes for agents",
    "",
    "- Prefer `Accept: text/markdown` on home, writings, projects, docs, and unknown paths.",
    "- Do not treat `/api/visitors/*` as a public product API.",
    "- There is no OpenAPI or MCP endpoint on this site.",
    "",
  ].join("\n")
}

/** Short STE-friendly markdown 404 body. */
export function notFoundMarkdown(): string {
  return [
    "# Not found",
    "",
    "That URL is not on this site.",
    "",
    `- [Home](${absoluteUrl("/")})`,
    `- [Writings](${absoluteUrl("/writings")})`,
    `- [Projects](${absoluteUrl("/projects")})`,
    `- [llms.txt](${absoluteUrl("/llms.txt")})`,
    `- [Docs](${absoluteUrl("/docs")})`,
    "",
  ].join("\n")
}

export type MarkdownResolve =
  | { status: 200; body: string }
  | { status: 404; body: string }

/** Map a URL path to a markdown representation. */
export function resolveMarkdownPath(pathname: string): MarkdownResolve {
  const path =
    pathname.length > 1 && pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname

  if (path === "/" || path === "") {
    return { status: 200, body: homeMarkdown() }
  }
  if (path === "/writings") {
    return { status: 200, body: writingsIndexMarkdown() }
  }
  if (path === "/projects") {
    return { status: 200, body: projectsMarkdown() }
  }
  if (path === "/docs") {
    return { status: 200, body: docsMarkdown() }
  }

  const writingMatch = /^\/writings\/([^/]+)$/.exec(path)
  if (writingMatch?.[1]) {
    const body = writingMarkdown(writingMatch[1])
    if (body) return { status: 200, body }
    return { status: 404, body: notFoundMarkdown() }
  }

  return { status: 404, body: notFoundMarkdown() }
}
