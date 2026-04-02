import React from "react";

type TypographyVariant = "h1" | "h2" | "h3" | "p" | "span" | "label";

interface TypographyProps {
  variant?: TypographyVariant;
  children: React.ReactNode;
  className?: string;
  id?: string;
}

const variantStyles: Record<TypographyVariant, string> = {
  h1: "font-black text-4xl sm:text-6xl uppercase tracking-tighter leading-none",
  h2: "font-black text-3xl sm:text-4xl uppercase tracking-tighter leading-tight",
  h3: "font-black text-xl sm:text-2xl uppercase tracking-tight",
  p: "font-geist-mono font-bold text-sm leading-relaxed",
  span: "font-geist-mono font-medium text-xs uppercase tracking-widest",
  label:
    "font-bold text-xs uppercase tracking-wider bg-black text-white px-2 py-0.5",
};

const Typography: React.FC<TypographyProps> = ({
  variant = "p",
  children,
  className = "",
  id,
}) => {
  const Component = variant === "label" ? "span" : variant;
  const styles = `${variantStyles[variant]} ${className}`;

  return (
    <Component id={id} className={styles}>
      {children}
    </Component>
  );
};

export default Typography;
