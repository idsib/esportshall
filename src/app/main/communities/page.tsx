'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { useTheme } from '@/context/theme-context';
import MainLayout from '../components/layout/mainLayout';
import { Plus, Search, TrendingUp, Clock, Star, Users, X, Camera } from 'lucide-react';
import Link from 'next/link';



interface Community {
  id: string;
  name: string;
  icon: string;
  members: number;
  description: string;
  trending: boolean;
  game: string;
}

const games = [
  { id: 'lol', name: 'League of Legends', icon: '/images/games/lol.png' },
  { id: 'valorant', name: 'Valorant', icon: '/images/games/valorant.png' },
  { id: 'cs2', name: 'CS2', icon: '/images/games/cs2.png' },
];

const communities: Community[] = [
  {
    id: 'lol-oficial',
    name: 'League of Legends Oficial',
    icon: '/images/games/lol.png',
    members: 1250000,
    description: 'La comunidad más grande de League of Legends en español. Comparte tus experiencias, estrategias y conecta con otros jugadores.',
    trending: true,
    game: 'lol'
  },
  {
    id: 'lol-estrategias',
    name: 'LoL Estrategias',
    icon: '/images/games/lol.png',
    members: 450000,
    description: 'Comparte y aprende estrategias para mejorar en League of Legends.',
    trending: false,
    game: 'lol'
  },
  {
    id: 'valorant-oficial',
    name: 'Valorant Oficial',
    icon: '/images/games/valorant.png',
    members: 980000,
    description: 'Comunidad dedicada a Valorant. Discute tácticas, comparte clips y encuentra compañeros de equipo.',
    trending: true,
    game: 'valorant'
  },
  {
    id: 'valorant-agentes',
    name: 'Agentes Valorant',
    icon: '/images/games/valorant.png',
    members: 320000,
    description: 'Todo sobre los agentes de Valorant: guías, consejos y estrategias.',
    trending: false,
    game: 'valorant'
  },
  {
    id: 'cs2-oficial',
    name: 'CS2 Oficial',
    icon: '/images/games/cs2.png',
    members: 850000,
    description: 'La comunidad definitiva de CS2. Desde estrategias hasta skins, todo lo que necesitas saber sobre el juego.',
    trending: false,
    game: 'cs2'
  },
  {
    id: 'cs2-competitivo',
    name: 'CS2 Competitivo',
    icon: '/images/games/cs2.png',
    members: 290000,
    description: 'Enfocado en el juego competitivo de CS2. Estrategias, torneos y más.',
    trending: true,
    game: 'cs2'
  }
];

