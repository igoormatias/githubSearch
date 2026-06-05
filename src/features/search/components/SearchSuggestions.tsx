const SUGGESTIONS = ["gaearon", "torvalds", "vercel", "kentcdodds"] as const;

type SearchSuggestionsProps = {
  onSuggestionClick: (username: string) => void;
  disabled?: boolean;
};

export const SearchSuggestions = ({
  onSuggestionClick,
  disabled = false,
}: SearchSuggestionsProps) => {
  return (
    <div className="space-y-3">
      <p className="text-xs font-medium uppercase tracking-wide text-foreground-muted">
        Suggestions
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        {SUGGESTIONS.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            onClick={() => onSuggestionClick(suggestion)}
            disabled={disabled}
            className="rounded-xl border border-border bg-surface px-4 py-2 text-sm text-foreground transition-colors duration-200 hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
            aria-label={`Search for ${suggestion}`}
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
};
