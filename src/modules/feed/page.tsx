'use client';

import { useEffect, useState } from "react";
import Header from "@shared/components/header/Header";
import { getChannels, getChannelVideos } from "@services/subscriptionService";
import Creator from "@shared/components/creator/Creators";
import { addVideoToPlaylist } from "@services/playlistService";
import { getUserConfig } from "@services/userConfigService";
import VideoCard from "@shared/components/video-card/VideoCard";
import Loading from "@shared/ui/loading/Loading";

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
      setAddSuccess("Vídeo adicionado à playlist com sucesso!");
      setVideoIdSuccess(videoId);
    } catch (err: any) {
      setAddError(err.message || "Erro ao adicionar vídeo à playlist!");
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
      <div className="py-6 safe-page-content">
        {!loading && creators.length > 0 && (
          <div className="px-6">
            <h2 className="text-lg font-semibold mt-4 mb-2 text-gray-800 dark:text-gray-100">
              Escolha um canal
            </h2>
          </div>
        )}

        <div className="creators mb-4 pl-6">
          <CreatorsList
            creators={creators}
            loading={loading}
            onCreatorClick={handleCreatorClick}
          />
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

function CreatorsList({ creators, loading, onCreatorClick }: CreatorsListProps) {
  if (loading) {
    return <Loading title="Carregando canais..." />;
  }
  if (!creators.length) {
    return (
      <div className="text-base text-gray-700 dark:text-gray-200 text-center py-8">
        Nenhum canal encontrado.
      </div>
    );
  }
  return (
    <div className="flex gap-4 overflow-x-auto py-2 px-1">
      {creators.map((creator) => (
        <Creator
          key={creator.id}
          creator={{
            id: creator.id,
            name: creator.title,
            avatar: creator.thumbnails.high
          }}
          onClick={() => onCreatorClick(creator)}
        />
      ))}
    </div>
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

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
        Últimos vídeos de {selectedCreator.title}
      </h2>
      {loading ? (
        <Loading title="Carregando vídeos..." />
      ) : videos.length > 0 ? (
        <>
          {videos.map(video => (
            <div key={video.id} className="relative">
              <VideoCard
                title={video.title}
                subtitle={video.description}
                thumbnail={video.thumbnails?.high}
                buttonClick={
                  selectedPlaylistId
                    ? () => handleAddToPlaylist(video.id, selectedPlaylistId)
                    : undefined
                }
                loadingAddButton={addingVideoId === video.id}
                loadingAddButtonText="Adicionando..."
                addButtonText={
                  addingVideoId === video.id
                    ? ""
                    : addSuccess && video.id === videoIdSuccess
                    ? "Adicionado"
                    : addError && video.id === videoIdError
                    ? "Erro"
                    : "Add"
                }
                buttonVariant={
                  addSuccess && video.id === videoIdSuccess
                    ? "green"
                    : "red"
                }
              />
            </div>
          ))}
        </>
      ) : (
        <div className="text-base text-gray-700 dark:text-gray-200 text-center py-8">
          Nenhum vídeo encontrado para este canal.
        </div>
      )}
    </div>
  );
}
