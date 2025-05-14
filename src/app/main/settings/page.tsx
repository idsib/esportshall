"use client";

import { useState } from 'react';
import { usePathname, useRouter } from "next/navigation";
import MainLayout from '../components/layout/mainLayout';
import { Footer } from '@/app/components/layout/footer';
import { useTheme } from '@/context/theme-context';
import { signOut } from "next-auth/react";
import { converter } from '../web-crawler/JSONtoSQL';
import { 
  Moon, 
  Sun, 
  Database,
  CheckCircle,
  XCircle,
  Loader2,
  Lock,
  Eye,
  EyeOff,
  Trash2,
  AlertTriangle,
  User
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
  const [deleteConfirm, setDeleteConfirm] = useState('');
  const [deletePassword, setDeletePassword] = useState('');
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  
  // Estado para mensajes de feedback y carga
  const [conversionMessage, setConversionMessage] = useState({ type: '', message: '' });
  const [passwordMessage, setPasswordMessage] = useState({ type: '', message: '' });
  const [deleteMessage, setDeleteMessage] = useState({ type: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  
  // Manejador para cambiar el tema
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  
  // Manejador para cambiar contraseña
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
  
  // Manejador para eliminar cuenta
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
  
  // Manejador para convertir JSON a SQL
  const handleJSONtoSQL = async () => {
    try {
      setIsLoading(true);
      setConversionMessage({ type: '', message: '' });
      
      await converter();
      
      setConversionMessage({ 
        type: 'success', 
        message: 'Conversión de JSON a SQL completada exitosamente' 
      });
    } catch (error) {
      console.error('Error en la conversión:', error);
      setConversionMessage({ 
        type: 'error', 
        message: 'Error al convertir JSON a SQL. Consulta la consola para más detalles.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <h1 className={`text-3xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Configuración</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Sidebar de navegación */}
            <div className="md:col-span-1">
              <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-neutral-800' : 'bg-white'} shadow-md mb-6`}>
                <div className="p-4 border-b border-gray-700">
                  <h2 className={`text-xl font-semibold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>Opciones</h2>
                </div>
                <div className="p-0">
                  <button 
                    className={`w-full text-left px-4 py-3 flex items-center gap-3 ${theme === 'dark' ? 'text-gray-100 hover:bg-neutral-700' : 'text-gray-800 hover:bg-gray-100'}`} 
                  >
                    {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
                    Apariencia
                  </button>
                  <button 
                    className={`w-full text-left px-4 py-3 flex items-center gap-3 ${theme === 'dark' ? 'text-gray-100 hover:bg-neutral-700' : 'text-gray-800 hover:bg-gray-100'}`} 
                  >
                    <Lock size={20} />
                    Contraseña
                  </button>
                  <button 
                    className={`w-full text-left px-4 py-3 flex items-center gap-3 ${theme === 'dark' ? 'text-gray-100 hover:bg-neutral-700' : 'text-gray-800 hover:bg-gray-100'}`} 
                  >
                    <User size={20} />
                    Cuenta
                  </button>
                  <button 
                    className={`w-full text-left px-4 py-3 flex items-center gap-3 ${theme === 'dark' ? 'text-gray-100 hover:bg-neutral-700' : 'text-gray-800 hover:bg-gray-100'}`} 
                  >
                    <Database size={20} />
                    Herramientas de Base de Datos
                  </button>
                </div>
              </div>
            </div>
            
            {/* Contenido principal */}
            <div className="md:col-span-2">
              {/* Sección de Apariencia */}
              <section className={`rounded-lg overflow-hidden shadow-md mb-6 ${theme === 'dark' ? 'bg-neutral-800' : 'bg-white'}`}>
                <div className="p-6">
                  <h2 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>Apariencia</h2>
                  
                  <div className="flex items-center justify-between p-4 rounded-lg mb-4 border ${theme === 'dark' ? 'bg-neutral-800 border-neutral-700' : 'bg-gray-50 border-gray-200'}">
                    <div>
                      <h3 className={`font-medium ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>Modo oscuro</h3>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        Cambia entre el modo claro y oscuro
                      </p>
                    </div>
                    <button 
                      onClick={toggleTheme}
                      className={`p-2 rounded-md ${
                        theme === 'dark' 
                          ? 'bg-neutral-700 text-yellow-400 hover:bg-neutral-600' 
                          : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                      }`}
                    >
                      {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                  </div>
                </div>
              </section>
              
              {/* Sección de Cambio de Contraseña */}
              <section className={`rounded-lg overflow-hidden shadow-md mb-6 ${theme === 'dark' ? 'bg-neutral-800' : 'bg-white'}`}>
                <div className="p-6">
                  <h2 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                    <div className="flex items-center gap-2">
                      <Lock size={20} />
                      Cambiar Contraseña
                    </div>
                  </h2>
                  
                  <form onSubmit={handlePasswordChange} className="space-y-4">
                    {passwordMessage.message && (
                      <div className={`p-3 rounded-md flex items-center gap-2 ${passwordMessage.type === 'error' ? (theme === 'dark' ? 'bg-red-900/50 text-red-200' : 'bg-red-100 text-red-800') : (theme === 'dark' ? 'bg-green-900/50 text-green-200' : 'bg-green-100 text-green-800')}`}>
                        {passwordMessage.type === 'error' ? <XCircle size={18} /> : <CheckCircle size={18} />}
                        {passwordMessage.message}
                      </div>
                    )}
                    
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        Contraseña actual
                      </label>
                      <div className="relative">
                        <input 
                          type={showPassword ? "text" : "password"} 
                          value={currentPassword} 
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          className={`w-full px-4 py-2 rounded-lg border ${theme === 'dark' ? 'bg-neutral-800 border-neutral-700 text-gray-100' : 'bg-white border-gray-300 text-gray-800'}`}
                          placeholder="Ingresa tu contraseña actual"
                        />
                        <button 
                          type="button" 
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2"
                        >
                          {showPassword ? <EyeOff size={18} className="text-gray-500" /> : <Eye size={18} className="text-gray-500" />}
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        Nueva contraseña
                      </label>
                      <input 
                        type={showPassword ? "text" : "password"} 
                        value={newPassword} 
                        onChange={(e) => setNewPassword(e.target.value)}
                        className={`w-full px-4 py-2 rounded-lg border ${theme === 'dark' ? 'bg-neutral-800 border-neutral-700 text-gray-100' : 'bg-white border-gray-300 text-gray-800'}`}
                        placeholder="Ingresa tu nueva contraseña"
                      />
                    </div>
                    
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        Confirmar nueva contraseña
                      </label>
                      <input 
                        type={showPassword ? "text" : "password"} 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={`w-full px-4 py-2 rounded-lg border ${theme === 'dark' ? 'bg-neutral-800 border-neutral-700 text-gray-100' : 'bg-white border-gray-300 text-gray-800'}`}
                        placeholder="Confirma tu nueva contraseña"
                      />
                    </div>
                    
                    <button 
                      type="submit"
                      disabled={isLoading}
                      className={`px-4 py-2 rounded-md ${theme === 'dark' ? 'bg-brand-yellow text-black hover:bg-brand-yellow/90' : 'bg-brand-yellow text-black hover:bg-brand-yellow/90'} ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {isLoading ? 'Procesando...' : 'Actualizar contraseña'}
                    </button>
                  </form>
                </div>
              </section>
              
              {/* Sección de Eliminar Cuenta */}
              <section className={`rounded-lg overflow-hidden shadow-md mb-6 ${theme === 'dark' ? 'bg-neutral-800' : 'bg-white'}`}>
                <div className="p-6">
                  <h2 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                    <div className="flex items-center gap-2">
                      <User size={20} />
                      Cuenta
                    </div>
                  </h2>
                  
                  <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-neutral-700 border-neutral-600' : 'bg-gray-50 border-gray-200'} mb-4`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className={`font-medium flex items-center gap-2 ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>
                          <AlertTriangle size={18} />
                          Eliminar cuenta
                        </h3>
                        <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          Esta acción no se puede deshacer. Todos tus datos serán eliminados permanentemente.
                        </p>
                      </div>
                      <button 
                        onClick={() => setShowDeleteConfirmation(true)}
                        className={`px-4 py-2 rounded-md ${theme === 'dark' ? 'bg-red-900/50 text-red-200 hover:bg-red-900' : 'bg-red-100 text-red-800 hover:bg-red-200'}`}
                      >
                        Eliminar cuenta
                      </button>
                    </div>
                  </div>
                  
                  {showDeleteConfirmation && (
                    <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-neutral-700 border-neutral-600' : 'bg-gray-50 border-gray-200'} mb-4`}>
                      <h3 className={`font-medium mb-3 ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>
                        Confirmar eliminación de cuenta
                      </h3>
                      
                      <form onSubmit={handleDeleteAccount} className="space-y-4">
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
                          className={`w-full px-4 py-2 rounded-lg border ${theme === 'dark' ? 'bg-neutral-800 border-neutral-700 text-gray-100' : 'bg-white border-gray-300 text-gray-800'}`}
                          placeholder="ELIMINAR"
                        />
                        
                        <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          Ingresa tu contraseña para confirmar:
                        </p>
                        <input 
                          type="password" 
                          value={deletePassword} 
                          onChange={(e) => setDeletePassword(e.target.value)}
                          className={`w-full px-4 py-2 rounded-lg border ${theme === 'dark' ? 'bg-neutral-800 border-neutral-700 text-gray-100' : 'bg-white border-gray-300 text-gray-800'}`}
                          placeholder="Contraseña"
                        />
                        
                        <div className="flex gap-3">
                          <button 
                            type="submit"
                            disabled={isLoading}
                            className={`px-4 py-2 rounded-md ${theme === 'dark' ? 'bg-red-900/50 text-red-200 hover:bg-red-900' : 'bg-red-500 text-white hover:bg-red-600'} ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
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
                            className={`px-4 py-2 rounded-md ${theme === 'dark' ? 'bg-neutral-800 text-white hover:bg-neutral-700' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                            disabled={isLoading}
                          >
                            Cancelar
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              </section>
              
              {/* Sección de Herramientas de Base de Datos */}
              <section className={`rounded-lg overflow-hidden shadow-md ${theme === 'dark' ? 'bg-neutral-800' : 'bg-white'}`}>
                <div className="p-6">
                  <h2 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                    <div className="flex items-center gap-2">
                      <Database size={20} />
                      Herramientas de Base de Datos
                    </div>
                  </h2>
                  
                  <div className={`p-4 rounded-lg mb-4 border ${theme === 'dark' ? 'bg-neutral-700 border-neutral-600' : 'bg-gray-50 border-gray-200'}`}>
                    <h3 className={`font-medium mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>Convertir JSON a SQL</h3>
                    <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      Convierte los datos de noticias desde el archivo JSON a la base de datos SQL
                    </p>
                    
                    {conversionMessage.message && (
                      <div className={`p-3 mb-4 rounded-md flex items-center gap-2 ${
                        conversionMessage.type === 'error' 
                          ? (theme === 'dark' ? 'bg-red-900/50 text-red-200' : 'bg-red-100 text-red-800') 
                          : (theme === 'dark' ? 'bg-green-900/50 text-green-200' : 'bg-green-100 text-green-800')
                      }`}>
                        {conversionMessage.type === 'error' ? <XCircle size={18} /> : <CheckCircle size={18} />}
                        {conversionMessage.message}
                      </div>
                    )}
                    
                    <button 
                      onClick={handleJSONtoSQL}
                      disabled={isLoading}
                      className={`px-4 py-2 rounded-md flex items-center gap-2 ${
                        theme === 'dark' 
                          ? 'bg-brand-yellow text-black hover:bg-brand-yellow/90' 
                          : 'bg-brand-yellow text-black hover:bg-brand-yellow/90'
                      } ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          Procesando...
                        </>
                      ) : (
                        <>
                          <Database size={18} />
                          Convertir JSON a SQL
                        </>
                      )}
                    </button>
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
