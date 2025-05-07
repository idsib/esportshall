"use client";

import { useState, useEffect } from 'react';
import { usePathname } from "next/navigation";
import MainLayout from '../components/layout/mainLayout';
import { Footer } from '@/app/components/layout/footer';
import { fetchTournaments, GameType, gameDisplayNames } from '@/app/utils/api';
import { Tournament } from '@/app/utils/api';
import { LoadingState, ErrorState } from '@/app/components/ui/LoadingState';
import { Search } from 'lucide-react';

export default function TournamentsPage() {
    const [tournaments, setTournaments] = useState<Tournament[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [gameType, setGameType] = useState<GameType>('valorant');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>('');
    const pathname = usePathname();

    // Debounce search term to avoid too many API calls
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 500);

        return () => clearTimeout(timer);
    }, [searchTerm]);

    const loadTournaments = async (page: number, game: GameType, search?: string) => {
        try {
            setLoading(true);
            setError(null);
            const data = await fetchTournaments(page, 50, game, search);
            setTournaments(data);
        } catch (err) {
            setError('Error al cargar los torneos. Por favor, inténtalo de nuevo.');
            console.error("API Error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadTournaments(currentPage, gameType, debouncedSearchTerm);
    }, [currentPage, gameType, debouncedSearchTerm]);

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handleGameChange = (game: GameType) => {
        setGameType(game);
        setCurrentPage(1); // Reset to first page when changing game type
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset to first page when searching
    };

    // Format date to a more readable format
    const formatDate = (dateString: string | undefined) => {
        if (!dateString) return "Por confirmar";
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div>
            <MainLayout>
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold mb-6 text-center">Torneos de eSports</h1>
                    
                    <div className="mb-8">
                        {/* Search bar */}
                        <div className="flex flex-col md:flex-row gap-4 mb-4">
                            <div className="relative flex-grow">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search size={18} className="text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Buscar torneos..."
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:border-gray-700"
                                />
                            </div>
                        </div>
                        
                        {/* Game filters - limited to the 3 specified games */}
                        <div className="flex flex-wrap justify-center gap-4 mb-6">
                            <button 
                                onClick={() => handleGameChange('lol')} 
                                className={`px-4 py-2 rounded-md ${gameType === 'lol' ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
                            >
                                {gameDisplayNames.lol}
                            </button>
                            <button 
                                onClick={() => handleGameChange('valorant')} 
                                className={`px-4 py-2 rounded-md ${gameType === 'valorant' ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
                            >
                                {gameDisplayNames.valorant}
                            </button>
                            <button 
                                onClick={() => handleGameChange('cs2')} 
                                className={`px-4 py-2 rounded-md ${gameType === 'cs2' ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
                            >
                                {gameDisplayNames.cs2}
                            </button>
                        </div>
                    </div>
                    
                    {loading ? (
                        <LoadingState message={`Cargando torneos de ${gameDisplayNames[gameType]}...`} />
                    ) : error ? (
                        <ErrorState message={error} onRetry={() => loadTournaments(currentPage, gameType, debouncedSearchTerm)} />
                    ) : tournaments.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-xl">No hay torneos disponibles para {gameDisplayNames[gameType]}.</p>
                            <p className="mt-4">Intenta con otro juego o término de búsqueda.</p>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {tournaments.map((tournament) => (
                                    <div key={tournament.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105">
                                        {tournament.league?.image_url && (
                                            <div className="h-40 bg-gray-100 dark:bg-gray-700 flex items-center justify-center p-4">
                                                <img 
                                                    src={tournament.league.image_url} 
                                                    alt={tournament.league.name} 
                                                    className="max-h-full max-w-full object-contain"
                                                />
                                            </div>
                                        )}
                                        <div className="p-6">
                                            <h2 className="text-xl font-bold mb-4">{tournament.name}</h2>
                                            
                                            <div className="space-y-3">
                                                {tournament.series && (
                                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                                        <span className="font-semibold">Serie:</span> {tournament.series.full_name || tournament.series.name}
                                                    </p>
                                                )}
                                                
                                                {tournament.league && (
                                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                                        <span className="font-semibold">Liga:</span> {tournament.league.name}
                                                    </p>
                                                )}
                                                
                                                {tournament.region && (
                                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                                        <span className="font-semibold">Región:</span> {tournament.region}
                                                    </p>
                                                )}
                                                
                                                {tournament.country && (
                                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                                        <span className="font-semibold">País:</span> {tournament.country}
                                                    </p>
                                                )}
                                                
                                                {tournament.prizepool && (
                                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                                        <span className="font-semibold">Premio:</span> {tournament.prizepool}
                                                    </p>
                                                )}
                                                
                                                <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                                        <span className="font-semibold">Inicio:</span> {formatDate(tournament.begin_at)}
                                                    </p>
                                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                                        <span className="font-semibold">Fin:</span> {formatDate(tournament.end_at)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-between mt-8">
                                <button 
                                    onClick={handlePrevPage} 
                                    disabled={currentPage === 1}
                                    className={`px-4 py-2 rounded-md ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-primary text-white hover:bg-primary-dark'}`}
                                >
                                    Anterior
                                </button>
                                <div className="flex items-center gap-2">
                                    <span className="py-2 px-4 bg-gray-100 dark:bg-gray-700 rounded-md">
                                        Página {currentPage}
                                    </span>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                        {tournaments.length} resultados
                                    </span>
                                </div>
                                <button 
                                    onClick={handleNextPage}
                                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
                                >
                                    Siguiente
                                </button>
                            </div>
                        </>
                    )}
                </div>
                <Footer />
            </MainLayout>
        </div>
    );
}