import { Container } from "@/shared/layout";
import { SearchForm } from "./SearchForm";
import { SearchHero } from "./SearchHero";
import { useSearchForm } from "../hooks/useSearchForm";

export const SearchPage = () => {
  const { username, setUsername, handleSubmit } = useSearchForm();

  return (
    <Container className="flex min-h-[calc(100vh-73px)] items-center justify-center py-12">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-8">
        <SearchHero />
        <SearchForm
          username={username}
          onUsernameChange={setUsername}
          onSubmit={handleSubmit}
        />
      </div>
    </Container>
  );
};
