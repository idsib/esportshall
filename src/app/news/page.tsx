"use client";

import { useState, useEffect } from 'react';
import MainLayout from '../main/components/layout/mainLayout';
import { useTheme } from '@/context/theme-context';
import { Loader2, Search } from 'lucide-react';
import { AllNoticias } from "../auth/neon/actionsServer"

interface Noticia {
  id: number;
  pagina: string;
  link_fuente: string;
  titulo: string;
  link_articulo: string;
  texto: string;
  fecha: Date;
  imagen: string;
};

export default function NewsPage() {
  const { theme } = useTheme();
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Paginación de las noticias (10 por página)
  const [currentPage, setCurrentPage] = useState(1);
  const noticiasPorPagina = 10;

  useEffect(() => {
    const cargarNoticias = async () => {
      try {
        // Intentar cargar desde la API
        try {

          const todasNoticias: Noticia[] = await AllNoticias();

          /* // Aplanar todas las noticias en un solo array
          const todasNoticias: Noticia[] = [];
          Object.values(data.Noticias).forEach(fuente => {
            todasNoticias.push(...fuente.articulos);
          }); */

          setNoticias(todasNoticias);
          setLoading(false);
          return;

        } catch (apiErr) {
          console.log('Error al cargar desde API, intentando cargar desde archivo local:', apiErr);
        }

        /* // Si falla la API, cargar desde el archivo local
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

       setNoticias(todasNoticias); */
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    cargarNoticias();
  }, []);

  // Filtro por plataformas
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

  const totalPages = Math.ceil(filteredNews.length / noticiasPorPagina);

  // Noticias a mostrar en la página actual
  const startIdx = (currentPage - 1) * noticiasPorPagina;
  const endIdx = startIdx + noticiasPorPagina;
  const paginatedNews = filteredNews.slice(startIdx, endIdx);
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  // Reiniciar a la primera página si cambia el filtro o la búsqueda
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedPlatform]);

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
                className={`w-full pl-10 pr-4 py-2 rounded-lg border text-sm ${theme === 'dark' ? 'bg-neutral-800 border-neutral-700 text-gray-100 placeholder-gray-400' : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'}`}
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
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${selectedPlatform === platform.value ? 'bg-brand-yellow text-black' : theme === 'dark' ? 'bg-neutral-800 text-gray-100 hover:bg-neutral-700' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
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
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Noticia destacada */}
              {paginatedNews[0] && (
                <div className={`md:col-span-2 rounded-lg overflow-hidden ${theme === 'dark' ? 'bg-neutral-800' : 'bg-white shadow-sm'}`}>
                  {paginatedNews[0].imagen && (
                    <div className="w-full h-64 overflow-hidden">
                      <img
                        src={paginatedNews[0].imagen}
                        alt={paginatedNews[0].titulo}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h2 className={`text-2xl font-bold mt-2 mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                      {paginatedNews[0].titulo}
                    </h2>
                    {paginatedNews[0].fecha && (
                      <p className={`text-sm mb-3 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                        }`}>
                        {new Date(paginatedNews[0].fecha).toLocaleDateString('es-ES', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    )}
                    <p className={`mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                      {paginatedNews[0].texto.substring(0, 200)}...
                    </p>
                    <div className="flex items-center justify-between">
                      <a
                        href={paginatedNews[0].link_articulo}
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
              {paginatedNews.slice(1).map((article, index) => (
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
                        href={article.link_articulo}
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

            {/* PAGINACIÓN */}
            <div className="flex justify-between mt-8">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-md ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-brand-yellow text-black hover:bg-brand-yellow/90'}`}
              >
                Anterior
              </button>
              <div className="flex items-center gap-2">
                <span className={`py-2 px-4 ${theme === 'dark' ? 'bg-dark-300 text-white' : 'bg-gray-100 text-gray-800'} rounded-md`}>
                  Página {currentPage} de {totalPages}
                </span>
                <span className="text-sm text-gray-400 dark:text-gray-400">
                  {filteredNews.length} resultados
                </span>
              </div>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-md ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-brand-yellow text-black hover:bg-brand-yellow/90'}`}
              >
                Siguiente
              </button>
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
}