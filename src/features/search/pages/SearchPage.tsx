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
      <Container className="flex min-h-[calc(100vh-73px)] items-center justify-center py-12">
        <SearchPageSkeleton />
      </Container>
    );
  }

  if (view === "error") {
    return (
      <Container className="flex min-h-[calc(100vh-73px)] items-center justify-center py-12">
        <div className="w-full max-w-lg">
          <ErrorState message={errorMessage} />
        </div>
      </Container>
    );
  }

  return (
    <Container className="flex min-h-[calc(100vh-73px)] items-center justify-center py-12">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-8">
        <SearchHero />
        <SearchForm
          username={username}
          onUsernameChange={setUsername}
          onSubmit={handleSubmit}
        />
        <SearchSuggestions onSuggestionClick={handleSuggestionClick} />
      </div>
    </Container>
  );
};
