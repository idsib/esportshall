'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useTheme } from '@/context/theme-context';
import EditProfileModal from './components/edit-profile-modal';
import MainLayout from '../components/layout/mainLayout'
import { Twitter, Instagram, Twitch, MapPin, Link as LinkIcon, Calendar, Trophy, Users, Settings, MessageCircle, Heart, Share2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const { data: session } = useSession();
  const { theme } = useTheme();
  const router = useRouter();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [profileData, setProfileData] = useState({
    name: session?.user?.name || 'Usuario',
    username: session?.user?.email?.split('@')[0] || 'usuario',
    bio: 'Jugador de esports apasionado. Compitiendo en torneos y mejorando cada día.',
    location: 'España',
    website: 'esportshall.com',
    socialLinks: {
      x: '',
      instagram: '',
      twitch: ''
    },
    favoriteCommunity: 'lol',
  });

  const [posts, setPosts] = useState([
    {
      id: 1,
      content: '¡Acabo de ganar mi primer torneo de League of Legends! 🎮🏆 #EsportsHall',
      timestamp: '2024-03-15T14:30:00Z',
      likes: 125,
      comments: 23,
      shares: 12,
      community: 'lol'
    },
    {
      id: 2,
      content: 'Preparándome para el próximo torneo de Valorant. ¿Alguien quiere practicar? 🔫 #Valorant #EsportsHall',
      timestamp: '2024-03-14T09:15:00Z',
      likes: 89,
      comments: 15,
      shares: 8,
      community: 'valorant'
    }
  ]);

  const communities = [
    { id: 'lol', name: 'League of Legends', icon: 'https://cdn.communitydragon.org/latest/champion/1/square' },
    { id: 'valorant', name: 'Valorant', icon: 'https://media.valorant-api.com/agents/5f8d3a7f-467b-97f3-062c-13acf203c006/displayicon.png' },
    { id: 'cs2', name: 'CS2', icon: '/cs2.png' }
  ];

  useEffect(() => {
    if (!session) {
      router.push('/auth/login');
    }
  }, [session, router]);

  if (!session) {
    return null;
  }

  const handleSaveProfile = (data: any) => {
    setProfileData(data);
    setIsEditModalOpen(false);
  };

  const formatTimeAgo = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Ahora';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`;
    return `${Math.floor(diffInSeconds / 86400)}d`;
  };

  return (
    <MainLayout>
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 py-3">
          {/* Profile Header */}
          <div className="relative mb-4">
            {/* Cover Photo */}
            <div className="h-32 sm:h-40 rounded-lg overflow-hidden bg-gradient-to-r from-brand-yellow to-yellow-600">
              {/* Edit Profile Button */}
              <div className="absolute top-4 right-4">
                <button
                  onClick={() => setIsEditModalOpen(true)}
                  className="px-4 py-1.5 rounded-full bg-black/50 hover:bg-black/70 text-white font-semibold text-sm border border-white/20 transition-colors"
                >
                  Editar perfil
                </button>
              </div>
            </div>

            {/* Profile Photo */}
            <div className="absolute top-20 sm:top-24 left-4 sm:left-8">
              <div className={`w-24 h-24 sm:w-32 sm:h-32 rounded-full ring-4 ${theme === 'dark' ? 'ring-[#1c1c1c] bg-[#1c1c1c]' : 'ring-white bg-white'
                } overflow-hidden`}>
                <Image
                  src={session?.user?.image || '/images/esportshall.png'}
                  alt="Profile"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </div>

            {/* Profile Info */}
            <div className="pt-14 sm:pt-16 px-4 sm:px-8">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <h2 className={`text-xl sm:text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>{profileData.name}</h2>
                  {profileData.favoriteCommunity && (
                    <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-brand-yellow/10">
                      <div className="w-4 h-4 relative">
                        {profileData.favoriteCommunity === 'cs2' ? (
                          <Image
                            src="/cs2.png"
                            alt="CS2"
                            width={16}
                            height={16}
                            className="object-contain rounded"
                          />
                        ) : (
                          <img
                            src={communities.find(c => c.id === profileData.favoriteCommunity)?.icon || ''}
                            alt="Comunidad favorita"
                            className="w-full h-full object-cover rounded"
                          />
                        )}
                      </div>
                      <span className="text-xs font-medium text-brand-yellow">
                        {communities.find(c => c.id === profileData.favoriteCommunity)?.name}
                      </span>
                    </div>
                  )}
                </div>
                <p className="text-gray-500">@{profileData.username}</p>
                <p className={`mt-2 text-sm sm:text-base ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>{profileData.bio}</p>
                <div className="flex flex-wrap items-center gap-4 mt-2 text-gray-500">
                  <div className="flex items-center gap-1">
                    <MapPin size={16} />
                    <span>{profileData.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <LinkIcon size={16} />
                    <a href={`https://${profileData.website}`} target="_blank" rel="noopener noreferrer" className="text-brand-yellow hover:underline">
                      {profileData.website}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-2">
                  {profileData.socialLinks.x && (
                    <a href={`https://twitter.com/${profileData.socialLinks.x}`} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-brand-yellow">
                      <Twitter size={20} />
                    </a>
                  )}
                  {profileData.socialLinks.instagram && (
                    <a href={`https://instagram.com/${profileData.socialLinks.instagram}`} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-brand-yellow">
                      <Instagram size={20} />
                    </a>
                  )}
                  {profileData.socialLinks.twitch && (
                    <a href={`https://twitch.tv/${profileData.socialLinks.twitch}`} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-brand-yellow">
                      <Twitch size={20} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className={`border-b ${theme === 'dark' ? 'border-dark-300' : 'border-gray-200'
            } mb-6`}>
            <nav className="flex space-x-8 overflow-x-auto">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'overview'
                    ? 'border-brand-yellow text-brand-yellow'
                    : `border-transparent ${theme === 'dark'
                      ? 'text-gray-400 hover:text-gray-300'
                      : 'text-gray-500 hover:text-gray-700'
                    } hover:border-gray-300`
                  }`}
              >
                Resumen
              </button>
              <button
                onClick={() => setActiveTab('posts')}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'posts'
                    ? 'border-brand-yellow text-brand-yellow'
                    : `border-transparent ${theme === 'dark'
                      ? 'text-gray-400 hover:text-gray-300'
                      : 'text-gray-500 hover:text-gray-700'
                    } hover:border-gray-300`
                  }`}
              >
                Publicaciones
              </button>
              <button
                onClick={() => setActiveTab('tournaments')}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'tournaments'
                    ? 'border-brand-yellow text-brand-yellow'
                    : `border-transparent ${theme === 'dark'
                      ? 'text-gray-400 hover:text-gray-300'
                      : 'text-gray-500 hover:text-gray-700'
                    } hover:border-gray-300`
                  }`}
              >
                Torneos
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            {activeTab === 'posts' && (
              <div className="space-y-4">
                {posts.map(post => (
                  <div key={post.id} className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-dark-200' : 'bg-white shadow-sm'
                    }`}>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <Image
                          src={session?.user?.image || '/images/esportshall.png'}
                          alt="Profile"
                          width={40}
                          height={40}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                            }`}>{profileData.name}</span>
                          <span className="text-gray-500">@{profileData.username}</span>
                          <span className="text-gray-500">·</span>
                          <span className="text-gray-500">{formatTimeAgo(post.timestamp)}</span>
                          {post.community && (
                            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-brand-yellow/10">
                              <div className="w-3 h-3 relative">
                                {post.community === 'cs2' ? (
                                  <Image
                                    src="/cs2.png"
                                    alt="CS2"
                                    width={12}
                                    height={12}
                                    className="object-contain rounded"
                                  />
                                ) : (
                                  <img
                                    src={communities.find(c => c.id === post.community)?.icon || ''}
                                    alt="Comunidad"
                                    className="w-full h-full object-cover rounded"
                                  />
                                )}
                              </div>
                              <span className="text-xs font-medium text-brand-yellow">
                                {communities.find(c => c.id === post.community)?.name}
                              </span>
                            </div>
                          )}
                        </div>
                        <p className={`mt-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                          }`}>{post.content}</p>
                        <div className="flex items-center gap-6 mt-4 text-gray-500">
                          <button className="flex items-center gap-1 hover:text-brand-yellow">
                            <MessageCircle size={18} />
                            <span className="text-sm">{post.comments}</span>
                          </button>
                          <button className="flex items-center gap-1 hover:text-brand-yellow">
                            <Heart size={18} />
                            <span className="text-sm">{post.likes}</span>
                          </button>
                          <button className="flex items-center gap-1 hover:text-brand-yellow">
                            <Share2 size={18} />
                            <span className="text-sm">{post.shares}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-dark-200' : 'bg-white shadow-sm'
                  }`}>
                  <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>Próximos torneos</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-brand-yellow/10 rounded-lg">
                        <Calendar className="text-brand-yellow" size={20} />
                      </div>
                      <div>
                        <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                          }`}>Torneo Nacional de League of Legends</p>
                        <p className="text-sm text-gray-500">15 de Abril, 2024</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-brand-yellow/10 rounded-lg">
                        <Calendar className="text-brand-yellow" size={20} />
                      </div>
                      <div>
                        <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                          }`}>Campeonato Regional de Valorant</p>
                        <p className="text-sm text-gray-500">22 de Abril, 2024</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-dark-200' : 'bg-white shadow-sm'
                  }`}>
                  <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>Estadísticas</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-brand-yellow">12</div>
                      <div className="text-sm text-gray-500">Torneos jugados</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-brand-yellow">3</div>
                      <div className="text-sm text-gray-500">Torneos ganados</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-brand-yellow">85%</div>
                      <div className="text-sm text-gray-500">Win rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-brand-yellow">4.5</div>
                      <div className="text-sm text-gray-500">K/D ratio</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveProfile}
        initialData={profileData}
        communities={communities}
      />
    </MainLayout>
  );
} 