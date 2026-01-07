import PalettePicker from "@/components/app/palette-picker"

import { cn } from "@/lib/utils"

type ThemePickerProps = {
  title?: string
  description?: string
  className?: string
}

export default function ThemePicker({
  title = "Pick a vibe",
  description = "Switch palettes instantly to match the mood of your brand.",
  className,
}: ThemePickerProps) {
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
        <PalettePicker className="w-full max-w-md" />
      </div>
    </section>
  )
}
