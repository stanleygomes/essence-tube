'use client';

import Header from "@shared/components/header/Header";
import VideoCard from "@shared/components/video-card/VideoCard";

export default function Home() {
  return (
    <>
      <Header
        title='Home'
        showLogo={true}
      />
      <div className="py-6 px-2 safe-page-content">
        {/* <a href="/login">login</a> */}

        {[1,2,3,4,5,6,7,8,9].map(i => (
          <VideoCard
            id="GU7mh8sYhCI"
            title="Título do vídeo"
            description="Descrição curta do vídeo do YouTube."
            thumbnail="https://i.ytimg.com/vi/GU7mh8sYhCI/hqdefault.jpg"
          />
        ))}
      </div>
    </>
  );
}
