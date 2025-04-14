// app/animes/[id]/page.tsx ou pages/animes/[id].tsx
"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // app router
// ou useRouter/useEffect com useRouter().query.id no pages router
import axios from 'axios';
import { Skeleton } from '@/components/ui/skeleton';
import { Header } from '@/components/Header';

interface AnimeDetails {
  id: number;
  name: string;
  description: string;
  image: {
    original: string;
  };
  kind: string;
  episodes: number;
  aired_on: string;
  score: number;
}

export default function AnimeDetailsPage() {
  const { id } = useParams();
  const [anime, setAnime] = useState<AnimeDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnimeDetails() {
      try {
        const response = await axios.get(`https://shikimori.one/api/animes/${id}`);
        setAnime(response.data);
      } catch (error) {
        console.error('Erro ao buscar detalhes:', error);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchAnimeDetails();
  }, [id]);

  if (loading || !anime) {
    return (
      <div className="min-h-screen bg-[#1F1E1E] text-white p-6">
        <Header />
        <Skeleton className="h-80 w-full mb-6" />
        <Skeleton className="h-6 w-1/2 mb-2" />
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-full mb-1" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1F1E1E] text-white p-6">
      <Header />
      <div className="max-w-4xl mx-auto">
        <img
          src={`https://shikimori.one${anime.image.original}`}
          alt={anime.name}
          className="w-full h-auto rounded-xl mb-6"
        />
        <h1 className="text-3xl font-bold text-[#D72483] mb-4">{anime.name}</h1>
        <p className="mb-2 text-sm text-gray-300">
          {anime.kind?.toUpperCase()} • {anime.episodes} episódios • Lançado em {anime.aired_on} • Nota: {anime.score}
        </p>
        <p
          className="text-white text-sm"
          dangerouslySetInnerHTML={{ __html: anime.description|| 'Sem descrição disponível.' }}
        />
      </div>
    </div>
  );
}
