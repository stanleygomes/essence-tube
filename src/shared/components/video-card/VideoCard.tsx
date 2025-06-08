import Link from "next/link";
import { FiPlusCircle } from "react-icons/fi";

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
    <div className="flex gap-4 items-start bg-white dark:bg-neutral-900 rounded-xl shadow hover:shadow-lg transition p-4 mb-4 cursor-pointer">
      <img
        src={thumbnail}
        alt={title}
        className="w-32 h-20 object-cover rounded-lg flex-shrink-0"
      />
      <div className="flex flex-col flex-1">
        <h2 className="font-semibold text-base text-gray-900 dark:text-gray-100 mb-1 line-clamp-2">{title}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{description}</p>
      </div>
      {!playlistId && (
        <button
          onClick={e => {
            e.stopPropagation();
            if (onAddToPlaylist) onAddToPlaylist();
          }}
          className="ml-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          title="Adicionar à playlist"
        >
          <FiPlusCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </button>
      )}
    </div>
  );

  if (playlistId) {
    return (
      <Link href={`/video/${playlistId}/${videoId}`}>
        {CardContent}
      </Link>
    );
  }

  return CardContent;
}
