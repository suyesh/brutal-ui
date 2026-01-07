import { cn } from "@/lib/utils"

type FooterColumn = {
  title: string
  links: { label: string; href: string }[]
}

type FooterMultiProps = {
  brand?: string
  description?: string
  columns?: FooterColumn[]
  className?: string
}

const DEFAULT_COLUMNS: FooterColumn[] = [
  {
    title: "Product",
    links: [
      { label: "Components", href: "/docs/accordion" },
      { label: "Styling", href: "/styling" },
      { label: "Changelog", href: "/docs/changelog" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Docs", href: "/docs" },
      { label: "Stars", href: "/stars" },
      { label: "Charts", href: "/charts" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/docs" },
      { label: "Support", href: "/docs/resources" },
      { label: "Status", href: "/docs" },
    ],
  },
]

export default function FooterMulti({
  brand = "BrutalUI",
  description = "A brutalist component library for bold interfaces.",
  columns = DEFAULT_COLUMNS,
  className,
}: FooterMultiProps) {
  return (
    <footer
      className={cn(
        "w-full border-2 border-border bg-secondary-background px-6 py-10 shadow-shadow",
        className,
      )}
    >
      <div className="grid gap-8 lg:grid-cols-[1.2fr_1.8fr]">
        <div className="space-y-3">
          <p className="font-heading text-xl">{brand}</p>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {columns.map((column) => (
            <div key={column.title} className="space-y-3">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                {column.title}
              </p>
              <div className="flex flex-col gap-2 text-sm font-heading">
                {column.links.map((link) => (
                  <a key={link.label} href={link.href} className="underline">
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}
