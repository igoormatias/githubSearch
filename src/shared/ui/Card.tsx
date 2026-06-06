import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export const Card = ({ children, className = "" }: CardProps) => {
  return (
    <div
      className={`rounded-xl border border-border bg-surface transition-colors duration-200 ${className}`}
    >
      {children}
    </div>
  );
};
