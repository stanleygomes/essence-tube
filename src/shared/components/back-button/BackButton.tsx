'use client';

import { IoChevronBack, IoClose, IoPersonCircleOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";

export interface IBackButton {
  showBackButton: boolean;
  backButtonText?: string;
}

export default function BackButton({
  showBackButton,
  backButtonText,
}: IBackButton) {
  const router = useRouter();

  if (!showBackButton) return null;

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="mr-2 flex items-center gap-2 justify-center cursor-pointer active:scale-95 transition"
      aria-label="Voltar"
    >
      <IoChevronBack className="w-7 h-7 text-gray-900 dark:text-gray-100" />
      {backButtonText && (
        <span>{backButtonText}</span>
      )}
    </button>
  );
}
