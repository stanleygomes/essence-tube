import React, { ReactNode, HTMLAttributes, createElement } from "react";

type TypographyVariant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";

interface TypographyProps extends HTMLAttributes<HTMLElement> {
  variant?: TypographyVariant;
  children: ReactNode;
  className?: string;
}

const headingTags: TypographyVariant[] = ["h1", "h2", "h3", "h4", "h5", "h6"];

export default function Typography({
  variant = "p",
  children,
  className = "",
  ...props
}: TypographyProps) {
  const isHeading = headingTags.includes(variant);

  return createElement(
    variant,
    {
      className: `${
        isHeading
          ? "font-pixelify text-[#3a2c1a] dark:text-[#f7ecd7]"
          : "font-geist-mono"
      } ${className}`,
      ...props,
    },
    children
  );
}
