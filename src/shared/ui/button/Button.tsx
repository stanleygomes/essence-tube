import React from "react";
import Icon from "@shared/ui/icon/Icon";

export type ButtonColor =
  | "blue"
  | "red"
  | "green"
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
    "bg-[#3a2c1a] text-[#f7ecd7] shadow-[4px_4px_0_#7a6a4f] hover:bg-[#2d2417] active:shadow-none active:bg-[#2d2417] " +
    "dark:bg-[#f7ecd7] dark:text-[#3a2c1a] dark:shadow-[4px_4px_0_#c2b8a3] dark:hover:bg-[#e6d6b8] dark:active:shadow-none dark:active:bg-[#e6d6b8]",
  red:
    "bg-[#f7d7d7] text-[#7c2f2f] shadow-[4px_4px_0_#c2a3a3] hover:bg-[#e6b8b8] active:shadow-none active:bg-[#e6b8b8] " +
    "dark:bg-[#b87a7a] dark:text-[#3a1a1a] dark:shadow-[4px_4px_0_#7a4f4f] dark:hover:bg-[#a35c5c] dark:active:shadow-none dark:active:bg-[#a35c5c]",
  blue:
    "bg-[#d7e6f7] text-[#2f4a7c] shadow-[4px_4px_0_#a3b8c2] hover:bg-[#b8d6e6] active:shadow-none active:bg-[#b8d6e6] " +
    "dark:bg-[#7a8cb8] dark:text-[#1a233a] dark:shadow-[4px_4px_0_#4f5c7a] dark:hover:bg-[#5c6ca3] dark:active:shadow-none dark:active:bg-[#5c6ca3]",
  green:
    "bg-[#d7f7e6] text-[#2f7c4a] shadow-[4px_4px_0_#a3c2b8] hover:bg-[#b8e6d6] active:shadow-none active:bg-[#b8e6d6] " +
    "dark:bg-[#7ab88c] dark:text-[#1a3a23] dark:shadow-[4px_4px_0_#4f7a5c] dark:hover:bg-[#5ca36c] dark:active:shadow-none dark:active:bg-[#5ca36c]",
  outline:
    "bg-transparent shadow-none border-none text-[#3a2c1a] dark:text-[#f7ecd7] px-0 py-0 relative after:content-[''] after:block after:w-full after:h-0.5 after:bg-current after:absolute after:left-0 after:-bottom-1",
  transparent:
    "bg-transparent shadow-none border-none text-[#3a2c1a] dark:text-[#f7ecd7]",
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
        <>
          <Icon name={icon} />
          <span className="h-5 w-px bg-[#c2b8a3] dark:bg-[#7a6a4f] mx-2 inline-block align-middle"></span>
        </>
      )}
      <span className="flex-1">{children}</span>
      {icon && iconPosition === "right" && (
        <>
          <span className="h-5 w-px bg-[#c2b8a3] dark:bg-[#7a6a4f] mx-2 inline-block align-middle"></span>
          <Icon name={icon} />
        </>
      )}
    </>
  );

  return (
    <button
      className={`flex items-center gap-2 text-sm font-medium cursor-pointer transition-all duration-150 
        ${colorClasses[color]} 
        font-pixelify 
        active:scale-95 
        ${className}`}
      style={{ borderRadius: 0 }}
      {...props}
    >
      {content}
    </button>
  );
}
