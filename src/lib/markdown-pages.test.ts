import { describe, expect, it } from "vitest"
import {
  aboutMarkdown,
  contactMarkdown,
  docsMarkdown,
  llmsTxt,
  notFoundMarkdown,
  privacyMarkdown,
  resolveMarkdownPath,
} from "./markdown-pages"
import { site } from "./site"

const steDash = /\u2014|\u2013/

describe("markdown pages", () => {
  it("builds a short STE-friendly 404 with discovery links", () => {
    const body = notFoundMarkdown()
    expect(body).toContain("# Not found")
    expect(body).toContain(site.origin + "/")
    expect(body).toContain("/writings")
    expect(body).toContain("/projects")
    expect(body).toContain("/llms.txt")
    expect(body).toContain("/docs")
    expect(body).not.toMatch(steDash)
  })

  it("keeps llms.txt honest and includes when-to-use guidance", () => {
    const body = llmsTxt()
    expect(body).toContain(site.origin)
    expect(body).toContain("# Shivananda Sai")
    expect(body).toContain("shivanandasai.xyz")
    expect(body).toContain("## When to use this")
    expect(body).toContain("Hire")
    expect(body).toContain("Review projects and writings")
    expect(body).toContain("Book a call")
    expect(body).toContain("Contact by email")
    expect(body).toContain("/about")
    expect(body).toContain("/contact")
    expect(body).toContain("/privacy")
    expect(body).toContain("/docs")
    expect(body).toContain(site.email)
    expect(body.toLowerCase()).toContain("no openapi")
    expect(body).toContain("## Developer resources")
    expect(body).toContain("Shivananda Sai developer resources")
    expect(body).toContain("/llms.txt")
    expect(body).toContain("/sitemap.xml")
    expect(body).toContain("/robots.txt")
    expect(body).toContain("Do not treat `/api/visitors/*` as a public product API.")
    expect(body).not.toMatch(steDash)
  })

  it("documents real pages on /docs markdown", () => {
    const body = docsMarkdown()
    expect(body).toContain("# Docs | Shivananda Sai")
    expect(body.toLowerCase()).toContain("no public product api")
    expect(body).toContain("/llms.txt")
    expect(body).toContain("/about")
    expect(body).toContain("/contact")
    expect(body).toContain("/privacy")
    expect(body).toContain(site.email)
    expect(body).not.toMatch(steDash)
  })

  it("resolves trust pages and returns 404 markdown otherwise", () => {
    expect(resolveMarkdownPath("/").status).toBe(200)
    expect(resolveMarkdownPath("/about").status).toBe(200)
    expect(resolveMarkdownPath("/contact").status).toBe(200)
    expect(resolveMarkdownPath("/privacy").status).toBe(200)
    expect(resolveMarkdownPath("/writings").status).toBe(200)
    expect(resolveMarkdownPath("/projects").status).toBe(200)
    expect(resolveMarkdownPath("/docs").status).toBe(200)
    expect(resolveMarkdownPath("/nope").status).toBe(404)
    expect(resolveMarkdownPath("/writings/does-not-exist").status).toBe(404)
    expect(resolveMarkdownPath("/nope").body).toContain("# Not found")
  })

  it("keeps about, contact, and privacy markdown STE-friendly", () => {
    for (const body of [aboutMarkdown(), contactMarkdown(), privacyMarkdown()]) {
      expect(body.length).toBeGreaterThan(200)
      expect(body).not.toMatch(steDash)
      expect(body).toContain("shivanandasai.xyz")
    }
    expect(aboutMarkdown()).toContain("Altir")
    expect(aboutMarkdown()).toContain("Senior Software Engineer")
    expect(aboutMarkdown()).toContain("Software Engineer at Altir")
    expect(aboutMarkdown()).toContain("Infosys")
    expect(aboutMarkdown()).toContain("Senior Systems Engineer")
    expect(aboutMarkdown()).toContain("Systems Engineer Trainee")
    expect(aboutMarkdown()).toContain("Mysore")
    expect(contactMarkdown()).toContain(site.email)
    expect(privacyMarkdown().toLowerCase()).toContain("vercel")
    expect(privacyMarkdown().toLowerCase()).toContain("cal.com")
    expect(privacyMarkdown().toLowerCase()).toContain("visitor")
  })
})
