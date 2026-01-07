 "use client"

import * as React from "react"

import { X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { cn } from "@/lib/utils"

type TagInputProps = {
  title?: string
  description?: string
  tags?: string[]
  placeholder?: string
  className?: string
}

const DEFAULT_TAGS = ["brutalist", "neon", "grid", "motion"]

export default function TagInput({
  title = "Tag / Chip input",
  description = "Use tags to classify content, filters, or product metadata.",
  tags = DEFAULT_TAGS,
  placeholder = "Add a tag",
  className,
}: TagInputProps) {
  const [items, setItems] = React.useState(tags)
  const [value, setValue] = React.useState("")

  const addTag = () => {
    const next = value.trim()
    if (!next || items.includes(next)) return
    setItems((prev) => [...prev, next])
    setValue("")
  }

  const removeTag = (tag: string) => {
    setItems((prev) => prev.filter((item) => item !== tag))
  }

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault()
      addTag()
    }
  }

  return (
    <section
      className={cn(
        "w-full border-2 border-border bg-secondary-background px-6 py-10 shadow-shadow",
        className,
      )}
    >
      <div className="space-y-6">
        <header className="space-y-2">
          <h2 className="font-heading text-2xl sm:text-3xl">{title}</h2>
          <p className="text-foreground sm:text-lg">{description}</p>
        </header>
        <div className="rounded-base border-2 border-border bg-background p-4 shadow-shadow">
          <div className="flex flex-wrap gap-2">
            {items.map((tag) => (
              <div
                key={tag}
                className="flex items-center gap-2 rounded-base border-2 border-border bg-main px-3 py-1 text-sm text-main-foreground"
              >
                <span>{tag}</span>
                <button
                  type="button"
                  aria-label={`Remove ${tag}`}
                  onClick={() => removeTag(tag)}
                >
                  <X className="size-3" />
                </button>
              </div>
            ))}
            <Input
              className="min-w-[140px] border-dashed"
              placeholder={placeholder}
              value={value}
              onChange={(event) => setValue(event.target.value)}
              onKeyDown={onKeyDown}
            />
            <Button size="sm" variant="reverse" type="button" onClick={addTag}>
              Add
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
