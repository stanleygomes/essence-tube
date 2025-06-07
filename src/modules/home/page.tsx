'use client';

import { useEffect, useState } from "react";
import Header from "@shared/components/header/Header";
import { getPlaylists } from "@services/playlistService";
import VideoCard from "@shared/components/video-card/VideoCard";
import { MdPlaylistPlay } from "react-icons/md"; // Ícone mais relacionado a playlists
import { IPlaylistItem } from "src/models/IPlaylistItem";

export default function Home() {
  const [playlists, setPlaylists] = useState<IPlaylistItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  }, []);

  const handleListPlaylists = () => {
    setLoading(true);
    getPlaylists()
      .then(setPlaylists)
      .finally(() => setLoading(false));
  };

  return (
    <>
      <Header
        title='Home'
        showLogo={true}
        action={
          <button
            onClick={handleListPlaylists}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            aria-label="Listar playlists"
          >
            <MdPlaylistPlay className="w-7 h-7 text-gray-900 dark:text-gray-100" />
          </button>
        }
      />
      <div className="py-6 px-2 safe-page-content">
        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[40vh]">
            <div className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <div className="text-base text-gray-700 dark:text-gray-200">Carregando playlists...</div>
          </div>
        ) : (
          playlists.map(playlist => (
            <VideoCard
              key={playlist.id}
              id={playlist.id}
              title={playlist.title}
              description={playlist.description}
              thumbnail={playlist.thumbnails.high}
            />
          ))
        )}
      </div>
    </>
  );
}
