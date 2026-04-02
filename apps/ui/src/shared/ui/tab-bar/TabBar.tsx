import React from "react";

interface TabBarProps {
  children: React.ReactNode;
  className?: string;
}

const TabBar: React.FC<TabBarProps> = ({ children, className }) => (
  <nav
    className={`fixed bottom-8 left-1/2 -translate-x-1/2 w-[92%] max-w-md z-50 bg-[#fff5e1]/80 dark:bg-[#121212]/80 backdrop-blur-md border-4 border-black shadow-[8px_8px_0px_#000] flex justify-around items-center p-1.5 tabbar-bottom-safe-area rounded-4xl ${
      className || ""
    }`}
  >
    <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-[100] mix-blend-overlay rounded-4xl" />
    {children}
  </nav>
);

export default TabBar;
