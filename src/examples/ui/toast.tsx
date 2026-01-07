"use client"

import { Button } from "@/components/ui/button"
import { Toaster } from "@/components/ui/toaster"
import { toast } from "@/hooks/use-toast"

export default function ToastDemo() {
  return (
    <div className="flex items-center gap-4">
      <Button
        onClick={() =>
          toast({
            title: "Scheduled",
            description: "Your message will be sent shortly.",
          })
        }
      >
        Show toast
      </Button>
      <Toaster />
    </div>
  )
}
