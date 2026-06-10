import { Button, Stack } from "react-bootstrap";

const SUGGESTIONS = ["lucasmontano", "torvalds", "diego3g", "maykbrito"] as const;

type SearchSuggestionsProps = {
  onSuggestionClick: (username: string) => void;
  disabled?: boolean;
};

export const SearchSuggestions = ({
  onSuggestionClick,
  disabled = false,
}: SearchSuggestionsProps) => {
  return (
    <Stack gap={2}>
      <p className="small text-uppercase text-secondary fw-medium mb-0">
        Sugestões
      </p>
      <div className="d-flex flex-wrap gap-2">
        {SUGGESTIONS.map((suggestion) => (
          <Button
            key={suggestion}
            type="button"
            variant="outline-secondary"
            size="sm"
            className="suggestion-chip rounded-pill"
            onClick={() => onSuggestionClick(suggestion)}
            disabled={disabled}
            aria-label={`Buscar ${suggestion}`}
          >
            {suggestion}
          </Button>
        ))}
      </div>
    </Stack>
  );
};
