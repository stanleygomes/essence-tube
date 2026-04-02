"use client";

import { useRouter } from "next/navigation";
import Icon from "@shared/ui/icon/Icon";

export interface IBackButton {
  showBackButton: boolean;
  backButtonText?: string;
  backRoute?: string;
}

export default function BackButton({
  showBackButton,
  backButtonText,
  backRoute,
}: IBackButton) {
  const router = useRouter();

  if (!showBackButton) return null;

  return (
    <button
      type="button"
      onClick={() => {
        if (backRoute) {
          router.push(backRoute);
        } else {
          router.back();
        }
      }}
      className="mr-3 flex items-center gap-2 group transition-all active:scale-95 cursor-pointer"
      aria-label="Voltar"
    >
      <div className="w-8 h-8 flex items-center justify-center border-2 border-black bg-white dark:bg-black shadow-[2px_2px_0px_#000] group-hover:bg-main group-hover:shadow-[4px_4px_0px_#000] group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
        <Icon
          name="arrow-left"
          className="w-4 h-4 text-black dark:text-white group-hover:text-black"
        />
      </div>
      {backButtonText && (
        <span className="font-black text-xs uppercase tracking-tight text-black dark:text-white hidden sm:block">
          {backButtonText}
        </span>
      )}
    </button>
  );
}
