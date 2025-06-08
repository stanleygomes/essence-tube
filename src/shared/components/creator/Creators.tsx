import Image from "next/image";

interface Creator {
  id: string;
  name: string;
  avatar: string;
}

interface CreatorProps {
  creator: Creator;
  onClick?: () => void;
}

export default function Creator({ creator, onClick }: CreatorProps) {
  return (
    <div
      key={creator.id}
      className="flex flex-col items-center min-w-[72px] cursor-pointer"
      onClick={onClick}
    >
      <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
        <Image
          src={creator.avatar}
          alt={creator.name}
          width={56}
          height={56}
          className="object-cover w-full h-full"
        />
      </div>
      <span className="mt-2 text-xs text-center text-gray-800 dark:text-gray-100 font-medium truncate w-16">
        {creator.name}
      </span>
    </div>
  );
}
