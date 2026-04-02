import React from "react";
import Image from "next/image";
import Link from "next/link";
import Button, { ButtonColor } from "@shared/ui/button/Button";

interface VideoCardProps {
  title: string;
  subtitle: string;
  thumbnail: string;
  link?: string;
  buttonClick?: () => void;
  loadingAddButton?: boolean;
  loadingAddButtonText?: string;
  addButtonText?: string;
  buttonColor?: ButtonColor;
  addSuccess?: boolean;
  cardClass?: string;
}

const VideoCard: React.FC<VideoCardProps> = ({
  title,
  subtitle,
  thumbnail,
  link,
  buttonClick,
  loadingAddButton,
  loadingAddButtonText,
  addButtonText,
  buttonColor = "default",
  addSuccess,
  cardClass = "",
}) => {
  const content = (
    <div
      className={`group relative bg-white dark:bg-[#1a1a1a] border-4 border-black p-4 shadow-[8px_8px_0px_#000] hover:shadow-[12px_12px_0px_#000] transition-all duration-300 transform ${cardClass}`}
    >
      <div className="relative aspect-video border-2 border-black overflow-hidden mb-4 bg-gray-100 dark:bg-gray-800">
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={title}
            fill
            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-black text-gray-400 text-xs">NO SIGNAL</span>
          </div>
        )}
        {addSuccess && (
          <div className="absolute inset-0 bg-green-500/40 flex items-center justify-center backdrop-blur-[2px] z-10 animate-in fade-in zoom-in duration-300">
            <span className="font-black text-white text-2xl drop-shadow-[2px_2px_0px_#000] uppercase tracking-tighter">
              ADDED
            </span>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <h3 className="font-black text-lg sm:text-xl text-black dark:text-white uppercase leading-none line-clamp-2 min-h-[2.5rem] tracking-tighter">
          {title}
        </h3>
        <p className="font-geist-mono font-bold text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-widest truncate pb-2 border-b border-black/5 dark:border-white/10">
          {subtitle}
        </p>
      </div>

      {(buttonClick || addButtonText) && (
        <div className="mt-4 flex justify-end">
          <Button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (!loadingAddButton) buttonClick?.();
            }}
            color={buttonColor}
            className={`w-full font-black tracking-tighter py-3 text-xs transition-all ${loadingAddButton ? "opacity-70 cursor-not-allowed" : ""}`}
            disabled={loadingAddButton}
            type="button"
          >
            {loadingAddButton
              ? loadingAddButtonText
              : addButtonText || "View Detail"}
          </Button>
        </div>
      )}
    </div>
  );

  if (link) {
    return (
      <Link href={link} className="block no-underline decoration-transparent">
        {content}
      </Link>
    );
  }

  return content;
};

export default VideoCard;
