'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTheme } from '@/context/theme-context';
import MainLayout from '../components/layout/mainLayout';
import { Plus, Search, TrendingUp, Clock, Star, ArrowUp, ArrowDown, MessageCircle, Share2, Bookmark, Users } from 'lucide-react';
import Link from 'next/link';

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  upvotes: number;
  comments: number;
  timestamp: string;
  game: string;
}

interface Community {
  id: string;
  name: string;
  icon: string;
  members: number;
  posts: Post[];
  description: string;
  trending: boolean;
}

const games = [
  { id: 'all', name: 'Todos los juegos', icon: '🎮' },
  { id: 'lol', name: 'League of Legends', icon: '⚔️' },
  { id: 'valorant', name: 'Valorant', icon: '🔫' },
  { id: 'csgo', name: 'CS:GO', icon: '🎯' },
  { id: 'dota2', name: 'Dota 2', icon: '🏰' },
  { id: 'fortnite', name: 'Fortnite', icon: '🏗️' },
];

const communities: Community[] = [
  {
    id: 'lol',
    name: 'League of Legends',
    icon: 'https://cdn.communitydragon.org/latest/champion/1/square',
    members: 1250000,
    posts: [
      {
        id: 1,
        title: 'Nuevo campeón revelado: ¡Prepárense para la revolución!',
        content: 'Riot Games acaba de revelar el nuevo campeón que llegará en la próxima actualización...',
        author: 'RiotFan123',
        upvotes: 1250,
        comments: 342,
        timestamp: '2h',
        game: 'lol'
      },
      {
        id: 2,
        title: 'Guía completa para el nuevo meta de la temporada 14',
        content: 'Con los cambios recientes en el juego, el meta ha cambiado drásticamente...',
        author: 'ProPlayer',
        upvotes: 890,
        comments: 156,
        timestamp: '5h',
        game: 'lol'
      }
    ],
    description: 'La comunidad más grande de League of Legends en español. Comparte tus experiencias, estrategias y conecta con otros jugadores.',
    trending: true
  },
  {
    id: 'valorant',
    name: 'Valorant',
    icon: 'https://media.valorant-api.com/agents/5f8d3a7f-467b-97f3-062c-13acf203c006/displayicon.png',
    members: 980000,
    posts: [
      {
        id: 3,
        title: 'Nuevo agente revelado: ¿Quién será el próximo?',
        content: 'Riot Games ha dejado pistas sobre el próximo agente que llegará a Valorant...',
        author: 'ValorantFan',
        upvotes: 980,
        comments: 245,
        timestamp: '3h',
        game: 'valorant'
      }
    ],
    description: 'Comunidad dedicada a Valorant. Discute tácticas, comparte clips y encuentra compañeros de equipo.',
    trending: true
  },
  {
    id: 'csgo',
    name: 'CS:GO',
    icon: 'https://steamcdn-a.akamaihd.net/apps/730/icons/econ/weapons/base_weapons/icon_ak47.2d2f3e2d6e8c6d9e.png',
    members: 850000,
    posts: [
      {
        id: 4,
        title: 'Análisis del nuevo parche de CS2',
        content: 'Valve ha lanzado un nuevo parche con importantes cambios en el juego...',
        author: 'CSGOMaster',
        upvotes: 750,
        comments: 189,
        timestamp: '6h',
        game: 'csgo'
      }
    ],
    description: 'La comunidad definitiva de CS:GO. Desde estrategias hasta skins, todo lo que necesitas saber sobre el juego.',
    trending: false
  },
  {
    id: 'dota2',
    name: 'Dota 2',
    icon: 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/abaddon.png',
    members: 750000,
    posts: [
      {
        id: 5,
        title: 'El International 2024: Fechas y ubicación confirmadas',
        content: 'Valve ha anunciado las fechas y la ubicación del próximo The International...',
        author: 'DotaPro',
        upvotes: 1200,
        comments: 320,
        timestamp: '1d',
        game: 'dota2'
      }
    ],
    description: 'Comunidad de Dota 2 en español. Aprende, comparte y mejora junto a otros jugadores.',
    trending: false
  },
  {
    id: 'fortnite',
    name: 'Fortnite',
    icon: 'https://cdn2.unrealengine.com/fortnite-character-1-1920x1080-1920x1080-0c0c3d7d9c3.jpg',
    members: 1100000,
    posts: [
      {
        id: 6,
        title: 'Nueva temporada de Fortnite: ¡Todo lo que necesitas saber!',
        content: 'Epic Games ha revelado los detalles de la próxima temporada de Fortnite...',
        author: 'FortniteBuilder',
        upvotes: 1500,
        comments: 420,
        timestamp: '4h',
        game: 'fortnite'
      }
    ],
    description: 'La comunidad más activa de Fortnite. Comparte tus construcciones, estrategias y momentos épicos.',
    trending: true
  }
];

