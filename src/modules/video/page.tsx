'use client';

import Header from "@shared/components/header/Header";
import { AiOutlineLike } from "react-icons/ai";
import { FiShare2 } from "react-icons/fi";

export interface IVideo {
  videoId?: string,
}

export default function Video({
  videoId,
}: IVideo) {

  if (!videoId) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Header title='' showBackButton={true} />
        <div className="p-6 max-w-md mx-auto text-center">
          <h1 className="text-2xl font-semibold mb-2 text-red-600">Vídeo não encontrado</h1>
          <p className="text-gray-600">Não foi possível identificar o vídeo solicitado. Verifique o link ou tente novamente.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header title='' showBackButton={true} />
      <div className="p-6 max-w-2xl mx-auto safe-page-content">
        <div className="aspect-video w-full rounded-lg overflow-hidden shadow mb-4 bg-gray-100 dark:bg-gray-800 relative">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
          ></iframe>
        </div>

        <h1 className="text-2xl font-semibold mb-2 mt-2">Título do Vídeo</h1>

        <p className="text-gray-600 mb-4">
          Uma breve descrição do vídeo para dar contexto ao usuário. Pode conter informações relevantes, links ou hashtags.
        </p>

        <div className="flex items-center gap-4 mb-6">
          <button className="flex items-center gap-2 px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-sm font-medium text-gray-800 dark:text-gray-100 transition">
            <AiOutlineLike size={18} />
            Curtir
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-sm font-medium text-gray-800 dark:text-gray-100 transition">
            <FiShare2 size={18} />
            Compartilhar
          </button>
        </div>
      </div>
    </>
  );
}