export default function CommunitiesPage() {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGame, setSelectedGame] = useState('');
  const [showCreateCommunity, setShowCreateCommunity] = useState(false);
  const [showGameSelection, setShowGameSelection] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Form state for creating a new community
  const [newCommunity, setNewCommunity] = useState({
    name: '',
    description: '',
    game: '',
    icon: ''
  });
  
  // Preview image for community icon
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  
  // Function to handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
        setNewCommunity({ ...newCommunity, icon: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Function to handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewCommunity({ ...newCommunity, [name]: value });
  };
  
  // Function to handle game selection
  const handleGameSelect = (gameId: string) => {
    setSelectedGame(gameId);
    setShowGameSelection(false);
    setShowCreateCommunity(true);
    setNewCommunity({ ...newCommunity, game: gameId });
  };
  
  // Function to start the community creation process
  const startCreateCommunity = () => {
    setShowGameSelection(true);
  };
  
  // Function to create a new community
  const handleCreateCommunity = () => {
    // Validate form
    if (!newCommunity.name || !newCommunity.description || !newCommunity.game) {
      alert('Por favor completa todos los campos');
      return;
    }
    
    // Create a new community object
    const community: Community = {
      id: `${newCommunity.game}-${Date.now()}`,
      name: newCommunity.name,
      icon: newCommunity.icon || games.find(g => g.id === newCommunity.game)?.icon || '',
      members: 1, // Starting with the creator
      description: newCommunity.description,
      trending: false,
      game: newCommunity.game
    };
    
    // Add the new community to the list (in a real app, this would be an API call)
    communities.push(community);
    
    // Reset form and close modal
    setNewCommunity({
      name: '',
      description: '',
      game: '',
      icon: ''
    });
    setPreviewImage(null);
    setShowCreateCommunity(false);
  };

  // Filter communities based on search and selected game
  const filteredCommunities = communities.filter(community => {
    const matchesSearch = community.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGame = selectedGame === '' || community.game === selectedGame;
    return matchesSearch && matchesGame;
  });
  
  // Group communities by game
  const communitiesByGame = selectedGame ? filteredCommunities : games.map(game => ({
    ...game,
    communities: filteredCommunities.filter(community => community.game === game.id)
  }));

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
              onClick={startCreateCommunity}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-brand-yellow hover:bg-brand-yellow/90 text-black font-semibold transition-colors"
            >
              <Plus size={18} />
              <span>Crear comunidad</span>
            </button>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Game selection or Communities list */}
            {selectedGame ? (
              // Show communities for selected game
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <img 
                      src={games.find(g => g.id === selectedGame)?.icon} 
                      alt={games.find(g => g.id === selectedGame)?.name}
                      className="w-8 h-8 object-cover rounded-md"
                    />
                    <h2 className={`text-xl font-bold ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>{games.find(g => g.id === selectedGame)?.name}</h2>
                  </div>
                  <button 
                    onClick={() => setSelectedGame('')}
                    className={`px-3 py-1 rounded-lg text-sm ${
                      theme === 'dark' ? 'bg-neutral-800 text-gray-300' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    Volver a juegos
                  </button>
                </div>
                
                {/* Communities Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredCommunities.map((community) => (
                    <div 
                      key={community.id} 
                      className={`p-6 rounded-xl transition-transform hover:scale-[1.02] ${
                        theme === 'dark' ? 'bg-neutral-800' : 'bg-white shadow-sm'
                      }`}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={community.icon}
                            alt={community.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className={`font-semibold ${
                              theme === 'dark' ? 'text-white' : 'text-gray-900'
                            }`}>{community.name}</h3>
                            {community.trending && (
                              <span className="px-2 py-0.5 rounded-full bg-brand-yellow/10 text-brand-yellow text-xs font-medium">
                                Trending
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-1 mt-1">
                            <Users size={14} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} />
                            <span className={`text-xs ${
                              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                            }`}>{community.members.toLocaleString()} miembros</span>
                          </div>
                        </div>
                      </div>
                      <p className={`text-sm mb-4 line-clamp-2 ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}>{community.description}</p>
                      <button 
                        className={`w-full py-2 rounded-lg text-sm font-medium ${
                          theme === 'dark' ? 'bg-neutral-800 text-gray-200 hover:bg-neutral-700' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                      >
                        Unirse
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              // Show game selection
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {games.map(game => {
                  const gameCommunitiesCount = communities.filter(c => c.game === game.id).length;
                  return (
                    <div 
                      key={game.id} 
                      onClick={() => setSelectedGame(game.id)}
                      className={`p-6 rounded-xl cursor-pointer transition-transform hover:scale-[1.02] ${theme === 'dark' ? 'bg-neutral-900' : 'bg-white shadow-sm'}`}
                    >
                      <div className="aspect-video relative mb-4 rounded-lg overflow-hidden">
                        <img 
                          src={game.icon} 
                          alt={game.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                          <h3 className="text-white text-xl font-bold">{game.name}</h3>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Users size={16} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} />
                          <span className={`text-sm ${
                            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                          }`}>{gameCommunitiesCount} comunidades</span>
                        </div>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleGameSelect(game.id);
                          }}
                          className="px-3 py-1 rounded-lg text-xs font-medium bg-brand-yellow text-black hover:bg-brand-yellow/90"
                        >
                          Crear comunidad
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Game Selection Modal */}
      {showGameSelection && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className={`relative w-full max-w-lg p-6 rounded-xl ${theme === 'dark' ? 'bg-neutral-800' : 'bg-white'}`}>
            <button 
              onClick={() => {
                setShowGameSelection(false);
              }}
              className={`absolute top-4 right-4 p-1 rounded-full ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}
            >
              <X size={20} />
            </button>
            
            <h2 className={`text-xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Selecciona un juego para tu comunidad
            </h2>
            
            <div className="grid grid-cols-1 gap-4">
              {games.map(game => (
                <div 
                  key={game.id}
                  onClick={() => handleGameSelect(game.id)}
                  className={`p-4 rounded-xl cursor-pointer flex items-center gap-4 transition-colors ${theme === 'dark' ? 'bg-neutral-700 hover:bg-neutral-600' : 'bg-gray-100 hover:bg-gray-200'}`}
                >
                  <div className="w-16 h-16 rounded-lg overflow-hidden">
                    <img src={game.icon} alt={game.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {game.name}
                    </h3>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      {communities.filter(c => c.game === game.id).length} comunidades activas
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Create Community Modal */}
      {showCreateCommunity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className={`relative w-full max-w-lg p-6 rounded-xl ${theme === 'dark' ? 'bg-neutral-800' : 'bg-white'}`}>
            <button 
              onClick={() => {
                setShowCreateCommunity(false);
                setPreviewImage(null);
                setNewCommunity({ name: '', description: '', game: '', icon: '' });
              }}
              className={`absolute top-4 right-4 p-1 rounded-full ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}
            >
              <X size={20} />
            </button>
            
            <h2 className={`text-xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Crear nueva comunidad
            </h2>
            
            <div className="space-y-4">
              {/* Selected Game */}
              <div className={`flex items-center gap-3 mb-6 p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
                <img 
                  src={games.find(g => g.id === newCommunity.game)?.icon} 
                  alt={games.find(g => g.id === newCommunity.game)?.name}
                  className="w-10 h-10 rounded-md object-cover"
                />
                <div>
                  <h3 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {games.find(g => g.id === newCommunity.game)?.name}
                  </h3>
                  <button 
                    onClick={() => {
                      setShowCreateCommunity(false);
                      setShowGameSelection(true);
                    }}
                    className="text-xs text-brand-yellow hover:underline"
                  >
                    Cambiar juego
                  </button>
                </div>
              </div>
              
              {/* Community Icon */}
              <div className="flex flex-col items-center mb-6">
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className={`relative w-24 h-24 rounded-full overflow-hidden cursor-pointer flex items-center justify-center ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}
                >
                  {previewImage ? (
                    <img src={previewImage} alt="Community icon" className="w-full h-full object-cover" />
                  ) : (
                    <Camera size={32} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} />
                  )}
                </div>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleImageChange} 
                  accept="image/*" 
                  className="hidden" 
                />
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className={`mt-2 text-sm ${theme === 'dark' ? 'text-brand-yellow' : 'text-brand-yellow'}`}
                >
                  Subir imagen
                </button>
              </div>
              
              {/* Community Name */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Nombre de la comunidad
                </label>
                <input 
                  type="text" 
                  name="name"
                  value={newCommunity.name}
                  onChange={handleInputChange}
                  placeholder="Nombre de tu comunidad"
                  className={`w-full px-4 py-2 rounded-lg border ${theme === 'dark' ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-500' : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'}`}
                  required
                />
              </div>
              
              {/* Community Description */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Descripción
                </label>
                <textarea 
                  name="description"
                  value={newCommunity.description}
                  onChange={handleInputChange}
                  placeholder="Describe tu comunidad"
                  rows={4}
                  className={`w-full px-4 py-2 rounded-lg border ${theme === 'dark' ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-500' : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'}`}
                  required
                />
              </div>
              
              {/* Submit Button */}
              <div className="mt-6">
                <button 
                  onClick={handleCreateCommunity}
                  className="w-full py-2 px-4 bg-brand-yellow hover:bg-brand-yellow/90 text-black font-semibold rounded-lg transition-colors"
                >
                  Crear comunidad
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
} 