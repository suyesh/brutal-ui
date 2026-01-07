import BlogCardGrid from "@/components/blocks/blog-card-grid"

export default function BlogCardGridDemo() {
  return (
    <BlogCardGrid
      // Update section copy and posts.
      title="Latest from BrutalUI"
      description="Short reads from the front lines of brutalist product design."
      posts={[
        {
          title: "Designing with brutal honesty",
          excerpt: "Why louder interfaces can still feel controlled and elegant.",
          author: "Suyesh Bhandari",
          date: "Dec 10, 2025",
          imageUrl:
            "https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?auto=format&fit=crop&w=900&q=80",
          href: "/docs",
        },
        {
          title: "The palette playbook",
          excerpt: "How to craft vibrant palettes without losing legibility.",
          author: "Nova Reyes",
          date: "Dec 12, 2025",
          imageUrl:
            "https://images.unsplash.com/photo-1487611459768-bd414656ea10?auto=format&fit=crop&w=900&q=80",
          href: "/docs",
        },
        {
          title: "Shipping UI without fatigue",
          excerpt: "Reusable systems that keep shipping teams energized.",
          author: "Avery Chen",
          date: "Dec 20, 2025",
          imageUrl:
            "https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&w=900&q=80",
          href: "/docs",
        },
      ]}
    />
  )
}
