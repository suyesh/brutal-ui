import { MetadataRoute } from "next"

import BLOCKS from "@/data/blocks"
import COMPONENTS from "@/data/components"
import PRODUCT_UTILITY_BLOCKS from "@/data/product-utility"

import { transformToSlug } from "@/lib/utils"

const root = "https://brutalui.dev"

const DOCS_PAGES = [
  "/docs",
  "/docs/resources",
  "/docs/changelog",
  "/docs/installation",
  "/docs/stars",
  "/stars",
  "/styling",
  "/charts",
]

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: root,
      lastModified: new Date(),
      priority: 1,
    },
    ...DOCS_PAGES.map((page) => ({
      url: root + page,
      lastModified: new Date(),
      priority: 1,
    })),
    ...COMPONENTS.map((page) => ({
      url: root + "/docs/" + transformToSlug(page.name),
      lastModified: new Date(),
      priority: 0.8,
    })),
    ...BLOCKS.map((page) => ({
      url: root + "/docs/" + transformToSlug(page.name),
      lastModified: new Date(),
      priority: 0.8,
    })),
    ...PRODUCT_UTILITY_BLOCKS.map((page) => ({
      url: root + "/docs/" + transformToSlug(page.name),
      lastModified: new Date(),
      priority: 0.8,
    })),
  ]
}
