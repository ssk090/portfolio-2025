import { notFound } from "next/navigation"
import Link from "next/link"
import { MDX } from "./mdx"
import { pageModel } from "@/lib/writings"
import { articleMeta } from "@/lib/site"

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const slug = (await params).slug
  const model = pageModel(slug)
  if (!model) {
    return
  }

  const meta = articleMeta({
    title: model.writing.metadata.title,
    description: model.writing.metadata.description,
    slug: model.writing.slug,
    date: model.writing.metadata.date,
    publishedTimeLabel: model.dateLabelLong,
  })

  return {
    title: meta.title,
    description: meta.description,
    openGraph: meta.openGraph,
    twitter: meta.twitter,
    alternates: meta.alternates,
  }
}

export default async function Post({ params }: PageProps) {
  const slug = (await params).slug
  const model = pageModel(slug)
  if (!model) {
    notFound()
  }

  const { writing, readingTime, dateLabelLong, prev, next } = model
  const meta = articleMeta({
    title: writing.metadata.title,
    description: writing.metadata.description,
    slug: writing.slug,
    date: writing.metadata.date,
    publishedTimeLabel: dateLabelLong,
  })

  return (
    <section className="animate-fade-in-up">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(meta.jsonLd),
        }}
      />

      <Link
        href="/writings"
        className="text-sm text-gray-400 hover:text-accent transition-colors mb-6 inline-block"
      >
        ← writings
      </Link>

      <h1 className="text-4xl font-bold mb-4 text-white">
        <span className="text-accent mr-2">*</span>
        {writing.metadata.title}
      </h1>

      <div className="mb-8 flex items-center gap-3 text-sm text-gray-400">
        <span>{dateLabelLong}</span>
        <span aria-hidden="true">·</span>
        <span>{readingTime}</span>
      </div>

      <article className="prose prose-invert max-w-none prose-headings:text-white prose-a:text-white hover:prose-a:underline">
        <MDX source={writing.content} />
      </article>

      {(prev || next) && (
        <nav className="mt-16 pt-8 border-t border-gray-800 flex justify-between gap-4 text-sm">
          {prev ? (
            <Link
              href={`/writings/${prev.slug}`}
              className="text-gray-400 hover:text-accent transition-colors"
            >
              <span className="block text-xs text-gray-500 mb-1">previous</span>
              {prev.metadata.title.toLowerCase()}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/writings/${next.slug}`}
              className="text-gray-400 hover:text-accent transition-colors text-right"
            >
              <span className="block text-xs text-gray-500 mb-1">next</span>
              {next.metadata.title.toLowerCase()}
            </Link>
          ) : (
            <span />
          )}
        </nav>
      )}
    </section>
  )
}
