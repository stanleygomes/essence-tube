import React from "react";

type ButtonLinkVariant = "blue" | "red" | "gray";

interface ButtonLinkProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonLinkVariant;
}

const variantClasses: Record<ButtonLinkVariant, string> = {
  blue: "text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900",
  red: "text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900",
  gray: "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",
};

export function ButtonLink({
  children,
  className = "",
  variant = "blue",
  ...props
}: ButtonLinkProps) {
  return (
    <button
      {...props}
      className={
        `${variantClasses[variant]} text-sm px-3 py-1 rounded font-medium cursor-pointer active:scale-95 transition ` +
        className
      }
      style={{ fontWeight: 500, ...props.style }}
    >
      {children}
    </button>
  );
}
