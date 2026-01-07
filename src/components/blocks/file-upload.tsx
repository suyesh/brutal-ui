 "use client"

import * as React from "react"

import { UploadCloud } from "lucide-react"

import { Button } from "@/components/ui/button"

import { cn } from "@/lib/utils"

type FileUploadProps = {
  title?: string
  description?: string
  accept?: string
  className?: string
}

export default function FileUpload({
  title = "Drag & drop upload",
  description = "Drop your files here or click to upload. Max 25MB.",
  accept = ".png,.jpg,.pdf",
  className,
}: FileUploadProps) {
  const [files, setFiles] = React.useState<File[]>([])
  const [isDragging, setIsDragging] = React.useState(false)
  const inputId = React.useId()

  const handleFiles = (list: FileList | null) => {
    if (!list) return
    setFiles(Array.from(list))
  }

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault()
    setIsDragging(false)
    handleFiles(event.dataTransfer.files)
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
        <label
          htmlFor={inputId}
          onDragOver={(event) => {
            event.preventDefault()
            setIsDragging(true)
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={cn(
            "group flex cursor-pointer flex-col items-center justify-center gap-4 rounded-base border-2 border-dashed border-border bg-background p-10 text-center shadow-shadow transition-colors hover:bg-muted/40",
            isDragging && "bg-muted/60",
          )}
        >
          <UploadCloud className="size-10 text-muted-foreground group-hover:text-foreground" />
          <div>
            <p className="font-heading text-lg">Drop files here</p>
            <p className="text-sm text-muted-foreground">
              or click to browse ({accept})
            </p>
          </div>
          <Button variant="reverse" size="sm" className="pointer-events-none">
            Choose files
          </Button>
          <input
            id={inputId}
            className="hidden"
            type="file"
            accept={accept}
            onChange={(event) => handleFiles(event.target.files)}
          />
        </label>
        {files.length > 0 && (
          <div className="rounded-base border-2 border-border bg-background p-4 shadow-shadow">
            <p className="text-sm uppercase tracking-wide text-muted-foreground">
              Files
            </p>
            <ul className="mt-2 space-y-2 text-sm">
              {files.map((file) => (
                <li key={file.name} className="flex items-center justify-between">
                  <span className="truncate">{file.name}</span>
                  <span className="text-muted-foreground">
                    {Math.ceil(file.size / 1024)}kb
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}
