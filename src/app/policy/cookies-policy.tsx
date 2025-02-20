'use client';

import { useState, useEffect } from 'react';

const CookiesPolicy = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'true');
    setShowBanner(false);
  };

  return (
    <>
      {/* Banner de Cookies */}
      {showBanner && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 p-4 shadow-lg z-50">
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white text-sm">
              Utilizamos cookies para mejorar tu experiencia. Al continuar navegando, aceptas nuestra
              <a href="/cookies-policy" className="text-brand-yellow hover:text-yellow-400 underline ml-1">
                política de cookies
              </a>
              .
            </p>
            <button
              onClick={acceptCookies}
              className="px-6 py-2 bg-brand-yellow hover:bg-yellow-400 text-black font-semibold rounded-lg transition-colors"
            >
              Aceptar
            </button>
          </div>
        </div>
      )}

      {/* Contenido de la Política */}
      <div className="pb-12 px-4 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-brand-yellow text-center mb-12">
            Política de Cookies
          </h1>
          
          <div className="space-y-8 text-gray-800 dark:text-gray-200 bg-white dark:bg-dark-200 p-8 rounded-xl shadow-lg">
            <section>
              <h3 className="text-2xl font-semibold text-brand-yellow mb-4">1. Uso de cookies</h3>
              <p className="leading-relaxed">
                El sitio web, propiedad de Esports Hall y ubicado en Av. d'Eduard Maristany, 59, 08930 Sant Adrià de Besòs, Barcelona, con número de CIF: ESQ5856078J, utiliza un sistema de cookies...
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-semibold text-brand-yellow mb-4">2. Consentimiento</h3>
              <p className="leading-relaxed">
                Las cookies que utilizamos no almacenan datos personales ni ningún tipo de información que pueda identificarte.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-semibold text-brand-yellow mb-4">3. Tipos y Propósito de las Cookies</h3>
              <div className="space-y-4">
                <p>Las cookies, según su permanencia, pueden clasificarse en:</p>
                <p>Cookies de sesión: expiran cuando el usuario cierra el navegador.</p>
                <p>Las cookies, según su propósito, pueden clasificarse de la siguiente manera:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Cookies de geolocalización: Estas cookies se utilizan para determinar el país en el que te encuentras...</li>
                  <li>Cookies de registro: Estas cookies se generan una vez que el usuario se ha registrado...</li>
                  <li>Cookies analíticas: Cada vez que un usuario visita un servicio o información en el sitio web...</li>
                  <li>Cookies de publicidad propia: Se utilizan para gestionar si un usuario ha visitado la publicidad...</li>
                  <li>Cookies de publicidad de terceros: Estos terceros pueden almacenar cookies enviadas desde el sitio web...</li>
                </ul>
              </div>
            </section>

            <section>
              <h3 className="text-2xl font-semibold text-brand-yellow mb-4">4. Cómo bloquear o eliminar las cookies instaladas</h3>
              <p className="mb-4">El usuario puede permitir, bloquear o eliminar las cookies instaladas en su dispositivo a través de la configuración de su navegador. Puedes encontrar información para los navegadores más comunes:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <a href="https://support.microsoft.com/es-es/kb/278835" className="text-brand-yellow hover:text-yellow-400 underline">
                    Explorer
                  </a>
                </li>
                <li>
                  <a href="http://support.google.com/chrome/bin/answer.py?hl=es&answer=95647" className="text-brand-yellow hover:text-yellow-400 underline">
                    Chrome
                  </a>
                </li>
                <li>
                  <a href="https://support.mozilla.org/es/kb/Borrar%20cookies" className="text-brand-yellow hover:text-yellow-400 underline">
                    Firefox
                  </a>
                </li>
                <li>
                  <a href="http://support.apple.com/kb/ph5042" className="text-brand-yellow hover:text-yellow-400 underline">
                    Safari
                  </a>
                </li>
              </ul>
            </section>

            <section>
              <h3 className="text-2xl font-semibold text-brand-yellow mb-4">5. Modificaciones</h3>
              <p className="leading-relaxed">
                El sitio web, propiedad de Esports Hall, ubicado en Av. d'Eduard Maristany, 59, 08930 Sant Adrià de Besòs, Barcelona, España, con número de CIF: ESQ5856078J, puede modificar esta política de cookies en función de requisitos legales...
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default CookiesPolicy;
