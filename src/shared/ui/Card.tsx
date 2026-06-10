import type { ReactNode } from "react";
import { Card as BSCard } from "react-bootstrap";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export const Card = ({ children, className = "" }: CardProps) => {
  return (
    <BSCard className={`border card-interactive ${className}`}>{children}</BSCard>
  );
};
