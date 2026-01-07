import { Badge } from "@/components/ui/badge"

import { cn } from "@/lib/utils"

type SectionHeaderProps = {
  eyebrow?: string
  title?: string
  description?: string
  align?: "left" | "center"
  className?: string
}

export default function SectionHeader({
  eyebrow = "Section",
  title = "Make each section feel intentional.",
  description = "Use this header to anchor content blocks with bold hierarchy.",
  align = "left",
  className,
}: SectionHeaderProps) {
  const alignment = align === "center" ? "items-center text-center" : "items-start"

  return (
    <div className={cn("space-y-4", alignment, className)}>
      <Badge className="w-fit rounded-full px-3 py-1 text-xs" variant="neutral">
        {eyebrow}
      </Badge>
      <div className="space-y-2">
        <h2 className="font-heading text-2xl sm:text-3xl">{title}</h2>
        <p className="text-foreground sm:text-lg">{description}</p>
      </div>
    </div>
  )
}
