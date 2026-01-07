import FooterSimple from "@/components/blocks/footer-simple"

export default function FooterSimpleDemo() {
  return (
    <FooterSimple
      // Customize brand copy and links.
      brand="BrutalUI"
      description="A brutalist component library for bold interfaces."
      links={[
        { label: "Docs", href: "/docs" },
        { label: "Components", href: "/docs/accordion" },
        { label: "Changelog", href: "/docs/changelog" },
      ]}
    />
  )
}
