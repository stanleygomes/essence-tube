import React from "react";
import { clsx } from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "info" | "warn" | "error" | "success";
  glass?: boolean;
  children: React.ReactNode;
}

const variantStyles = {
  default: "bg-gray-500 hover:bg-gray-600 active:bg-gray-700 text-white",
  info: "bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white",
  warn: "bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 text-black",
  error: "bg-red-500 hover:bg-red-600 active:bg-red-700 text-white",
  success: "bg-green-500 hover:bg-green-600 active:bg-green-700 text-white",
};

export const Button: React.FC<ButtonProps> = ({
  variant = "default",
  glass = false,
  className,
  children,
  ...props
}) => {
  return (
    <button
      className={clsx(
        "px-4 py-2 rounded-md font-medium transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-offset-2",
        variantStyles[variant],
        glass && "backdrop-blur-md bg-opacity-20 border border-white/20",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};
