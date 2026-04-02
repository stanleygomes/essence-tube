import React from "react";
import Image from "next/image";

interface CreatorProps {
  creator: {
    id: string;
    name: string;
    avatar: string;
  };
  selected?: boolean;
  onClick: () => void;
}

export default function Creator({ creator, selected, onClick }: CreatorProps) {
  return (
    <div
      onClick={onClick}
      className="flex flex-col items-center gap-3 cursor-pointer transition-all active:scale-95 group min-w-[80px]"
    >
      <div
        className={`relative w-16 h-16 rounded-full border-4 border-black overflow-hidden bg-white dark:bg-[#1a1a1a] transition-all duration-300
          ${
            selected
              ? "shadow-[4px_4px_0px_#000] scale-110 -translate-y-2 ring-4 ring-main/30"
              : "shadow-none hover:shadow-[2px_2px_0px_#000] hover:-translate-y-1"
          }
        `}
      >
        {creator.avatar ? (
          <Image
            src={creator.avatar}
            alt={creator.name}
            width={64}
            height={64}
            className={`w-full h-full object-cover rounded-full ${selected ? "grayscale-0" : "grayscale-[50%]"}`}
            unoptimized
          />
        ) : (
          <Image
            src="/img/emoji-cool.png"
            alt="User"
            width={64}
            height={64}
            className="w-full h-full object-cover p-2"
          />
        )}
        {selected && (
          <div className="absolute inset-0 bg-main/10 mix-blend-multiply" />
        )}
      </div>

      <span
        className={`text-[10px] font-black uppercase text-center max-w-[80px] break-words leading-none transition-colors px-1 py-0.5 rounded
          ${
            selected
              ? "text-black dark:text-white bg-main/20 border-b-2 border-black"
              : "text-gray-500"
          }
        `}
      >
        {creator.name}
      </span>
    </div>
  );
}
