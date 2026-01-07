import FooterMulti from "@/components/blocks/footer-multi"

export default function FooterMultiDemo() {
  return (
    <FooterMulti
      // Customize brand copy and columns.
      brand="BrutalUI"
      description="A brutalist component library for bold interfaces."
      columns={[
        {
          title: "Product",
          links: [
            { label: "Components", href: "/docs/accordion" },
            { label: "Styling", href: "/styling" },
            { label: "Changelog", href: "/docs/changelog" },
          ],
        },
        {
          title: "Resources",
          links: [
            { label: "Docs", href: "/docs" },
            { label: "Stars", href: "/stars" },
            { label: "Charts", href: "/charts" },
          ],
        },
        {
          title: "Company",
          links: [
            { label: "About", href: "/docs" },
            { label: "Support", href: "/docs/resources" },
            { label: "Status", href: "/docs" },
          ],
        },
      ]}
    />
  )
}
