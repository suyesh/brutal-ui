import BlogCardGridDemo from "@/examples/blocks/blog-card-grid"
import CaseStudyCardDemo from "@/examples/blocks/case-study-card"
import CtaDemo from "@/examples/blocks/cta"
import FaqDemo from "@/examples/blocks/faq"
import FeatureGridDemo from "@/examples/blocks/feature-grid"
import FooterMultiDemo from "@/examples/blocks/footer-multi"
import FooterSimpleDemo from "@/examples/blocks/footer-simple"
import HeroBlockDemo from "@/examples/blocks/hero"
import HighlightedQuoteDemo from "@/examples/blocks/highlighted-quote"
import LogoMarqueeDemo from "@/examples/blocks/logo-marquee"
import NewsletterDemo from "@/examples/blocks/newsletter"
import PricingTableDemo from "@/examples/blocks/pricing-table"
import SectionHeaderDemo from "@/examples/blocks/section-header"
import StatsDemo from "@/examples/blocks/stats"
import TestimonialsDemo from "@/examples/blocks/testimonials"
import TimelineDemo from "@/examples/blocks/timeline"

type Block = {
  name: string
  exampleComponent: React.ComponentType
}

const BLOCKS: Block[] = [
  {
    name: "Hero",
    exampleComponent: HeroBlockDemo,
  },
  {
    name: "Feature Grid",
    exampleComponent: FeatureGridDemo,
  },
  {
    name: "Logo Marquee",
    exampleComponent: LogoMarqueeDemo,
  },
  {
    name: "Stats",
    exampleComponent: StatsDemo,
  },
  {
    name: "Testimonials",
    exampleComponent: TestimonialsDemo,
  },
  {
    name: "FAQ",
    exampleComponent: FaqDemo,
  },
  {
    name: "CTA",
    exampleComponent: CtaDemo,
  },
  {
    name: "Newsletter",
    exampleComponent: NewsletterDemo,
  },
  {
    name: "Section Header",
    exampleComponent: SectionHeaderDemo,
  },
  {
    name: "Pricing Table",
    exampleComponent: PricingTableDemo,
  },
  {
    name: "Timeline",
    exampleComponent: TimelineDemo,
  },
  {
    name: "Highlighted Quote",
    exampleComponent: HighlightedQuoteDemo,
  },
  {
    name: "Case Study Card",
    exampleComponent: CaseStudyCardDemo,
  },
  {
    name: "Blog Card Grid",
    exampleComponent: BlogCardGridDemo,
  },
  {
    name: "Footer Simple",
    exampleComponent: FooterSimpleDemo,
  },
  {
    name: "Footer Multi",
    exampleComponent: FooterMultiDemo,
  },
]

export default BLOCKS
