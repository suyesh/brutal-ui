import { Inbox } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

export default function EmptyDemo() {
  return (
    <Empty className="border-2 border-border shadow-shadow">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Inbox />
        </EmptyMedia>
        <EmptyTitle>No messages yet</EmptyTitle>
        <EmptyDescription>
          Your inbox is empty. Start a new conversation to see messages here.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button>Compose</Button>
      </EmptyContent>
    </Empty>
  )
}
