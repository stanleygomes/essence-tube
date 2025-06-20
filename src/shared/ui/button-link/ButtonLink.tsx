import React from "react";

interface ButtonLinkProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function ButtonLink({ children, className = "", ...props }: ButtonLinkProps) {
  return (
    <button
      {...props}
      className={
        "text-blue-600 dark:text-blue-400 text-sm px-3 py-1 rounded hover:bg-blue-50 dark:hover:bg-blue-900 font-medium cursor-pointer active:scale-95 transition " +
        className
      }
      style={{ fontWeight: 500, ...props.style }}
    >
      {children}
    </button>
  );
}
