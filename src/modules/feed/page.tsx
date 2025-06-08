'use client';

import { useEffect, useState } from "react";
import Header from "@shared/components/header/Header";
import VideoCard from "@shared/components/video-card/VideoCard";
import { getChannels, getChannelVideos } from "@services/subscriptionService";
import Creator from "@shared/components/creator/Creators";

export default function Feed() {
  const [creators, setCreators] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [selectedCreator, setSelectedCreator] = useState<any>(null);
  const [channelVideos, setChannelVideos] = useState<any[]>([]);
  const [loadingVideos, setLoadingVideos] = useState(false);

  useEffect(() => {
    setLoading(true);
    getChannels()
      .then(setCreators)
      .finally(() => setLoading(false));
  }, []);

  const handleCreatorClick = async (creator: any) => {
    setSelectedCreator(creator);
    setLoadingVideos(true);
    setChannelVideos([]);
    try {
      const videos = await getChannelVideos(creator.id);
      setChannelVideos(videos);
    } finally {
      setLoadingVideos(false);
    }
  };

  return (
    <>
      <Header
        title='Feed'
        showLogo={true}
      />
      <div className="py-6 px-2 safe-page-content">

        <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">
          Escolha um canal
        </h2>

        <div className="creators mb-4">
          {loading ? (
            <div className="flex flex-col items-center justify-center min-h-[10vh]">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-2"></div>
              <div className="text-base text-gray-700 dark:text-gray-200">Carregando canais...</div>
            </div>
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
              <div className="flex flex-col items-center justify-center min-h-[20vh]">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                <div className="text-base text-gray-700 dark:text-gray-200">Carregando vídeos...</div>
              </div>
            ) : channelVideos.length > 0 ? (
              channelVideos.map(video => (
                <VideoCard
                  key={video.id}
                  videoId={video.id}
                  title={video.title}
                  description={video.description}
                  thumbnail={video.thumbnails?.high}
                />
              ))
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
