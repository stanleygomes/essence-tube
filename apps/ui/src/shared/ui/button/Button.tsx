import React from "react";
import Icon from "@shared/ui/icon/Icon";

export type ButtonColor =
  | "blue"
  | "red"
  | "green"
  | "yellow"
  | "default"
  | "outline"
  | "transparent";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  color?: ButtonColor;
  icon?: string;
  iconPosition?: "left" | "right";
}

const colorClasses: Record<string, string> = {
  default:
    "bg-white dark:bg-[#1a1a1a] text-black dark:text-white shadow-[4px_4px_0px_#000] hover:bg-gray-50 active:bg-gray-100",
  red: "bg-[#ffaebc] dark:bg-[#991b1b] text-black shadow-[4px_4px_0px_#000] hover:bg-[#ff94a8] active:bg-[#ff7a94]",
  yellow:
    "bg-[#fbe7c6] dark:bg-[#b45309] text-black shadow-[4px_4px_0px_#000] hover:bg-[#f6d8a4] active:bg-[#f1c982]",
  blue: "bg-[#a0e7e5] dark:bg-[#1e40af] text-black shadow-[4px_4px_0px_#000] hover:bg-[#86d6d4] active:bg-[#6cc5c3]",
  green:
    "bg-[#b4f8c8] dark:bg-[#065f46] text-black shadow-[4px_4px_0px_#000] hover:bg-[#96e8ad] active:bg-[#78d892]",
  outline:
    "bg-transparent border-4 border-black text-black dark:text-white shadow-none",
  transparent:
    "bg-transparent shadow-none border-none text-black dark:text-white",
};

export default function Button({
  children,
  color = "default",
  className = "",
  icon,
  iconPosition = "left",
  ...props
}: ButtonProps) {
  const content = (
    <>
      {icon && iconPosition === "left" && (
        <div className="flex items-center gap-2 pr-2 border-r-2 border-black/10 dark:border-white/10 mr-2">
          <Icon name={icon} />
        </div>
      )}
      <span className="flex-1 font-bold">{children}</span>
      {icon && iconPosition === "right" && (
        <div className="flex items-center gap-2 pl-2 border-l-2 border-black/10 dark:border-white/10 ml-2">
          <Icon name={icon} />
        </div>
      )}
    </>
  );

  return (
    <button
      className={`flex items-center justify-center gap-2 py-3 px-6 text-sm font-black cursor-pointer transition-all duration-150 
        border-4 border-black uppercase tracking-tight
        hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#000]
        active:translate-x-[4px] active:translate-y-[4px] active:shadow-none
        ${colorClasses[color]} 
        ${className}`}
      {...props}
    >
      {content}
    </button>
  );
}
