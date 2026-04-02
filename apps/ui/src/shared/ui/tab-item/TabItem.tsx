import React from "react";

import Icon from "@shared/ui/icon/Icon";

interface TabItemProps {
  active?: boolean;
  onClick?: () => void;
  icon: string;
  label: string;
}

const TabItem: React.FC<TabItemProps> = ({ active, onClick, icon, label }) => (
  <button
    className={`flex-1 flex flex-col items-center justify-center py-2 px-6 transition-all active:scale-95 cursor-pointer rounded-full border-2 ${
      active
        ? "bg-main text-black border-black shadow-[2px_2px_0px_#000]"
        : "text-gray-500 dark:text-gray-400 border-transparent hover:bg-black/5 dark:hover:bg-white/5"
    }`}
    onClick={onClick}
    type="button"
  >
    <div className="flex flex-col items-center">
      <Icon
        name={icon}
        className={`text-xl ${active ? "opacity-100" : "opacity-70"}`}
      />
      <span
        className={`text-[10px] mt-0.5 uppercase font-black tracking-tighter ${active ? "opacity-100" : "opacity-70"}`}
      >
        {label}
      </span>
    </div>
  </button>
);

export default TabItem;
