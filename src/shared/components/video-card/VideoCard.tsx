import Link from "next/link";

interface VideoCardProps {
  videoId: string;
  playlistId?: string;
  title: string;
  description: string;
  thumbnail: string;
  onAddToPlaylist?: () => void;
}

export default function VideoCard({
  playlistId,
  videoId,
  title,
  description,
  thumbnail,
  onAddToPlaylist,
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
              <button
                className="px-5 py-2 rounded-full bg-gray-100 text-blue-600 dark:bg-blue-600 dark:text-white font-semibold text-sm hover:bg-gray-200 dark:hover:bg-blue-700 transition"
                title="Ver vídeo"
              >
                View
              </button>
            </Link>
          ) : (
            <button
              onClick={e => {
                e.stopPropagation();
                if (onAddToPlaylist) onAddToPlaylist();
              }}
              className="px-5 py-2 rounded-full bg-gray-100 text-blue-600 dark:bg-blue-600 dark:text-white font-semibold text-sm hover:bg-gray-200 dark:hover:bg-blue-700 transition"
              title="Adicionar à playlist"
            >
              Add
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return CardContent;
}
