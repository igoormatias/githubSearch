import { Col, Form, Row } from "react-bootstrap";
import type { RepositorySortOption } from "../types/repository";
import { repositorySortLabels } from "../types/repository";

type RepositorySortSelectProps = {
  value: RepositorySortOption;
  onChange: (value: RepositorySortOption) => void;
};

export const RepositorySortSelect = ({
  value,
  onChange,
}: RepositorySortSelectProps) => {
  return (
    <Row className="align-items-center g-2 flex-grow-1">
      <Col xs="auto">
        <Form.Label
          htmlFor="repository-sort"
          className="mb-0 small fw-medium text-secondary text-nowrap"
        >
          Ordenar por
        </Form.Label>
      </Col>
      <Col>
        <Form.Select
          id="repository-sort"
          value={value}
          onChange={(event) =>
            onChange(event.target.value as RepositorySortOption)
          }
          className="w-100"
          style={{ minWidth: "200px" }}
          aria-label="Ordenar repositórios"
        >
          {Object.entries(repositorySortLabels).map(([option, label]) => (
            <option key={option} value={option}>
              {label}
            </option>
          ))}
        </Form.Select>
      </Col>
    </Row>
  );
};
