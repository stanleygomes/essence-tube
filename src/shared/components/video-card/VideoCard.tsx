
import Link from "next/link";
import Button, { ButtonVariant } from "@shared/components/ui/Button";
import Image from "next/image";

import Card from "@shared/ui/card/Card";
import Typography from "@shared/ui/typography/Typography";

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
  const cardClass = ` my-2 overflow-hidden${
    buttonClick ? "" : " active:scale-95 cursor-pointer"
  }`;

  const content = (
    <Card className={cardClass}>
      <Image
        src={thumbnail}
        alt={title}
        width={320}
        height={180}
        className="w-full aspect-video object-cover"
      />
      <div className="flex items-center px-4 py-3">
        <div className="flex-1 min-w-0">
          <Typography
            variant="h2"
            className="font-semibold text-base text-gray-900 dark:text-gray-100 mb-1 truncate"
          >
            {title}
          </Typography>
          <Typography
            variant="p"
            className="text-sm text-gray-600 dark:text-gray-400 truncate"
          >
            {subtitle}
          </Typography>
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
    </Card>
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
