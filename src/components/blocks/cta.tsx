import { Button } from "@/components/ui/button"

import { cn } from "@/lib/utils"

type CtaProps = {
  title?: string
  description?: string
  primaryAction?: { label: string; href: string }
  secondaryAction?: { label: string; href: string }
  className?: string
}

export default function Cta({
  title = "Ready to go brutal?",
  description = "Drop these blocks into your next page and ship with confidence.",
  primaryAction = { label: "Get started", href: "/docs" },
  secondaryAction = { label: "View components", href: "/docs/accordion" },
  className,
}: CtaProps) {
  return (
    <section
      className={cn(
        "w-full border-2 border-border bg-main px-6 py-10 text-main-foreground shadow-shadow",
        className,
      )}
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-3">
          <h2 className="font-heading text-2xl sm:text-3xl">{title}</h2>
          <p className="max-w-2xl text-base sm:text-lg">{description}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="neutral">
            <a href={primaryAction.href}>{primaryAction.label}</a>
          </Button>
          <Button asChild variant="reverse">
            <a href={secondaryAction.href}>{secondaryAction.label}</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
