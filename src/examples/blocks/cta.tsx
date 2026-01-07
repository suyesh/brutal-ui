import Cta from "@/components/blocks/cta"

export default function CtaDemo() {
  return (
    <Cta
      // Customize the CTA headline and message.
      title="Ready to go brutal?"
      description="Drop these blocks into your next page and ship with confidence."
      // Each action needs a label and href.
      primaryAction={{ label: "Get started", href: "/docs" }}
      secondaryAction={{ label: "View components", href: "/docs/accordion" }}
    />
  )
}
