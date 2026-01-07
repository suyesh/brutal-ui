import { Quote } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { cn } from "@/lib/utils"

type Testimonial = {
  quote: string
  name: string
  role: string
  avatarSrc?: string
  avatarAlt?: string
}

type TestimonialsProps = {
  title?: string
  description?: string
  testimonials?: Testimonial[]
  className?: string
}

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    quote: "The brutal look makes our product feel confident and alive.",
    name: "Nova Reyes",
    role: "Product Designer",
    avatarSrc: "https://i.pravatar.cc/100?img=12",
    avatarAlt: "Nova Reyes",
  },
  {
    quote: "We shipped a new landing in a weekend without pixel drama.",
    name: "Avery Chen",
    role: "Founder, Brightline",
    avatarSrc: "https://i.pravatar.cc/100?img=32",
    avatarAlt: "Avery Chen",
  },
  {
    quote: "BrutalUI gives us a distinct visual edge without extra tooling.",
    name: "Miles Kato",
    role: "Creative Director",
    avatarSrc: "https://i.pravatar.cc/100?img=52",
    avatarAlt: "Miles Kato",
  },
]

export default function Testimonials({
  title = "Voices from the brave.",
  description = "Teams that love bold interfaces keep coming back for the BrutalUI flow.",
  testimonials = DEFAULT_TESTIMONIALS,
  className,
}: TestimonialsProps) {
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
        <div className="grid gap-4 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="rounded-base border-2 border-border bg-background p-6 shadow-shadow"
            >
              <div className="flex size-10 items-center justify-center rounded-base border-2 border-border bg-main text-main-foreground">
                <Quote className="size-4" />
              </div>
              <p className="mt-4 text-sm text-foreground">
                “{testimonial.quote}”
              </p>
              <div className="mt-4 flex items-center gap-3">
                <Avatar className="size-12 border-2 border-border bg-main">
                  {testimonial.avatarSrc ? (
                    <>
                      <AvatarImage
                        src={testimonial.avatarSrc}
                        alt={testimonial.avatarAlt ?? testimonial.name}
                        className="object-cover"
                      />
                      <span className="pointer-events-none absolute inset-0 bg-main/30 mix-blend-multiply" />
                    </>
                  ) : (
                    <AvatarFallback className="bg-main text-main-foreground">
                      {testimonial.name
                        .split(" ")
                        .map((part) => part[0])
                        .slice(0, 2)
                        .join("")}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <p className="font-heading">{testimonial.name}</p>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
