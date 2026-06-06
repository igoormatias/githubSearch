import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { Container } from "./Container";

export const Header = () => {
  return (
    <header className="border-b border-border bg-surface">
      <Container className="py-4">
        <Link
          to="/"
          className="inline-flex cursor-pointer items-center gap-3 text-foreground transition-colors duration-200 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label="Ir para página inicial"
        >
          <FaGithub className="h-6 w-6 text-primary" aria-hidden="true" />
          <span className="text-lg font-semibold">GitHub User Explorer</span>
        </Link>
      </Container>
    </header>
  );
};
