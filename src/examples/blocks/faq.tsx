import Faq from "@/components/blocks/faq"

export default function FaqDemo() {
  return (
    <Faq
      // Customize the FAQ header copy.
      title="Frequently asked, boldly answered."
      description="Quick answers for the most common BrutalUI questions."
      // Each item needs a question and answer.
      items={[
        {
          question: "Is BrutalUI free to use?",
          answer:
            "Yes. The core library and marketing blocks are free and open-source.",
        },
        {
          question: "Can I customize the colors?",
          answer:
            "Absolutely. The entire system runs on CSS variables, so any palette works.",
        },
        {
          question: "Is this tied to a specific framework?",
          answer:
            "The components are React-first, but you can adapt them for any stack.",
        },
      ]}
    />
  )
}
