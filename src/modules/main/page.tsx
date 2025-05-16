'use client';

import { Tabbar, TabbarLink, Icon, Block } from 'konsta/react';
import { useState } from 'react';

import InstallPrompt from '@shared/components/install-prompt/InstallPrompt';

import { RiHome3Line } from "react-icons/ri";
import { HiOutlineNewspaper } from "react-icons/hi2";

import Home from '@modules/home/page';
import Feed from '@modules/feed/page';

export default function Main({ activeTabDefault }: { activeTabDefault: string }) {
  const [activeTab, setActiveTab] = useState(activeTabDefault);

  return (
    <>
      <InstallPrompt />

      <Tabbar
        labels
        icons
        className="left-0 bottom-0 fixed"
      >
        <TabbarLink
          active={activeTab === 'tab-home'}
          onClick={() => setActiveTab('tab-home')}
          icon={
            <Icon
              ios={<RiHome3Line className="w-7 h-7" />}
              material={<RiHome3Line className="w-6 h-6" />}
            />
          }
          label="Home"
        />
        <TabbarLink
          active={activeTab === 'tab-feed'}
          onClick={() => setActiveTab('tab-feed')}
          icon={
            <Icon
              ios={<HiOutlineNewspaper className="w-7 h-7" />}
              material={<HiOutlineNewspaper className="w-6 h-6" />}
            />
          }
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
