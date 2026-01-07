import Hero from "@/components/blocks/hero"

export default function HeroBlockDemo() {
  return (
    <Hero
      // Swap these props to customize the hero content.
      eyebrow="BrutalUI"
      title="Ship bold marketing in hours."
      description="Marketing blocks that stay flexible across brands and products."
      // Action objects drive the buttons and their links.
      primaryAction={{ label: "Get started", href: "/docs" }}
      secondaryAction={{ label: "View components", href: "/docs/accordion" }}
      // Stats render as cards; each item is { label, value }.
      stats={[
        { label: "Templates", value: "24" },
        { label: "Teams", value: "1.2k" },
        { label: "Conversion", value: "+32%" },
      ]}
      // Replace this with any JSX to customize the right-side media panel.
      media={
        <div className="rounded-base border-2 border-border bg-main px-6 py-8 text-main-foreground shadow-shadow">
          <p className="text-sm uppercase">Launch-ready</p>
          <p className="mt-3 font-heading text-2xl">
            Brutal design, softer setup.
          </p>
        </div>
      }
    />
  )
}
