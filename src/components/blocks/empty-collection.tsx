import { Clock, Inbox, Zap } from "lucide-react"

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

import { cn } from "@/lib/utils"

type EmptyCollectionProps = {
  title?: string
  description?: string
  className?: string
}

export default function EmptyCollection({
  title = "Empty state collection",
  description = "Use empty states to guide users when there’s no data yet.",
  className,
}: EmptyCollectionProps) {
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
        <div className="grid gap-4 lg:grid-cols-3">
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Inbox />
              </EmptyMedia>
              <EmptyTitle>No files yet</EmptyTitle>
              <EmptyDescription>
                Upload your first file to get started.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Clock />
              </EmptyMedia>
              <EmptyTitle>No activity</EmptyTitle>
              <EmptyDescription>
                Your activity timeline will appear here.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Zap />
              </EmptyMedia>
              <EmptyTitle>No experiments</EmptyTitle>
              <EmptyDescription>
                Create a new test to track performance.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        </div>
      </div>
    </section>
  )
}
