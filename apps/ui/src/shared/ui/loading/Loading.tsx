import React from "react";

interface LoadingProps {
  title?: string;
}

const Loading: React.FC<LoadingProps> = ({ title = "SIGNAL SEARCHING..." }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 gap-6 select-none pointer-events-none">
      <div className="relative group">
        <div className="w-16 h-16 bg-main border-4 border-black shadow-[8px_8px_0px_#000] rotate-12 animate-bounce flex items-center justify-center">
          <span className="font-black text-black text-2xl">?</span>
        </div>
        <div className="absolute inset-0 w-16 h-16 border-4 border-black -z-10 -rotate-6 animate-pulse bg-gray-200 dark:bg-gray-800 translate-x-2 translate-y-2" />
      </div>

      <div className="flex flex-col items-center">
        <h2 className="font-black text-2xl text-black dark:text-white uppercase tracking-tighter">
          {title}
        </h2>
        <p className="font-geist-mono font-bold text-[10px] text-gray-500 uppercase tracking-widest mt-1">
          Establishing connection to neural link...
        </p>
      </div>

      <div className="w-48 h-2 bg-black/10 dark:bg-white/10 border-2 border-black overflow-hidden relative">
        <div className="absolute inset-y-0 bg-main w-1/4 animate-[loading-bar_1.2s_infinite_linear]" />
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes loading-bar {
          0% { left: -40%; }
          100% { left: 110%; }
        }
      `,
        }}
      />
    </div>
  );
};

export default Loading;
