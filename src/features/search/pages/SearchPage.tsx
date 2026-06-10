import { Stack } from "react-bootstrap";
import { Container } from "@/app/layouts";
import { ErrorState } from "@/shared/ui";
import { SearchForm } from "../components/SearchForm";
import { SearchHero } from "../components/SearchHero";
import { SearchPageSkeleton } from "../components/SearchPageSkeleton";
import { SearchSuggestions } from "../components/SearchSuggestions";
import { useSearchForm } from "../hooks/useSearchForm";

type SearchPageView = "initial" | "loading" | "error";

type SearchPageProps = {
  view?: SearchPageView;
  errorMessage?: string;
};

export const SearchPage = ({
  view = "initial",
  errorMessage = "Erro ao carregar dados. Tente novamente.",
}: SearchPageProps) => {
  const { username, setUsername, handleSubmit, handleSuggestionClick } =
    useSearchForm();

  if (view === "loading") {
    return (
      <div className="hero-centered">
        <Container className="py-0">
          <div className="hero-content mx-auto">
            <SearchPageSkeleton />
          </div>
        </Container>
      </div>
    );
  }

  if (view === "error") {
    return (
      <div className="hero-centered">
        <Container className="py-0">
          <div className="hero-content mx-auto max-w-lg">
            <ErrorState message={errorMessage} />
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="hero-centered">
      <Container className="py-0">
        <Stack gap={3} className="hero-content mx-auto">
          <SearchHero />
          <SearchForm
            username={username}
            onUsernameChange={setUsername}
            onSubmit={handleSubmit}
          />
          <SearchSuggestions onSuggestionClick={handleSuggestionClick} />
        </Stack>
      </Container>
    </div>
  );
};
