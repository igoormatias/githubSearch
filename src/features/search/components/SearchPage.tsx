import { Container } from "@/shared/layout";
import { ErrorState } from "@/shared/ui";
import { SearchForm } from "./SearchForm";
import { SearchHero } from "./SearchHero";
import { SearchPageSkeleton } from "./SearchPageSkeleton";
import { SearchSuggestions } from "./SearchSuggestions";
import { useSearchForm } from "../hooks/useSearchForm";

type SearchPageView = "initial" | "loading" | "error";

type SearchPageProps = {
  view?: SearchPageView;
  errorMessage?: string;
};

export const SearchPage = ({
  view = "initial",
  errorMessage = "Unable to load the search page. Please try again.",
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
