'use client';

import { Tabbar, TabbarLink, Block } from 'konsta/react';
import { useState } from 'react';

import { RiHome3Line } from "react-icons/ri";
import { HiOutlineNewspaper } from "react-icons/hi2";

import Home from '@modules/home/page';
import Feed from '@modules/feed/page';

export interface IMain {
  activeTabDefault: string;
}

export default function Main({
  activeTabDefault
}: IMain) {
  const [activeTab, setActiveTab] = useState(activeTabDefault);

  return (
    <>
      <Tabbar
        labels
        icons
        className="left-0 bottom-0 fixed w-full z-50 bg-white dark:bg-black px-4 py-2 shadow-[0_-4px_16px_-4px_rgba(0,0,0,0.15)] dark:shadow-[0_-4px_16px_-4px_rgba(0,0,0,0.4)]"
      >
        <TabbarLink
          active={activeTab === 'tab-home'}
          onClick={() => setActiveTab('tab-home')}
          className={
            (activeTab === 'tab-home'
              ? "text-red-600 dark:text-red-400"
              : "text-gray-500 dark:text-gray-400"
            ) + " justify-center"
          }
          icon={<RiHome3Line className="w-7 h-7" />}
          label="Home"
        />
        <TabbarLink
          active={activeTab === 'tab-feed'}
          onClick={() => setActiveTab('tab-feed')}
          className={
            (activeTab === 'tab-feed'
              ? "text-red-600 dark:text-red-400"
              : "text-gray-500 dark:text-gray-400"
            ) + " justify-center"
          }
          icon={<HiOutlineNewspaper className="w-7 h-7" />}
          label="Feed"
        />
      </Tabbar>

      {activeTab === 'tab-home' && (
        <Block strong inset className="space-y-4">
          <Home />
        </Block>
      )}

      {activeTab === 'tab-feed' && (
        <Block strong inset className="space-y-4">
          <Feed />
        </Block>
      )}
    </>
  );
}
