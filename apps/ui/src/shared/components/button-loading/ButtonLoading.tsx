import React from "react";
import LoadingIcon from "@shared/ui/loading-icon/LoadingIcon";
import Button, { ButtonColor } from "@shared/ui/button/Button";

export interface ButtonLoadingProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  loadingText?: string;
  color?: ButtonColor;
  className?: string;
  children?: React.ReactNode;
}

const ButtonLoading: React.FC<ButtonLoadingProps> = ({
  loading = false,
  loadingText,
  color = "blue",
  className,
  children,
  disabled,
  ...props
}) => (
  <Button
    color={color}
    className={`px-5 py-2 rounded-full font-semibold text-sm flex items-center justify-center ${className || ""}`}
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
  </Button>
);

export default ButtonLoading;
