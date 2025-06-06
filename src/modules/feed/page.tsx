'use client';

import Header from "@shared/components/header/Header";
import VideoCard from "@shared/components/video-card/VideoCard";
import Navbar from "@shared/ui/Navbar/navbar";
import CreatorsList from "@shared/components/creators-list/CreatorsList";

const creators = [
  { id: "1", name: "Canal 1", avatar: "https://randomuser.me/api/portraits/men/1.jpg" },
  { id: "2", name: "Canal 2", avatar: "https://randomuser.me/api/portraits/women/2.jpg" },
  { id: "3", name: "Canal 3", avatar: "https://randomuser.me/api/portraits/men/3.jpg" },
  // ...adicione mais creators
];

export default function Feed() {
  return (
    <>
      <Header
        title='Feed'
        showLogo={true}
      />
      <div className="py-6 px-2 safe-page-content">

        <div className="creators mb-4">
          <CreatorsList creators={creators} />
        </div>

        <h2 className="text-lg font-semibold mt-4 mb-4 text-gray-800 dark:text-gray-100">Últimos vídeos</h2>

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
