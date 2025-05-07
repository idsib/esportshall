"use client";

import { useState, useEffect } from 'react';
import { usePathname } from "next/navigation";
import MainLayout from '../components/layout/mainLayout';
import { Footer } from '@/app/components/layout/footer';
import { fetchTeams, GameType, gameDisplayNames } from '@/app/utils/api';
import { Team } from '@/app/utils/api';
import { LoadingState, ErrorState } from '@/app/components/ui/LoadingState';
import Image from 'next/image';
import { Search } from 'lucide-react';

export default function TeamsPage() {
    const [teams, setTeams] = useState<Team[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedGame, setSelectedGame] = useState<GameType | undefined>(undefined);
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>('');
    const pathname = usePathname();

    // Debounce search term to avoid too many API calls
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 500);

        return () => clearTimeout(timer);
    }, [searchTerm]);

    const loadTeams = async (page: number, game?: GameType, search?: string) => {
        try {
            setLoading(true);
            setError(null);
            const data = await fetchTeams(page, 50, game, search);
            setTeams(data);
        } catch (err) {
            setError('Error al cargar los equipos. Por favor, inténtalo de nuevo.');
            console.error("API Error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadTeams(currentPage, selectedGame, debouncedSearchTerm);
    }, [currentPage, selectedGame, debouncedSearchTerm]);

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handleGameChange = (game?: GameType) => {
        setSelectedGame(game);
        setCurrentPage(1); // Reset to first page when changing game
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset to first page when searching
    };

    return (
        <div>
            <MainLayout>
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold mb-6 text-center">Equipos eSports</h1>
                    
                    {/* Filters */}
                    <div className="mb-8">
                        <div className="flex flex-col md:flex-row gap-4 mb-4">
                            {/* Search bar */}
                            <div className="relative flex-grow">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search size={18} className="text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Buscar equipos..."
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:border-gray-700"
                                />
                            </div>
                        </div>
                        
                        {/* Game filters */}
                        <div className="flex flex-wrap justify-center gap-3 mb-2">
                            <button 
                                onClick={() => handleGameChange(undefined)}
                                className={`px-4 py-2 rounded-md transition-colors ${!selectedGame ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
                            >
                                Todos
                            </button>
                            <button 
                                onClick={() => handleGameChange('lol')}
                                className={`px-4 py-2 rounded-md transition-colors ${selectedGame === 'lol' ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
                            >
                                {gameDisplayNames.lol}
                            </button>
                            <button 
                                onClick={() => handleGameChange('valorant')}
                                className={`px-4 py-2 rounded-md transition-colors ${selectedGame === 'valorant' ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
                            >
                                {gameDisplayNames.valorant}
                            </button>
                            <button 
                                onClick={() => handleGameChange('cs2')}
                                className={`px-4 py-2 rounded-md transition-colors ${selectedGame === 'cs2' ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
                            >
                                {gameDisplayNames.cs2}
                            </button>
                        </div>
                    </div>
                    
                    {loading ? (
                        <LoadingState message="Cargando equipos..." />
                    ) : error ? (
                        <ErrorState message={error} onRetry={() => loadTeams(currentPage, selectedGame, debouncedSearchTerm)} />
                    ) : teams.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-xl">No se encontraron equipos con los filtros seleccionados.</p>
                            <p className="mt-4">Intenta con otros filtros o términos de búsqueda.</p>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {teams.map((team) => (
                                    <div key={team.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105">
                                        <div className="h-40 bg-gray-200 dark:bg-gray-700 relative">
                                            {team.image_url ? (
                                                <div className="w-full h-full relative">
                                                    <img 
                                                        src={team.image_url} 
                                                        alt={team.name} 
                                                        className="w-full h-full object-contain p-2"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-gray-300 dark:bg-gray-600">
                                                    <span className="text-gray-500 dark:text-gray-400 text-lg font-medium">Sin imagen</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-4">
                                            <h2 className="text-xl font-bold mb-2 truncate">{team.name}</h2>
                                            {team.acronym && (
                                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                                                    <span className="font-semibold">Acrónimo:</span> {team.acronym}
                                                </p>
                                            )}
                                            {team.location && (
                                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                                    <span className="font-semibold">Ubicación:</span> {team.location}
                                                </p>
                                            )}
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
                                        {teams.length} resultados
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