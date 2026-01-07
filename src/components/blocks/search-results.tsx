 "use client"

import * as React from "react"

import { Search } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { cn } from "@/lib/utils"

type SearchResult = {
  title: string
  description: string
  tag?: string
}

type SearchResultsProps = {
  title?: string
  description?: string
  queryPlaceholder?: string
  results?: SearchResult[]
  className?: string
}

const DEFAULT_RESULTS: SearchResult[] = [
  {
    title: "Neon Drift landing",
    description: "A marketing layout built for high-contrast product launches.",
    tag: "Landing",
  },
  {
    title: "Soda Pop onboarding",
    description: "An onboarding flow with loud CTAs and bold tips.",
    tag: "Onboarding",
  },
  {
    title: "Bumble Pop pricing",
    description: "Pricing table with sharp comparisons and highlights.",
    tag: "Pricing",
  },
]

export default function SearchResults({
  title = "Search results",
  description = "Filter and browse layouts in your BrutalUI library.",
  queryPlaceholder = "Search blocks, pages, or templates...",
  results = DEFAULT_RESULTS,
  className,
}: SearchResultsProps) {
  const [query, setQuery] = React.useState("")
  const [category, setCategory] = React.useState("all")
  const [appliedQuery, setAppliedQuery] = React.useState("")
  const [appliedCategory, setAppliedCategory] = React.useState("all")

  const filteredResults = React.useMemo(() => {
    const normalizedQuery = appliedQuery.trim().toLowerCase()
    return results.filter((result) => {
      const matchesQuery =
        normalizedQuery.length === 0 ||
        result.title.toLowerCase().includes(normalizedQuery) ||
        result.description.toLowerCase().includes(normalizedQuery)

      const tag = result.tag?.toLowerCase() ?? ""
      const matchesCategory =
        appliedCategory === "all" || tag === appliedCategory

      return matchesQuery && matchesCategory
    })
  }, [appliedCategory, appliedQuery, results])

  const applyFilters = () => {
    setAppliedQuery(query)
    setAppliedCategory(category)
  }

  return (
    <section
      className={cn(
        "w-full border-2 border-border bg-secondary-background px-6 py-10 shadow-shadow",
        className,
      )}
    >
      <div className="space-y-8">
        <header className="space-y-3">
          <h2 className="font-heading text-2xl sm:text-3xl">{title}</h2>
          <p className="text-foreground sm:text-lg">{description}</p>
        </header>
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="pl-10"
              placeholder={queryPlaceholder}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="landing">Landing</SelectItem>
                <SelectItem value="pricing">Pricing</SelectItem>
                <SelectItem value="onboarding">Onboarding</SelectItem>
              </SelectContent>
            </Select>
            <Button type="button" variant="reverse" onClick={applyFilters}>
              Apply filters
            </Button>
          </div>
        </div>
        <div className="grid gap-4">
          {filteredResults.map((result) => (
            <div
              key={result.title}
              className="rounded-base border-2 border-border bg-background p-5 shadow-shadow"
            >
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="font-heading text-lg">{result.title}</h3>
                {result.tag && (
                  <Badge variant="neutral" className="rounded-full px-3 py-1 text-xs">
                    {result.tag}
                  </Badge>
                )}
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {result.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
