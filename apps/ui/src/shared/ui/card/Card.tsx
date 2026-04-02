import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  color?: "default" | "yellow" | "blue" | "red";
}

const colorClasses: Record<string, string> = {
  default:
    "bg-white dark:bg-[#1a1a1a] text-black dark:text-white shadow-[8px_8px_0px_#000]",
  yellow: "bg-[#fbe7c6] dark:bg-[#b45309] text-black shadow-[8px_8px_0px_#000]",
  blue: "bg-[#a0e7e5] dark:bg-[#1e40af] text-black shadow-[8px_8px_0px_#000]",
  red: "bg-[#ffaebc] dark:bg-[#991b1b] text-black shadow-[8px_8px_0px_#000]",
  green: "bg-[#b4f8c8] dark:bg-[#065f46] text-black shadow-[8px_8px_0px_#000]",
};

export default function Card({
  children,
  color = "default",
  className = "",
  ...props
}: CardProps) {
  return (
    <div
      className={`w-full p-6 border-4 border-black transition-all duration-150 
        ${colorClasses[color]} 
        active:translate-x-1 active:translate-y-1 active:shadow-[4px_4px_0px_#000]
        ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
