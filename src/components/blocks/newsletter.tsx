import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { cn } from "@/lib/utils"

type NewsletterProps = {
  title?: string
  description?: string
  placeholder?: string
  buttonLabel?: string
  className?: string
}

export default function Newsletter({
  title = "Stay in the loop.",
  description = "Get BrutalUI updates, new blocks, and bold UI tips.",
  placeholder = "you@brand.com",
  buttonLabel = "Join the list",
  className,
}: NewsletterProps) {
  return (
    <section
      className={cn(
        "w-full border-2 border-border bg-secondary-background px-6 py-10 shadow-shadow",
        className,
      )}
    >
      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-center">
        <div className="space-y-3">
          <h2 className="font-heading text-2xl sm:text-3xl">{title}</h2>
          <p className="text-foreground sm:text-lg">{description}</p>
        </div>
        <form className="flex flex-col gap-3 sm:flex-row">
          <Input placeholder={placeholder} type="email" />
          <Button type="submit">{buttonLabel}</Button>
        </form>
      </div>
    </section>
  )
}
