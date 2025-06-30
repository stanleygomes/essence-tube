'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@shared/components/header/Header";
import { FiShare2 } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { getVideo } from "@services/videoService";
import { removePlaylistVideo } from "@services/playlistService";
import Loading from "@shared/ui/loading/Loading";
import HorizontalScrollList from "@shared/ui/horizontal-scroll/HorizontalScroll";
import Button from "@shared/ui/button/Button";

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
      alert("Erro to identify the playlist.");
      return;
    }
    try {
      await removePlaylistVideo(playlistId);
      alert("Video removed from playlist successfully!");
      router.push("/home");
    } catch (err) {
      alert("Error to remove video from playlist.");
      console.error(err);
    }
  };

  // const handleOpenInBrowser = () => {
  //   window.open(window.location.href, "_blank");
  // };

  if (!videoId) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Header title='' showBackButton={true} backButtonText="Playlist" />
        <div className="p-6 max-w-md mx-auto text-center">
          <h1 className="text-2xl font-semibold mb-2 text-red-600">Video not found</h1>
          <p className="text-gray-600">Could not identify the requested video. Please check the link or try again.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header title='' showBackButton={true} backButtonText="Playlist" />
      <div className="p-6 max-w-2xl mx-auto">
        {loading ? (
          <Loading
            title="Loading video..."
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
                  {descExpanded ? "Show less" : "Read more"}
                </button>
              )}
            </div>
            <HorizontalScrollList className="gap-4 py-3">
              <Button onClick={handleShare}>
                <FiShare2 size={18} />
                <span className="whitespace-nowrap">Share</span>
              </Button>
              {/* <Button onClick={handleOpenInBrowser}>
                <FiExternalLink size={18} />
                <span className="whitespace-nowrap">Open in browser</span>
              </Button> */}
              <Button color="red" onClick={handleRemoveFromPlaylist}>
                <MdDelete size={18} />
                <span className="whitespace-nowrap">Remove from playlist</span>
              </Button>
            </HorizontalScrollList>
          </>
        ) : null}
      </div>
    </>
  );
}
