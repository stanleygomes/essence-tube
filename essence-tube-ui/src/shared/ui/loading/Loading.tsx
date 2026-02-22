import React from 'react';

interface LoadingProps {
  title: string;
}


const Loading: React.FC<LoadingProps> = ({ title }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh]">
      <div className="mb-4 text-lg font-pixelify text-[#3a2c1a] dark:text-[#f7ecd7] tracking-widest animate-pulse">
        {title}
      </div>
      <div className="flex gap-1">
        {[...Array(6)].map((_, i) => (
          <span
            key={i}
            className={`block w-3 h-6 rounded-sm bg-[#c2b8a3] dark:bg-[#7a6a4f] animate-retro-bar`}
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
      <style jsx>{`
        @keyframes retro-bar {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        .animate-retro-bar {
          animation: retro-bar 1s infinite cubic-bezier(.4,0,.6,1);
        }
      `}</style>
    </div>
  );
};

export default Loading;
