import { Quote } from "lucide-react"

import { cn } from "@/lib/utils"

type HighlightedQuoteProps = {
  quote?: string
  name?: string
  role?: string
  className?: string
}

export default function HighlightedQuote({
  quote = "BrutalUI gave us the confidence to go bold without losing clarity.",
  name = "Aria James",
  role = "Brand Designer",
  className,
}: HighlightedQuoteProps) {
  return (
    <section
      className={cn(
        "w-full border-2 border-border bg-main px-6 py-10 text-main-foreground shadow-shadow",
        className,
      )}
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-6">
        <div className="flex size-12 items-center justify-center rounded-base border-2 border-border bg-background text-foreground">
          <Quote className="size-5" />
        </div>
        <blockquote className="text-2xl sm:text-3xl font-heading leading-snug">
          “{quote}”
        </blockquote>
        <div>
          <p className="font-heading text-lg">{name}</p>
          <p className="text-sm text-main-foreground/80">{role}</p>
        </div>
      </div>
    </section>
  )
}
