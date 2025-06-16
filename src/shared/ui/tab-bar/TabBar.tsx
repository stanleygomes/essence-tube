import React from "react";

interface TabBarProps {
  children: React.ReactNode;
  className?: string;
}

const TabBar: React.FC<TabBarProps> = ({ children, className }) => (
  <nav
    className={`fixed bottom-0 left-0 w-full z-50 bg-white/80 dark:bg-black/80 border-t border-gray-200 dark:border-transparent flex justify-around py-2 shadow-[0_-4px_16px_-4px_rgba(0,0,0,0.10)] backdrop-blur tabbar-bottom-safe-area ${className || ""}`}
  >
    {children}
  </nav>
);

export default TabBar;
