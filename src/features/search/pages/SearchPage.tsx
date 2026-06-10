import { Stack } from "react-bootstrap";
import { Container } from "@/app/layouts";
import { SearchForm } from "../components/SearchForm";
import { SearchHero } from "../components/SearchHero";
import { SearchSuggestions } from "../components/SearchSuggestions";
import { useSearchForm } from "../hooks/useSearchForm";

export const SearchPage = () => {
  const { form, onSubmit, submitUsername, isSubmitting } = useSearchForm();

  return (
    <div className="hero-centered">
      <Container className="py-0">
        <Stack gap={3} className="hero-content mx-auto">
          <SearchHero />
          <SearchForm form={form} onSubmit={onSubmit} />
          <SearchSuggestions
            onSuggestionClick={submitUsername}
            disabled={isSubmitting}
          />
        </Stack>
      </Container>
    </div>
  );
};
