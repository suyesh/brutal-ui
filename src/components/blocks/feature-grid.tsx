import type { ReactNode } from "react"

import { Check, Sparkles, Zap } from "lucide-react"

import { Card } from "@/components/ui/card"

import { cn } from "@/lib/utils"

type FeatureItem = {
  title: string
  description: string
  icon: ReactNode
}

type FeatureGridProps = {
  title?: string
  description?: string
  features?: FeatureItem[]
  className?: string
}

const DEFAULT_FEATURES: FeatureItem[] = [
  {
    title: "Copy-paste ready",
    description: "Every block ships as a clean React component with brutal defaults.",
    icon: <Sparkles className="size-5" />,
  },
  {
    title: "Themeable tokens",
    description: "Swap the whole vibe with a single palette change.",
    icon: <Zap className="size-5" />,
  },
  {
    title: "Battle-tested layouts",
    description: "Marketing patterns you can drop into any product.",
    icon: <Check className="size-5" />,
  },
]

export default function FeatureGrid({
  title = "Everything you need to ship loud.",
  description = "BrutalUI marketing blocks are designed to look strong on day one and stay flexible when you scale.",
  features = DEFAULT_FEATURES,
  className,
}: FeatureGridProps) {
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
        <div className="grid gap-4 md:grid-cols-3">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="flex h-full flex-col gap-4 border-2 border-border bg-background p-6 shadow-shadow"
            >
              <div className="flex size-10 items-center justify-center rounded-base border-2 border-border bg-main text-main-foreground">
                {feature.icon}
              </div>
              <div className="space-y-2">
                <h3 className="font-heading text-lg">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
