import Timeline from "@/components/blocks/timeline"

export default function TimelineDemo() {
  return (
    <Timeline
      // Update the timeline headline and steps.
      title="Your brutalist build flow."
      description="Highlight key steps or milestones for your product."
      steps={[
        {
          title: "Pick a vibe",
          description: "Choose a palette that matches your brand energy.",
        },
        {
          title: "Drop the blocks",
          description: "Copy the blocks you need and customize the props.",
        },
        {
          title: "Ship fast",
          description: "Launch bold layouts without losing speed.",
        },
      ]}
    />
  )
}
