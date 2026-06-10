import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Button as BSButton } from "react-bootstrap";
import type { ButtonProps as BSButtonProps } from "react-bootstrap";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  Pick<BSButtonProps, "size"> & {
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
  ...props
}: ButtonProps) => {
  return (
    <BSButton
      type={type}
      variant={variantMap[variant]}
      size={size}
      disabled={disabled}
      className={`touch-target ${className}`}
      {...props}
    >
      {children}
    </BSButton>
  );
};
