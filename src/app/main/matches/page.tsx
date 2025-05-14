"use client";

import { useState, useEffect } from 'react';
import { usePathname } from "next/navigation";
import MainLayout from '../components/layout/mainLayout';
import { Footer } from '@/app/components/layout/footer';
import { fetchMatches, fetchLeagues, GameType, gameDisplayNames, Match, League } from '@/app/utils/api';
import { LoadingState, ErrorState } from '@/app/components/ui/LoadingState';
import { Search, Calendar, Clock, Trophy, Users, Award } from 'lucide-react';
import { useTheme } from '@/context/theme-context';
import Image from 'next/image';

export default function MatchesPage() {
    const [matches, setMatches] = useState<Match[]>([]);
    const [leagues, setLeagues] = useState<League[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [leaguesLoading, setLeaguesLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [leaguesError, setLeaguesError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [leaguesPage, setLeaguesPage] = useState<number>(1);
    // Usamos valorant como juego inicial ya que no necesita mapeo
    const [selectedGame, setSelectedGame] = useState<GameType>('valorant');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>('');
    const [statusFilter, setStatusFilter] = useState<'running' | 'not_started' | 'finished' | undefined>(undefined);
    const [viewMode, setViewMode] = useState<'calendar' | 'leagues'>('calendar');
    const pathname = usePathname();
    const { theme } = useTheme();

    // Debounce search term to avoid too many API calls
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 500);

        return () => clearTimeout(timer);
    }, [searchTerm]);

    const loadMatches = async (page: number, game: GameType, search?: string, status?: 'running' | 'not_started' | 'finished') => {
        try {
            console.log(`Loading matches: page=${page}, game=${game}, search=${search || 'none'}, status=${status || 'all'}`);
            setLoading(true);
            setError(null);
            const data = await fetchMatches(page, 50, game, search, status);
            console.log(`Received ${data.length} matches from API`);
            setMatches(Array.isArray(data) ? data : []);
        } catch (err) {
            setError('Error al cargar los partidos. Por favor, inténtalo de nuevo.');
            console.error("API Error:", err);
            setMatches([]);
        } finally {
            setLoading(false);
        }
    };
    
    const loadLeagues = async (page: number, game: GameType, search?: string) => {
        try {
            console.log(`Loading leagues: page=${page}, game=${game}, search=${search || 'none'}`);
            setLeaguesLoading(true);
            setLeaguesError(null);
            const data = await fetchLeagues(page, 50, game, search);
            console.log(`Received ${data?.length || 0} leagues from API`);
            setLeagues(Array.isArray(data) ? data : []);
        } catch (err) {
            setLeaguesError('Error al cargar las ligas. Por favor, inténtalo de nuevo.');
            console.error("Leagues API Error:", err);
            setLeagues([]);
        } finally {
            setLeaguesLoading(false);
        }
    };

    useEffect(() => {
        if (viewMode === 'calendar') {
            loadMatches(currentPage, selectedGame, debouncedSearchTerm, statusFilter);
        } else if (viewMode === 'leagues') {
            loadLeagues(leaguesPage, selectedGame, debouncedSearchTerm);
        }
    }, [currentPage, leaguesPage, selectedGame, debouncedSearchTerm, statusFilter, viewMode]);

    const handlePrevPage = () => {
        if (viewMode === 'calendar') {
            if (currentPage > 1) {
                setCurrentPage(currentPage - 1);
            }
        } else if (viewMode === 'leagues') {
            if (leaguesPage > 1) {
                setLeaguesPage(leaguesPage - 1);
            }
        }
    };

    const handleNextPage = () => {
        if (viewMode === 'calendar') {
            setCurrentPage(currentPage + 1);
        } else if (viewMode === 'leagues') {
            setLeaguesPage(leaguesPage + 1);
        }
    };

    const handleGameChange = (game: GameType) => {
        setSelectedGame(game);
        setCurrentPage(1); // Reset to first page when changing game
        setLeaguesPage(1); // Reset leagues page as well
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset to first page when searching
    };

    const handleStatusChange = (status?: 'running' | 'not_started' | 'finished') => {
        setStatusFilter(status);
        setCurrentPage(1); // Reset to first page when changing status
    };
    
    const handleViewModeChange = (mode: 'calendar' | 'leagues') => {
        setViewMode(mode);
    };

    // Format date to a more readable format
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    // Get status badge color and text
    const getStatusBadge = (match: Match) => {
        if (match.status === 'running') {
            return {
                text: 'En vivo',
                bgColor: theme === 'dark' ? 'bg-red-600' : 'bg-red-500',
                textColor: 'text-white'
            };
        } else if (match.status === 'not_started') {
            return {
                text: 'Próximamente',
                bgColor: theme === 'dark' ? 'bg-blue-600' : 'bg-blue-500',
                textColor: 'text-white'
            };
        } else {
            return {
                text: 'Finalizado',
                bgColor: theme === 'dark' ? 'bg-gray-700' : 'bg-gray-500',
                textColor: 'text-white'
            };
        }
    };

    return (
        <MainLayout>
            <div className="min-h-screen">
                <div className="container mx-auto px-4 py-8">
                    <h1 className={`text-3xl font-bold mb-8 text-center ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>
                        Partidos de Esports
                    </h1>
                    
                    {/* View Mode Selector */}
                    <div className="flex justify-center mb-6">
                        <div className="flex rounded-lg overflow-hidden">
                            <button 
                                onClick={() => handleViewModeChange('calendar')}
                                className={`px-4 py-2 flex items-center ${viewMode === 'calendar' ? 'bg-brand-yellow text-black' : theme === 'dark' ? 'bg-neutral-800 text-white hover:bg-neutral-700' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                            >
                                <Calendar size={18} className="mr-2" />
                                Calendario
                            </button>
                            <button 
                                onClick={() => handleViewModeChange('leagues')}
                                className={`px-4 py-2 flex items-center ${viewMode === 'leagues' ? 'bg-brand-yellow text-black' : theme === 'dark' ? 'bg-neutral-800 text-white hover:bg-neutral-700' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                            >
                                <Award size={18} className="mr-2" />
                                Ligas
                            </button>
                        </div>
                    </div>
                    
                    {/* Search bar */}
                    <div className="mb-6">
                        <div className="max-w-md mx-auto relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search size={18} className={theme === 'dark' ? 'text-neutral-400' : 'text-gray-500'} />
                            </div>
                            <input 
                                type="text" 
                                placeholder="Buscar partidos..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${theme === 'dark' ? 'bg-neutral-800 border-neutral-700 text-white placeholder-gray-400' : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'}`}
                            />
                        </div>
                    </div>

                    {/* Game filters */}
                    <div className="flex flex-wrap justify-center gap-3 mb-4">
                        <button
                            onClick={() => handleGameChange('valorant')}
                            className={`px-4 py-2 rounded-md ${selectedGame === 'valorant' ? 'bg-brand-yellow text-black' : theme === 'dark' ? 'bg-neutral-800 text-white hover:bg-neutral-700' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                        >
                            {gameDisplayNames.valorant}
                        </button>
                        <button
                            onClick={() => handleGameChange('lol')}
                            className={`px-4 py-2 rounded-md ${selectedGame === 'lol' ? 'bg-brand-yellow text-black' : theme === 'dark' ? 'bg-neutral-800 text-white hover:bg-neutral-700' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                        >
                            {gameDisplayNames.lol}
                        </button>
                        <button
                            onClick={() => handleGameChange('cs2')}
                            className={`px-4 py-2 rounded-md ${selectedGame === 'cs2' ? 'bg-brand-yellow text-black' : theme === 'dark' ? 'bg-neutral-800 text-white hover:bg-neutral-700' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                        >
                            {gameDisplayNames.cs2}
                        </button>
                    </div>

                    {viewMode === 'calendar' && (
                        <>
                            {/* Status filters */}
                            <div className="flex flex-wrap justify-center gap-3 mb-4">
                                <button
                                    onClick={() => handleStatusChange(undefined)}
                                    className={`px-4 py-2 rounded-md ${statusFilter === undefined ? 'bg-brand-yellow text-black' : theme === 'dark' ? 'bg-neutral-800 text-white hover:bg-neutral-700' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                                >
                                    Todos
                                </button>
                                <button
                                    onClick={() => handleStatusChange('not_started')}
                                    className={`px-4 py-2 rounded-md ${statusFilter === 'not_started' ? 'bg-brand-yellow text-black' : theme === 'dark' ? 'bg-neutral-800 text-white hover:bg-neutral-700' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                                >
                                    Próximos
                                </button>
                                <button
                                    onClick={() => handleStatusChange('finished')}
                                    className={`px-4 py-2 rounded-md ${statusFilter === 'finished' ? 'bg-brand-yellow text-black' : theme === 'dark' ? 'bg-neutral-800 text-white hover:bg-neutral-700' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                                >
                                    Finalizados
                                </button>
                            </div>

                            {/* Matches List */}
                            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-neutral-900' : 'bg-white'} shadow-md mb-6`}>
                                {loading ? (
                                    <LoadingState message="Cargando partidos..." />
                                ) : error ? (
                                    <ErrorState message={error} />
                                ) : matches.length === 0 ? (
                                    <div className="text-center py-8">
                                        <Calendar className={`w-12 h-12 mx-auto mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                                        <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>No hay partidos disponibles</h3>
                                        <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>No se encontraron partidos para los filtros seleccionados. Intenta con otros filtros.</p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 gap-4">
                                        {matches.map((match) => {
                                            const statusBadge = getStatusBadge(match);
                                            return (
                                                <div 
                                                    key={match.id} 
                                                    className={`p-4 rounded-lg border ${match.status === 'running' ? 'border-red-500' : theme === 'dark' ? 'border-neutral-700' : 'border-gray-200'} ${theme === 'dark' ? 'bg-neutral-800' : 'bg-gray-50'}`}
                                                >
                                                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4">
                                                        <div className="flex items-center mb-2 md:mb-0">
                                                            {match.league && match.league.image_url ? (
                                                                <div className="w-10 h-10 mr-3 overflow-hidden rounded-full">
                                                                    <img 
                                                                        src={match.league.image_url} 
                                                                        alt={match.league.name} 
                                                                        width={40} 
                                                                        height={40} 
                                                                        className="w-full h-full object-cover"
                                                                    />
                                                                </div>
                                                            ) : (
                                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${theme === 'dark' ? 'bg-neutral-700' : 'bg-gray-200'}`}>
                                                                    <Trophy size={20} className={theme === 'dark' ? 'text-neutral-400' : 'text-gray-500'} />
                                                                </div>
                                                            )}
                                                            <div>
                                                                <h3 className={`font-bold ${theme === 'dark' ? 'text-neutral-100' : 'text-gray-800'}`}>{match.name}</h3>
                                                                {match.league && (
                                                                    <p className={`text-sm ${theme === 'dark' ? 'text-neutral-400' : 'text-gray-500'}`}>{match.league.name}</p>
                                                                )}
                                                            </div>
                                                        </div>
                                                        
                                                        <div className="flex items-center">
                                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusBadge.bgColor} ${statusBadge.textColor}`}>
                                                                {statusBadge.text}
                                                            </span>
                                                            <span className={`ml-3 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                                                {formatDate(match.begin_at)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                                        {match.opponents && match.opponents.map((opponent, index) => (
                                                            <div key={index} className="flex flex-col items-center">
                                                                {opponent.opponent.image_url ? (
                                                                    <div className="w-16 h-16 mb-2 overflow-hidden rounded-md">
                                                                        <img 
                                                                            src={opponent.opponent.image_url} 
                                                                            alt={opponent.opponent.name} 
                                                                            width={64} 
                                                                            height={64} 
                                                                            className="w-full h-full object-cover"
                                                                        />
                                                                    </div>
                                                                ) : (
                                                                    <div className={`w-16 h-16 rounded-md flex items-center justify-center mb-2 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
                                                                        <Users size={32} className={theme === 'dark' ? 'text-neutral-400' : 'text-gray-500'} />
                                                                    </div>
                                                                )}
                                                                <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{opponent.opponent.name}</span>
                                                            </div>
                                                        ))}
                                                        
                                                        {/* Marcador o VS */}
                                                        <div className="flex items-center justify-center">
                                                            {match.results && match.results.length >= 2 ? (
                                                                <div className="flex items-center">
                                                                    <span className={`text-2xl font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>{match.results[0].score}</span>
                                                                    <span className={`mx-2 text-xl ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>-</span>
                                                                    <span className={`text-2xl font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>{match.results[1].score}</span>
                                                                </div>
                                                            ) : (
                                                                <span className={`text-xl font-bold ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>VS</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                        <div className="flex items-center">
                                                            <Clock size={18} className={`mr-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                                                            <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                                                                {formatDate(match.begin_at)}
                                                            </span>
                                                        </div>
                                                        
                                                        {match.league && (
                                                            <div className="flex items-center">
                                                                <Trophy size={18} className={`mr-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                                                                <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                                                                    {match.league.name}
                                                                </span>
                                                            </div>
                                                        )}
                                                        
                                                        {match.tournament && (
                                                            <div className="flex items-center col-span-2">
                                                                <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                                                                    <span className="font-semibold">Torneo:</span> {match.tournament.name}
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                                
                                {/* Pagination */}
                                {!loading && !error && matches.length > 0 && (
                                    <div className="flex justify-center mt-6">
                                        <div className="flex items-center space-x-2">
                                            <button 
                                                onClick={handlePrevPage} 
                                                disabled={currentPage <= 1}
                                                className={`px-3 py-1 rounded-md ${currentPage <= 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-neutral-700'} ${theme === 'dark' ? 'bg-neutral-800 text-white' : 'bg-gray-100 text-gray-800'}`}
                                            >
                                                Anterior
                                            </button>
                                            <span className={`px-3 py-1 rounded-md ${theme === 'dark' ? 'bg-neutral-800 text-white' : 'bg-gray-100 text-gray-800'}`}>
                                                {currentPage}
                                            </span>
                                            <button 
                                                onClick={handleNextPage}
                                                className={`px-3 py-1 rounded-md ${theme === 'dark' ? 'bg-neutral-800 text-white hover:bg-neutral-700' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                                            >
                                                Siguiente
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                    
                    {viewMode === 'leagues' && (
                        <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-neutral-900' : 'bg-white'} shadow-md mb-6`}>
                            {leaguesLoading ? (
                                <LoadingState message="Cargando ligas..." />
                            ) : leaguesError ? (
                                <ErrorState message={leaguesError} />
                            ) : leagues.length === 0 ? (
                                <div className="text-center py-8">
                                    <Award className={`w-12 h-12 mx-auto mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                                    <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>No hay ligas disponibles</h3>
                                    <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>No se encontraron ligas para el juego seleccionado. Intenta con otro juego o búsqueda.</p>
                                </div>
                            ) : (
                                <>
                                    <div className="flex justify-between items-center mb-4">
                                        <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-neutral-100' : 'text-gray-800'}`}>
                                            Ligas de {gameDisplayNames[selectedGame]}
                                        </h2>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {leagues.map((league) => (
                                            <div 
                                                key={league.id} 
                                                className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-neutral-800 border-neutral-700' : 'bg-gray-50 border-gray-200'} hover:shadow-md transition-shadow duration-200`}
                                            >
                                                <div className="flex items-center mb-3">
                                                    {league.image_url ? (
                                                        <div className="w-12 h-12 mr-3 overflow-hidden rounded-md">
                                                            <img 
                                                                src={league.image_url} 
                                                                alt={league.name} 
                                                                width={48} 
                                                                height={48} 
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>
                                                    ) : (
                                                        <div className={`w-12 h-12 rounded-md flex items-center justify-center mr-3 ${theme === 'dark' ? 'bg-neutral-700' : 'bg-gray-200'}`}>
                                                            <Award size={24} className={theme === 'dark' ? 'text-neutral-400' : 'text-gray-500'} />
                                                        </div>
                                                    )}
                                                    <div>
                                                        <h3 className={`font-bold ${theme === 'dark' ? 'text-neutral-100' : 'text-gray-800'}`}>{league.name}</h3>
                                                        <p className={`text-sm ${theme === 'dark' ? 'text-neutral-400' : 'text-gray-500'}`}>{league.videogame.name}</p>
                                                    </div>
                                                </div>
                                                
                                                {league.series && league.series.length > 0 && (
                                                    <div className="mt-3">
                                                        <h4 className={`text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-neutral-300' : 'text-gray-600'}`}>Series</h4>
                                                        <div className="flex flex-wrap gap-2">
                                                            {league.series.slice(0, 3).map((serie) => (
                                                                <span 
                                                                    key={serie.id}
                                                                    className={`text-xs px-2 py-1 rounded-full ${theme === 'dark' ? 'bg-neutral-700 text-neutral-300' : 'bg-gray-200 text-gray-700'}`}
                                                                >
                                                                    {serie.full_name || serie.name}
                                                                </span>
                                                            ))}
                                                            {league.series.length > 3 && (
                                                                <span className={`text-xs px-2 py-1 rounded-full ${theme === 'dark' ? 'bg-neutral-700 text-neutral-300' : 'bg-gray-200 text-gray-700'}`}>
                                                                    +{league.series.length - 3} más
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                                
                                                {league.url && (
                                                    <div className="mt-3">
                                                        <a 
                                                            href={league.url} 
                                                            target="_blank" 
                                                            rel="noopener noreferrer"
                                                            className={`text-sm ${theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} hover:underline`}
                                                        >
                                                            Visitar sitio oficial
                                                        </a>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    
                                    {/* Paginación */}
                                    <div className="flex justify-center mt-6">
                                        <div className="flex items-center space-x-2">
                                            <button 
                                                onClick={handlePrevPage} 
                                                disabled={leaguesPage <= 1}
                                                className={`px-3 py-1 rounded-md ${leaguesPage <= 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-neutral-700'} ${theme === 'dark' ? 'bg-neutral-800 text-white' : 'bg-gray-100 text-gray-800'}`}
                                            >
                                                Anterior
                                            </button>
                                            <span className={`px-3 py-1 rounded-md ${theme === 'dark' ? 'bg-neutral-800 text-white' : 'bg-gray-100 text-gray-800'}`}>
                                                {leaguesPage}
                                            </span>
                                            <button 
                                                onClick={handleNextPage}
                                                className={`px-3 py-1 rounded-md ${theme === 'dark' ? 'bg-neutral-800 text-white hover:bg-neutral-700' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                                            >
                                                Siguiente
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </MainLayout>
    );
}
