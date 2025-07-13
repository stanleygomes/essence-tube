
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  color?: "default" | "red" | "blue";
}

const colorClasses: Record<string, string> = {
  default:
    "bg-[#f7ecd7] text-[#3a2c1a] shadow-[4px_4px_0_#c2b8a3] hover:bg-[#e6d6b8] active:shadow-none active:bg-[#e6d6b8] " +
    "dark:bg-[#b8a47a] dark:text-[#2d2417] dark:shadow-[4px_4px_0_#7a6a4f] dark:hover:bg-[#a38c5c] dark:active:shadow-none dark:active:bg-[#a38c5c]",
  red:
    "bg-[#f7d7d7] text-[#7c2f2f] shadow-[4px_4px_0_#c2a3a3] hover:bg-[#e6b8b8] active:shadow-none active:bg-[#e6b8b8] " +
    "dark:bg-[#b87a7a] dark:text-[#3a1a1a] dark:shadow-[4px_4px_0_#7a4f4f] dark:hover:bg-[#a35c5c] dark:active:shadow-none dark:active:bg-[#a35c5c]",
  blue:
    "bg-[#d7e6f7] text-[#2f4a7c] shadow-[4px_4px_0_#a3b8c2] hover:bg-[#b8d6e6] active:shadow-none active:bg-[#b8d6e6] " +
    "dark:bg-[#7a8cb8] dark:text-[#1a233a] dark:shadow-[4px_4px_0_#4f5c7a] dark:hover:bg-[#5c6ca3] dark:active:shadow-none dark:active:bg-[#5c6ca3]",
};

export default function Button({ children, color = "default", className = "", ...props }: ButtonProps) {
  return (
    <button
      className={`flex items-center gap-2 px-4 py-2 text-sm font-medium cursor-pointer transition-all duration-150 
        ${colorClasses[color]} 
        border-none 
        font-pixelify 
        active:scale-95 
        ${className}`}
      style={{ borderRadius: 0 }}
      {...props}
    >
      {children}
    </button>
  );
}
