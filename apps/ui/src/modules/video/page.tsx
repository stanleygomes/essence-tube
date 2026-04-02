"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@shared/components/header/Header";
import { getVideo } from "@services/videoService";
import { removePlaylistVideo } from "@services/playlistService";
import Loading from "@shared/ui/loading/Loading";
import Button from "@shared/ui/button/Button";
import Card from "@shared/ui/card/Card";
import Icon from "@shared/ui/icon/Icon";

export interface IVideo {
  videoId?: string;
  playlistId?: string;
}

export default function Video({ videoId, playlistId }: IVideo) {
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
        <Header title="" showBackButton={true} backButtonText="Playlist" />
        <div className="p-6 max-w-md mx-auto text-center">
          <h1 className="text-2xl font-semibold mb-2 text-red-600">
            Video not found
          </h1>
          <p className="text-gray-600">
            Could not identify the requested video. Please check the link or try
            again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header
        title="Playback"
        showBackButton={true}
        backButtonRoute="/home"
        backButtonText="Feed"
      />
      <div className="min-h-screen pb-24 mt-10 px-4 sm:px-6 relative overflow-x-hidden">
        <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[0] mix-blend-overlay" />

        <div className="max-w-4xl mx-auto relative z-10 py-6">
          {loading ? (
            <div className="py-20">
              <Loading title="LOADING STREAM..." />
            </div>
          ) : videoData ? (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="relative border-4 border-black shadow-[12px_12px_0_#000] bg-black aspect-video group">
                <iframe
                  className="w-full h-full relative z-10"
                  src={`https://www.youtube.com/embed/${videoData.id}?autoplay=1`}
                  title={videoData.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                  allowFullScreen
                ></iframe>
                <div className="absolute -top-2 -left-2 w-8 h-8 bg-main border-2 border-black z-0" />
              </div>

              <Card className="p-6 border-4 border-black shadow-[8px_8px_0_#000] bg-white dark:bg-[#1a1a1a]">
                <h2 className="font-black text-3xl sm:text-4xl text-black dark:text-white uppercase tracking-tighter leading-tight mb-4">
                  {videoData.title}
                </h2>

                {/* <div className="flex flex-wrap gap-3 mb-6">
                  <div className="bg-blue-100 text-blue-800 px-3 py-1 border-2 border-black font-black text-xs uppercase shadow-[2px_2px_0_#000]">
                    Live now
                  </div>
                  <div className="bg-green-100 text-green-800 px-3 py-1 border-2 border-black font-black text-xs uppercase shadow-[2px_2px_0_#000]">
                    Verified
                  </div>
                </div> */}

                <div className="border-t-2 border-black/10 pt-4">
                  <p
                    className={`font-geist-mono text-sm leading-relaxed text-gray-700 dark:text-gray-300 ${descExpanded ? "" : "line-clamp-4"}`}
                  >
                    {videoData.description}
                  </p>
                  {videoData.description &&
                    videoData.description.length > 200 && (
                      <button
                        className="mt-3 font-black text-xs uppercase text-blue-600 dark:text-blue-400 hover:scale-105 active:scale-95 transition-all flex items-center gap-1"
                        onClick={() => setDescExpanded((v) => !v)}
                      >
                        {descExpanded
                          ? "[ Show less ]"
                          : "[ Read full report ]"}
                      </button>
                    )}
                </div>
              </Card>

              <div className="flex flex-wrap gap-4">
                <Button
                  onClick={handleShare}
                  color="blue"
                  className="flex-1 min-w-[140px] py-4 shadow-[4px_4px_0_#000]"
                >
                  <div className="flex items-center gap-2">
                    <Icon name="share-solid" className="w-5 h-5" />
                    <span>Copy link</span>
                  </div>
                </Button>

                <Button
                  color="red"
                  onClick={handleRemoveFromPlaylist}
                  className="w-full sm:w-auto px-6"
                >
                  <div className="flex items-center gap-2">
                    <Icon name="trash-solid" className="w-5 h-5" />
                    <span>Remove from playlist</span>
                  </div>
                </Button>
              </div>
            </div>
          ) : (
            <div className="py-20 text-center">
              <h1 className="font-black text-4xl text-red-500 uppercase">
                NO SIGNAL DETECTED
              </h1>
              <p className="font-geist-mono text-gray-500 mt-2 lowercase italic">
                ...check credentials and retry
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
