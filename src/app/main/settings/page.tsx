"use client";

import { useState } from 'react';
import { usePathname, useRouter } from "next/navigation";
import MainLayout from '../components/layout/mainLayout';
import { Footer } from '@/app/components/layout/footer';
import { useTheme } from '@/context/theme-context';
import { signOut } from "next-auth/react";
import { 
  User, 
  Lock, 
  Bell, 
  Eye, 
  EyeOff, 
  Globe, 
  Moon, 
  Sun, 
  Trash2, 
  Save, 
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react';

export default function SettingsPage() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  
  // Estados para los formularios
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState('');
  const [deletePassword, setDeletePassword] = useState('');
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  
  // Estados para las notificaciones
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [language, setLanguage] = useState('es');
  
  // Estados para mensajes de feedback
  const [passwordMessage, setPasswordMessage] = useState({ type: '', message: '' });
  const [deleteMessage, setDeleteMessage] = useState({ type: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  
  // Manejadores de eventos
  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setPasswordMessage({ type: '', message: '' });
    
    // Validaciones básicas
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordMessage({ type: 'error', message: 'Todos los campos son obligatorios' });
      setIsLoading(false);
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setPasswordMessage({ type: 'error', message: 'Las contraseñas nuevas no coinciden' });
      setIsLoading(false);
      return;
    }
    
    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Error al cambiar la contraseña');
      }
      
      setPasswordMessage({ type: 'success', message: 'Contraseña actualizada correctamente' });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error: any) {
      setPasswordMessage({ type: 'error', message: error.message });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDeleteAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setDeleteMessage({ type: '', message: '' });
    
    // Validación básica
    if (deleteConfirm !== 'ELIMINAR') {
      setDeleteMessage({ type: 'error', message: 'Por favor, escribe ELIMINAR para confirmar' });
      setIsLoading(false);
      return;
    }
    
    try {
      const response = await fetch('/api/auth/delete-account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          confirmation: deleteConfirm,
          password: deletePassword
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Error al eliminar la cuenta');
      }
      
      setDeleteMessage({ type: 'success', message: 'Cuenta eliminada correctamente' });
      setDeleteConfirm('');
      
      // Cerrar sesión después de eliminar la cuenta
      setTimeout(() => {
        signOut({ callbackUrl: '/auth/login' });
      }, 2000);
    } catch (error: any) {
      setDeleteMessage({ type: 'error', message: error.message });
    } finally {
      setIsLoading(false);
    }
  };
  
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  
  return (
    <div>
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <h1 className={`text-3xl font-bold mb-6 text-center ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
            CONFIGURACIÓN
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sidebar de navegación */}
            <div className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-white'} p-6 rounded-lg shadow-md h-fit sticky top-24 border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-100'}`}>
              <nav>
                <ul className="space-y-4">
                  <li>
                    <a href="#account" className={`flex items-center gap-3 p-3 rounded-lg ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
                      <User size={20} className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} />
                      <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}>Cuenta</span>
                    </a>
                  </li>
                  <li>
                    <a href="#security" className={`flex items-center gap-3 p-3 rounded-lg ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
                      <Lock size={20} className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} />
                      <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}>Seguridad</span>
                    </a>
                  </li>
                  <li>
                    <a href="#notifications" className={`flex items-center gap-3 p-3 rounded-lg ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
                      <Bell size={20} className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} />
                      <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}>Notificaciones</span>
                    </a>
                  </li>
                  <li>
                    <a href="#appearance" className={`flex items-center gap-3 p-3 rounded-lg ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
                      <Moon size={20} className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} />
                      <span className={theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}>Apariencia</span>
                    </a>
                  </li>
                  <li>
                    <a href="#danger" className={`flex items-center gap-3 p-3 rounded-lg ${theme === 'dark' ? 'hover:bg-gray-800 text-red-400' : 'hover:bg-gray-100 text-red-600'}`}>
                      <AlertTriangle size={20} />
                      <span>Zona de peligro</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
            
            {/* Contenido principal */}
            <div className="lg:col-span-2 space-y-8">
              {/* Sección de cuenta */}
              <section id="account" className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-white'} p-6 rounded-lg shadow-md`}>
                <h2 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                  Información de la cuenta
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className={`block mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      Nombre de usuario
                    </label>
                    <input 
                      type="text" 
                      value="usuario_esports" 
                      disabled 
                      className={`w-full px-4 py-2 rounded-lg border ${
                        theme === 'dark' 
                          ? 'bg-gray-800 border-gray-700 text-gray-300' 
                          : 'bg-gray-100 border-gray-300 text-gray-800'
                      }`}
                    />
                    <p className={`mt-1 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      El nombre de usuario no se puede cambiar
                    </p>
                  </div>
                  
                  <div>
                    <label className={`block mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      Correo electrónico
                    </label>
                    <input 
                      type="email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tu@email.com" 
                      className={`w-full px-4 py-2 rounded-lg border ${
                        theme === 'dark' 
                          ? 'bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-500' 
                          : 'bg-white border-gray-300 text-gray-800 placeholder-gray-400'
                      }`}
                    />
                  </div>
                  
                  <button 
                    className={`px-4 py-2 rounded-md flex items-center gap-2 ${
                      theme === 'dark' 
                        ? 'bg-gray-800 text-gray-100 hover:bg-gray-700' 
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    <Save size={18} />
                    Guardar cambios
                  </button>
                </div>
              </section>
              
              {/* Sección de seguridad */}
              <section id="security" className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-white'} p-6 rounded-lg shadow-md`}>
                <h2 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                  Cambiar contraseña
                </h2>
                <form onSubmit={handlePasswordChange} className="space-y-4">
                  {passwordMessage.message && (
                    <div className={`p-3 rounded-md flex items-center gap-2 ${passwordMessage.type === 'error' ? (theme === 'dark' ? 'bg-red-900/50 text-red-200' : 'bg-red-100 text-red-800') : (theme === 'dark' ? 'bg-green-900/50 text-green-200' : 'bg-green-100 text-green-800')}`}>
                      {passwordMessage.type === 'error' ? <XCircle size={18} /> : <CheckCircle size={18} />}
                      {passwordMessage.message}
                    </div>
                  )}
                  
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      Contraseña actual
                    </label>
                    <div className="relative">
                      <input 
                        type={showPassword ? "text" : "password"} 
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className={`w-full px-4 py-2 rounded-lg border ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-gray-100' : 'bg-white border-gray-300 text-gray-800'}`}
                      />
                      <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-2.5 text-gray-400"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      Nueva contraseña
                    </label>
                    <input 
                      type={showPassword ? "text" : "password"} 
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className={`w-full px-4 py-2 rounded-lg border ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-gray-100' : 'bg-white border-gray-300 text-gray-800'}`}
                    />
                  </div>
                  
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      Confirmar nueva contraseña
                    </label>
                    <input 
                      type={showPassword ? "text" : "password"} 
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={`w-full px-4 py-2 rounded-lg border ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-gray-100' : 'bg-white border-gray-300 text-gray-800'}`}
                    />
                  </div>
                  
                  <button 
                    type="submit"
                    disabled={isLoading}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md ${theme === 'dark' ? 'bg-gray-800 text-gray-100 hover:bg-gray-700' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'} ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    <Save size={18} />
                    {isLoading ? 'Guardando...' : 'Guardar cambios'}
                  </button>
                </form>
              </section>
              
              {/* Sección de notificaciones */}
              <section id="notifications" className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-white'} p-6 rounded-lg shadow-md`}>
                <h2 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                  Preferencias de notificaciones
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className={theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}>Notificaciones por email</h3>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        Recibe actualizaciones sobre torneos y equipos
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={emailNotifications} 
                        onChange={() => setEmailNotifications(!emailNotifications)}
                        className="sr-only peer" 
                      />
                      <div className={`w-11 h-6 rounded-full peer ${
                        theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                      } peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-yellow`}></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className={theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}>Notificaciones push</h3>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        Recibe alertas en tiempo real
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={pushNotifications} 
                        onChange={() => setPushNotifications(!pushNotifications)}
                        className="sr-only peer" 
                      />
                      <div className={`w-11 h-6 rounded-full peer ${
                        theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                      } peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-yellow`}></div>
                    </label>
                  </div>
                </div>
              </section>
              
              {/* Sección de apariencia */}
              <section id="appearance" className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-white'} p-6 rounded-lg shadow-md`}>
                <h2 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                  Apariencia
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className={`mb-3 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>Tema</h3>
                    <div className="flex gap-4">
                      <button 
                        onClick={() => setTheme('light')}
                        className={`flex-1 p-4 rounded-lg border flex flex-col items-center gap-2 ${
                          theme === 'light' 
                            ? 'border-brand-yellow bg-brand-yellow/10' 
                            : theme === 'dark' 
                              ? 'border-gray-700 bg-gray-800 hover:bg-gray-700' 
                              : 'border-gray-200 bg-white hover:bg-gray-50'
                        }`}
                      >
                        <Sun size={24} className={theme === 'light' ? 'text-brand-yellow' : theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} />
                        <span className={theme === 'light' ? 'text-brand-yellow' : theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>Claro</span>
                      </button>
                      
                      <button 
                        onClick={() => setTheme('dark')}
                        className={`flex-1 p-4 rounded-lg border flex flex-col items-center gap-2 ${
                          theme === 'dark' 
                            ? 'border-gray-700 bg-gray-800' 
                            : 'border-gray-200 bg-white hover:bg-gray-50'
                        }`}
                      >
                        <Moon size={24} className={theme === 'dark' ? 'text-brand-yellow' : 'text-gray-700'} />
                        <span className={theme === 'dark' ? 'text-brand-yellow' : 'text-gray-700'}>Oscuro</span>
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className={`mb-3 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>Idioma</h3>
                    <select 
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className={`w-full px-4 py-2 rounded-lg border ${
                        theme === 'dark' 
                          ? 'bg-gray-800 border-gray-700 text-white' 
                          : 'bg-white border-gray-300 text-gray-800'
                      }`}
                    >
                      <option value="es">Español</option>
                      <option value="en">English</option>
                      <option value="fr">Français</option>
                      <option value="de">Deutsch</option>
                    </select>
                  </div>
                </div>
              </section>
              
              {/* Sección de zona de peligro */}
              <section id="danger" className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-white'} p-6 rounded-lg shadow-md border ${theme === 'dark' ? 'border-red-900/50' : 'border-red-200'}`}>
                <h2 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>
                  Zona de peligro
                </h2>
                <div className="space-y-4">
                  <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-red-50'}`}>
                    <div className="flex items-start gap-3">
                      <AlertTriangle className={theme === 'dark' ? 'text-red-400' : 'text-red-600'} />
                      <div>
                        <h3 className={`font-medium ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>
                          Eliminar cuenta
                        </h3>
                        <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          Una vez que elimines tu cuenta, no hay vuelta atrás. Por favor, asegúrate de que realmente quieres hacer esto.
                        </p>
                      </div>
                    </div>
                    
                    {!showDeleteConfirmation ? (
                      <button 
                        onClick={() => setShowDeleteConfirmation(true)}
                        className={`mt-4 px-4 py-2 rounded-md ${
                          theme === 'dark' 
                            ? 'bg-gray-800 text-red-200 hover:bg-gray-700' 
                            : 'bg-red-100 text-red-700 hover:bg-red-200'
                        }`}
                      >
                        Eliminar mi cuenta
                      </button>
                    ) : (
                      <form onSubmit={handleDeleteAccount} className="mt-4 space-y-3">
                        {deleteMessage.message && (
                          <div className={`p-3 rounded-md flex items-center gap-2 ${deleteMessage.type === 'error' ? (theme === 'dark' ? 'bg-red-900/50 text-red-200' : 'bg-red-100 text-red-800') : (theme === 'dark' ? 'bg-green-900/50 text-green-200' : 'bg-green-100 text-green-800')}`}>
                            {deleteMessage.type === 'error' ? <XCircle size={18} /> : <CheckCircle size={18} />}
                            {deleteMessage.message}
                          </div>
                        )}
                        
                        <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          Para confirmar, escribe <span className="font-bold">ELIMINAR</span> en el campo a continuación:
                        </p>
                        <input 
                          type="text" 
                          value={deleteConfirm} 
                          onChange={(e) => setDeleteConfirm(e.target.value)}
                          className={`w-full px-4 py-2 rounded-lg border ${
                            theme === 'dark' 
                              ? 'bg-gray-800 border-gray-700 text-gray-100' 
                              : 'bg-white border-gray-300 text-gray-800'
                          }`}
                          placeholder="ELIMINAR"
                        />
                        
                        <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          Ingresa tu contraseña para confirmar:
                        </p>
                        <input 
                          type="password" 
                          value={deletePassword} 
                          onChange={(e) => setDeletePassword(e.target.value)}
                          className={`w-full px-4 py-2 rounded-lg border ${
                            theme === 'dark' 
                              ? 'bg-gray-800 border-gray-700 text-gray-100' 
                              : 'bg-white border-gray-300 text-gray-800'
                          }`}
                          placeholder="Contraseña"
                        />
                        
                        <div className="flex gap-3">
                          <button 
                            type="submit"
                            disabled={isLoading}
                            className={`px-4 py-2 rounded-md ${
                              theme === 'dark' 
                                ? 'bg-gray-800 text-red-200 hover:bg-gray-700' 
                                : 'bg-red-500 text-white hover:bg-red-600'
                            } ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                          >
                            {isLoading ? 'Procesando...' : 'Confirmar eliminación'}
                          </button>
                          <button 
                            type="button"
                            onClick={() => {
                              setShowDeleteConfirmation(false);
                              setDeleteMessage({ type: '', message: '' });
                              setDeleteConfirm('');
                              setDeletePassword('');
                            }}
                            className={`px-4 py-2 rounded-md ${
                              theme === 'dark' 
                                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                            disabled={isLoading}
                          >
                            Cancelar
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
        <Footer />
      </MainLayout>
    </div>
  );
}
