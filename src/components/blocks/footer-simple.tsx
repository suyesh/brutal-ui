import { cn } from "@/lib/utils"

type FooterSimpleProps = {
  brand?: string
  description?: string
  links?: { label: string; href: string }[]
  className?: string
}

const DEFAULT_LINKS = [
  { label: "Docs", href: "/docs" },
  { label: "Components", href: "/docs/accordion" },
  { label: "Changelog", href: "/docs/changelog" },
]

export default function FooterSimple({
  brand = "BrutalUI",
  description = "A brutalist component library for bold interfaces.",
  links = DEFAULT_LINKS,
  className,
}: FooterSimpleProps) {
  return (
    <footer
      className={cn(
        "w-full border-2 border-border bg-secondary-background px-6 py-10 shadow-shadow",
        className,
      )}
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <p className="font-heading text-xl">{brand}</p>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm font-heading">
          {links.map((link) => (
            <a key={link.label} href={link.href} className="underline">
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
