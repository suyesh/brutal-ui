import CaseStudyCard from "@/components/blocks/case-study-card"

export default function CaseStudyCardDemo() {
  return (
    <CaseStudyCard
      // Customize the case study copy, metrics, and image.
      title="Glowline rebrand launch"
      summary="A brutal refresh that doubled engagement and tightened the narrative."
      category="Case study"
      imageUrl="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80"
      metrics={[
        { label: "Conversion", value: "+28%" },
        { label: "Launch time", value: "3 weeks" },
      ]}
      href="/docs"
    />
  )
}
