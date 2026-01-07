import { cn } from "@/lib/utils"

type StatItem = {
  value: string
  label: string
  description?: string
}

type StatsProps = {
  title?: string
  description?: string
  stats?: StatItem[]
  className?: string
}

const DEFAULT_STATS: StatItem[] = [
  {
    value: "60+",
    label: "Components",
    description: "Shipping-ready primitives",
  },
  {
    value: "8",
    label: "Vibes",
    description: "Handpicked palettes",
  },
  {
    value: "2x",
    label: "Faster",
    description: "Less UI churn",
  },
]

export default function Stats({
  title = "Numbers that speak loud.",
  description = "Bring quick proof to the top of the funnel with bold metrics.",
  stats = DEFAULT_STATS,
  className,
}: StatsProps) {
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
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-base border-2 border-border bg-background p-6 shadow-shadow"
            >
              <p className="font-heading text-3xl">{stat.value}</p>
              <p className="mt-2 text-sm uppercase tracking-wide text-muted-foreground">
                {stat.label}
              </p>
              {stat.description && (
                <p className="mt-3 text-sm text-foreground">
                  {stat.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
