import EmptyCollectionDemo from "@/examples/blocks/empty-collection"
import FileUploadDemo from "@/examples/blocks/file-upload"
import SearchResultsDemo from "@/examples/blocks/search-results"
import TagInputDemo from "@/examples/blocks/tag-input"
import ThemePickerDemo from "@/examples/blocks/theme-picker"

type UtilityBlock = {
  name: string
  exampleComponent: React.ComponentType
}

const PRODUCT_UTILITY_BLOCKS: UtilityBlock[] = [
  {
    name: "Search Results",
    exampleComponent: SearchResultsDemo,
  },
  {
    name: "Tag Input",
    exampleComponent: TagInputDemo,
  },
  {
    name: "File Upload",
    exampleComponent: FileUploadDemo,
  },
  {
    name: "Theme Picker",
    exampleComponent: ThemePickerDemo,
  },
  {
    name: "Empty Collection",
    exampleComponent: EmptyCollectionDemo,
  },
]

export default PRODUCT_UTILITY_BLOCKS
