'use client';

import { useEffect, useState } from "react";
import Header from "@shared/components/header/Header";
import VideoCard from "@shared/components/video-card/VideoCard";
import { getChannels } from "@services/subscriptionService";
import Creator from "@shared/components/creator/Creators";

export default function Feed() {
  const [creators, setCreators] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getChannels()
      .then(setCreators)
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Header
        title='Feed'
        showLogo={true}
      />
      <div className="py-6 px-2 safe-page-content">

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
                  creator={{
                    id: creator.id,
                    name: creator.title,
                    avatar: creator.thumbnails.high
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="text-base text-gray-700 dark:text-gray-200 text-center py-8">
              Nenhum canal encontrado.
            </div>
          )}
        </div>

        <h2 className="text-lg font-semibold mt-4 mb-4 text-gray-800 dark:text-gray-100">Últimos vídeos</h2>

        {[1,2,3,4,5,6,7,8,9].map(i => (
          <VideoCard
            key={i}
            playlistId="PL1234567890"
            videoId="GU7mh8sYhCI"
            title="Título do vídeo"
            description="Descrição curta do vídeo do YouTube."
            thumbnail="https://i.ytimg.com/vi/GU7mh8sYhCI/hqdefault.jpg"
          />
        ))}
      </div>
    </>
  );
}