export default function CommunitiesPage() {
  const { theme } = useTheme();
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGame, setSelectedGame] = useState('all');
  const [showCreateCommunity, setShowCreateCommunity] = useState(false);

  const filteredCommunities = communities.filter(community => {
    const matchesSearch = community.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGame = selectedGame === 'all' || community.id === selectedGame;
    if (activeFilter === 'trending') {
      return matchesSearch && matchesGame && community.trending;
    }
    return matchesSearch && matchesGame;
  });

  return (
    <MainLayout>
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className={`text-2xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>Comunidades</h1>
              <p className={`mt-1 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>Descubre y únete a comunidades de tus juegos favoritos</p>
            </div>
            <button 
              onClick={() => setShowCreateCommunity(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-brand-yellow hover:bg-brand-yellow/90 text-black font-semibold transition-colors"
            >
              <Plus size={18} />
              <span>Crear comunidad</span>
            </button>
          </div>

          <div className="flex gap-6">
            {/* Sidebar */}
            <div className="w-64 hidden md:block">
              <div className={`sticky top-6 p-4 rounded-xl ${
                theme === 'dark' ? 'bg-dark-200' : 'bg-white shadow-sm'
              }`}>
                <h3 className={`font-semibold mb-4 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>Juegos</h3>
                <div className="space-y-2">
                  {games.map(game => (
                    <button
                      key={game.id}
                      onClick={() => setSelectedGame(game.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${
                        selectedGame === game.id
                          ? 'bg-brand-yellow text-black'
                          : theme === 'dark'
                            ? 'text-gray-400 hover:text-gray-300'
                            : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <span>{game.icon}</span>
                      <span>{game.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Search and Filters */}
              <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input
                    type="text"
                    placeholder="Buscar comunidades..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full pl-10 pr-4 py-2 rounded-lg border text-sm ${
                      theme === 'dark'
                        ? 'bg-dark-300 border-dark-300 text-white placeholder-gray-500'
                        : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'
                    }`}
                  />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  <button
                    onClick={() => setActiveFilter('all')}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                      activeFilter === 'all'
                        ? 'bg-brand-yellow text-black'
                        : theme === 'dark'
                          ? 'bg-dark-300 text-gray-400 hover:text-gray-300'
                          : 'bg-gray-100 text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Todas
                  </button>
                  <button
                    onClick={() => setActiveFilter('trending')}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap flex items-center gap-2 ${
                      activeFilter === 'trending'
                        ? 'bg-brand-yellow text-black'
                        : theme === 'dark'
                          ? 'bg-dark-300 text-gray-400 hover:text-gray-300'
                          : 'bg-gray-100 text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <TrendingUp size={16} />
                    <span>Trending</span>
                  </button>
                </div>
              </div>

              {/* Posts Grid */}
              <div className="space-y-4">
                {filteredCommunities.map((community) => (
                  <div key={community.id} className={`p-4 rounded-xl ${
                    theme === 'dark' ? 'bg-dark-200' : 'bg-white shadow-sm'
                  }`}>
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-lg overflow-hidden">
                        <img
                          src={community.icon}
                          alt={community.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className={`text-lg font-semibold ${
                            theme === 'dark' ? 'text-white' : 'text-gray-900'
                          }`}>{community.name}</h3>
                          {community.trending && (
                            <span className="px-2 py-0.5 rounded-full bg-brand-yellow/10 text-brand-yellow text-xs font-medium">
                              Trending
                            </span>
                          )}
                        </div>
                        <p className={`mt-1 text-sm ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                        }`}>{community.description}</p>
                      </div>
                    </div>

                    {/* Posts */}
                    <div className="space-y-4">
                      {community.posts.map(post => (
                        <div key={post.id} className={`p-4 rounded-lg ${
                          theme === 'dark' ? 'bg-dark-300' : 'bg-gray-50'
                        }`}>
                          <div className="flex gap-4">
                            {/* Vote buttons */}
                            <div className="flex flex-col items-center">
                              <button className="p-1 hover:text-brand-yellow">
                                <ArrowUp size={20} />
                              </button>
                              <span className="text-sm font-medium">{post.upvotes}</span>
                              <button className="p-1 hover:text-brand-yellow">
                                <ArrowDown size={20} />
                              </button>
                            </div>

                            {/* Post content */}
                            <div className="flex-1">
                              <h4 className={`font-semibold ${
                                theme === 'dark' ? 'text-white' : 'text-gray-900'
                              }`}>{post.title}</h4>
                              <p className={`mt-1 text-sm ${
                                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                              }`}>{post.content}</p>
                              
                              {/* Post meta */}
                              <div className="flex items-center gap-4 mt-4 text-sm">
                                <span className={`${
                                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                                }`}>Publicado por u/{post.author}</span>
                                <span className={`${
                                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                                }`}>{post.timestamp}</span>
                                <div className="flex items-center gap-4">
                                  <button className="flex items-center gap-1 hover:text-brand-yellow">
                                    <MessageCircle size={16} />
                                    <span>{post.comments} comentarios</span>
                                  </button>
                                  <button className="flex items-center gap-1 hover:text-brand-yellow">
                                    <Share2 size={16} />
                                    <span>Compartir</span>
                                  </button>
                                  <button className="flex items-center gap-1 hover:text-brand-yellow">
                                    <Bookmark size={16} />
                                    <span>Guardar</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 