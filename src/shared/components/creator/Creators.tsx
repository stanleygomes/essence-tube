import Image from "next/image";
import Typography from "@shared/ui/typography/Typography";

interface Creator {
  id: string;
  name: string;
  avatar: string;
}

interface CreatorProps {
  creator: Creator;
  onClick?: () => void;
  selected?: boolean;
}

export default function Creator({ creator, onClick, selected }: CreatorProps) {
  return (
    <div
      key={creator.id}
      className="flex flex-col items-center min-w-[72px] cursor-pointer active:scale-95 transition"
      onClick={onClick}
    >
      <div
        className={`w-18 h-18 overflow-hidden bg-gray-200 dark:bg-gray-700 ${
          selected ? "border-2 border-white" : ""
        } shadow-[4px_4px_0_#c2b8a3] dark:shadow-[4px_4px_0_#7a6a4f] active:shadow-none transition-shadow`}
      >
        <Image
          src={creator.avatar}
          alt={creator.name}
          width={72}
          height={72}
          className="object-cover w-full h-full"
        />
      </div>
      <Typography
        variant="span"
        className={`mt-2 text-xs text-center text-gray-800 dark:text-gray-100 w-16 truncate ${
          selected ? "font-bold" : "font-medium"
        }`}
      >
        {creator.name}
      </Typography>
    </div>
  );
}
