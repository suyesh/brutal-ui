import Stats from "@/components/blocks/stats"

export default function StatsDemo() {
  return (
    <Stats
      // Update the headline and supporting text.
      title="Numbers that speak loud."
      description="Bring quick proof to the top of the funnel with bold metrics."
      // Each stat needs a value and label. Description is optional.
      stats={[
        {
          value: "60+",
          label: "Components",
          description: "Shipping-ready primitives",
        },
        {
          value: "8",
          label: "Vibes",
          description: "Handpicked palettes",
        },
        {
          value: "2x",
          label: "Faster",
          description: "Less UI churn",
        },
      ]}
    />
  )
}
