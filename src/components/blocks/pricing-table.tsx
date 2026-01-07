import { Check } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import { cn } from "@/lib/utils"

type PricingTier = {
  name: string
  price: string
  description: string
  features: string[]
  highlight?: boolean
  ctaLabel?: string
  ctaHref?: string
}

type PricingTableProps = {
  title?: string
  description?: string
  tiers?: PricingTier[]
  className?: string
}

const DEFAULT_TIERS: PricingTier[] = [
  {
    name: "Starter",
    price: "$0",
    description: "For quick experiments and brutal prototypes.",
    features: ["All core components", "Marketing blocks", "Community support"],
    ctaLabel: "Get started",
    ctaHref: "/docs",
  },
  {
    name: "Studio",
    price: "$29",
    description: "For teams building product-ready experiences.",
    features: ["Everything in Starter", "Priority updates", "Advanced themes"],
    highlight: true,
    ctaLabel: "Start trial",
    ctaHref: "/docs",
  },
  {
    name: "Agency",
    price: "$79",
    description: "For shipping multiple client experiences.",
    features: ["Everything in Studio", "Team onboarding", "Brand review"],
    ctaLabel: "Contact sales",
    ctaHref: "/docs",
  },
]

export default function PricingTable({
  title = "Pricing that scales with your ambition.",
  description = "Pick a plan that matches your pace. Upgrade only when you need to.",
  tiers = DEFAULT_TIERS,
  className,
}: PricingTableProps) {
  return (
    <section
      className={cn(
        "w-full border-2 border-border bg-secondary-background px-6 py-10 shadow-shadow",
        className,
      )}
    >
      <div className="space-y-8">
        <header className="max-w-2xl space-y-3">
          <h2 className="font-heading text-2xl sm:text-3xl">{title}</h2>
          <p className="text-foreground sm:text-lg">{description}</p>
        </header>
        <div className="grid gap-4 lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={cn(
                "flex h-full flex-col justify-between rounded-base border-2 border-border bg-background p-6 shadow-shadow",
                tier.highlight && "bg-main text-main-foreground",
              )}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading text-xl">{tier.name}</h3>
                  {tier.highlight && (
                    <Badge className="rounded-full px-3 py-1 text-xs" variant="neutral">
                      Popular
                    </Badge>
                  )}
                </div>
                <p className="text-3xl font-heading">{tier.price}</p>
                <p className={cn("text-sm", tier.highlight ? "text-main-foreground/80" : "text-muted-foreground")}>
                  {tier.description}
                </p>
                <ul className="space-y-2 text-sm">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="size-4" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Button
                className={cn("mt-6 w-full", tier.highlight ? "bg-background text-foreground" : "")}
                variant={tier.highlight ? "neutral" : "default"}
                asChild
              >
                <a href={tier.ctaHref ?? "/docs"}>{tier.ctaLabel ?? "Get started"}</a>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
