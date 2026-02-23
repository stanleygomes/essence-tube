"use client";

import { useParams } from "next/navigation";
import Video from "@modules/video/page";
import RequireAuth from "@shared/components/require-auth/RequireAuth";

export default function VideoPage() {
  const { id, playlist } = useParams();

  return (
    <RequireAuth>
      <Video videoId={id?.toString()} playlistId={playlist?.toString()} />
    </RequireAuth>
  );
}
