"use client"

import { useLayoutEffect, useState } from "react"
import { useTheme } from "next-themes"

import colors from "@/data/colors"
import { PALETTES } from "@/data/palettes"

import { Pre } from "@/components/app/pre"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { cn } from "@/lib/utils"

export default function Styling() {
  const { resolvedTheme } = useTheme()
  const themeVarNames = [
    "background",
    "secondary-background",
    "foreground",
    "main-foreground",
    "main",
    "border",
    "ring",
    "overlay",
    "chart-1",
    "chart-2",
    "chart-3",
    "chart-4",
    "chart-5",
    "chart-active-dot",
  ] as const

  type ThemeVarName = (typeof themeVarNames)[number]
  type ThemeVars = Record<ThemeVarName, string>

  const defaultColorPalette = colors[10]

  const [
    {
      bg,
      darkBg,
      darkMain,
      main,
      name,
      chart1,
      chart2,
      chart3,
      chart4,
      chart5,
      darkChart1,
      darkChart2,
      darkChart3,
      darkChart4,
      darkChart5,
    },
    setColor,
  ] = useState(defaultColorPalette)
  const [borderRadius, setBorderRadius] = useState(5)
  const [boxShadowLength, setBoxShadowLength] = useState([4, 4])
  const [fontWeight, setFontWeight] = useState([700, 500])
  const [activeTheme, setActiveTheme] = useState<{
    kind: "palette" | "color"
    value: string
  }>({ kind: "palette", value: "soda" })
  const [themeVars, setThemeVars] = useState<{
    light: ThemeVars
    dark: ThemeVars
  } | null>(null)

  const readThemeVars = (root: HTMLElement): ThemeVars => {
    const styles = getComputedStyle(root)

    return themeVarNames.reduce((acc, name) => {
      acc[name] = styles.getPropertyValue(`--${name}`).trim()
      return acc
    }, {} as ThemeVars)
  }

  const readVarsForMode = (root: HTMLElement, mode: "light" | "dark") => {
    const wasDark = root.classList.contains("dark")
    const shouldBeDark = mode === "dark"

    if (shouldBeDark !== wasDark) {
      root.classList.toggle("dark", shouldBeDark)
    }

    const vars = readThemeVars(root)

    if (shouldBeDark !== wasDark) {
      root.classList.toggle("dark", wasDark)
    }

    return vars
  }

  const syncThemeVars = () => {
    const root = document.documentElement

    setThemeVars({
      light: readVarsForMode(root, "light"),
      dark: readVarsForMode(root, "dark"),
    })
  }

  const clearThemeOverrides = (root: HTMLElement) => {
    themeVarNames.forEach((name) => {
      root.style.removeProperty(`--${name}`)
    })

    root.style.removeProperty("--dark-background")
    root.style.removeProperty("--dark-main")
    root.style.removeProperty("--light-background")
    root.style.removeProperty("--light-main")
  }

  useLayoutEffect(() => {
    const palette = localStorage.getItem("palette") || "soda"
    const colorObj = JSON.parse(localStorage.getItem("color") as string)
    const borderRadius = Number(localStorage.getItem("borderRadius"))
    const boxShadow = localStorage.getItem("boxShadow")?.split(",")
    const fontWeight = localStorage.getItem("fontWeight")?.split(",")

    if (colorObj) {
      setColor(colorObj)
      if (colorObj?.name) {
        setActiveTheme({ kind: "color", value: colorObj.name })
      }
    } else {
      const root = document.documentElement
      const lightVars = readVarsForMode(root, "light")
      const darkVars = readVarsForMode(root, "dark")

      setColor({
        name: "",
        bg: lightVars["background"],
        main: lightVars["main"],
        chart1: lightVars["chart-1"],
        chart2: lightVars["chart-2"],
        chart3: lightVars["chart-3"],
        chart4: lightVars["chart-4"],
        chart5: lightVars["chart-5"],
        darkBg: darkVars["background"],
        darkMain: darkVars["main"],
        darkChart1: darkVars["chart-1"],
        darkChart2: darkVars["chart-2"],
        darkChart3: darkVars["chart-3"],
        darkChart4: darkVars["chart-4"],
        darkChart5: darkVars["chart-5"],
      })

      setActiveTheme({ kind: "palette", value: palette })
    }

    if (borderRadius) {
      setBorderRadius(borderRadius)
    }

    if (boxShadow) {
      setBoxShadowLength([+boxShadow[0], +boxShadow[1]])
    }

    if (fontWeight) {
      setFontWeight([+fontWeight[0], +fontWeight[1]])
    }

    syncThemeVars()
  }, [])

  const updateColor = (value: string) => {
    const r = window.document.querySelector(":root") as HTMLElement
    const color = colors.find((color) => color.name === value)!

    setColor(color)
    setActiveTheme({ kind: "color", value })

    localStorage.setItem("color", JSON.stringify(color))

    const isDarkMode = document.documentElement.classList.contains("dark")

    if (isDarkMode) {
      r.style.setProperty("--background", color.darkBg)
      r.style.setProperty("--main", color.darkMain)
      r.style.setProperty("--chart-1", color.darkChart1)
      r.style.setProperty("--chart-2", color.darkChart2)
      r.style.setProperty("--chart-3", color.darkChart3)
      r.style.setProperty("--chart-4", color.darkChart4)
      r.style.setProperty("--chart-5", color.darkChart5)
    } else {
      r.style.setProperty("--background", color.bg)
      r.style.setProperty("--main", color.main)
      r.style.setProperty("--chart-1", color.chart1)
      r.style.setProperty("--chart-2", color.chart2)
      r.style.setProperty("--chart-3", color.chart3)
      r.style.setProperty("--chart-4", color.chart4)
      r.style.setProperty("--chart-5", color.chart5)
    }

    r.style.setProperty("--dark-background", color.darkBg)
    r.style.setProperty("--dark-main", color.darkMain)
    r.style.setProperty("--light-background", color.bg)
    r.style.setProperty("--light-main", color.main)

    syncThemeVars()
  }

  const updatePalette = (paletteId: string) => {
    const root = document.documentElement

    root.dataset.palette = paletteId
    localStorage.setItem("palette", paletteId)
    localStorage.removeItem("color")

    clearThemeOverrides(root)

    const lightVars = readVarsForMode(root, "light")
    const darkVars = readVarsForMode(root, "dark")

    root.style.setProperty("--light-background", lightVars.background)
    root.style.setProperty("--light-main", lightVars.main)
    root.style.setProperty("--dark-background", darkVars.background)
    root.style.setProperty("--dark-main", darkVars.main)

    setActiveTheme({ kind: "palette", value: paletteId })
    syncThemeVars()
  }

  const updateBorderRadius = (value: number) => {
    const r = window.document.querySelector(":root") as HTMLElement
    r.style.setProperty("--border-radius", `${value}px`)

    localStorage.setItem("borderRadius", value.toString())

    setBorderRadius(value)
  }

  const updateHorizontalBoxShadow = (value: number) => {
    const r = window.document.querySelector(":root") as HTMLElement
    r.style.setProperty("--box-shadow-x", value + "px")

    setBoxShadowLength([value, boxShadowLength[1]])

    localStorage.setItem("boxShadow", `${value},${boxShadowLength[1]}`)
  }

  const updateVerticalBoxShadow = (value: number) => {
    const r = window.document.querySelector(":root") as HTMLElement
    r.style.setProperty("--box-shadow-y", value + "px")

    setBoxShadowLength([boxShadowLength[0], value])

    localStorage.setItem("boxShadow", `${boxShadowLength[0]},${value}`)
  }

  const updateHeadingFontWeight = (value: number) => {
    const r = window.document.querySelector(":root") as HTMLElement
    r.style.setProperty("--heading-font-weight", `${value}`)

    setFontWeight([value, fontWeight[1]])

    localStorage.setItem("fontWeight", `${value},${fontWeight[1]}`)
  }

  const updateBaseFontWeight = (value: number) => {
    const r = window.document.querySelector(":root") as HTMLElement
    r.style.setProperty("--base-font-weight", `${value}`)

    setFontWeight([fontWeight[0], value])

    localStorage.setItem("fontWeight", `${fontWeight[0]},${value}`)
  }

  const handleThemeSelect = (value: string) => {
    const [kind, id] = value.split(":")

    if (kind === "palette") {
      updatePalette(id)
    } else {
      updateColor(id)
    }
  }

  const resetStyling = () => {
    const r = window.document.querySelector(":root") as HTMLElement

    updateColor(defaultColorPalette.name)

    r.style.setProperty("--border-radius", "5px")
    r.style.setProperty("--box-shadow-x", "4px")
    r.style.setProperty("--box-shadow-y", "4px")
    r.style.setProperty("--heading-font-weight", "700")
    r.style.setProperty("--base-font-weight", "500")

    setColor(defaultColorPalette)
    setBorderRadius(5)
    setBoxShadowLength([4, 4])
    setFontWeight([700, 500])

    localStorage.clear()
  }

  const selectedThemeValue = `${activeTheme.kind}:${activeTheme.value}`

  const lightVars: ThemeVars = themeVars?.light ?? {
    background: bg,
    "secondary-background": "oklch(100% 0 0)",
    foreground: "oklch(0% 0 0)",
    "main-foreground": "oklch(0% 0 0)",
    main: main,
    border: "oklch(0% 0 0)",
    ring: "oklch(0% 0 0)",
    overlay: "oklch(0% 0 0 / 0.8)",
    "chart-1": chart1,
    "chart-2": chart2,
    "chart-3": chart3,
    "chart-4": chart4,
    "chart-5": chart5,
    "chart-active-dot": "#000",
  }

  const darkVars: ThemeVars = themeVars?.dark ?? {
    background: darkBg,
    "secondary-background": "oklch(23.93% 0 0)",
    foreground: "oklch(92.49% 0 0)",
    "main-foreground": "oklch(0% 0 0)",
    main: darkMain,
    border: "oklch(0% 0 0)",
    ring: "oklch(100% 0 0)",
    overlay: "oklch(0% 0 0 / 0.8)",
    "chart-1": darkChart1,
    "chart-2": darkChart2,
    "chart-3": darkChart3,
    "chart-4": darkChart4,
    "chart-5": darkChart5,
    "chart-active-dot": "#fff",
  }

  const styling = `@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

:root {
  --background: ${lightVars["background"]};
  --secondary-background: ${lightVars["secondary-background"]};
  --foreground: ${lightVars["foreground"]};
  --main-foreground: ${lightVars["main-foreground"]};
  --main: ${lightVars["main"]};
  --border: ${lightVars["border"]};
  --ring: ${lightVars["ring"]};
  --overlay: ${lightVars["overlay"]};
  --shadow: ${boxShadowLength[0]}px ${boxShadowLength[1]}px 0px 0px var(--border);
  --chart-1: ${lightVars["chart-1"]};
  --chart-2: ${lightVars["chart-2"]};
  --chart-3: ${lightVars["chart-3"]};
  --chart-4: ${lightVars["chart-4"]};
  --chart-5: ${lightVars["chart-5"]};
  --chart-active-dot: ${lightVars["chart-active-dot"]};
}

.dark {
  --background: ${darkVars["background"]};
  --secondary-background: ${darkVars["secondary-background"]};
  --foreground: ${darkVars["foreground"]};
  --main-foreground: ${darkVars["main-foreground"]};
  --main: ${darkVars["main"]};
  --border: ${darkVars["border"]};
  --ring: ${darkVars["ring"]};
  --shadow: ${boxShadowLength[0]}px ${boxShadowLength[1]}px 0px 0px var(--border);
  --chart-1: ${darkVars["chart-1"]};
  --chart-2: ${darkVars["chart-2"]};
  --chart-3: ${darkVars["chart-3"]};
  --chart-4: ${darkVars["chart-4"]};
  --chart-5: ${darkVars["chart-5"]};
  --chart-active-dot: ${darkVars["chart-active-dot"]};
}

@theme inline {
  --color-main: var(--main);
  --color-background: var(--background);
  --color-secondary-background: var(--secondary-background);
  --color-foreground: var(--foreground);
  --color-main-foreground: var(--main-foreground);
  --color-border: var(--border);
  --color-overlay: var(--overlay);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);

  --spacing-boxShadowX: ${boxShadowLength[0]}px;
  --spacing-boxShadowY: ${boxShadowLength[1]}px;
  --spacing-reverseBoxShadowX: -${boxShadowLength[0]}px;
  --spacing-reverseBoxShadowY: -${boxShadowLength[1]}px;
  --radius-base: ${borderRadius}px;
  --shadow-shadow: var(--shadow);
  --font-weight-base: ${fontWeight[1]};
  --font-weight-heading: ${fontWeight[0]};
}
  
@layer base {
  body {
    @apply text-foreground font-base bg-background;
  }

  h1, h2, h3, h4, h5, h6{
    @apply font-heading;
  }
}`

  return (
    <div className="flex items-center justify-center gap-4">
      <Sheet>
        <SheetTrigger asChild>
          <Button>Customize</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Customize styling</SheetTitle>
          </SheetHeader>
          <div className="grid flex-1 auto-rows-min overflow-y-auto gap-4 px-4">
            <div className="grid gap-3">
              <Label htmlFor="color">Vibe</Label>
              <Select value={selectedThemeValue} onValueChange={handleThemeSelect}>
                <SelectTrigger
                  id="color"
                  className="bg-secondary-background text-foreground"
                >
                  <SelectValue placeholder="Select a color" />
                </SelectTrigger>
                <SelectContent className="bg-secondary-background text-foreground">
                  <SelectGroup>
                    <SelectLabel>Vibes</SelectLabel>
                    {PALETTES.map((palette) => {
                      const swatches =
                        resolvedTheme === "dark"
                          ? palette.darkSwatches
                          : palette.swatches

                      return (
                        <SelectItem
                          key={palette.id}
                          value={`palette:${palette.id}`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="flex items-center gap-1.5">
                              {swatches.map((color, index) => (
                                <span
                                  key={`${palette.id}-${index}`}
                                  className="h-4 w-3 rounded-[4px] border-2 border-black"
                                  style={{ backgroundColor: color }}
                                />
                              ))}
                            </span>
                            {palette.name}
                          </div>
                        </SelectItem>
                      )
                    })}
                  </SelectGroup>
                  <SelectSeparator />
                  <SelectGroup>
                    <SelectLabel>More vibes</SelectLabel>
                    {colors.map(({ name, main }) => (
                      <SelectItem key={name} value={`color:${name}`}>
                        <div className="flex items-center gap-2">
                          <div
                            className="size-4 rounded-full border-2 border-border"
                            style={{ backgroundColor: main }}
                          />
                          {name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="border-radius">Border Radius</Label>
              <div className="grid grid-cols-4 gap-2">
                {[0, 5, 10, 15].map((btn) => (
                  <Button
                    onClick={() => updateBorderRadius(btn)}
                    className={cn(
                      "h-8",
                      borderRadius === btn
                        ? "bg-main text-main-foreground"
                        : "bg-secondary-background text-foreground",
                    )}
                    key={btn}
                    variant="noShadow"
                  >
                    {`${btn} px`}
                  </Button>
                ))}
              </div>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="border-radius">Horizontal Box Shadow</Label>
              <div className="grid grid-cols-5 gap-2">
                {[-4, -2, 0, 2, 4].map((btn) => (
                  <Button
                    onClick={() => updateHorizontalBoxShadow(btn)}
                    className={cn(
                      "h-8",
                      boxShadowLength[0] === btn
                        ? "bg-main text-main-foreground"
                        : "bg-secondary-background text-foreground",
                    )}
                    key={btn}
                    variant="noShadow"
                  >
                    {`${btn} px`}
                  </Button>
                ))}
              </div>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="border-radius">Vertical Box Shadow</Label>
              <div className="grid grid-cols-5 gap-2">
                {[-4, -2, 0, 2, 4].map((btn) => (
                  <Button
                    onClick={() => updateVerticalBoxShadow(btn)}
                    className={cn(
                      "h-8",
                      boxShadowLength[1] === btn
                        ? "bg-main text-main-foreground"
                        : "bg-secondary-background text-foreground",
                    )}
                    key={btn}
                    variant="noShadow"
                  >
                    {`${btn} px`}
                  </Button>
                ))}
              </div>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="border-radius">Heading Font Weight</Label>
              <div className="grid grid-cols-3 gap-2">
                {[700, 800, 900].map((btn) => (
                  <Button
                    onClick={() => updateHeadingFontWeight(btn)}
                    className={cn(
                      "h-8",
                      fontWeight[0] === btn
                        ? "bg-main text-main-foreground"
                        : "bg-secondary-background text-foreground",
                    )}
                    key={btn}
                    variant="noShadow"
                  >
                    {btn}
                  </Button>
                ))}
              </div>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="border-radius">Base Font Weight</Label>
              <div className="grid grid-cols-3 gap-2">
                {[500, 600, 700].map((btn) => (
                  <Button
                    onClick={() => updateBaseFontWeight(btn)}
                    className={cn(
                      "h-8",
                      fontWeight[1] === btn
                        ? "bg-main text-main-foreground"
                        : "bg-secondary-background text-foreground",
                    )}
                    key={btn}
                    variant="noShadow"
                  >
                    {btn}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button>Save changes</Button>
            </SheetClose>
            <Button variant="neutral" onClick={resetStyling}>
              Reset
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="neutral">Copy</Button>
        </DialogTrigger>
        <DialogContent className="max-w-full">
          <DialogHeader>
            <DialogTitle>Theming</DialogTitle>
            <DialogDescription>
              Copy the styling to your globals.css file.
            </DialogDescription>
          </DialogHeader>
          <Pre
            wrapperClassName="w-full max-w-full text-white overflow-x-auto"
            __rawstring__={styling}
          >
            {styling}
          </Pre>
        </DialogContent>
      </Dialog>
    </div>
  )
}
