"use client";

import { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import MainLayout from '../components/layout/mainLayout';
import { useTheme } from '@/context/theme-context';
import { Loader2, Search } from 'lucide-react';
import { games } from '@/utils/newsSources';

// Tipos para las noticias
type Noticia = {
  titulo: string;
  texto: string;
  link: string;
  fecha?: string;
  imagen?: string;
};

type FuenteNoticias = {
  pagina: string;
  link: string;
  articulos: Noticia[];
};

type NoticiasData = {
  Noticias: {
    [key: string]: FuenteNoticias;
  };
};

export default function NewsPage() {
  const { theme } = useTheme();
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cargarNoticias = async () => {
      try {
        // Intentar cargar desde la API
        try {
          const response = await fetch('/api/noticias');
          if (response.ok) {
            const data: NoticiasData = await response.json();

            // Aplanar todas las noticias en un solo array
            const todasNoticias: Noticia[] = [];
            Object.values(data.Noticias).forEach(fuente => {
              todasNoticias.push(...fuente.articulos);
            });

            setNoticias(todasNoticias);
            setLoading(false);
            return;
          }
        } catch (apiErr) {
          console.log('Error al cargar desde API, intentando cargar desde archivo local:', apiErr);
        }

        // Si falla la API, cargar desde el archivo local
        const response = await fetch('/main/web-crawler/noticias.json');
        if (!response.ok) {
          throw new Error('Error al cargar las noticias');
        }
        const data: NoticiasData = await response.json();

        // Aplanar todas las noticias en un solo array
        const todasNoticias: Noticia[] = [];
        Object.values(data.Noticias).forEach(fuente => {
          todasNoticias.push(...fuente.articulos);
        });

        setNoticias(todasNoticias);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    cargarNoticias();
  }, []);

  // Platforms for filtering
  const platforms = [
    { name: 'Todas', value: 'all' },
    { name: 'PC', value: 'pc' },
    { name: 'PlayStation', value: 'playstation' },
    { name: 'Xbox', value: 'xbox' },
    { name: 'Nintendo Switch', value: 'switch' },
    { name: 'Mobile', value: 'mobile' }
  ];

  const filteredNews = noticias.filter(article => {
    const matchesSearch = article.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.texto.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by platform if not 'all'
    const matchesPlatform = selectedPlatform === 'all' || 
      article.titulo.toLowerCase().includes(platforms.find(p => p.value === selectedPlatform)?.name.toLowerCase() || '') ||
      article.texto.toLowerCase().includes(platforms.find(p => p.value === selectedPlatform)?.name.toLowerCase() || '');
    
    return matchesSearch && matchesPlatform;
  });

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="w-8 h-8 animate-spin text-brand-yellow" />
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="text-center py-8 text-red-500">
          Error: {error}
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className={`text-3xl font-bold mb-8 ${theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>Noticias</h1>

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
                className={`w-full pl-10 pr-4 py-2 rounded-lg border text-sm ${theme === 'dark'
                    ? 'bg-gray-900 border-gray-700 text-gray-100 placeholder-gray-400'
                    : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'
                  }`}
              />
            </div>
          </div>
          
          {/* Platforms Filters */}
          <div>
            <h3 className={`text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Plataformas</h3>
            <div className="flex flex-wrap gap-2">
              {platforms.map((platform) => (
                <button
                  key={platform.value}
                  onClick={() => setSelectedPlatform(platform.value)}
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${selectedPlatform === platform.value
                    ? 'bg-brand-yellow text-black'
                    : theme === 'dark'
                      ? 'bg-gray-800 text-gray-100 hover:bg-gray-700'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                >
                  {platform.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {filteredNews.length === 0 ? (
          <div className={`text-center py-8 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
            No se encontraron noticias para mostrar.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Noticia destacada */}
            {filteredNews[0] && (
              <div className={`md:col-span-2 rounded-lg overflow-hidden ${theme === 'dark' ? 'bg-dark-200' : 'bg-white shadow-sm'
                }`}>
                {filteredNews[0].imagen && (
                  <div className="w-full h-64 overflow-hidden">
                    <img
                      src={filteredNews[0].imagen}
                      alt={filteredNews[0].titulo}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h2 className={`text-2xl font-bold mt-2 mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                    {filteredNews[0].titulo}
                  </h2>
                  {filteredNews[0].fecha && (
                    <p className={`text-sm mb-3 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                      }`}>
                      {new Date(filteredNews[0].fecha).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  )}
                  <p className={`mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                    {filteredNews[0].texto.substring(0, 200)}...
                  </p>
                  <div className="flex items-center justify-between">
                    <a
                      href={filteredNews[0].link}
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
              <div key={index} className={`rounded-lg overflow-hidden ${theme === 'dark' ? 'bg-dark-200' : 'bg-white shadow-sm'
                }`}>
                {article.imagen && (
                  <div className="w-full h-40 overflow-hidden">
                    <img
                      src={article.imagen}
                      alt={article.titulo}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-4">
                  <h3 className={`text-xl font-bold mt-2 mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                    {article.titulo}
                  </h3>
                  {article.fecha && (
                    <p className={`text-xs mb-2 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                      }`}>
                      {new Date(article.fecha).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  )}
                  <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                    {article.texto.substring(0, 150)}...
                  </p>
                  <div className="flex items-center justify-between">
                    <a
                      href={article.link}
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