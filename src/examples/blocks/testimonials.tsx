import Testimonials from "@/components/blocks/testimonials"

export default function TestimonialsDemo() {
  return (
    <Testimonials
      // Customize the header copy.
      title="Voices from the brave."
      description="Teams that love bold interfaces keep coming back."
      // Each testimonial needs a quote, name, role, and optional avatarSrc.
      testimonials={[
        {
          quote: "The brutal look makes our product feel confident and alive.",
          name: "Nova Reyes",
          role: "Product Designer",
          avatarSrc: "https://i.pravatar.cc/100?img=12",
        },
        {
          quote: "We shipped a new landing in a weekend without pixel drama.",
          name: "Avery Chen",
          role: "Founder, Brightline",
          avatarSrc: "https://i.pravatar.cc/100?img=32",
        },
        {
          quote: "BrutalUI gives us a distinct visual edge without extra tooling.",
          name: "Miles Kato",
          role: "Creative Director",
          avatarSrc: "https://i.pravatar.cc/100?img=52",
        },
      ]}
    />
  )
}
