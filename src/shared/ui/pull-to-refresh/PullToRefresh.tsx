'use client'

import React, { useRef, useState } from "react";

interface PullToRefreshProps {
  onRefresh: () => Promise<void>;
  children: React.ReactNode;
}

export default function PullToRefresh({ onRefresh, children }: PullToRefreshProps) {
  const [pulling, setPulling] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [pullHeight, setPullHeight] = useState(0);
  const startY = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (window.scrollY === 0) {
      startY.current = e.touches[0].clientY;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startY.current !== null) {
      const distance = e.touches[0].clientY - startY.current;
      if (distance > 0) {
        setPulling(true);
        setPullHeight(Math.min(distance, 80));
      }
    }
  };

  const handleTouchEnd = async () => {
    if (pullHeight > 60) {
      setRefreshing(true);
      setPulling(false);
      setPullHeight(0);
      await onRefresh();
      setRefreshing(false);
    } else {
      setPulling(false);
      setPullHeight(0);
    }
    startY.current = null;
  };

  return (
    <div
      className="relative"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="flex items-center justify-center text-sm text-gray-500 dark:text-gray-400 transition-all duration-200"
        style={{ height: pulling || refreshing ? pullHeight : 0 }}
      >
        {refreshing
          ? "Atualizando..."
          : pulling && pullHeight > 40
          ? "Solte para atualizar"
          : pulling
          ? "Puxe para atualizar"
          : ""}
      </div>
      {children}
    </div>
  );
}
