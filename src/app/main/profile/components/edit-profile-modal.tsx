'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { X, Camera } from 'lucide-react';
import { useTheme } from '../../../../app/context/theme-context';
import { useSession } from 'next-auth/react';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
}

export default function EditProfileModal({ isOpen, onClose, onSave }: EditProfileModalProps) {
  const { theme } = useTheme();
  const { data: session } = useSession();
  const [profileImage, setProfileImage] = useState(session?.user?.image || '/images/esportshall.png');
  const [headerImage, setHeaderImage] = useState('/images/default-header.jpg');
  const profileInputRef = useRef<HTMLInputElement>(null);
  const headerInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    name: session?.user?.name || '',
    username: session?.user?.email?.split('@')[0] || '',
    bio: 'Jugador de esports apasionado. Compitiendo en torneos y mejorando cada día.',
    location: 'España',
    website: 'esportshall.com',
    twitter: '',
    instagram: '',
    twitch: '',
  });

  const handleProfileImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleHeaderImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setHeaderImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className={`w-full max-w-2xl h-[42rem] rounded-2xl overflow-hidden flex flex-col ${
        theme === 'dark' ? 'bg-dark-200' : 'bg-white'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-dark-300">
          <div className="flex items-center gap-6">
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 dark:hover:bg-dark-300 rounded-full"
            >
              <X size={20} className="text-gray-500" />
            </button>
            <h2 className="text-xl font-bold">Editar perfil</h2>
          </div>
          <button
            onClick={() => onSave(formData)}
            className="px-4 py-1.5 rounded-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold text-sm transition-colors"
          >
            Guardar
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="relative">
            {/* Header Image */}
            <div className="relative h-48 bg-gray-100 dark:bg-dark-300">
              <Image
                src={headerImage}
                alt="Header"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity">
                <button
                  onClick={() => headerInputRef.current?.click()}
                  className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70"
                >
                  <Camera size={18} />
                </button>
              </div>
              <input
                type="file"
                ref={headerInputRef}
                onChange={handleHeaderImageChange}
                accept="image/*"
                className="hidden"
              />
            </div>

            {/* Profile Photo */}
            <div className="absolute -bottom-16 left-6">
              <div className="relative group">
                <div className="w-32 h-32 rounded-full border-4 border-white dark:border-dark-200 overflow-hidden">
                  <Image
                    src={profileImage}
                    alt="Profile"
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div 
                  onClick={() => profileInputRef.current?.click()}
                  className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity"
                >
                  <Camera size={24} className="text-white" />
                </div>
                <input
                  type="file"
                  ref={profileInputRef}
                  onChange={handleProfileImageChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="p-6 pt-24 space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Nombre
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Tu nombre completo"
                className={`w-full p-3 rounded-lg border text-sm ${
                  theme === 'dark'
                    ? 'bg-dark-300 border-dark-300 text-white placeholder-gray-500'
                    : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'
                }`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Nombre de usuario
              </label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                placeholder="@username"
                className={`w-full p-3 rounded-lg border text-sm ${
                  theme === 'dark'
                    ? 'bg-dark-300 border-dark-300 text-white placeholder-gray-500'
                    : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'
                }`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Biografía
              </label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="Cuéntanos sobre ti"
                rows={4}
                className={`w-full p-3 rounded-lg border text-sm ${
                  theme === 'dark'
                    ? 'bg-dark-300 border-dark-300 text-white placeholder-gray-500'
                    : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'
                }`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Ubicación
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="¿Dónde te encuentras?"
                className={`w-full p-3 rounded-lg border text-sm ${
                  theme === 'dark'
                    ? 'bg-dark-300 border-dark-300 text-white placeholder-gray-500'
                    : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'
                }`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Sitio web
              </label>
              <input
                type="text"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                placeholder="Tu sitio web personal"
                className={`w-full p-3 rounded-lg border text-sm ${
                  theme === 'dark'
                    ? 'bg-dark-300 border-dark-300 text-white placeholder-gray-500'
                    : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'
                }`}
              />
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium mb-2">
                Redes sociales
              </label>
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                <input
                  type="text"
                  placeholder="X (Twitter)"
                  value={formData.twitter}
                  onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                  className={`w-full p-3 pl-10 rounded-lg border text-sm ${
                    theme === 'dark'
                      ? 'bg-dark-300 border-dark-300 text-white placeholder-gray-500'
                      : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'
                  }`}
                />
              </div>

              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.897 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.897-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                </svg>
                <input
                  type="text"
                  placeholder="Instagram"
                  value={formData.instagram}
                  onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                  className={`w-full p-3 pl-10 rounded-lg border text-sm ${
                    theme === 'dark'
                      ? 'bg-dark-300 border-dark-300 text-white placeholder-gray-500'
                      : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'
                  }`}
                />
              </div>

              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
                </svg>
                <input
                  type="text"
                  placeholder="Twitch"
                  value={formData.twitch}
                  onChange={(e) => setFormData({ ...formData, twitch: e.target.value })}
                  className={`w-full p-3 pl-10 rounded-lg border text-sm ${
                    theme === 'dark'
                      ? 'bg-dark-300 border-dark-300 text-white placeholder-gray-500'
                      : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'
                  }`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 