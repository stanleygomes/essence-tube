import Link from "next/link";

interface VideoCardProps {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
}

export default function VideoCard({ id, title, description, thumbnail }: VideoCardProps) {
  return (
    <Link href={`/video/${id}`}>
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
      </div>
    </Link>
  );
}
