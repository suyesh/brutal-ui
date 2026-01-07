import Newsletter from "@/components/blocks/newsletter"

export default function NewsletterDemo() {
  return (
    <Newsletter
      // Customize the copy and call-to-action text.
      title="Stay in the loop."
      description="Get BrutalUI updates, new blocks, and bold UI tips."
      placeholder="you@brand.com"
      buttonLabel="Join the list"
    />
  )
}
