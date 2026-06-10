import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { Container, Navbar } from "react-bootstrap";

export const Header = () => {
  return (
    <Navbar
      variant="dark"
      expand="lg"
      sticky="top"
      className="border-bottom py-0"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <Container fluid="lg" className="py-2 py-lg-3">
        <Navbar.Brand
          as={Link}
          to="/"
          className="d-inline-flex align-items-center gap-2 gap-sm-3 text-decoration-none link-body-emphasis mb-0"
          aria-label="Ir para página inicial"
        >
          <FaGithub className="text-primary" size={24} aria-hidden="true" />
          <span className="fs-5 fw-semibold">GitHub User Explorer</span>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};
