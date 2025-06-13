import React from "react";

interface TabItemProps {
  active?: boolean;
  onClick?: () => void;
  icon: React.ReactNode;
  label: string;
}

const TabItem: React.FC<TabItemProps> = ({ active, onClick, icon, label }) => (
  <button
    className={`flex flex-col items-center flex-1 transition-colors active:scale-95 transition cursor-pointer ${
      active
        ? "text-red-600 dark:text-red-400"
        : "text-gray-500 dark:text-gray-400"
    }`}
    onClick={onClick}
    type="button"
  >
    {icon}
    <span className="text-xs mt-1">{label}</span>
  </button>
);

export default TabItem;
