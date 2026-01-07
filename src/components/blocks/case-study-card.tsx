import { Button } from "@/components/ui/button"

import { cn } from "@/lib/utils"

type CaseStudyCardProps = {
  title?: string
  summary?: string
  category?: string
  metrics?: { label: string; value: string }[]
  imageUrl?: string
  href?: string
  className?: string
}

const DEFAULT_METRICS = [
  { label: "Conversion", value: "+28%" },
  { label: "Launch time", value: "3 weeks" },
]

export default function CaseStudyCard({
  title = "Glowline rebrand launch",
  summary = "A brutal refresh that doubled engagement and tightened the narrative.",
  category = "Case study",
  metrics = DEFAULT_METRICS,
  imageUrl = "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80",
  href = "/docs",
  className,
}: CaseStudyCardProps) {
  return (
    <section
      className={cn(
        "w-full border-2 border-border bg-secondary-background p-6 shadow-shadow",
        className,
      )}
    >
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            {category}
          </p>
          <h2 className="font-heading text-2xl sm:text-3xl">{title}</h2>
          <p className="text-foreground sm:text-lg">{summary}</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-base border-2 border-border bg-background px-4 py-3"
              >
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  {metric.label}
                </p>
                <p className="font-heading text-xl">{metric.value}</p>
              </div>
            ))}
          </div>
          <Button asChild>
            <a href={href}>Read the case study</a>
          </Button>
        </div>
        <div className="overflow-hidden rounded-base border-2 border-border bg-background">
          <img
            className="h-full w-full object-cover"
            src={imageUrl}
            alt={title}
            loading="lazy"
          />
        </div>
      </div>
    </section>
  )
}
