import { describe, expect, it } from "vitest"
import { absoluteUrl, pageCanonical, personJsonLd, site } from "./site"
import robots from "@/app/robots"
import sitemap from "@/app/sitemap"

describe("site identity", () => {
  it("uses the canonical custom domain origin", () => {
    expect(site.origin).toBe("https://shivanandasai.xyz")
    expect(absoluteUrl("/docs")).toBe("https://shivanandasai.xyz/docs")
    expect(absoluteUrl("/og/home")).not.toContain("vercel.app")
  })

  it("builds pageCanonical from site.origin", () => {
    expect(pageCanonical("/")).toEqual({
      canonical: "https://shivanandasai.xyz/",
    })
    expect(pageCanonical("/about")).toEqual({
      canonical: "https://shivanandasai.xyz/about",
    })
    expect(pageCanonical("/writings/example")).toEqual({
      canonical: "https://shivanandasai.xyz/writings/example",
    })
  })

  it("exposes Person JSON-LD fields without a phone", () => {
    const person = personJsonLd()
    expect(person["@type"]).toBe("Person")
    expect(person.name).toBe(site.name)
    expect(person.description).toBe(site.description)
    expect(person.url).toBe(site.origin)
    expect(person.email).toBe(site.email)
    expect(person.jobTitle).toBe("Senior Software Engineer")
    expect(person.worksFor).toEqual({
      "@type": "Organization",
      name: "Altir",
      url: "https://www.altir.co/",
    })
    expect(person.address).toEqual({
      "@type": "PostalAddress",
      addressLocality: "Hyderabad",
      addressRegion: "Telangana",
      addressCountry: "IN",
    })
    expect(person.sameAs).toEqual([
      "https://github.com/ssk090",
      "https://www.linkedin.com/in/shivanandasai/",
      "https://x.com/imshiv6t9",
      "https://cal.com/shivanandasai",
    ])
    expect(person).not.toHaveProperty("telephone")
    expect(JSON.stringify(person)).not.toMatch(/phone/i)
    expect(JSON.stringify(person)).not.toMatch(/street/i)
  })
})

describe("robots and sitemap", () => {
  it("points robots sitemap and host at the canonical origin", () => {
    const result = robots()
    expect(result.host).toBe("https://shivanandasai.xyz")
    expect(result.sitemap).toBe("https://shivanandasai.xyz/sitemap.xml")
  })

  it("lists real site URLs including trust pages", () => {
    const entries = sitemap()
    const urls = entries.map((entry) => entry.url)
    expect(urls).toContain("https://shivanandasai.xyz/")
    expect(urls).toContain("https://shivanandasai.xyz/about")
    expect(urls).toContain("https://shivanandasai.xyz/contact")
    expect(urls).toContain("https://shivanandasai.xyz/privacy")
    expect(urls).toContain("https://shivanandasai.xyz/writings")
    expect(urls).toContain("https://shivanandasai.xyz/projects")
    expect(urls).toContain("https://shivanandasai.xyz/docs")
    expect(urls.every((url) => url.startsWith("https://shivanandasai.xyz"))).toBe(
      true,
    )
    expect(urls.some((url) => url.includes("vercel.app"))).toBe(false)

    const about = entries.find(
      (entry) => entry.url === "https://shivanandasai.xyz/about",
    )
    expect(about?.lastModified).toBeInstanceOf(Date)
  })
})
