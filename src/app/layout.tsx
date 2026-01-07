import "@/styling/globals.css"

import type { Metadata } from "next"
import { DM_Sans } from "next/font/google"

import Navbar from "@/components/app/navbar"
import ScrollToTop from "@/components/app/scroll-to-top"
import SetStylingPref from "@/components/app/set-styling-pref"
import { ThemeProvider } from "@/components/app/theme-provider"
import { Toaster } from "@/components/ui/sonner"

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
})

export const metadata: Metadata = {
  title: {
    default: "BrutalUI - Start making bold brutalist layouts today",
    template: `%s - BrutalUI`,
  },
  applicationName: "BrutalUI",
  description:
    "A collection of brutalist-styled components based on shadcn/ui.",
  keywords: [
    "brutalui",
    "brutalist ui",
    "brutal ui components",
    "brutalist tailwind",
    "react tailwind components",
    "shadcn components",
    "brutalist design system",
    "brutalist web components",
    "brutalui components",
  ],
  authors: [
    { name: "Suyesh Bhandari", url: "https://www.linkedin.com/in/suyesh-bhandari/" },
  ],
  openGraph: {
    type: "website",
    description:
      "A collection of brutalist-styled components based on shadcn/ui.",
    siteName: "BrutalUI",
    images: [
      {
        url: "https://brutalui.dev/preview.png",
        width: 1200,
        height: 630,
        alt: "BrutalUI components preview",
      },
      {
        url: "https://brutalui.dev/preview@2x.png",
        width: 2400,
        height: 1260,
        alt: "BrutalUI components preview",
      },
    ],
    url: "https://brutalui.dev/",
    title: "BrutalUI",
  },
  metadataBase: new URL("https://brutalui.dev/"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "BrutalUI - Start making bold brutalist layouts",
    description:
      "A collection of brutalist-styled components based on shadcn/ui.",
    images: [
      {
        url: "https://brutalui.dev/preview.png",
        width: 1200,
        height: 630,
        alt: "BrutalUI components preview",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className="scroll-smooth" suppressHydrationWarning lang="en">
      <body className={dmSans.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            disableTransitionOnChange
          >
            <Navbar />
            {children}
            <footer className="border-t-4 border-border bg-secondary-background px-5 py-6 text-center text-sm sm:text-base">
              <div>
                Made with{" "}
                <span aria-hidden="true" className="text-accent">
                  ❤
                </span>{" "}
                <span className="sr-only">love</span> by{" "}
                <a
                  className="font-heading underline"
                  href="https://www.linkedin.com/in/suyesh-bhandari/"
                  target="_blank"
                  rel="noreferrer"
                >
                  @suyesh
                </a>{" "}
                —{" "}
                <a
                  className="font-heading underline"
                  href="https://github.com/suyesh/brutal-ui"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
              </div>
            </footer>
            <SetStylingPref />
            <ScrollToTop />
            <Toaster />
          </ThemeProvider>
      </body>
    </html>
  )
}
