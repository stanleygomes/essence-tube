'use client';

import { useEffect, useState } from "react";
import Header from "@shared/components/header/Header";
import { getPlaylists, getPlaylistVideos } from "@services/playlistService";
import VideoCard from "@shared/components/video-card/VideoCard";
import { MdPlaylistPlay } from "react-icons/md";
import { IPlaylistItem } from "src/models/IPlaylistItem";
import { getUserConfig, setItemValue } from "@services/userConfigService";
import PlaylistCard from "@shared/components/playlist-card/PlaylistCard";

export default function Home() {
  const [playlists, setPlaylists] = useState<IPlaylistItem[]>([]);
  const [videos, setVideos] = useState<any[]>([]);
  const [loadingPlaylists, setLoadingPlaylists] = useState(false);
  const [loadingVideos, setLoadingVideos] = useState(false);

  const handleListPlaylists = () => {
    setVideos([]);
    setLoadingPlaylists(true);
    getPlaylists()
      .then(setPlaylists)
      .finally(() => setLoadingPlaylists(false));
  };

  const fetchVideosFromDefaultPlaylist = async () => {
    setLoadingVideos(true);
    const userConfig = getUserConfig();
    const playlistId = userConfig?.defaultPlaylist;

    if (playlistId) {
      try {
        const videos = await getPlaylistVideos(playlistId);
        setVideos(videos);
      } finally {
        setLoadingVideos(false);
      }
    } else {
      setLoadingVideos(false);
      handleListPlaylists();
    }
  };

  const handleSelectPlaylist = (id: string) => {
    setItemValue("defaultPlaylist", id);
    fetchVideosFromDefaultPlaylist();
  };

  useEffect(() => {
    fetchVideosFromDefaultPlaylist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        {loadingVideos ? (
          <div className="flex flex-col items-center justify-center min-h-[40vh]">
            <div className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <div className="text-base text-gray-700 dark:text-gray-200">Buscando videos</div>
          </div>
        ) : videos.length > 0 ? (
          videos.map(video => (
            <VideoCard
              key={video.id}
              videoId={video.videoId}
              playlistId={video.id}
              title={video.title}
              description={video.description}
              thumbnail={video.thumbnails.high}
            />
          ))
        ) : loadingPlaylists ? (
          <div className="flex flex-col items-center justify-center min-h-[40vh]">
            <div className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <div className="text-base text-gray-700 dark:text-gray-200">Carregando playlists...</div>
          </div>
        ) : playlists.length > 0 ? (
          playlists.map(playlist => (
            <PlaylistCard
              key={playlist.id}
              id={playlist.id}
              title={playlist.title}
              description={playlist.description}
              thumbnail={playlist.thumbnails.high}
              onClick={handleSelectPlaylist}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[40vh]">
            {videos.length === 0 && playlists.length > 0 && (
              <div className="text-base text-gray-700 dark:text-gray-200">A lista de vídeos está vazia.</div>
            )}
            {playlists.length === 0 && (
              <div className="text-base text-gray-700 dark:text-gray-200">Nenhuma playlist encontrada.</div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
