import Link from "next/link";
import Button, { ButtonVariant } from "@shared/components/ui/Button";
import Image from "next/image";

interface VideoCardProps {
  title: string;
  subtitle: string;
  thumbnail: string;
  link?: string;
  buttonClick?: () => void;
  loadingAddButton?: boolean;
  loadingAddButtonText?: string;
  addButtonText?: string;
  buttonVariant?: ButtonVariant;
}

export default function VideoCard({
  title,
  subtitle,
  thumbnail,
  link,
  buttonClick,
  loadingAddButton = false,
  loadingAddButtonText,
  addButtonText = "Add",
  buttonVariant = "red",
}: VideoCardProps) {
  const content = (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-md hover:shadow-lg transition my-6 overflow-hidden active:scale-95 transition cursor-pointer">
      <Image
        src={thumbnail}
        alt={title}
        width={320}
        height={180}
        className="w-full aspect-video object-cover"
      />
      <div className="flex items-center px-4 py-3">
        <div className="flex-1 min-w-0">
          <h2 className="font-semibold text-base text-gray-900 dark:text-gray-100 mb-1 truncate">
            {title}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
            {subtitle}
          </p>
        </div>
        {buttonClick && (
          <div className="ml-4 flex-shrink-0">
            <Button
              onClick={e => {
                e.stopPropagation();
                if (!loadingAddButton) buttonClick();
              }}
              loading={loadingAddButton}
              loadingText={loadingAddButtonText}
              variant={buttonVariant}
              title="Ação"
            >
              {addButtonText}
            </Button>
          </div>
        )}
      </div>
    </div>
  );

  if (link) {
    return (
      <Link href={link} className="block">
        {content}
      </Link>
    );
  }

  return content;
}
