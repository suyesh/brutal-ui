import { cn } from "@/lib/utils"

type TimelineStep = {
  title: string
  description: string
}

type TimelineProps = {
  title?: string
  description?: string
  steps?: TimelineStep[]
  className?: string
}

const DEFAULT_STEPS: TimelineStep[] = [
  {
    title: "Pick a vibe",
    description: "Choose a palette that matches your brand energy.",
  },
  {
    title: "Drop the blocks",
    description: "Copy the blocks you need and customize the props.",
  },
  {
    title: "Ship fast",
    description: "Launch bold layouts without losing speed.",
  },
]

export default function Timeline({
  title = "Your brutalist build flow.",
  description = "A simple timeline to highlight steps, milestones, or onboarding.",
  steps = DEFAULT_STEPS,
  className,
}: TimelineProps) {
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
        <ol className="grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="relative rounded-base border-2 border-border bg-background p-6 shadow-shadow"
            >
              <div className="mb-4 flex size-10 items-center justify-center rounded-base border-2 border-border bg-main text-main-foreground font-heading">
                {index + 1}
              </div>
              <h3 className="font-heading text-lg">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
