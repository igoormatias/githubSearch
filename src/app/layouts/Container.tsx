import type { ReactNode } from "react";
import { Container as BSContainer } from "react-bootstrap";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

export const Container = ({ children, className = "" }: ContainerProps) => {
  return (
    <BSContainer fluid="lg" className={`py-3 overflow-x-hidden ${className}`}>
      {children}
    </BSContainer>
  );
};
