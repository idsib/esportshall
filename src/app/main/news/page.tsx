"use client";

import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import MainLayout from '../components/layout/mainLayout';
import { useTheme } from '@/context/theme-context';
import { Loader2, Search } from 'lucide-react';
import { games } from '@/utils/newsSources';

// Datos de ejemplo para las noticias
const mockNews = [
  {
    title: "League of Legends: Nuevo campeón anunciado",
    description: "Riot Games ha revelado el nuevo campeón que llegará próximamente al juego.",
    url: "#",
    urlToImage: "/images/news-featured.jpg",
    publishedAt: new Date().toISOString(),
    source: { name: "Riot Games" },
    game: "lol"
  },
  {
    title: "Valorant: Nuevo mapa en desarrollo",
    description: "El equipo de desarrollo de Valorant está trabajando en un nuevo mapa que promete revolucionar el juego.",
    url: "#",
    urlToImage: "/images/news-1.jpg",
    publishedAt: new Date(Date.now() - 3600000).toISOString(),
    source: { name: "Valorant News" },
    game: "valorant"
  },
  {
    title: "CS2: Actualización de balance",
    description: "Valve ha lanzado una nueva actualización de balance para CS2 con importantes cambios en las armas.",
    url: "#",
    urlToImage: "/images/news-2.jpg",
    publishedAt: new Date(Date.now() - 7200000).toISOString(),
    source: { name: "CS2 Updates" },
    game: "cs2"
  }
];

export default function NewsPage() {
  const { theme } = useTheme();
  const [selectedGame, setSelectedGame] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNews = mockNews.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGame = selectedGame === 'all' || article.game === selectedGame;
    return matchesSearch && matchesGame;
  });

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className={`text-3xl font-bold mb-8 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>Noticias de Esports</h1>

        {/* Filtros */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input
                type="text"
                placeholder="Buscar noticias..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-lg border text-sm ${
                  theme === 'dark'
                    ? 'bg-dark-300 border-dark-300 text-white placeholder-gray-500'
                    : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'
                }`}
              />
            </div>
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2">
            {games.map(game => (
              <button
                key={game.id}
                onClick={() => setSelectedGame(game.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                  selectedGame === game.id
                    ? 'bg-brand-yellow text-black'
                    : theme === 'dark'
                      ? 'bg-dark-300 text-gray-400 hover:text-gray-300'
                      : 'bg-gray-100 text-gray-600 hover:text-gray-900'
                }`}
              >
                <span className="mr-2">{game.icon}</span>
                {game.name}
              </button>
            ))}
          </div>
        </div>

        {filteredNews.length === 0 ? (
          <div className={`text-center py-8 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            No se encontraron noticias para mostrar.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Noticia destacada */}
            {filteredNews[0] && (
              <div className={`md:col-span-2 rounded-lg overflow-hidden ${
                theme === 'dark' ? 'bg-dark-200' : 'bg-white shadow-sm'
              }`}>
                <img
                  src={filteredNews[0].urlToImage}
                  alt={filteredNews[0].title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-yellow-400 text-sm font-semibold">Destacado</span>
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-brand-yellow/10">
                      <span className="text-xs font-medium text-brand-yellow">
                        {games.find(g => g.id === filteredNews[0].game)?.name}
                      </span>
                    </div>
                  </div>
                  <h2 className={`text-2xl font-bold mt-2 mb-4 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {filteredNews[0].title}
                  </h2>
                  <p className={`mb-4 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {filteredNews[0].description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className={theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}>
                      {formatDistanceToNow(new Date(filteredNews[0].publishedAt), { addSuffix: true, locale: es })}
                    </span>
                    <a 
                      href={filteredNews[0].url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-yellow-400 hover:text-yellow-500"
                    >
                      Leer más →
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Noticias secundarias */}
            {filteredNews.slice(1, 5).map((article, index) => (
              <div key={index} className={`rounded-lg overflow-hidden ${
                theme === 'dark' ? 'bg-dark-200' : 'bg-white shadow-sm'
              }`}>
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-yellow-400 text-sm font-semibold">{article.source.name}</span>
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-brand-yellow/10">
                      <span className="text-xs font-medium text-brand-yellow">
                        {games.find(g => g.id === article.game)?.name}
                      </span>
                    </div>
                  </div>
                  <h3 className={`text-xl font-bold mt-2 mb-2 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {article.title}
                  </h3>
                  <p className={`text-sm mb-4 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {article.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className={theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}>
                      {formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true, locale: es })}
                    </span>
                    <a 
                      href={article.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-yellow-400 hover:text-yellow-500 text-sm"
                    >
                      Leer más →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
} 