import React from "react";

interface HorizontalScrollListProps {
  children: React.ReactNode;
  className?: string;
}

const HorizontalScrollList: React.FC<HorizontalScrollListProps> = ({
  children,
  className,
}) => (
  <div className={`flex overflow-x-auto ${className || ""}`}>{children}</div>
);

export default HorizontalScrollList;
