"use client";

import { useEffect, useState } from "react";
import Header from "@shared/components/header/Header";
import { getChannels, getChannelVideos } from "@services/subscriptionService";
import Creator from "@shared/components/creator/Creators";
import { addVideoToPlaylist } from "@services/playlistService";
import { getUserConfig } from "@services/userConfigService";
import VideoCard from "@shared/components/video-card/VideoCard";
import Loading from "@shared/ui/loading/Loading";
import HorizontalScroll from "@shared/ui/horizontal-scroll/HorizontalScroll";
import { humanizeDate } from "@shared/utils/date-utils";

export default function Feed() {
  const [creators, setCreators] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [selectedCreator, setSelectedCreator] = useState<any>(null);
  const [channelVideos, setChannelVideos] = useState<any[]>([]);
  const [loadingVideos, setLoadingVideos] = useState(false);

  const [addingVideoId, setAddingVideoId] = useState<string | null>(null);
  const [addSuccess, setAddSuccess] = useState<string | null>(null);
  const [addError, setAddError] = useState<string | null>(null);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string | null>(
    null,
  );
  const [videoIdSuccess, setVideoIdSuccess] = useState<string | null>(null);
  const [videoIdError, setVideoIdError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getChannels()
      .then(setCreators)
      .finally(() => setLoading(false));
    setSelectedPlaylistId(getPlaylistId());
  }, []);

  const getPlaylistId = (): string | null => {
    const userConfig = getUserConfig();
    return userConfig?.defaultPlaylist || null;
  };

  const handleCreatorClick = async (creator: any) => {
    setSelectedCreator(creator);
    setLoadingVideos(true);
    setChannelVideos([]);
    setAddSuccess(null);
    setAddError(null);
    try {
      const videos = await getChannelVideos(creator.id);
      setChannelVideos(videos);
    } finally {
      setLoadingVideos(false);
    }
  };

  const handleAddToPlaylist = async (videoId: string, playlistId: string) => {
    setAddingVideoId(videoId);
    setAddSuccess(null);
    setAddError(null);
    setVideoIdSuccess(null);
    setVideoIdError(null);
    try {
      await addVideoToPlaylist(playlistId, videoId);
      setAddSuccess("Video added to the playlist!");
      setVideoIdSuccess(videoId);
    } catch (err: any) {
      setAddError(err.message || "Error adding video to the playlist!");
      setVideoIdError(videoId);
    } finally {
      setAddingVideoId(null);
      setTimeout(() => {
        setAddSuccess(null);
        setAddError(null);
        setVideoIdSuccess(null);
        setVideoIdError(null);
      }, 3000);
    }
  };

  return (
    <>
      <Header title="Feed" showLogo={true} />
      <div className="min-h-screen pb-24">
        <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[0] mix-blend-overlay" />

        <div className="py-6 relative z-10 px-4 sm:px-6">
          <div className="mb-8 max-w-5xl mx-auto">
            {!loading && creators.length > 0 && (
              <div className="bg-white dark:bg-[#1a1a1a] p-6 border-4 border-black shadow-[8px_8px_0_#000] mb-8">
                <h2 className="font-black text-3xl text-black dark:text-white uppercase tracking-tighter">
                  Subscriptions
                </h2>
                <p className="font-geist-mono font-bold text-xs text-gray-500 uppercase tracking-widest mt-1 pb-4 border-b-2 border-black/10">
                  Select a creator to browse their latest uploads
                </p>
                <div className="mt-6">
                  <CreatorsList
                    creators={creators}
                    loading={loading}
                    onCreatorClick={handleCreatorClick}
                    selectedCreator={selectedCreator}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="max-w-5xl mx-auto">
            <ChannelVideosList
              videos={channelVideos}
              loading={loadingVideos}
              selectedCreator={selectedCreator}
              selectedPlaylistId={selectedPlaylistId}
              addingVideoId={addingVideoId}
              addSuccess={addSuccess}
              addError={addError}
              videoIdSuccess={videoIdSuccess}
              videoIdError={videoIdError}
              handleAddToPlaylist={handleAddToPlaylist}
            />
          </div>
        </div>
      </div>
    </>
  );
}

interface CreatorsListProps {
  creators: any[];
  loading: boolean;
  onCreatorClick: (creator: any) => void;
  selectedCreator: any;
}

function CreatorsList({
  creators,
  loading,
  onCreatorClick,
  selectedCreator,
}: CreatorsListProps) {
  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <Loading title="SCANNING CHANNELS..." />
      </div>
    );
  }
  if (!creators.length) {
    return (
      <div className="bg-red-100 p-4 border-2 border-black text-red-800 font-bold text-center">
        NO CHANNELS CONNECTED.
      </div>
    );
  }
  return (
    <HorizontalScroll className="gap-6 py-4 px-2">
      {creators.map((creator) => (
        <Creator
          key={creator.id}
          creator={{
            id: creator.id,
            name: creator.title,
            avatar:
              creator.thumbnails.high ||
              creator.thumbnails.medium ||
              creator.thumbnails.default,
          }}
          selected={selectedCreator && selectedCreator.id === creator.id}
          onClick={() => onCreatorClick(creator)}
        />
      ))}
    </HorizontalScroll>
  );
}

