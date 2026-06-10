import { FiSearch } from "react-icons/fi";
import {
  FormProvider,
  useFormContext,
  type SubmitHandler,
  type UseFormReturn,
} from "react-hook-form";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import type { SearchFormValues } from "../schemas/search.schema";

type SearchFormProps = {
  form: UseFormReturn<SearchFormValues>;
  onSubmit: SubmitHandler<SearchFormValues>;
};

const SearchFormFields = () => {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext<SearchFormValues>();

  const errorMessage = errors.username?.message;

  return (
    <Row className="g-2 align-items-start">
      <Col xs={12} sm>
        <InputGroup hasValidation className="search-input-group">
          <InputGroup.Text>
            <FiSearch aria-hidden="true" />
          </InputGroup.Text>
          <Form.Control
            id="username"
            type="text"
            placeholder="Digite o username (ex.: torvalds)"
            isInvalid={Boolean(errors.username)}
            aria-label="Username do GitHub"
            aria-describedby="username-error"
            autoComplete="off"
            spellCheck={false}
            disabled={isSubmitting}
            {...register("username")}
          />
        </InputGroup>
        <div
          id="username-error"
          className="search-field-feedback"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <Form.Control.Feedback type="invalid" className="d-block mt-0">
              {errorMessage}
            </Form.Control.Feedback>
          )}
        </div>
      </Col>
      <Col xs={12} sm="auto">
        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
          aria-label="Buscar usuário no GitHub"
          className="search-submit-btn w-100 fw-semibold"
        >
          {isSubmitting ? "Buscando..." : "Buscar"}
        </Button>
      </Col>
    </Row>
  );
};

export const SearchForm = ({ form, onSubmit }: SearchFormProps) => {
  return (
    <FormProvider {...form}>
      <Form
        noValidate
        className="w-100"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <SearchFormFields />
      </Form>
    </FormProvider>
  );
};
