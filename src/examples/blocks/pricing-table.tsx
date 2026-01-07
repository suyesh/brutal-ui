import PricingTable from "@/components/blocks/pricing-table"

export default function PricingTableDemo() {
  return (
    <PricingTable
      // Customize headline copy and tiers.
      title="Pricing that scales with your ambition."
      description="Pick a plan that matches your pace."
      tiers={[
        {
          name: "Starter",
          price: "$0",
          description: "For quick experiments and brutal prototypes.",
          features: [
            "All core components",
            "Marketing blocks",
            "Community support",
          ],
          ctaLabel: "Get started",
          ctaHref: "/docs",
        },
        {
          name: "Studio",
          price: "$29",
          description: "For teams building product-ready experiences.",
          features: [
            "Everything in Starter",
            "Priority updates",
            "Advanced themes",
          ],
          highlight: true,
          ctaLabel: "Start trial",
          ctaHref: "/docs",
        },
        {
          name: "Agency",
          price: "$79",
          description: "For shipping multiple client experiences.",
          features: [
            "Everything in Studio",
            "Team onboarding",
            "Brand review",
          ],
          ctaLabel: "Contact sales",
          ctaHref: "/docs",
        },
      ]}
    />
  )
}
