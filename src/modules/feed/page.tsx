'use client';

import { useEffect, useState } from "react";
import Header from "@shared/components/header/Header";
import Typography from "@shared/ui/typography/Typography";
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
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string | null>(null);
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
  }

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
      <Header
        title='Feed'
        showLogo={true}
      />
      <div className="py-6">
        <div className="mb-4 px-6">
          <div className="max-w-5xl mx-auto">

        {!loading && creators.length > 0 && (
          <Typography variant="h2" className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">
            Choose a channel
          </Typography>
        )}
            <CreatorsList
              creators={creators}
              loading={loading}
              onCreatorClick={handleCreatorClick}
              selectedCreator={selectedCreator}
            />
          </div>
        </div>

        <div className="px-6">
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
    </>
  );
}

interface CreatorsListProps {
  creators: any[];
  loading: boolean;
  onCreatorClick: (creator: any) => void;
}

function CreatorsList({ creators, loading, onCreatorClick, selectedCreator }: CreatorsListProps & { selectedCreator: any }) {
  if (loading) {
    return <Loading title="Loading channels..." />;
  }
  if (!creators.length) {
    return (
      <Typography variant="span" className="text-base text-gray-700 dark:text-gray-200 text-center py-8">
        No channels found.
      </Typography>
    );
  }
  return (
    <HorizontalScroll className="gap-4 py-2 px-1">
      {creators.map((creator) => (
        <Creator
          key={creator.id}
          creator={{
            id: creator.id,
            name: creator.title,
            avatar: creator.thumbnails.high
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
  if (!selectedCreator) return null;

  const buildVideoSubtitle = (video: any): string => {
    if (video.videoPublishedAt) {
      return 'Published ' + humanizeDate(new Date(video.videoPublishedAt));
    }

    return '';
  }

  return (
    <div className="mt-6 max-w-5xl mx-auto">
      <Typography variant="h2" className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
        Latest videos from {selectedCreator.title}
      </Typography>
      {loading ? (
        <Loading title="Loading videos..." />
      ) : videos.length > 0 ? (
        <div
          className="
            grid grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            gap-4
          "
        >
          {videos.map(video => (
            <div key={video.id} className="relative">
              <VideoCard
                title={video.title}
                subtitle={buildVideoSubtitle(video)}
                thumbnail={video.thumbnails?.high}
                buttonClick={
                  selectedPlaylistId
                    ? () => handleAddToPlaylist(video.id, selectedPlaylistId)
                    : undefined
                }
                loadingAddButton={addingVideoId === video.id}
                loadingAddButtonText="Adding..."
                addButtonText={
                  addingVideoId === video.id
                    ? ""
                    : addSuccess && video.id === videoIdSuccess
                    ? "Added"
                    : addError && video.id === videoIdError
                    ? "Error"
                    : "Add"
                }
                buttonColor={
                  addSuccess && video.id === videoIdSuccess
                    ? "green"
                    : "red"
                }
              />
            </div>
          ))}
        </div>
      ) : (
        <Typography variant="span" className="text-base text-gray-700 dark:text-gray-200 text-center py-8">
          No videos found for this channel.
        </Typography>
      )}
    </div>
  );
}
