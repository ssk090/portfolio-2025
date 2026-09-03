import type { MetadataRoute } from "next"
import { absoluteUrl } from "@/lib/site"
import { published } from "@/lib/writings"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/writings"), changeFrequency: "weekly", priority: 0.8 },
    { url: absoluteUrl("/projects"), changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/work"), changeFrequency: "monthly", priority: 0.6 },
    { url: absoluteUrl("/docs"), changeFrequency: "monthly", priority: 0.5 },
  ]

  const writings: MetadataRoute.Sitemap = published().map((post) => ({
    url: absoluteUrl(`/writings/${post.slug}`),
    lastModified: new Date(post.metadata.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  return [...staticRoutes, ...writings]
}
