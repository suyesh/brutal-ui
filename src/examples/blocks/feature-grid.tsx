import FeatureGrid from "@/components/blocks/feature-grid"

export default function FeatureGridDemo() {
  return (
    <FeatureGrid
      // Customize the section headline and copy.
      title="Everything you need to ship loud."
      description="BrutalUI marketing blocks are designed to look strong on day one."
      // Each feature needs a title, description, and icon.
      features={[
        {
          title: "Copy-paste ready",
          description: "Every block ships as a clean React component.",
          icon: "✨",
        },
        {
          title: "Themeable tokens",
          description: "Swap the whole vibe with a single palette.",
          icon: "⚡",
        },
        {
          title: "Battle-tested layouts",
          description: "Marketing patterns you can drop into any product.",
          icon: "✅",
        },
      ]}
    />
  )
}
