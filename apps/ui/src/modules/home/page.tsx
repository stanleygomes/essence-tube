"use client";

import { useEffect, useState } from "react";
import Header from "@shared/components/header/Header";
import { getPlaylists, getPlaylistVideos } from "@services/playlistService";
import { IPlaylistItem } from "src/models/IPlaylistItem";
import { getUserConfig, setItemValue } from "@services/userConfigService";
import Loading from "@shared/ui/loading/Loading";
import VideoCard from "@shared/components/video-card/VideoCard";
import PlaylistCard from "@shared/components/playlist-card/PlaylistCard";
import PullToRefresh from "@shared/ui/pull-to-refresh/PullToRefresh";
import Button from "@shared/ui/button/Button";
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
      <Header title="Home" showLogo={true} />
      <div className="min-h-screen pb-24">
        <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[0] mix-blend-overlay" />

        <div className="px-4 sm:px-6 relative z-10">
          <div className="max-w-5xl mx-auto">
            <PullToRefresh onRefresh={fetchVideosFromDefaultPlaylist}>
              {loadingVideos ? (
                <div className="py-20 text-center">
                  <Loading title="RETRIEVING VIDEOS..." />
                </div>
              ) : videos.length > 0 ? (
                <VideoList
                  videos={videos}
                  handleListPlaylists={handleListPlaylists}
                />
              ) : loadingPlaylists ? (
                <div className="py-20 text-center">
                  <Loading title="LOADING PLAYLISTS..." />
                </div>
              ) : (
                <PlaylistList
                  playlists={playlists}
                  onSelect={handleSelectPlaylist}
                />
              )}
            </PullToRefresh>
          </div>
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
  const owner = video.owner?.title ? `BY ${video.owner.title}` : "";
  let publishedAt = "";

  if (video.videoPublishedAt) {
    publishedAt =
      " • " + humanizeDate(new Date(video.videoPublishedAt)).toUpperCase();
  }

  return `${owner}${publishedAt}`;
}

function VideoList({ videos, handleListPlaylists }: VideoListProps) {
  if (!videos.length) return null;

  return (
    <div className="py-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-white dark:bg-[#1a1a1a] p-6 border-4 border-black shadow-[8px_8px_0px_#000]">
        <div>
          <h2 className="font-black text-3xl sm:text-4xl text-black dark:text-white uppercase tracking-tighter">
            Your feed
          </h2>
          <p className="font-geist-mono font-bold text-xs text-gray-500 uppercase tracking-widest mt-1">
            {videos.length} videos curated for you
          </p>
        </div>
        <Button
          color="yellow"
          onClick={handleListPlaylists}
          className="w-full sm:w-auto py-4 px-8 border-4 border-black shadow-[4px_4px_0px_#000]"
          aria-label="Listar playlists"
        >
          Change playlist source
        </Button>
      </div>

      <div
        className="
          grid grid-cols-1
          md:grid-cols-2
          lg:grid-cols-2
          gap-8
        "
      >
        {videos.map((video, idx) => (
          <VideoCard
            key={video.id}
            link={`/video/${video.id}/${video.videoId}`}
            title={video.title}
            subtitle={buildVideoSubtitle(video)}
            thumbnail={video.thumbnails.high}
            cardClass={
              idx % 3 === 0 ? "rotate-1" : idx % 3 === 1 ? "-rotate-1" : ""
            }
          />
        ))}
      </div>
    </div>
  );
}

interface PlaylistListProps {
  playlists: IPlaylistItem[];
  onSelect: (id: string) => void;
}

function PlaylistList({ playlists, onSelect }: PlaylistListProps) {
  if (!playlists.length) return null;
  return (
    <div className="py-8">
      <div className="mb-10 bg-main p-8 border-4 border-black shadow-[8px_8px_0px_#000]">
        <h2 className="font-black text-4xl sm:text-5xl text-black uppercase tracking-tighter leading-none mb-4">
          Select a playlist
        </h2>
        <p className="font-geist-mono font-bold text-sm text-black py-2 border-y-2 border-black/10 uppercase tracking-tight">
          Choose a source to populate your minimalist video feed
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {playlists.map((playlist) => (
          <PlaylistCard
            key={playlist.id}
            id={playlist.id}
            title={playlist.title}
            description={playlist.description}
            thumbnail={
              playlist.thumbnails.high ||
              playlist.thumbnails.medium ||
              playlist.thumbnails.default
            }
            onClick={onSelect}
          />
        ))}
      </div>
    </div>
  );
}
