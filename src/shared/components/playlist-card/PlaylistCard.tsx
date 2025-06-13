import Image from "next/image";

interface PlaylistCardProps {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  onClick?: (id: string) => void;
}

export default function PlaylistCard({ id, title, description, thumbnail, onClick }: PlaylistCardProps) {
  return (
    <div
      className="flex gap-4 items-start bg-white dark:bg-neutral-900 rounded-xl shadow hover:shadow-lg transition p-4 mb-4 cursor-pointer"
      onClick={() => onClick?.(id)}
    >
      <Image
        src={thumbnail}
        alt={title}
        className="w-32 h-20 object-cover rounded-lg flex-shrink-0"
      />
      <div className="flex flex-col flex-1">
        <h2 className="font-semibold text-base text-gray-900 dark:text-gray-100 mb-1 line-clamp-2">{title}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{description}</p>
      </div>
    </div>
  );
}
