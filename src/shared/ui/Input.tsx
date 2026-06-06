import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = ({ className = "", ...props }: InputProps) => {
  return (
    <input
      className={`w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-base text-foreground placeholder:text-foreground-muted transition-colors duration-200 focus:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${className}`}
      {...props}
    />
  );
};
