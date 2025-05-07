"use client";

import { useState, useEffect } from 'react';
import { usePathname } from "next/navigation";
import MainLayout from '../components/layout/mainLayout';
import { Footer } from '@/app/components/layout/footer';
import { fetchPlayers, GameType, gameDisplayNames } from '@/app/utils/api';
import { Player } from '@/app/utils/api';
import { LoadingState, ErrorState } from '@/app/components/ui/LoadingState';
import { Search } from 'lucide-react';

export default function PlayersPage() {
    const [players, setPlayers] = useState<Player[]>([]);
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

    const loadPlayers = async (page: number, game?: GameType, search?: string) => {
        try {
            setLoading(true);
            setError(null);
            const data = await fetchPlayers(page, 80, game, search);
            setPlayers(data);
        } catch (err) {
            setError('Error al cargar los jugadores. Por favor, inténtalo de nuevo.');
            console.error("API Error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPlayers(currentPage, selectedGame, debouncedSearchTerm);
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

    // Format date to a more readable format
    const formatDate = (dateString: string | undefined) => {
        if (!dateString) return "Desconocida";
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    return (
        <div>
            <MainLayout>
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold mb-6 text-center">Jugadores eSports</h1>
                    
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
                                    placeholder="Buscar jugadores..."
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
                        <LoadingState message="Cargando jugadores..." />
                    ) : error ? (
                        <ErrorState message={error} onRetry={() => loadPlayers(currentPage, selectedGame, debouncedSearchTerm)} />
                    ) : players.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-xl">No se encontraron jugadores con los filtros seleccionados.</p>
                            <p className="mt-4">Intenta con otros filtros o términos de búsqueda.</p>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {players.map((player) => (
                                    <div key={player.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105">
                                        <div className="h-48 bg-gray-200 dark:bg-gray-700 relative">
                                            {player.image_url ? (
                                                <div className="w-full h-full relative">
                                                    <img 
                                                        src={player.image_url} 
                                                        alt={player.name} 
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-gray-300 dark:bg-gray-600">
                                                    <svg className="w-16 h-16 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                                                    </svg>
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-4">
                                            <h2 className="text-xl font-bold mb-2 truncate">{player.name}</h2>
                                            <div className="space-y-2">
                                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                                    <span className="font-semibold">Alias:</span> {player.slug}
                                                </p>
                                                {player.nationality && (
                                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                                        <span className="font-semibold">Nacionalidad:</span> {player.nationality}
                                                    </p>
                                                )}
                                                {player.role && (
                                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                                        <span className="font-semibold">Rol:</span> {player.role}
                                                    </p>
                                                )}
                                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                                    <span className="font-semibold">Fecha de nacimiento:</span> {formatDate(player.birthday)}
                                                </p>
                                                {player.team && (
                                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                                        <span className="font-semibold">Equipo:</span> {player.team.name}
                                                    </p>
                                                )}
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
                                        {players.length} resultados
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