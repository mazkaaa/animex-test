import React from "react";

export const Input = ({
  className,
  type,
  ...props
}: React.ComponentProps<"input">) => {
  return (
    <input
      type={type}
      className={
        "rounded-lg border border-zinc-300 px-3 py-2 transition-all outline-none placeholder:text-zinc-400 focus-within:border-zinc-600 dark:border-zinc-700 dark:focus-within:border-zinc-300 " +
        className
      }
      {...props}
    />
  );
};
