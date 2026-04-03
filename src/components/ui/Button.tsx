import React from "react";
import { cn } from "../../utils/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    outline: "border border-input bg-background hover:bg-muted hover:text-muted-foreground",
    ghost: "bg-transparent hover:bg-muted hover:text-muted-foreground",
  };

  const sizes = {
    sm: "h-9 px-3 text-xs",
    md: "h-10 px-4 py-2",
    lg: "h-11 px-8",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
}
