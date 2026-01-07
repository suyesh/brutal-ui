import { transformToSlug } from "@/lib/utils"

import BLOCKS from "./blocks"
import PRODUCT_UTILITY_BLOCKS from "./product-utility"
import COMPONENTS from "./components"

const COMPONENTS_LINKS = COMPONENTS.map((component) => {
  return {
    href: `/docs/${transformToSlug(component.name)}`,
    text: component.name,
  }
})

const BLOCKS_LINKS = BLOCKS.map((block) => {
  return {
    href: `/docs/${transformToSlug(block.name)}`,
    text: block.name,
  }
})

const PRODUCT_UTILITY_LINKS = PRODUCT_UTILITY_BLOCKS.map((block) => {
  return {
    href: `/docs/${transformToSlug(block.name)}`,
    text: block.name,
  }
})

const GETTING_STARTED_LINKS = [
  {
    href: "/docs",
    text: "Introduction",
  },
  {
    href: "/docs/installation",
    text: "Installation",
  },
  {
    href: "/docs/resources",
    text: "Resources",
  },
  {
    href: "/docs/changelog",
    text: "Changelog",
  },
  {
    href: "/styling",
    text: "Styling",
  },
  {
    href: "/charts",
    text: "Charts",
  },
  {
    href: "/stars",
    text: "Stars",
  },
]

const MAIN_SIDEBAR = [
  "Getting started",
  {
    href: "/docs",
    text: "Introduction",
  },
  {
    href: "/docs/installation",
    text: "Installation",
  },
  {
    href: "/docs/resources",
    text: "Resources",
  },
  {
    href: "/docs/changelog",
    text: "Changelog",
  },
  "Components",
  ...COMPONENTS_LINKS,
  "Prebuilt Blocks",
  ...BLOCKS_LINKS,
  "Product & Utility",
  ...PRODUCT_UTILITY_LINKS,
  "Stars",
  {
    href: "/docs/stars",
    text: "Installation",
  },
]

export {
  MAIN_SIDEBAR,
  COMPONENTS_LINKS,
  GETTING_STARTED_LINKS,
  BLOCKS_LINKS,
  PRODUCT_UTILITY_LINKS,
}
