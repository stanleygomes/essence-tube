import React from "react";
import Image from "next/image";

interface PlaylistCardProps {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  onClick: (id: string) => void;
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({
  id,
  title,
  description,
  thumbnail,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick(id)}
      className="group relative bg-white dark:bg-[#1a1a1a] border-4 border-black p-5 shadow-[8px_8px_0px_#000] cursor-pointer hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[12px_12px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[4px_4px_0px_#000] transition-all duration-200 h-full"
    >
      <div className="flex gap-5 items-center">
        <div className="relative w-24 h-24 sm:w-32 sm:h-32 border-4 border-black flex-shrink-0 overflow-hidden bg-gray-100 dark:bg-gray-800">
          {thumbnail ? (
            <Image
              src={thumbnail}
              alt={title}
              fill
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="font-black text-gray-400">?</span>
            </div>
          )}
          <div className="absolute top-0 right-0 bg-black text-white px-2 py-1 text-[10px] uppercase font-black">
            Archive
          </div>
        </div>

        <div className="flex flex-col justify-center gap-1 overflow-hidden">
          <h3 className="font-black text-xl sm:text-2xl text-black dark:text-white uppercase tracking-tighter leading-none line-clamp-2">
            {title}
          </h3>
          <p className="font-geist-mono font-bold text-[12px] text-gray-500 dark:text-gray-400 uppercase tracking-tight line-clamp-3 mt-1 leading-normal">
            {description ||
              "Access the complete minimalist video catalog from this source."}
          </p>
          <div className="mt-2 text-[12px] font-black uppercase text-black dark:text-main underline underline-offset-4 group-hover:no-underline group-hover:bg-main group-hover:text-black group-hover:px-1 transition-all">
            Initialize feed
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistCard;
