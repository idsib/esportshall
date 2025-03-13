"use client";

import MainLayout from "../components/layout/mainLayout";
import { useTheme } from "../../context/theme-context";

export default function NewsPage() {
  const { theme } = useTheme();

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className={`text-3xl font-bold mb-8 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>Noticias de Esports</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Noticia destacada */}
          <div className={`md:col-span-2 rounded-lg overflow-hidden ${
            theme === 'dark' ? 'bg-neutral-900' : 'bg-white shadow-sm'
          }`}>
            <img
              src="/images/news-featured.jpg"
              alt="Noticia destacada"
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <span className="text-yellow-400 text-sm font-semibold">Destacado</span>
              <h2 className={`text-2xl font-bold mt-2 mb-4 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Nuevo torneo de League of Legends con premio de 100,000€
              </h2>
              <p className={`mb-4 ${
                theme === 'dark' ? 'text-neutral-400' : 'text-gray-600'
              }`}>
                La liga española de League of Legends anuncia su mayor torneo hasta la fecha...
              </p>
              <div className="flex items-center justify-between">
                <span className={theme === 'dark' ? 'text-neutral-500' : 'text-gray-500'}>Hace 2 horas</span>
                <button className="text-yellow-400 hover:text-yellow-500">
                  Leer más →
                </button>
              </div>
            </div>
          </div>

          {/* Noticias secundarias */}
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={`rounded-lg overflow-hidden ${
              theme === 'dark' ? 'bg-neutral-900' : 'bg-white shadow-sm'
            }`}>
              <img
                src={`/images/news-${i}.jpg`}
                alt={`Noticia ${i}`}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <span className="text-yellow-400 text-sm font-semibold">Noticias</span>
                <h3 className={`text-xl font-bold mt-2 mb-2 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  Título de la noticia {i}
                </h3>
                <p className={`text-sm mb-4 ${
                  theme === 'dark' ? 'text-neutral-400' : 'text-gray-600'
                }`}>
                  Breve descripción de la noticia y sus detalles más importantes...
                </p>
                <div className="flex items-center justify-between">
                  <span className={theme === 'dark' ? 'text-neutral-500' : 'text-gray-500'}>Hace {i} horas</span>
                  <button className="text-yellow-400 hover:text-yellow-500 text-sm">
                    Leer más →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
} 