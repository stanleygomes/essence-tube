'use client'

import { useParams } from "next/navigation";
import Video from "@modules/video/page";

export default function VideoPage() {
  const { id } = useParams();

  return (
    <Video
      videoId={id?.toString()}
    />
  );
}
