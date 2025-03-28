'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useTheme } from '../../context/theme-context';
import EditProfileModal from './components/edit-profile-modal';
import MainLayout from '../components/layout/mainLayout'
import { Twitter, Instagram, Twitch, MapPin, Link as LinkIcon, Calendar, Trophy, Users, Settings } from 'lucide-react';

export default function ProfilePage() {
  const { data: session } = useSession();
  const { theme } = useTheme();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [profileData, setProfileData] = useState({
    name: session?.user?.name || '',
    username: session?.user?.email?.split('@')[0] || '',
    bio: 'Jugador de esports apasionado. Compitiendo en torneos y mejorando cada día.',
    location: 'España',
    website: 'esportshall.com',
    twitter: '',
    instagram: '',
    twitch: '',
  });

  const handleSaveProfile = (data: any) => {
    setProfileData(data);
    setIsEditModalOpen(false);
  };

  return (
    <MainLayout>
      <div className="flex-1 overflow-y-auto">
        {/* Content */}
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
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full ring-4 ring-[#1c1c1c] bg-[#1c1c1c] overflow-hidden">
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
                <h2 className="text-xl sm:text-2xl font-bold">{profileData.name}</h2>
                <p className="text-gray-500">@{profileData.username}</p>
                <p className="mt-2 text-sm sm:text-base">{profileData.bio}</p>
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
                  {profileData.twitter && (
                    <a href={`https://twitter.com/${profileData.twitter}`} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-brand-yellow">
                      <Twitter size={20} />
                    </a>
                  )}
                  {profileData.instagram && (
                    <a href={`https://instagram.com/${profileData.instagram}`} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-brand-yellow">
                      <Instagram size={20} />
                    </a>
                  )}
                  {profileData.twitch && (
                    <a href={`https://twitch.tv/${profileData.twitch}`} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-brand-yellow">
                      <Twitch size={20} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 dark:border-dark-300 mb-6">
            <nav className="flex space-x-8 overflow-x-auto">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'overview'
                    ? 'border-brand-yellow text-brand-yellow'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                Resumen
              </button>
              <button
                onClick={() => setActiveTab('tournaments')}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'tournaments'
                    ? 'border-brand-yellow text-brand-yellow'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                Torneos
              </button>
              <button
                onClick={() => setActiveTab('teams')}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'teams'
                    ? 'border-brand-yellow text-brand-yellow'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                Equipos
              </button>            </nav>
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={`p-6 rounded-xl ${
                  theme === 'dark' ? 'bg-dark-200' : 'bg-white'
                }`}>
                  <h3 className="text-lg font-semibold mb-4">Próximos torneos</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-brand-yellow/10 rounded-lg">
                        <Calendar className="text-brand-yellow" size={20} />
                      </div>
                      <div>
                        <p className="font-medium">Torneo Nacional de League of Legends</p>
                        <p className="text-sm text-gray-500">15 de Abril, 2024</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-brand-yellow/10 rounded-lg">
                        <Calendar className="text-brand-yellow" size={20} />
                      </div>
                      <div>
                        <p className="font-medium">Campeonato Regional de Valorant</p>
                        <p className="text-sm text-gray-500">22 de Abril, 2024</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`p-6 rounded-xl ${
                  theme === 'dark' ? 'bg-dark-200' : 'bg-white'
                }`}>
                  <h3 className="text-lg font-semibold mb-4">Estadísticas</h3>
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

            {activeTab === 'tournaments' && (
              <div className={`p-6 rounded-xl ${
                theme === 'dark' ? 'bg-dark-200' : 'bg-white'
              }`}>
                <h3 className="text-lg font-semibold mb-4">Historial de torneos</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-dark-300">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-brand-yellow/10 rounded-lg">
                        <Trophy className="text-brand-yellow" size={20} />
                      </div>
                      <div>
                        <p className="font-medium">Torneo Nacional de League of Legends</p>
                        <p className="text-sm text-gray-500">1º lugar - 15 de Abril, 2024</p>
                      </div>
                    </div>
                    <div className="text-brand-yellow font-semibold">Ganador</div>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-dark-300">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-brand-yellow/10 rounded-lg">
                        <Trophy className="text-brand-yellow" size={20} />
                      </div>
                      <div>
                        <p className="font-medium">Campeonato Regional de Valorant</p>
                        <p className="text-sm text-gray-500">3º lugar - 8 de Abril, 2024</p>
                      </div>
                    </div>
                    <div className="text-gray-500">Tercer lugar</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'teams' && (
              <div className={`p-6 rounded-xl ${
                theme === 'dark' ? 'bg-dark-200' : 'bg-white'
              }`}>
                <h3 className="text-lg font-semibold mb-4">Mis equipos</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-dark-300">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-brand-yellow/10 rounded-lg">
                        <Users className="text-brand-yellow" size={20} />
                      </div>
                      <div>
                        <p className="font-medium">Team EsportsPro</p>
                        <p className="text-sm text-gray-500">Capitán</p>
                      </div>
                    </div>
                    <button className="text-brand-yellow hover:text-yellow-500">Ver equipo</button>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-dark-300">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-brand-yellow/10 rounded-lg">
                        <Users className="text-brand-yellow" size={20} />
                      </div>
                      <div>
                        <p className="font-medium">Gaming Elite</p>
                        <p className="text-sm text-gray-500">Miembro</p>
                      </div>
                    </div>
                    <button className="text-brand-yellow hover:text-yellow-500">Ver equipo</button>
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
      />
    </MainLayout>
  );
} 