interface ChannelVideosListProps {
  videos: any[];
  loading: boolean;
  selectedCreator: any;
  selectedPlaylistId: string | null;
  addingVideoId: string | null;
  addSuccess: string | null;
  addError: string | null;
  videoIdSuccess: string | null;
  videoIdError: string | null;
  handleAddToPlaylist: (videoId: string, playlistId: string) => void;
}

function ChannelVideosList({
  videos,
  loading,
  selectedCreator,
  selectedPlaylistId,
  addingVideoId,
  addSuccess,
  addError,
  videoIdSuccess,
  videoIdError,
  handleAddToPlaylist,
}: ChannelVideosListProps) {
  if (!selectedCreator) {
    return (
      <div className="py-20 text-center flex flex-col items-center">
        <div className="w-16 h-16 bg-main border-2 border-black shadow-[4px_4px_0_#000] rotate-3 mb-6" />
        <p className="font-black text-2xl text-gray-400 uppercase tracking-widest">
          Choose a channel to begin
        </p>
      </div>
    );
  }

  const buildVideoSubtitle = (video: any): string => {
    if (video.videoPublishedAt) {
      return (
        "UPLOADED " +
        humanizeDate(new Date(video.videoPublishedAt)).toUpperCase()
      );
    }

    return "";
  };

  return (
    <div className="mt-2">
      <div className="bg-main/90 p-4 border-x-4 border-t-4 border-black inline-block translate-y-1 z-10 relative">
        <h2 className="font-black text-xl text-black uppercase tracking-tighter">
          Archive: {selectedCreator.title}
        </h2>
      </div>

      <div className="bg-white dark:bg-[#1a1a1a] p-6 border-4 border-black shadow-[8px_8px_0_#000] min-h-[400px]">
        {loading ? (
          <div className="flex justify-center py-20">
            <Loading title="RETRIEVING ARCHIVE..." />
          </div>
        ) : videos.length > 0 ? (
          <div
            className="
              grid grid-cols-1
              sm:grid-cols-2
              md:grid-cols-2
              lg:grid-cols-3
              gap-8
            "
          >
            {videos.map((video, idx) => (
              <div key={video.id} className="relative">
                <VideoCard
                  title={video.title}
                  subtitle={buildVideoSubtitle(video)}
                  thumbnail={
                    video.thumbnails?.high ||
                    video.thumbnails?.medium ||
                    video.thumbnails?.default
                  }
                  buttonClick={
                    selectedPlaylistId
                      ? () => handleAddToPlaylist(video.id, selectedPlaylistId)
                      : undefined
                  }
                  loadingAddButton={addingVideoId === video.id}
                  loadingAddButtonText="ADDING..."
                  addButtonText={
                    addingVideoId === video.id
                      ? ""
                      : addSuccess && video.id === videoIdSuccess
                        ? "DONE"
                        : addError && video.id === videoIdError
                          ? "ERR"
                          : "ADD"
                  }
                  buttonColor={
                    addSuccess && video.id === videoIdSuccess ? "green" : "red"
                  }
                  addSuccess={!!(addSuccess && video.id === videoIdSuccess)}
                  cardClass={
                    idx % 2 === 0 ? "rotate-[0.5deg]" : "-rotate-[0.5deg]"
                  }
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center font-black text-gray-400 uppercase text-2xl">
            NO RECORDINGS FOUND.
          </div>
        )}
      </div>
    </div>
  );
}
