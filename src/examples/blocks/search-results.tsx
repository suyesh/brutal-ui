import SearchResults from "@/components/blocks/search-results"

export default function SearchResultsDemo() {
  return (
    <SearchResults
      // Update copy and results as needed.
      title="Search in your library"
      description="Filter results by category and query."
      queryPlaceholder="Search blocks, docs, or templates..."
      results={[
        {
          title: "Neon Drift landing",
          description:
            "A marketing layout built for high-contrast product launches.",
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
        {
          title: "Hyperwave search",
          description: "Search UX with punchy filters and clean cards.",
          tag: "Landing",
        },
      ]}
    />
  )
}
