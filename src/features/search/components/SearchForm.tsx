import type { FormEvent } from "react";
import { FiSearch } from "react-icons/fi";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";

type SearchFormProps = {
  username: string;
  onUsernameChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  disabled?: boolean;
};

export const SearchForm = ({
  username,
  onUsernameChange,
  onSubmit,
  disabled = false,
}: SearchFormProps) => {
  return (
    <Form onSubmit={onSubmit} className="w-100">
      <Row className="g-2 align-items-stretch">
        <Col xs={12} sm>
          <InputGroup className="search-input-group h-100">
            <InputGroup.Text>
              <FiSearch aria-hidden="true" />
            </InputGroup.Text>
            <Form.Control
              id="username"
              name="username"
              type="search"
              value={username}
              onChange={(event) => onUsernameChange(event.target.value)}
              placeholder="Digite o username (ex.: torvalds)"
              disabled={disabled}
              aria-label="Username do GitHub"
            />
          </InputGroup>
        </Col>
        <Col xs={12} sm="auto">
          <Button
            type="submit"
            variant="primary"
            disabled={disabled || !username.trim()}
            aria-label="Buscar usuário no GitHub"
            className="search-submit-btn w-100 fw-semibold"
          >
            Buscar
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
