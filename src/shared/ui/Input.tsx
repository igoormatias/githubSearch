import { Form } from "react-bootstrap";
import type { ComponentProps } from "react";

type InputProps = ComponentProps<typeof Form.Control>;

export const Input = ({ className = "", ...props }: InputProps) => {
  return <Form.Control className={className} {...props} />;
};
