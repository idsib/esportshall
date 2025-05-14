"use client";

import { useState, useEffect } from 'react';
import { usePathname } from "next/navigation";
import MainLayout from '../components/layout/mainLayout';
import { Footer } from '@/app/components/layout/footer';
import { fetchPlayers, GameType, gameDisplayNames } from '@/app/utils/api';
import { Player } from '@/app/utils/api';
import { LoadingState, ErrorState } from '@/app/components/ui/LoadingState';
import { Search } from 'lucide-react';
import { useTheme } from '@/context/theme-context';

export default function PlayersPage() {
    const [players, setPlayers] = useState<Player[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedGame, setSelectedGame] = useState<GameType | undefined>('valorant');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>('');
    const pathname = usePathname();
    const { theme } = useTheme();

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
            const data = await fetchPlayers(page, 50, game, search);
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

    return (
        <div>
            <MainLayout>
                <div className="container mx-auto px-4 py-8">
                    <h1 className={`text-3xl font-bold mb-6 text-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Jugadores</h1>

                    {/* Filters */}
                    <div className="mb-8">
                        <div className="flex flex-col md:flex-row gap-4 mb-4">
                            {/* Search bar */}
                            <div className="relative flex-grow">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search size={18} className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-400'}`} />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Buscar jugadores..."
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    className={`w-full py-2 pl-10 pr-4 rounded-lg border ${theme === 'dark' ? 'bg-neutral-800 border-neutral-700 text-white placeholder-gray-400' : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'}`}
                                />
                            </div>
                        </div>

                        {/* Game filters */}
                        <div className="flex flex-wrap justify-center gap-3 mb-4">
                            <button
                                onClick={() => handleGameChange('lol')}
                                className={`px-4 py-2 rounded-md ${selectedGame === 'lol' ? 'bg-brand-yellow text-black' : theme === 'dark' ? 'bg-neutral-800 text-white hover:bg-neutral-700' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                            >
                                {gameDisplayNames.lol}
                            </button>
                            <button
                                onClick={() => handleGameChange('valorant')}
                                className={`px-4 py-2 rounded-md ${selectedGame === 'valorant' ? 'bg-brand-yellow text-black' : theme === 'dark' ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                            >
                                {gameDisplayNames.valorant}
                            </button>
                            <button
                                onClick={() => handleGameChange('cs2')}
                                className={`px-4 py-2 rounded-md ${selectedGame === 'cs2' ? 'bg-brand-yellow text-black' : theme === 'dark' ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                            >
                                {gameDisplayNames.cs2}
                            </button>
                        </div>
                    </div>

                    {loading ? (
                        <LoadingState />
                    ) : error ? (
                        <ErrorState message={error} />
                    ) : players.length === 0 ? (
                        <div className="text-center py-12">
                            <p className={`text-xl ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>No se encontraron jugadores con los filtros seleccionados.</p>
                            <p className={`mt-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Intenta con otros filtros o términos de búsqueda.</p>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {players.map((player) => (
                                    <div key={player.id} className={`${theme === 'dark' ? 'bg-neutral-800' : 'bg-white'} p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-full flex flex-col`}>
                                        <div className={`${theme === 'dark' ? 'bg-neutral-700' : 'bg-gray-100'} flex items-center justify-center rounded-md h-32 w-32 mx-auto mb-4`}>
                                            {player.image_url ? (
                                                <img
                                                    src={player.image_url}
                                                    alt={player.name}
                                                    width={100}
                                                    height={100}
                                                    className="rounded-full object-cover"
                                                />
                                            ) : (
                                                <div className={`w-24 h-24 rounded-full ${theme === 'dark' ? 'bg-neutral-700' : 'bg-gray-200'} flex items-center justify-center`}>
                                                    <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-400'} text-xl`}>No Image</span>
                                                </div>
                                            )}
                                        </div>
                                        <h3 className={`text-xl font-semibold text-center mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>{player.name}</h3>
                                        <div className="mt-2 space-y-2">
                                            {player.nationality && (
                                                <p className={`text-center text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-400'}`}>
                                                    {player.nationality}
                                                </p>
                                            )}
                                            {player.role && (
                                                <p className={`text-center text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-400'}`}>
                                                    {player.role}
                                                </p>
                                            )}
                                            {player.team && (
                                                <div className="flex items-center justify-center mt-3 space-x-2">
                                                    <div className="w-6 h-6 relative">
                                                        {player.team.image_url ? (
                                                            <img 
                                                                src={player.team.image_url} 
                                                                alt={player.team.name}
                                                                className="w-full h-full object-contain"
                                                            />
                                                        ) : (
                                                            <div className={`w-full h-full rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} flex items-center justify-center`}>
                                                                <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>T</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                                                        {player.team.name}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

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
                                        Página {currentPage}
                                    </span>
                                    <span className="text-sm text-gray-400 dark:text-gray-400">
                                        {players.length} resultados
                                    </span>
                                </div>
                                <button
                                    onClick={handleNextPage}
                                    className="px-4 py-2 bg-brand-yellow text-black rounded-md hover:bg-brand-yellow/90"
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