import React from "react";

interface ButtonProps extends React.ComponentProps<"button"> {
  variant?: "primary" | "secondary" | "tertiary" | "danger";
  size?: "small" | "medium" | "large";
  isActive?: boolean;
}
export const Button = ({
  className,
  variant = "primary",
  size = "medium",
  isActive = false,
  ...props
}: ButtonProps) => {
  const activeClass = "border border-zinc-900 dark:border-zinc-500";

  const baseClass =
    "rounded-md font-semibold focus:outline-none cursor-pointer transition-all disabled:cursor-not-allowed disabled:opacity-20";

  const variantClass = {
    primary:
      "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800",
    secondary:
      "bg-zinc-800 text-white hover:bg-gray-900 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300",
    tertiary: "bg-green-500 text-white hover:bg-green-600",
    danger: "bg-red-500 text-white hover:bg-red-600",
  }[variant];
  const sizeClass = {
    small: "px-2 py-1 text-sm",
    medium: "px-4 py-2 text-base",
    large: "px-6 py-3 text-lg",
  }[size];
  const buttonClassName = `${baseClass} ${variantClass} ${sizeClass} ${isActive ? activeClass : ""} ${className}`;

  return <button className={buttonClassName} {...props} />;
};
