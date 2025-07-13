import React from "react";

interface IconProps {
  name: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function Icon({ name, className = "", style }: IconProps) {
  return <i className={`hn hn-${name} ${className}`} style={style} />;
}
