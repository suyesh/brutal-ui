import Marquee from "@/components/ui/marquee"

import { cn } from "@/lib/utils"

type LogoMarqueeProps = {
  title?: string
  items?: string[]
  className?: string
}

const DEFAULT_ITEMS = [
  "Antenna",
  "Monolith",
  "Brightline",
  "Orbit",
  "Synthwave",
  "Pyramid",
]

export default function LogoMarquee({
  title = "Loved by teams that ship bold.",
  items = DEFAULT_ITEMS,
  className,
}: LogoMarqueeProps) {
  return (
    <section
      className={cn(
        "w-full border-2 border-border bg-secondary-background px-6 py-8 shadow-shadow",
        className,
      )}
    >
      <div className="space-y-6">
        <h2 className="font-heading text-xl sm:text-2xl">{title}</h2>
        <Marquee items={items} />
      </div>
    </section>
  )
}
