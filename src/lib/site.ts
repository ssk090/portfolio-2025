/**
 * Site identity module  -  canonical origin, author, social handles,
 * and helpers that build metadata / OG / Person JSON-LD URLs.
 */

export const site = {
  name: "Shivananda Sai",
  origin: "https://shivanandasai.xyz",
  description:
    "Frontend / Full-Stack Engineer with 5+ years building production web and mobile apps with React, TypeScript, Next.js, React Native, and AI-powered workflows.",
  ogDescription:
    "Frontend / Full-Stack Engineer specializing in React, Next.js, TypeScript, React Native, and AI-powered product workflows.",
  email: "shivanandasai.work@gmail.com",
  jobTitle: "Senior Software Engineer",
  worksFor: {
    name: "Altir",
    url: "https://www.altir.co/",
  },
  address: {
    addressLocality: "Hyderabad",
    addressRegion: "Telangana",
    addressCountry: "IN",
  },
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

/** Next.js Metadata alternates.canonical helper. */
export function pageCanonical(path = "/") {
  return { canonical: absoluteUrl(path) }
}

/** Homepage Person JSON-LD (no phone, no street). */
export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    description: site.description,
    url: site.origin,
    email: site.email,
    jobTitle: site.jobTitle,
    worksFor: {
      "@type": "Organization",
      name: site.worksFor.name,
      url: site.worksFor.url,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: site.address.addressLocality,
      addressRegion: site.address.addressRegion,
      addressCountry: site.address.addressCountry,
    },
    sameAs: [...site.sameAs],
  }
}

/** Organization JSON-LD for Ora / brand crawlers (no phone, no street). */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.origin,
    email: site.email,
    contactPoint: {
      "@type": "ContactPoint",
      email: site.email,
      contactType: "professional",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: site.address.addressLocality,
      addressRegion: site.address.addressRegion,
      addressCountry: site.address.addressCountry,
    },
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
    alternates: pageCanonical(`/writings/${input.slug}`),
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
