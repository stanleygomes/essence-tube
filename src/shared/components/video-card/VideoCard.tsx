import Link from "next/link";
import LoadingIcon from "@shared/components/ui/LoadingIcon";
import Button from "@shared/components/ui/Button";

interface VideoCardProps {
  videoId: string;
  playlistId?: string;
  title: string;
  description: string;
  thumbnail: string;
  onAddToPlaylist?: () => void;
  loadingAddButton?: boolean;
  loadingAddButtonText?: string;
  addButtonText?: string;
  buttonVariant?: "red" | "green" | "blue";
}

export default function VideoCard({
  playlistId,
  videoId,
  title,
  description,
  thumbnail,
  onAddToPlaylist,
  loadingAddButton = false,
  loadingAddButtonText,
  addButtonText = "Add",
  buttonVariant = "red",
}: VideoCardProps) {
  const CardContent = (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-md hover:shadow-lg transition my-6 overflow-hidden">
      <img
        src={thumbnail}
        alt={title}
        className="w-full h-50 object-cover"
      />
      <div className="flex items-center px-4 py-3">
        <div className="flex-1 min-w-0">
          <h2 className="font-semibold text-base text-gray-900 dark:text-gray-100 mb-1 truncate">
            {title}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
            {description}
          </p>
        </div>
        <div className="ml-4 flex-shrink-0">
          {playlistId ? (
            <Link href={`/video/${playlistId}/${videoId}`}>
              <Button
                type="button"
                variant="red"
                title="Ver vídeo"
                className="!px-5 !py-2"
              >
                View
              </Button>
            </Link>
          ) : (
            <Button
              onClick={e => {
                e.stopPropagation();
                if (!loadingAddButton && onAddToPlaylist) onAddToPlaylist();
              }}
              loading={loadingAddButton}
              loadingText={loadingAddButtonText}
              variant={buttonVariant}
              title="Adicionar à playlist"
            >
              {addButtonText}
            </Button>
          )}
        </div>
      </div>
    </div>
  );

  return CardContent;
}
