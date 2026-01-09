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
                Brutalized with{" "}
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
                  className="inline-flex items-center gap-2 font-heading underline"
                  href="https://github.com/suyesh/brutal-ui"
                  target="_blank"
                  rel="noreferrer"
                >
                  <svg
                    className="size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 496 512"
                    aria-hidden="true"
                  >
                    <path
                      className="fill-foreground"
                      d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
                    />
                  </svg>
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
