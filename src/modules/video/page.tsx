'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@shared/components/header/Header";
// import { AiOutlineLike } from "react-icons/ai";
import { FiShare2 } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { getVideo } from "@services/videoService";
import { removePlaylistVideo } from "@services/playlistService";
import Loading from "@shared/ui/loading/loading";

export interface IVideo {
  videoId?: string,
  playlistId?: string,
}

export default function Video({
  videoId,
  playlistId,
}: IVideo) {
  const [videoData, setVideoData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [descExpanded, setDescExpanded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!videoId) return;
    setLoading(true);
    getVideo(videoId)
      .then(setVideoData)
      .finally(() => setLoading(false));
  }, [videoId]);

  const handleShare = async () => {
    if (navigator.share && videoData) {
      try {
        await navigator.share({
          title: videoData.title,
          text: videoData.description,
          url: window.location.href,
        });
      } catch (err) {
        console.error(err);
      }
    } else if (videoData) {
      window.open(`https://www.youtube.com/watch?v=${videoData.id}`, "_blank");
    }
  };

  const handleRemoveFromPlaylist = async () => {
    if (!playlistId) {
      alert("Não foi possível identificar a playlist.");
      return;
    }
    try {
      await removePlaylistVideo(playlistId);
      alert("Vídeo removido da playlist!");
      router.push("/home");
    } catch (err) {
      alert("Erro ao remover vídeo da playlist.");
      console.error(err);
    }
  };

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
        {loading ? (
          <Loading
            title="Carregando video..."
          />
        ) : videoData ? (
          <>
            <div className="aspect-video w-full rounded-lg overflow-hidden shadow mb-4 bg-gray-100 dark:bg-gray-800 relative">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${videoData.id}`}
                title={videoData.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
              ></iframe>
            </div>
            <h1 className="text-2xl font-semibold mb-2 mt-2">{videoData.title}</h1>
            <div className="mb-4">
              <p
                className={
                  "text-gray-600 transition-all " +
                  (descExpanded ? "" : "line-clamp-3")
                }
                style={{ wordBreak: "break-word" }}
              >
                {videoData.description}
              </p>
              {videoData.description && videoData.description.length > 120 && (
                <button
                  className="text-blue-600 dark:text-blue-400 text-sm mt-1 hover:underline"
                  onClick={() => setDescExpanded((v) => !v)}
                >
                  {descExpanded ? "Mostrar menos" : "Leia mais"}
                </button>
              )}
            </div>
            <div className="flex items-center gap-4 mb-6">
              {/* <button className="flex items-center gap-2 px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-sm font-medium text-gray-800 dark:text-gray-100 transition">
                <AiOutlineLike size={18} />
                Curtir
              </button> */}
              <button
                className="flex items-center gap-2 px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-sm font-medium text-gray-800 dark:text-gray-100 transition"
                onClick={handleShare}
              >
                <FiShare2 size={18} />
                Compartilhar
              </button>
              <button
                className="flex items-center gap-2 px-4 py-2 rounded bg-red-100 hover:bg-red-200 dark:bg-red-800 dark:hover:bg-red-700 text-sm font-medium text-red-800 dark:text-red-100 transition"
                onClick={handleRemoveFromPlaylist}
              >
                <MdDelete size={18} />
                Remover da playlist
              </button>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
}
