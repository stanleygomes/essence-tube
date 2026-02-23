import React from "react";
import LoadingIcon from "@shared/ui/loading-icon/LoadingIcon";

interface LoadingProps {
  title: string;
}

const Loading: React.FC<LoadingProps> = ({ title }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh]">
      <LoadingIcon className="mb-4" />
      <div className="text-base text-gray-700 dark:text-gray-200">{title}</div>
    </div>
  );
};

export default Loading;
