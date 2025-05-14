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

interface FeedProps {
  className?: string;
}

export default function Feed({ className = '' }: FeedProps) {
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
    <div className={`w-full ${className}`}>
      {posts.map((post) => (
        <article 
          key={post.id} 
          className={`mb-6 ${
            theme === 'dark'
              ? 'bg-gray-900 border border-gray-700 hover:border-yellow-400/50 hover:bg-gray-800/90 rounded-xl shadow-lg'
              : 'bg-white border border-gray-100 hover:border-yellow-400/50 hover:bg-gray-50 rounded-xl shadow-md'
          } transform hover:scale-[1.02] transition-all duration-300 cursor-pointer`}>
          <div className="p-6 space-y-6">
            {/* Header del post */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative group">
                  <Image
                    src={post.user.avatar}
                    alt={post.user.name}
                    width={48}
                    height={48}
                    className="rounded-full ring-2 ring-transparent group-hover:ring-yellow-400 transition-all duration-300"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'} hover:text-yellow-400 transition-colors`}>
                      {post.user.name}
                    </span>
                    <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{post.user.username}</span>
                  </div>
                  <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{post.timestamp}</span>
                </div>
              </div>
              <button 
                className={`p-2 rounded-full ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} 
                  ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} hover:text-yellow-400 transition-all duration-200`}
              >
                <MoreHorizontal size={20} />
              </button>
            </div>

            {/* Categoría y título */}
            <div className="space-y-3">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
                ${theme === 'dark' ? 'bg-yellow-400/10 text-yellow-400' : 'bg-yellow-50 text-yellow-600'}">
                {post.category}
              </div>
              <h2 className={`text-xl font-bold leading-tight ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'} 
                hover:text-yellow-400 transition-colors duration-200`}>
                {post.title}
              </h2>
              <p className={`leading-relaxed ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {post.content}
              </p>
            </div>

            {/* Imagen */}
            {post.image && (
              <div className="relative w-full h-48 sm:h-56 md:h-64 rounded-xl overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10 
                  group-hover:from-black/40 transition-all duration-300"></div>
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            )}

            {/* Acciones */}
            <div className="flex items-center gap-6 pt-2">
              <button 
                className={`flex items-center gap-2 px-3 py-2 rounded-full 
                  ${theme === 'dark' ? 'hover:bg-gray-800/80' : 'hover:bg-gray-100'} 
                  ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} 
                  hover:text-yellow-400 transition-all duration-200 group`}
              >
                <Heart 
                  size={20} 
                  className="transform group-hover:scale-110 transition-transform duration-200" 
                />
                <span className="font-medium">{post.likes}</span>
              </button>
              <button 
                className={`flex items-center gap-2 px-3 py-2 rounded-full 
                  ${theme === 'dark' ? 'hover:bg-gray-800/80' : 'hover:bg-gray-100'} 
                  ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} 
                  hover:text-yellow-400 transition-all duration-200 group`}
              >
                <MessageCircle 
                  size={20} 
                  className="transform group-hover:scale-110 transition-transform duration-200" 
                />
                <span className="font-medium">{post.comments}</span>
              </button>
              <button 
                className={`flex items-center gap-2 px-3 py-2 rounded-full 
                  ${theme === 'dark' ? 'hover:bg-gray-800/80' : 'hover:bg-gray-100'} 
                  ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} 
                  hover:text-yellow-400 transition-all duration-200 group`}
              >
                <Share 
                  size={20} 
                  className="transform group-hover:scale-110 transition-transform duration-200" 
                />
                <span className="font-medium">{post.shares}</span>
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
} 