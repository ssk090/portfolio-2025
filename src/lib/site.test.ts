import { describe, expect, it } from "vitest"
import { absoluteUrl, personJsonLd, site } from "./site"
import robots from "@/app/robots"
import sitemap from "@/app/sitemap"

describe("site identity", () => {
  it("uses the canonical custom domain origin", () => {
    expect(site.origin).toBe("https://shivanandasai.xyz")
    expect(absoluteUrl("/docs")).toBe("https://shivanandasai.xyz/docs")
    expect(absoluteUrl("/og/home")).not.toContain("vercel.app")
  })

  it("exposes Person JSON-LD fields without a phone", () => {
    const person = personJsonLd()
    expect(person["@type"]).toBe("Person")
    expect(person.name).toBe(site.name)
    expect(person.description).toBe(site.description)
    expect(person.url).toBe(site.origin)
    expect(person.email).toBe(site.email)
    expect(person.sameAs).toEqual([
      "https://github.com/ssk090",
      "https://www.linkedin.com/in/shivanandasai/",
      "https://x.com/imshiv6t9",
      "https://cal.com/shivanandasai",
    ])
    expect(person).not.toHaveProperty("telephone")
    expect(JSON.stringify(person)).not.toMatch(/phone/i)
  })
})

describe("robots and sitemap", () => {
  it("points robots sitemap and host at the canonical origin", () => {
    const result = robots()
    expect(result.host).toBe("https://shivanandasai.xyz")
    expect(result.sitemap).toBe("https://shivanandasai.xyz/sitemap.xml")
  })

  it("lists real site URLs on the canonical origin", () => {
    const entries = sitemap()
    const urls = entries.map((entry) => entry.url)
    expect(urls).toContain("https://shivanandasai.xyz/")
    expect(urls).toContain("https://shivanandasai.xyz/writings")
    expect(urls).toContain("https://shivanandasai.xyz/projects")
    expect(urls).toContain("https://shivanandasai.xyz/docs")
    expect(urls.every((url) => url.startsWith("https://shivanandasai.xyz"))).toBe(
      true,
    )
    expect(urls.some((url) => url.includes("vercel.app"))).toBe(false)
  })
})
