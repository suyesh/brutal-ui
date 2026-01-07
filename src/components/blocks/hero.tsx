import type { ReactNode } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import { cn } from "@/lib/utils"

type HeroAction = {
  label: string
  href: string
}

type HeroStat = {
  label: string
  value: string
}

type HeroProps = {
  title?: string
  description?: string
  eyebrow?: string
  primaryAction?: HeroAction
  secondaryAction?: HeroAction
  stats?: HeroStat[]
  media?: ReactNode
  className?: string
}

const DEFAULT_STATS: HeroStat[] = [
  { label: "Components", value: "60+" },
  { label: "Themes", value: "8 vibes" },
  { label: "Setup", value: "<5 min" },
]

export default function Hero({
  title = "Build brutalist interfaces without the busywork.",
  description = "BrutalUI is a copy-paste component kit for bold, fast, and wildly customizable UIs. Start with strong defaults and make it yours.",
  eyebrow = "BrutalUI",
  primaryAction = { label: "Read the docs", href: "/docs" },
  secondaryAction = { label: "Browse components", href: "/docs/accordion" },
  stats = DEFAULT_STATS,
  media,
  className,
}: HeroProps) {
  return (
    <section
      className={cn(
        "w-full border-2 border-border bg-secondary-background px-6 py-10 shadow-shadow lg:px-10 lg:py-12",
        className,
      )}
    >
      <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <Badge className="w-fit rounded-full px-3 py-1 text-sm" variant="neutral">
            {eyebrow}
          </Badge>
          <div className="space-y-4">
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl">
              {title}
            </h2>
            <p className="text-base text-foreground sm:text-lg">
              {description}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <a href={primaryAction.href}>{primaryAction.label}</a>
            </Button>
            <Button variant="reverse" asChild>
              <a href={secondaryAction.href}>{secondaryAction.label}</a>
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="min-w-[180px] rounded-base border-2 border-border bg-background px-4 py-3 text-left"
              >
                <p className="text-xs uppercase tracking-wide text-muted-foreground leading-snug">
                  {stat.label}
                </p>
                <p className="font-heading text-2xl leading-tight whitespace-nowrap sm:text-3xl">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center">
          {media ?? (
            <div className="flex w-full max-w-sm flex-col gap-4">
              <div className="rounded-base border-2 border-border bg-main px-6 py-8 text-main-foreground shadow-shadow">
                <p className="text-sm uppercase">Launch-ready</p>
                <p className="mt-3 font-heading text-2xl">
                  Brutal design, softer setup.
                </p>
              </div>
              <div className="rounded-base border-2 border-border bg-background px-6 py-6 shadow-shadow">
                <p className="text-sm text-muted-foreground">
                  Drag, drop, copy, and ship. No fluff, just brutal clarity.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
