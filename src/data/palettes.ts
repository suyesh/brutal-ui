export type Palette = {
  id: string
  name: string
  swatches: [string, string, string]
  darkSwatches: [string, string, string]
}

export const PALETTES: Palette[] = [
  {
    id: "neon",
    name: "Neon Drift",
    swatches: ["#00c2ff", "#ff6ad5", "#f4f2ff"],
    darkSwatches: ["#00c2ff", "#ff6ad5", "#14101c"],
  },
  {
    id: "soda",
    name: "Soda Pop",
    swatches: ["#ff5d5d", "#2ec4b6", "#fff4e6"],
    darkSwatches: ["#ff5d5d", "#2ec4b6", "#1a1412"],
  },
  {
    id: "pixel",
    name: "Pixel Club",
    swatches: ["#5b7cfa", "#ffb347", "#f8f6ff"],
    darkSwatches: ["#5b7cfa", "#ffb347", "#131227"],
  },
  {
    id: "matcha",
    name: "Matcha Neon",
    swatches: ["#6eeb83", "#3a86ff", "#f7fff7"],
    darkSwatches: ["#6eeb83", "#3a86ff", "#0f1a12"],
  },
  {
    id: "candy",
    name: "Candy Graphite",
    swatches: ["#ff6ad5", "#7af4f8", "#f2f2f2"],
    darkSwatches: ["#ff6ad5", "#7af4f8", "#1c1c1c"],
  },
  {
    id: "hyper",
    name: "Hyperwave",
    swatches: ["#7c5cff", "#ff7bd5", "#fff2f8"],
    darkSwatches: ["#7c5cff", "#ff7bd5", "#15101b"],
  },
  {
    id: "mono",
    name: "Mono Minimal",
    swatches: ["#111111", "#d6d6d6", "#f8f8f8"],
    darkSwatches: ["#f5f5f5", "#2a2a2a", "#0f0f0f"],
  },
  {
    id: "bumble",
    name: "Bumble Pop",
    swatches: ["#f1c40f", "#111111", "#fff7cc"],
    darkSwatches: ["#f1c40f", "#111111", "#15120a"],
  },
]
