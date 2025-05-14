"use client";

import { useState, useEffect } from 'react';
import { usePathname } from "next/navigation";
import MainLayout from '../components/layout/mainLayout';
import { Footer } from '@/app/components/layout/footer';
import { GameType, gameDisplayNames } from '@/app/utils/api';
import { LoadingState, ErrorState } from '@/app/components/ui/LoadingState';
import { Search } from 'lucide-react';
import { useTheme } from '@/context/theme-context';

// Interface for videogame data
interface Videogame {
    id: number;
    name: string;
    slug: string;
    current_version?: string;
    image_url?: string;
    description?: string;
    release_date?: string;
    platforms?: string[];
    publisher?: string;
    developer?: string;
}

interface Platform {
    name: string;
    slug: string;
}

export default function VideogamesPage() {
    const [videogames, setVideogames] = useState<Videogame[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const pathname = usePathname();
    const { theme } = useTheme();

    const fetchVideogames = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    authorization: `Bearer ${process.env.NEXT_PUBLIC_PANDASCORE_API_TOKEN || '3eYgBOgZIU9N5Wfgi15H2ASzZ0aIGB_zpLHl3fKZgTgSC9zbVq4'}`
                }
            };
            
            let url = `https://api.pandascore.co/videogames?page=1&per_page=50`;

            const response = await fetch(url, options);
            
            if (!response.ok) {
                const errorDetails = await response.text();
                console.error(`Error ${response.status}:`, errorDetails);
                throw new Error(`Error ${response.status}: ${errorDetails}`);
            }
            
            const data = await response.json();
            setVideogames(data);
        } catch (err) {
            setError('Error al cargar los videojuegos. Por favor, inténtalo de nuevo.');
            console.error("API Error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVideogames();
    }, []);

    return (
        <div>
            <MainLayout>
                <div className="container mx-auto px-4 py-8">
                    <h1 className={`text-3xl font-bold mb-6 text-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Videojuegos eSports</h1>



                    {loading ? (
                        <LoadingState message="Cargando videojuegos..." />
                    ) : error ? (
                        <ErrorState message={error} />
                    ) : videogames.length === 0 ? (
                        <div className={`text-center py-12 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                            <p className="text-xl">No se encontraron videojuegos que coincidan con tu búsqueda.</p>
                            <p className="mt-2">Intenta con diferentes términos o filtros.</p>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {videogames.map((game) => (
                                    <div 
                                        key={game.id} 
                                        className={`rounded-lg overflow-hidden shadow-md ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}
                                    >
                                        <div className="h-48 overflow-hidden relative">
                                            {game.image_url ? (
                                                <img 
                                                    src={game.image_url} 
                                                    alt={game.name} 
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className={`w-full h-full flex items-center justify-center ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
                                                    <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}>No hay imagen</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-6">
                                            <h2 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>{game.name}</h2>
                                            
                                            {game.description && (
                                                <p className={`text-sm mb-4 line-clamp-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                                    {game.description}
                                                </p>
                                            )}
                                            
                                            <div className={`pt-3 ${game.description ? `border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}` : ''}`}>
                                                {game.release_date && (
                                                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                                        <span className="font-semibold">Lanzamiento:</span> {new Date(game.release_date).toLocaleDateString('es-ES')}
                                                    </p>
                                                )}
                                                
                                                {game.platforms && game.platforms.length > 0 && (
                                                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                                        <span className="font-semibold">Plataformas:</span> {game.platforms.join(', ')}
                                                    </p>
                                                )}
                                                
                                                {game.publisher && (
                                                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                                        <span className="font-semibold">Editor:</span> {game.publisher}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-center mt-8">
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                    {videogames.length} videojuegos disponibles
                                </span>
                            </div>
                        </>
                    )}
                </div>
                <Footer />
            </MainLayout>
        </div>
    );
}