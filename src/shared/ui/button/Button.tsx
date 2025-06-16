import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  color?: "default" | "red" | "blue";
}

const colorClasses = {
  default: "bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-100",
  red: "bg-red-100 hover:bg-red-200 dark:bg-red-800 dark:hover:bg-red-700 text-red-800 dark:text-red-100",
  blue: "bg-blue-100 hover:bg-blue-200 dark:bg-blue-800 dark:hover:bg-blue-700 text-blue-800 dark:text-blue-100",
};

export default function Button({ children, color = "default", className = "", ...props }: ButtonProps) {
  return (
    <button
      className={`flex items-center gap-2 px-4 py-2 rounded text-sm font-medium cursor-pointer active:scale-95 transition ${colorClasses[color]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
