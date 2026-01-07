import { Separator } from "@/components/ui/separator"

export default function SeparatorDemo() {
  return (
    <div className="flex w-full max-w-[300px] items-center gap-4">
      <span className="text-sm font-base">Left</span>
      <Separator className="flex-1" />
      <span className="text-sm font-base">Right</span>
    </div>
  )
}
