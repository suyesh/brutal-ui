import { Button } from "@/components/ui/button"

import { cn } from "@/lib/utils"

type BlogCard = {
  title: string
  excerpt: string
  author: string
  date: string
  imageUrl: string
  href: string
}

type BlogCardGridProps = {
  title?: string
  description?: string
  posts?: BlogCard[]
  className?: string
}

const DEFAULT_POSTS: BlogCard[] = [
  {
    title: "Designing with brutal honesty",
    excerpt: "Why louder interfaces can still feel controlled and elegant.",
    author: "Suyesh Bhandari",
    date: "Dec 10, 2025",
    imageUrl: "https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?auto=format&fit=crop&w=900&q=80",
    href: "/docs",
  },
  {
    title: "The palette playbook",
    excerpt: "How to craft vibrant palettes without losing legibility.",
    author: "Nova Reyes",
    date: "Dec 12, 2025",
    imageUrl: "https://images.unsplash.com/photo-1487611459768-bd414656ea10?auto=format&fit=crop&w=900&q=80",
    href: "/docs",
  },
  {
    title: "Shipping UI without fatigue",
    excerpt: "Reusable systems that keep shipping teams energized.",
    author: "Avery Chen",
    date: "Dec 20, 2025",
    imageUrl: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&w=900&q=80",
    href: "/docs",
  },
]

export default function BlogCardGrid({
  title = "Latest from BrutalUI",
  description = "Short reads from the front lines of brutalist product design.",
  posts = DEFAULT_POSTS,
  className,
}: BlogCardGridProps) {
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
        <div className="grid gap-4 lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.title}
              className="flex h-full flex-col overflow-hidden rounded-base border-2 border-border bg-background shadow-shadow"
            >
              <img
                className="h-40 w-full object-cover"
                src={post.imageUrl}
                alt={post.title}
                loading="lazy"
              />
              <div className="flex flex-1 flex-col gap-3 p-5">
                <div className="text-xs uppercase tracking-wide text-muted-foreground">
                  {post.author} · {post.date}
                </div>
                <h3 className="font-heading text-lg">{post.title}</h3>
                <p className="text-sm text-muted-foreground">{post.excerpt}</p>
                <div className="mt-auto">
                  <Button variant="reverse" asChild>
                    <a href={post.href}>Read article</a>
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
