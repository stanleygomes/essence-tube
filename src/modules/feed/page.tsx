'use client';

import { useEffect, useState } from "react";
import Header from "@shared/components/header/Header";
import VideoCard from "@shared/components/video-card/VideoCard";
import { getChannels, getChannelVideos } from "@services/subscriptionService";
import Creator from "@shared/components/creator/Creators";
import { addVideoToPlaylist } from "@services/playlistService";
import { getUserConfig } from "@services/userConfigService";
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
      <div className="py-6 px-2 safe-page-content">

        {!loading && creators.length > 0 && (
          <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">
            Escolha um canal
          </h2>
        )}

        <div className="creators mb-4">
          {loading ? (
            <Loading
              title="Carregando canais..."
            />
          ) : creators.length > 0 ? (
            <div className="flex gap-4 overflow-x-auto py-2 px-1">
              {creators.map((creator) => (
                <Creator
                  key={creator.id}
                  creator={{
                    id: creator.id,
                    name: creator.title,
                    avatar: creator.thumbnails.high
                  }}
                  onClick={() => handleCreatorClick(creator)}
                />
              ))}
            </div>
          ) : (
            <div className="text-base text-gray-700 dark:text-gray-200 text-center py-8">
              Nenhum canal encontrado.
            </div>
          )}
        </div>

        {selectedCreator && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
              Últimos vídeos de {selectedCreator.title}
            </h2>
            {loadingVideos ? (
              <Loading
                title="Carregando vídeos..."
              />
            ) : channelVideos.length > 0 ? (
              <>
                {channelVideos.map(video => {
                  return (
                    <div key={video.id} className="relative">
                      <VideoCard
                        videoId={video.id}
                        title={video.title}
                        description={video.description}
                        thumbnail={video.thumbnails?.high}
                        onAddToPlaylist={
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
                  );
                })}
              </>
            ) : (
              <div className="text-base text-gray-700 dark:text-gray-200 text-center py-8">
                Nenhum vídeo encontrado para este canal.
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
