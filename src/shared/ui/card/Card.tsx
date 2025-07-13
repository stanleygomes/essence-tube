import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  color?: "default" | "yellow" | "blue" | "red";
}

const colorClasses: Record<string, string> = {
  default:
    "bg-white text-[#3a2c1a] shadow-[4px_4px_0_#c2b8a3] dark:bg-[#3a2c1a] dark:text-[#f7ecd7] dark:shadow-[4px_4px_0_#7a6a4f]",
  yellow:
    "bg-[#fff7d7] text-[#7c6a2f] shadow-[4px_4px_0_#c2b8a3] dark:bg-[#7a6a4f] dark:text-[#fff7d7] dark:shadow-[4px_4px_0_#3a2c1a]",
  blue:
    "bg-[#d7e6f7] text-[#2f4a7c] shadow-[4px_4px_0_#a3b8c2] dark:bg-[#7a8cb8] dark:text-[#d7e6f7] dark:shadow-[4px_4px_0_#4f5c7a]",
  red:
    "bg-[#f7d7d7] text-[#7c2f2f] shadow-[4px_4px_0_#c2a3a3] dark:bg-[#b87a7a] dark:text-[#f7d7d7] dark:shadow-[4px_4px_0_#7a4f4f]",
};

export default function Card({ children, color = "default", className = "", ...props }: CardProps) {
  return (
    <div
      className={`w-full p-5 mb-6 font-pixelify rounded-none border-none transition-all duration-150 
        ${colorClasses[color]} 
        active:shadow-none 
        ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
