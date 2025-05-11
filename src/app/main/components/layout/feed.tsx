'use client';

import Image from 'next/image';
import { MessageCircle, Heart, Share, MoreHorizontal } from 'lucide-react';
import { useTheme } from '@/context/theme-context';

interface User {
  id: number;
  name: string;
  username: string;
  avatar: string;
}

interface Post {
  id: number;
  user: User;
  title: string;
  content: string;
  image?: string;
  category: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
}

export default function Feed() {
  const { theme } = useTheme();
  
  const posts: Post[] = [
    {
      id: 1,
      user: {
        id: 1,
        name: 'EsportsHall',
        username: '@esportshall',
        avatar: '/images/esportshall.png'
      },
      title: 'Los playoffs de la LEC 2025 con KOI, Giants y Heretics',
      content: 'Ponte al día de las últimas noticias sobre los playoffs de la LEC 2025. KOI, Giants y Heretics lucharán por el título en una competición que promete ser histórica.',
      image: '/posts/lec.jpg',
      category: 'LEC',
      timestamp: 'Hace 2h',
      likes: 245,
      comments: 58,
      shares: 32
    },
    {
      id: 2,
      user: {
        id: 2,
        name: 'League News',
        username: '@leaguenews',
        avatar: '/images/league-news.png'
      },
      title: 'Zeus elimina a T1 de la LCK: Hanwha Life sigue con vida',
      content: 'Un partido increíble que mantiene viva la competición. Zeus demuestra por qué es considerado uno de los mejores top laners del mundo.',
      image: '/posts/lck.jpg',
      category: 'LCK',
      timestamp: 'Hace 3h',
      likes: 189,
      comments: 42,
      shares: 28
    }
  ];

  return (
    <div>
      {posts.map((post) => (
        <article key={post.id} className={`mb-6 ${
          theme === 'dark'
            ? 'bg-dark-200/95 border border-dark-300 hover:bg-dark-300/50 rounded-xl'
            : 'bg-white hover:bg-gray-50/50'
        } transition-all duration-200 cursor-pointer`}>
          <div className="p-6">
            {/* Header del post */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Image
                  src={post.user.avatar}
                  alt={post.user.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold">{post.user.name}</span>
                    <span className={theme === 'dark' ? 'text-neutral-400' : 'text-gray-500'}>{post.user.username}</span>
                  </div>
                  <span className={`text-sm ${theme === 'dark' ? 'text-neutral-400' : 'text-gray-500'}`}>{post.timestamp}</span>
                </div>
              </div>
              <button className={`${theme === 'dark' ? 'text-neutral-400' : 'text-gray-400'} hover:text-yellow-400 transition-colors`}>
                <MoreHorizontal size={20} />
              </button>
            </div>

            {/* Categoría y título */}
            <div className="mb-4">
              <span className="text-yellow-400 font-medium text-sm mb-2 block">{post.category}</span>
              <h2 className="text-xl font-bold mb-2">{post.title}</h2>
              <p className={theme === 'dark' ? 'text-neutral-400' : 'text-gray-600'}>{post.content}</p>
            </div>

            {/* Imagen */}
            {post.image && (
              <div className="relative w-full h-64 mb-4 rounded-xl overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {/* Acciones */}
            <div className="flex items-center gap-6">
              <button className={`flex items-center gap-2 ${theme === 'dark' ? 'text-neutral-400' : 'text-gray-500'} hover:text-yellow-400 transition-colors`}>
                <Heart size={20} />
                <span>{post.likes}</span>
              </button>
              <button className={`flex items-center gap-2 ${theme === 'dark' ? 'text-neutral-400' : 'text-gray-500'} hover:text-yellow-400 transition-colors`}>
                <MessageCircle size={20} />
                <span>{post.comments}</span>
              </button>
              <button className={`flex items-center gap-2 ${theme === 'dark' ? 'text-neutral-400' : 'text-gray-500'} hover:text-yellow-400 transition-colors`}>
                <Share size={20} />
                <span>{post.shares}</span>
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
} 