import type { ReactNode } from "react";
import { Button as BSButton } from "react-bootstrap";
import type { ButtonProps as BSButtonProps } from "react-bootstrap";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = Omit<BSButtonProps, "variant"> & {
  children: ReactNode;
  variant?: ButtonVariant;
};

const variantMap: Record<ButtonVariant, string> = {
  primary: "primary",
  secondary: "outline-secondary",
};

export const Button = ({
  children,
  variant = "primary",
  size,
  className = "",
  type = "button",
  disabled = false,
  as,
  ...props
}: ButtonProps) => {
  return (
    <BSButton
      as={as}
      type={as ? undefined : type}
      variant={variantMap[variant]}
      size={size}
      disabled={disabled}
      className={`touch-target ${className}`.trim()}
      {...props}
    >
      {children}
    </BSButton>
  );
};
