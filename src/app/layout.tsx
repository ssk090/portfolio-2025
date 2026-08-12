import type { Metadata } from "next"
import { JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { Navbar } from "../components/navbar"

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://shivanandasai.vercel.app"),
  title: {
    default: "Hi, I'm Shivananda Sai.",
    template: "%s | Shivananda Sai",
  },
  description:
    "Frontend / Full-Stack Engineer with 5+ years of experience building production web and mobile apps with React, TypeScript, Next.js, React Native, and AI-powered workflows.",
  openGraph: {
    title: "Shivananda Sai",
    description:
      "Frontend / Full-Stack Engineer specializing in React, Next.js, TypeScript, React Native, and AI-powered product workflows.",
    url: "https://shivanandasai.vercel.app",
    siteName: "Shivananda Sai",
    locale: "en_US",
    type: "website",
    images: ["https://www.nexxel.dev/og/home"],
  },
  robots: {
    index: true,
    follow: true,
    "max-video-preview": -1,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
  twitter: {
    title: "Shivananda Sai",
    card: "summary_large_image",
    creator: "@imshiv6t9",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${jetbrainsMono.variable} antialiased min-h-screen font-mono`}
      >
        <div className="max-w-4xl mx-auto px-5 sm:px-4 py-8">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  )
}
