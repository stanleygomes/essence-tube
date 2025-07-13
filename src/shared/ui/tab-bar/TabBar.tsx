import React from "react";

interface TabBarProps {
  children: React.ReactNode;
  className?: string;
}

const TabBar: React.FC<TabBarProps> = ({ children, className }) => (
  <nav
    className={`fixed bottom-0 left-0 w-full z-50 bg-theme border-t-2 border-color-theme flex justify-around py-2 tabbar-bottom-safe-area ${
      className || ""
    }`}
  >
    {children}
  </nav>
);

export default TabBar;
