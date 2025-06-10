import React from 'react';

interface LoadingProps {
  title: string;
}

const Loading: React.FC<LoadingProps> = ({ title }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh]">
      <div className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin mb-4"></div>
      <div className="text-base text-gray-700 dark:text-gray-200">{title}</div>
    </div>
  );
};

export default Loading;
