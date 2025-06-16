'use client';

import { useEffect, useState } from "react";
import Header from "@shared/components/header/Header";
import { getPlaylists, getPlaylistVideos } from "@services/playlistService";
import { MdPlaylistPlay } from "react-icons/md";
import { IPlaylistItem } from "src/models/IPlaylistItem";
import { getUserConfig, setItemValue } from "@services/userConfigService";
import Loading from "@shared/ui/loading/Loading";
import VideoCard from "@shared/components/video-card/VideoCard";
import PlaylistCard from "@shared/components/playlist-card/PlaylistCard";
import PullToRefresh from "@shared/ui/pull-to-refresh/PullToRefresh";

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
        actionButton={
          <button
            onClick={handleListPlaylists}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            aria-label="List playlists"
          >
            <MdPlaylistPlay className="w-9 h-9 text-gray-900 dark:text-gray-100" />
          </button>
        }
      />
      <div className="px-6">
        <PullToRefresh onRefresh={fetchVideosFromDefaultPlaylist}>
          {loadingVideos ? (
            <Loading
              title="Loading videos..."
            />
          ) : videos.length > 0 ? (
            <VideoList videos={videos} />
          ) : loadingPlaylists ? (
            <Loading
              title="Loading playlists..."
            />
          ) : (
            <PlaylistList playlists={playlists} onSelect={handleSelectPlaylist} />
          )}
        </PullToRefresh>
      </div>
    </>
  );
}

interface VideoListProps {
  videos: any[];
}

function buildVideoSubtitle(video: any): string {
  const owner = video.owner?.title ? `By ${video.owner.title}` : '';
  const publishedAt = video.videoPublishedAt
    ? ` at ${new Date(video.videoPublishedAt).toLocaleDateString()}`
    : '';
  return `${owner}${publishedAt}`;
}

function VideoList({ videos }: VideoListProps) {
  if (!videos.length) return null;
  return (
    <>
      {videos.map(video => (
        <VideoCard
          key={video.id}
          link={`/video/${video.id}/${video.videoId}`}
          title={video.title}
          subtitle={buildVideoSubtitle(video)}
          thumbnail={video.thumbnails.high}
        />
      ))}
    </>
  );
}

interface PlaylistListProps {
  playlists: IPlaylistItem[];
  onSelect: (id: string) => void;
}

function PlaylistList({ playlists, onSelect }: PlaylistListProps) {
  if (!playlists.length) return null;
  return (
    <>
      <div className="my-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">
          Select a playlist
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          The videos from this playlist will be listed here
        </p>
      </div>
      {playlists.map(playlist => (
        <PlaylistCard
          key={playlist.id}
          id={playlist.id}
          title={playlist.title}
          description={playlist.description}
          thumbnail={playlist.thumbnails.high}
          onClick={onSelect}
        />
      ))}
    </>
  );
}
