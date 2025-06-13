'use client';

import { useState } from 'react';
import { RiHome3Line } from "react-icons/ri";
import { HiOutlineNewspaper } from "react-icons/hi2";
import Home from '@modules/home/page';
import Feed from '@modules/feed/page';
import TabBar from '@shared/ui/tab-bar/TabBar';
import TabItem from '@shared/ui/tab-item/TabItem';
import TabView from '@shared/ui/tab-view/TabView';

export interface IMain {
  activeTabDefault: string;
}

const tabs = [
  {
    key: 'tab-home',
    label: 'Home',
    icon: <RiHome3Line className="w-7 h-7" />,
    content: <Home />,
  },
  {
    key: 'tab-feed',
    label: 'Feed',
    icon: <HiOutlineNewspaper className="w-7 h-7" />,
    content: <Feed />,
  },
];

export default function Main({ activeTabDefault }: IMain) {
  const [activeTab, setActiveTab] = useState(activeTabDefault);

  return (
    <div className="flex flex-col min-h-screen">
      <TabBar>
        {tabs.map(tab => (
          <TabItem
            key={tab.key}
            active={activeTab === tab.key}
            onClick={() => setActiveTab(tab.key)}
            icon={tab.icon}
            label={tab.label}
          />
        ))}
      </TabBar>

      <div className="flex-1 pb-16 pt-4">
        {tabs.map(tab => (
          <TabView key={tab.key} active={activeTab === tab.key}>
            {tab.content}
          </TabView>
        ))}
      </div>
    </div>
  );
}
