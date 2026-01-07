import TagInput from "@/components/blocks/tag-input"

export default function TagInputDemo() {
  return (
    <TagInput
      // Update tag list and placeholder.
      title="Tag / Chip input"
      description="Use tags to classify content, filters, or metadata."
      tags={["brutal", "gen-z", "contrast", "launch"]}
      placeholder="Type a tag and press Enter"
    />
  )
}
