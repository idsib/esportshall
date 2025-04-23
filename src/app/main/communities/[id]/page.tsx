'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTheme } from '@/context/theme-context';
import MainLayout from '../../components/layout/mainLayout';
import { Plus, Search, TrendingUp, Clock, Star, Users, MessageSquare, Share2, Bookmark, MoreHorizontal } from 'lucide-react';
import Link from 'next/link';

const community = {
  id: 'lol',
  name: 'League of Legends',
  icon: 'https://cdn.communitydragon.org/latest/champion/1/square',
  members: 1250000,
  posts: 45000,
  description: 'La comunidad más grande de League of Legends en español. Comparte tus experiencias, estrategias y conecta con otros jugadores.',
  trending: true
};

const posts = [
  {
    id: 1,
    title: 'Nuevo parche 14.7 - Cambios en el meta',
    content: '¿Qué opinan de los cambios en el nuevo parche? Personalmente creo que los buffs a los tanques están un poco desbalanceados...',
    author: {
      name: 'Juan Pérez',
      username: 'juanperez',
      avatar: '/images/avatars/user1.jpg'
    },
    timestamp: '2024-03-15T14:30:00Z',
    likes: 125,
    comments: 32,
    shares: 8
  },
  {
    id: 2,
    title: 'Guía completa para el nuevo campeón',
    content: 'He estado probando el nuevo campeón y aquí está mi guía completa con builds, runas y consejos de juego...',
    author: {
      name: 'María García',
      username: 'mariagarcia',
      avatar: '/images/avatars/user2.jpg'
    },
    timestamp: '2024-03-14T09:15:00Z',
    likes: 98,
    comments: 15,
    shares: 12
  }
];

interface CommunityPageProps {
  communityId: string;
}

export default function CommunityPage({ communityId }: CommunityPageProps) {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('hot');

  return (
    <MainLayout>
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Community Header */}
          <div className={`p-6 rounded-xl mb-6 ${
            theme === 'dark' ? 'bg-dark-200' : 'bg-white shadow-sm'
          }`}>
            <div className="flex items-start gap-4">
              <div className="w-20 h-20 rounded-lg overflow-hidden">
                <img
                  src={community.icon}
                  alt={community.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h1 className={`text-2xl font-bold ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>{community.name}</h1>
                  {community.trending && (
                    <span className="px-2 py-0.5 rounded-full bg-brand-yellow/10 text-brand-yellow text-xs font-medium">
                      Trending
                    </span>
                  )}
                </div>
                <p className={`mt-1 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}>{community.description}</p>
                <div className="flex items-center gap-4 mt-4 text-sm">
                  <div className="flex items-center gap-1 text-gray-500">
                    <Users size={16} />
                    <span>{community.members.toLocaleString()} miembros</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500">
                    <Star size={16} />
                    <span>{community.posts.toLocaleString()} posts</span>
                  </div>
                </div>
                <button className="mt-4 px-4 py-2 rounded-full bg-brand-yellow hover:bg-brand-yellow/90 text-black font-semibold transition-colors">
                  Unirse a la comunidad
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Posts Section */}
            <div className="flex-1">
              {/* Post Creation */}
              <div className={`p-4 rounded-xl mb-6 ${
                theme === 'dark' ? 'bg-dark-200' : 'bg-white shadow-sm'
              }`}>
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <Image
                      src="/images/esportshall.png"
                      alt="Profile"
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Crear un post..."
                    className={`flex-1 px-4 py-2 rounded-full border text-sm ${
                      theme === 'dark'
                        ? 'bg-dark-300 border-dark-300 text-white placeholder-gray-500'
                        : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'
                    }`}
                  />
                </div>
              </div>

              {/* Posts Tabs */}
              <div className={`flex gap-2 mb-6 overflow-x-auto pb-2 ${
                theme === 'dark' ? 'bg-dark-200' : 'bg-white'
              }`}>
                <button
                  onClick={() => setActiveTab('hot')}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                    activeTab === 'hot'
                      ? 'bg-brand-yellow text-black'
                      : theme === 'dark'
                        ? 'bg-dark-300 text-gray-400 hover:text-gray-300'
                        : 'bg-gray-100 text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Destacados
                </button>
                <button
                  onClick={() => setActiveTab('new')}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                    activeTab === 'new'
                      ? 'bg-brand-yellow text-black'
                      : theme === 'dark'
                        ? 'bg-dark-300 text-gray-400 hover:text-gray-300'
                        : 'bg-gray-100 text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Nuevos
                </button>
                <button
                  onClick={() => setActiveTab('top')}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                    activeTab === 'top'
                      ? 'bg-brand-yellow text-black'
                      : theme === 'dark'
                        ? 'bg-dark-300 text-gray-400 hover:text-gray-300'
                        : 'bg-gray-100 text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Top
                </button>
              </div>

              {/* Posts List */}
              <div className="space-y-4">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className={`p-4 rounded-xl ${
                      theme === 'dark' ? 'bg-dark-200' : 'bg-white shadow-sm'
                    }`}
                  >
                    <div className="flex gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <Image
                          src={post.author.avatar}
                          alt={post.author.name}
                          width={40}
                          height={40}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{post.author.name}</span>
                          <span className="text-gray-500">@{post.author.username}</span>
                          <span className="text-gray-500 text-sm">
                            {new Date(post.timestamp).toLocaleDateString('es-ES', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                        <h3 className={`mt-2 text-lg font-semibold ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>{post.title}</h3>
                        <p className={`mt-1 ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>{post.content}</p>
                        <div className="flex items-center gap-4 mt-4">
                          <button className="flex items-center gap-1 text-gray-500 hover:text-brand-yellow">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            <span>{post.likes}</span>
                          </button>
                          <button className="flex items-center gap-1 text-gray-500 hover:text-brand-yellow">
                            <MessageSquare size={16} />
                            <span>{post.comments}</span>
                          </button>
                          <button className="flex items-center gap-1 text-gray-500 hover:text-brand-yellow">
                            <Share2 size={16} />
                            <span>{post.shares}</span>
                          </button>
                          <button className="flex items-center gap-1 text-gray-500 hover:text-brand-yellow">
                            <Bookmark size={16} />
                          </button>
                          <button className="flex items-center gap-1 text-gray-500 hover:text-brand-yellow">
                            <MoreHorizontal size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-80 space-y-4">
              {/* About Community */}
              <div className={`p-4 rounded-xl ${
                theme === 'dark' ? 'bg-dark-200' : 'bg-white shadow-sm'
              }`}>
                <h3 className={`text-lg font-semibold mb-4 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>Sobre la comunidad</h3>
                <p className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}>{community.description}</p>
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-dark-300">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Creada</span>
                    <span className="font-medium">15 de Enero, 2024</span>
                  </div>
                </div>
              </div>

              {/* Rules */}
              <div className={`p-4 rounded-xl ${
                theme === 'dark' ? 'bg-dark-200' : 'bg-white shadow-sm'
              }`}>
                <h3 className={`text-lg font-semibold mb-4 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>Reglas de la comunidad</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-brand-yellow">•</span>
                    <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
                      Mantén el respeto hacia otros miembros
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-yellow">•</span>
                    <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
                      No spam ni publicidad no autorizada
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-yellow">•</span>
                    <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
                      Mantén el contenido relacionado con el juego
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 