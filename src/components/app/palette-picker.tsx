"use client"

import * as React from "react"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"

import { PALETTES } from "@/data/palettes"

export default function PalettePicker({ className }: { className?: string }) {
  const { resolvedTheme } = useTheme()
  const [active, setActive] = React.useState("soda")

  React.useEffect(() => {
    const saved = localStorage.getItem("palette") || "soda"
    document.documentElement.dataset.palette = saved
    setActive(saved)
  }, [])

  const handleSelect = (paletteId: string) => {
    document.documentElement.dataset.palette = paletteId
    localStorage.setItem("palette", paletteId)
    setActive(paletteId)
  }

  return (
    <div
      className={cn(
        "grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-2 sm:gap-3",
        className,
      )}
    >
      {PALETTES.map((palette) => {
        const isActive = palette.id === active
        const swatches =
          resolvedTheme === "dark" ? palette.darkSwatches : palette.swatches
        return (
          <button
            key={palette.id}
            type="button"
            aria-pressed={isActive}
            onClick={() => handleSelect(palette.id)}
            className={cn(
              "group relative flex items-center gap-2 rounded-base border-2 border-border bg-secondary-background px-2 py-1.5 text-left text-xs sm:text-sm font-base shadow-shadow transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none cursor-pointer",
              isActive && "bg-main text-main-foreground",
            )}
          >
            <span className="flex items-center gap-1.5">
              {swatches.map((color, index) => (
                <span
                  key={`${palette.id}-${index}`}
                  className="h-4 w-3 sm:h-5 sm:w-3.5 rounded-[4px] border-2 border-black"
                  style={{ backgroundColor: color }}
                />
              ))}
            </span>
            <span className="whitespace-nowrap">{palette.name}</span>
          </button>
        )
      })}
    </div>
  )
}
