'use client';

import { useEffect, useState } from "react";
import Header from "@shared/components/header/Header";
import { getPlaylists, getPlaylistVideos } from "@services/playlistService";
import { IPlaylistItem } from "src/models/IPlaylistItem";
import { getUserConfig, setItemValue } from "@services/userConfigService";
import Loading from "@shared/ui/loading/Loading";
import VideoCard from "@shared/components/video-card/VideoCard";
import PlaylistCard from "@shared/components/playlist-card/PlaylistCard";
import PullToRefresh from "@shared/ui/pull-to-refresh/PullToRefresh";
import { ButtonLink } from "@shared/ui/button-link/ButtonLink";
import { humanizeDate } from "@shared/utils/date-utils";

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
      <Header title='Home' showLogo={true} />
      <div className="px-2 sm:px-4">
        <div className="max-w-5xl mx-auto">
          <PullToRefresh onRefresh={fetchVideosFromDefaultPlaylist}>
            {loadingVideos ? (
              <Loading title="Loading videos..." />
            ) : videos.length > 0 ? (
              <VideoList
                videos={videos}
                handleListPlaylists={handleListPlaylists}
              />
            ) : loadingPlaylists ? (
              <Loading title="Loading playlists..." />
            ) : (
              <PlaylistList playlists={playlists} onSelect={handleSelectPlaylist} />
            )}
          </PullToRefresh>
        </div>
      </div>
    </>
  );
}

interface VideoListProps {
  videos: any[];
  handleListPlaylists: () => void;
}

function buildVideoSubtitle(video: any): string {
  const owner = video.owner?.title ? `By ${video.owner.title}` : '';
  let publishedAt = '';

  if (video.videoPublishedAt) {
    publishedAt = ' • ' + humanizeDate(new Date(video.videoPublishedAt));
  }

  return `${owner}${publishedAt}`;
}

function VideoList({ videos, handleListPlaylists }: VideoListProps) {
  if (!videos.length) return null;

  return (
    <>
      <div className="flex items-center justify-between mt-6 mb-2 mx-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Your videos</h2>
        <ButtonLink
          onClick={handleListPlaylists}
          aria-label="Listar playlists"
        >
          Alternar playlist
        </ButtonLink>
      </div>
      <div
        className="
          grid grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          gap-0 sm:gap-4
          mx-4
        "
      >
        {videos.map(video => (
          <VideoCard
            key={video.id}
            link={`/video/${video.id}/${video.videoId}`}
            title={video.title}
            subtitle={buildVideoSubtitle(video)}
            thumbnail={video.thumbnails.high}
          />
        ))}
      </div>
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
