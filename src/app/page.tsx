"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Header } from '@/components/Header';
import Link from 'next/link'; 

interface AnimeImage {
  preview: string;
}

interface Anime {
  id: number;
  name: string;
  kind: string;
  episodes: number;
  image: AnimeImage;
}

export default function AnimeListPage() {
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnimes() {
      try {
        const response = await axios.get<Anime[]>('https://shikimori.one/api/animes', {
          params: {
            limit: 50,
            order: 'popularity',
          },
        });
        setAnimes(response.data);
      } catch (error) {
        console.error('Erro ao buscar animes:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchAnimes();
  }, []);

  return (

    <div className="bg-[#1F1E1E] min-h-screen text-white">
      <Header />
      <main className="p-6 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-[#D72483] mb-8">Trending</h2>
        <ScrollArea className="h-[calc(100vh-160px)]">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {loading
              ? Array.from({ length: 50 }).map((_, i) => (
                  <Skeleton key={i} className="h-60 w-full rounded-xl" />
                ))
              : animes.map((anime) => (
                <Link href={`/anime/${anime.id}`} key={anime.id}>
                <div
                  key={anime.id}
                  className="group relative rounded-xl overflow-hidden shadow-xl hover:scale-105 transition-transform duration-300 cursor-pointer"
                >
                  <img
                    src={`https://shikimori.one${anime.image?.preview}`}
                    alt={anime.name}
                    className="w-full h-60 object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-3">
                    <h2 className="text-sm font-semibold text-white truncate">{anime.name}</h2>
                    <p className="text-xs text-gray-300">
                      {anime.kind?.toUpperCase()} • {anime.episodes || 'N/A'} eps
                    </p>
                  </div>
                </div>
              </Link>
                ))}
          </div>
        </ScrollArea>
        
      </main>
    </div>
  );
}
