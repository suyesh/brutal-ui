import LogoMarquee from "@/components/blocks/logo-marquee"

export default function LogoMarqueeDemo() {
  return (
    <LogoMarquee
      // Update the headline or swap in your customer list.
      title="Loved by teams that ship bold."
      items={[
        "Antenna",
        "Monolith",
        "Brightline",
        "Orbit",
        "Synthwave",
        "Pyramid",
      ]}
    />
  )
}
