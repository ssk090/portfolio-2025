import { PageHeader } from "@/components/page-header"
import { pageCanonical, pageOgImages, site } from "@/lib/site"
import type { Metadata } from "next"
import Link from "next/link"

export default function PrivacyPage() {
  return (
    <main className="animate-fade-in-up space-y-8">
      <PageHeader
        title="privacy"
        description="a plain policy for this personal portfolio. no accounts. no corporate boilerplate."
      />

      <section className="space-y-4 text-sm text-gray-400 leading-relaxed">
        <p>
          This site is the personal portfolio of {site.name} at
          shivanandasai.xyz. It shows work history, projects, and writings. It
          does not offer user accounts, logins, or paid products.
        </p>
        <p>
          Hosting runs on Vercel. Like most sites on that platform, request
          delivery may involve standard edge and server logs. I do not run a
          separate marketing analytics product on top of the pages themselves.
        </p>
        <p>
          Some links leave this site. The resume opens a file on Google Drive.
          Call booking uses Cal.com. Social links go to GitHub, LinkedIn, and X.
          Those services process data under their own policies when you use
          them.
        </p>
        <p>
          An optional visitor presence feature may store a random session id in
          your browser local storage and send that id plus the current page path
          so a total visitor count can appear in the navbar. It is not a full
          analytics suite. It does not create a login profile. If storage or the
          request fails, the counter simply stays hidden.
        </p>
        <p>
          If you have a question about privacy on this portfolio, email{" "}
          <a
            href={`mailto:${site.email}`}
            className="text-accent hover:underline"
          >
            {site.email}
          </a>
          . For hiring or project talk, see{" "}
          <Link href="/contact" className="text-accent hover:underline">
            contact
          </Link>
          . For who I am, see{" "}
          <Link href="/about" className="text-accent hover:underline">
            about
          </Link>
          .
        </p>
      </section>
    </main>
  )
}

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "Privacy notes for shivanandasai.xyz: personal portfolio, Vercel hosting, Cal.com, Google Drive resume, optional visitor presence.",
  alternates: pageCanonical("/privacy"),
  openGraph: {
    images: pageOgImages("privacy"),
  },
}
