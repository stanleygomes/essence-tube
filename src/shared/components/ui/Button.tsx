import React from "react";
import clsx from "clsx";

import LoadingIcon from '@shared/ui/loading-icon/LoadingIcon';

export type ButtonVariant = "blue" | "red" | "green";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  loadingText?: string;
  variant?: ButtonVariant;
  className?: string;
  children?: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  blue: "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700",
  red: "bg-red-600 text-white hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700",
  green: "bg-green-600 text-white hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700",
};

const Button: React.FC<ButtonProps> = ({
  loading = false,
  loadingText,
  variant = "blue",
  className,
  children,
  disabled,
  ...props
}) => (
  <button
    className={clsx(
      "px-5 py-2 rounded-full font-semibold text-sm transition flex items-center justify-center",
      variantClasses[variant],
      className
    )}
    disabled={loading || disabled}
    {...props}
  >
    {loading ? (
      <span className="flex items-center gap-2">
        <LoadingIcon className="h-5 w-5 text-white" />
        {loadingText}
      </span>
    ) : (
      children
    )}
  </button>
);

export default Button;
