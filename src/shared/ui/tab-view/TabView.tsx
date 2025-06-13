import React from "react";

interface TabViewProps {
  active: boolean;
  children: React.ReactNode;
}

const TabView: React.FC<TabViewProps> = ({ active, children }) =>
  active ? <div className="space-y-4">{children}</div> : null;

export default TabView;
