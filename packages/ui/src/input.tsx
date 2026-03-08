import React from "react";
import { clsx } from "clsx";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  glass?: boolean;
  label?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ glass = false, className, label, id, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;

    return (
      <div>
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium mb-1">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={clsx(
            "px-3 py-2 rounded-md transition-all duration-200",
            "focus:outline-none focus:ring-2",
            glass
              ? "backdrop-blur-md bg-white/10 border border-white/20 text-white placeholder:text-white/70 focus:ring-white/50"
              : "border border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 focus:ring-blue-500",
            className,
          )}
          {...props}
        />
      </div>
    );
  },
);

Input.displayName = "Input";
