/**
 * Site identity module — canonical origin, author, social handles,
 * and helpers that build metadata / OG / Person JSON-LD URLs.
 */

export const site = {
  name: "Shivananda Sai",
  origin: "https://shivanandasai.xyz",
  description:
    "Frontend / Full-Stack Engineer with 5+ years of experience building production web and mobile apps with React, TypeScript, Next.js, React Native, and AI-powered workflows.",
  ogDescription:
    "Frontend / Full-Stack Engineer specializing in React, Next.js, TypeScript, React Native, and AI-powered product workflows.",
  email: "shivanandasai.38@gmail.com",
  author: {
    name: "Shivananda Sai",
    twitter: "@imshiv6t9",
  },
  sameAs: [
    "https://github.com/ssk090",
    "https://www.linkedin.com/in/shivanandasai/",
    "https://x.com/imshiv6t9",
    "https://cal.com/shivanandasai",
  ] as const,
  packageName: "portfolio-2025",
} as const

export function absoluteUrl(path = "/"): string {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path
  }
  const normalized = path.startsWith("/") ? path : `/${path}`
  return `${site.origin}${normalized}`
}

/** Homepage Person JSON-LD (no phone). */
export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    description: site.description,
    url: site.origin,
    email: site.email,
    sameAs: [...site.sameAs],
  }
}

/** Home / section OG image URL. */
export function ogHomeImage(title?: string): string {
  if (!title) {
    return absoluteUrl("/og/home")
  }
  return absoluteUrl(`/og/home?title=${encodeURIComponent(title)}`)
}

/** Writing / article OG image URL. */
export function ogBlogImage(title: string, top?: string): string {
  const params = new URLSearchParams({ title })
  if (top) {
    params.set("top", top)
  }
  return absoluteUrl(`/og/blog?${params.toString()}`)
}

export type ArticleMetaInput = {
  title: string
  description: string
  slug: string
  date: string
  /** Pre-formatted date string for OG "top" label */
  publishedTimeLabel?: string
}

/** OpenGraph + Twitter + canonical fields for a writing. */
export function articleMeta(input: ArticleMetaInput) {
  const url = absoluteUrl(`/writings/${input.slug}`)
  const publishedTime = input.publishedTimeLabel ?? input.date
  const ogImage = ogBlogImage(input.title)
  const twitterImage = ogBlogImage(input.title, publishedTime)

  return {
    title: input.title,
    description: input.description,
    openGraph: {
      title: input.title,
      description: input.description,
      publishedTime: input.date,
      type: "article" as const,
      url,
      images: [{ url: ogImage }],
    },
    twitter: {
      title: input.title,
      description: input.description,
      card: "summary_large_image" as const,
      creator: site.author.twitter,
      images: [twitterImage],
    },
    canonical: url,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: input.title,
      datePublished: input.date,
      dateModified: input.date,
      description: input.description,
      image: ogBlogImage(input.title, publishedTime),
      url,
      author: {
        "@type": "Person",
        name: site.author.name,
        url: site.origin,
        email: site.email,
        sameAs: [...site.sameAs],
      },
    },
  }
}

/** Page-level openGraph images helper. */
export function pageOgImages(title: string) {
  return [{ url: ogHomeImage(title) }]
}
