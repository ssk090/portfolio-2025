import { describe, expect, it } from "vitest"
import {
  docsMarkdown,
  llmsTxt,
  notFoundMarkdown,
  resolveMarkdownPath,
} from "./markdown-pages"
import { site } from "./site"

describe("markdown pages", () => {
  it("builds a short STE-friendly 404 with discovery links", () => {
    const body = notFoundMarkdown()
    expect(body).toContain("# Not found")
    expect(body).toContain(site.origin + "/")
    expect(body).toContain("/writings")
    expect(body).toContain("/projects")
    expect(body).toContain("/llms.txt")
    expect(body).toContain("/docs")
    expect(body).not.toMatch(/\u2014|\u2013/)
  })

  it("keeps llms.txt honest (no fake product API)", () => {
    const body = llmsTxt()
    expect(body).toContain(site.origin)
    expect(body).toContain("/docs")
    expect(body).toContain(site.email)
    expect(body.toLowerCase()).toContain("no openapi")
    expect(body).toContain("Do not treat `/api/visitors/*` as a public product API.")
  })

  it("documents real pages on /docs markdown", () => {
    const body = docsMarkdown()
    expect(body).toContain("# Docs")
    expect(body.toLowerCase()).toContain("no public product api")
    expect(body).toContain("/llms.txt")
    expect(body).toContain(site.email)
  })

  it("resolves known paths and returns 404 markdown otherwise", () => {
    expect(resolveMarkdownPath("/").status).toBe(200)
    expect(resolveMarkdownPath("/writings").status).toBe(200)
    expect(resolveMarkdownPath("/projects").status).toBe(200)
    expect(resolveMarkdownPath("/docs").status).toBe(200)
    expect(resolveMarkdownPath("/nope").status).toBe(404)
    expect(resolveMarkdownPath("/writings/does-not-exist").status).toBe(404)
    expect(resolveMarkdownPath("/nope").body).toContain("# Not found")
  })
})
