
import React from "react";

import Icon from "@shared/ui/icon/Icon";
import Typography from "@shared/ui/typography/Typography";

interface TabItemProps {
  active?: boolean;
  onClick?: () => void;
  icon: string;
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
    <Icon name={icon} className="text-xl" />
    <Typography variant="span" className="text-xs mt-1 font-pixelify">
      {label}
    </Typography>
  </button>
);

export default TabItem;
