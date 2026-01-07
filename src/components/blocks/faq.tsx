import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import { cn } from "@/lib/utils"

type FaqItem = {
  question: string
  answer: string
}

type FaqProps = {
  title?: string
  description?: string
  items?: FaqItem[]
  className?: string
}

const DEFAULT_ITEMS: FaqItem[] = [
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
]

export default function Faq({
  title = "Frequently asked, boldly answered.",
  description = "Quick answers for the most common BrutalUI questions.",
  items = DEFAULT_ITEMS,
  className,
}: FaqProps) {
  return (
    <section
      className={cn(
        "w-full border-2 border-border bg-secondary-background px-6 py-10 shadow-shadow",
        className,
      )}
    >
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-4">
          <h2 className="font-heading text-2xl sm:text-3xl">{title}</h2>
          <p className="text-foreground sm:text-lg">{description}</p>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {items.map((item) => (
            <AccordionItem
              key={item.question}
              value={item.question}
              className="border-2 border-border shadow-shadow"
            >
              <AccordionTrigger className="text-left">
                {item.question}
              </AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
