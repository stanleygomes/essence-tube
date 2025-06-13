'use client';

import { useState } from 'react';
import { RiHome3Line } from "react-icons/ri";
import { HiOutlineNewspaper } from "react-icons/hi2";
import Home from '@modules/home/page';
import Feed from '@modules/feed/page';

export interface IMain {
  activeTabDefault: string;
}

export default function Main({ activeTabDefault }: IMain) {
  const [activeTab, setActiveTab] = useState(activeTabDefault);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Abas */}
      <nav className="fixed bottom-0 left-0 w-full z-50 bg-white/80 dark:bg-black/80 border-t border-gray-200 dark:border-gray-800 flex justify-around py-2 shadow-[0_-4px_16px_-4px_rgba(0,0,0,0.10)] backdrop-blur">
        <button
          className={`flex flex-col items-center flex-1 transition-colors ${activeTab === 'tab-home'
            ? 'text-red-600 dark:text-red-400'
            : 'text-gray-500 dark:text-gray-400'
          }`}
          onClick={() => setActiveTab('tab-home')}
        >
          <RiHome3Line className="w-7 h-7" />
          <span className="text-xs mt-1">Home</span>
        </button>
        <button
          className={`flex flex-col items-center flex-1 transition-colors ${activeTab === 'tab-feed'
            ? 'text-red-600 dark:text-red-400'
            : 'text-gray-500 dark:text-gray-400'
          }`}
          onClick={() => setActiveTab('tab-feed')}
        >
          <HiOutlineNewspaper className="w-7 h-7" />
          <span className="text-xs mt-1">Feed</span>
        </button>
      </nav>

      {/* Conteúdo das abas */}
      <div className="flex-1 pb-16 pt-4">
        {activeTab === 'tab-home' && (
          <div className="space-y-4">
            <Home />
          </div>
        )}
        {activeTab === 'tab-feed' && (
          <div className="space-y-4">
            <Feed />
          </div>
        )}
      </div>
    </div>
  );
}
