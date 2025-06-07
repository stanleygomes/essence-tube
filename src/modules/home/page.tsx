'use client';

import { useEffect, useState } from "react";
import Header from "@shared/components/header/Header";
import { getWatchLaterVideos } from "@services/videoService";
import VideoCard from "@shared/components/video-card/VideoCard";

export default function Home() {
  const [videos, setVideos] = useState([]);

  console.log("videos", videos);
  

  useEffect(() => {
    getWatchLaterVideos()
      .then(setVideos)
      .catch(() => setVideos([]));
  }, []);

  return (
    <>
      <Header
        title='Home'
        showLogo={true}
      />
      <div className="py-6 px-2 safe-page-content">
        {/* <a href="/login">login</a> */}

        {/* {videos.map(video => (
          <VideoCard
            key={video.id}
            id={video.id}
            title={video.title}
            description={video.description}
            thumbnail={video.thumbnail}
          />
        ))} */}
      </div>
    </>
  );
}
