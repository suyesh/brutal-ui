import { AspectRatio } from "@/components/ui/aspect-ratio"

export default function AspectRatioDemo() {
  return (
    <AspectRatio ratio={16 / 9} className="w-full max-w-[360px]">
      <div className="flex h-full w-full items-center justify-center rounded-base border-2 border-border bg-secondary-background text-foreground">
        16:9
      </div>
    </AspectRatio>
  )
}
