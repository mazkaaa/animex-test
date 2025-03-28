import React from "react";

export const Select = ({
  className,
  ...props
}: React.ComponentProps<"select">) => {
  return (
    <select
      className={
        "rounded-md border border-zinc-300 px-3 py-2 transition-all outline-none placeholder:text-zinc-400 focus-within:border-zinc-600 dark:border-zinc-700 dark:focus-within:border-zinc-300 " +
        className
      }
      {...props}
    />
  );
};
