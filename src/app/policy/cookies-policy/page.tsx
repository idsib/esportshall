'use client';

import { useState, useEffect } from 'react';

const CookiesPolicy = () => {
    return (
        <div className="pt-24 pb-12 px-4 min-h-screen bg-gray-50 dark:bg-dark-100">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-brand-yellow text-center mb-12">
                    Política de Cookies
                </h1>
                
                <div className="space-y-8 text-gray-800 dark:text-gray-200 bg-white dark:bg-dark-200 p-8 rounded-xl shadow-lg">
                    <section>
                        <h3 className="text-2xl font-semibold text-brand-yellow mb-4">1. ¿Qué son las cookies?</h3>
                        <p className="leading-relaxed">
                            Las cookies son pequeños archivos de texto que los sitios web almacenan en su dispositivo (ordenador, tablet, móvil) cuando los visita. Las cookies ayudan a que el sitio web recuerde información sobre su visita, como su idioma preferido y otras configuraciones, lo que puede facilitar su próxima visita y hacer que el sitio le resulte más útil.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-2xl font-semibold text-brand-yellow mb-4">2. Tipos de cookies que utilizamos</h3>
                        <div className="space-y-4">
                            <h4 className="text-xl font-semibold">2.1 Cookies esenciales</h4>
                            <p className="leading-relaxed">
                                Son necesarias para el funcionamiento básico del sitio. Incluyen cookies que permiten iniciar sesión en áreas seguras del sitio web, usar el carrito de compras o servicios de facturación electrónica.
                            </p>

                            <h4 className="text-xl font-semibold">2.2 Cookies de rendimiento</h4>
                            <p className="leading-relaxed">
                                Nos ayudan a entender cómo los visitantes interactúan con nuestro sitio web, proporcionando información sobre las áreas visitadas, el tiempo dedicado y cualquier error que pueda ocurrir.
                            </p>

                            <h4 className="text-xl font-semibold">2.3 Cookies de funcionalidad</h4>
                            <p className="leading-relaxed">
                                Permiten recordar las elecciones que hace (como su nombre de usuario, idioma o la región en la que se encuentra) y proporcionan características mejoradas y más personales.
                            </p>

                            <h4 className="text-xl font-semibold">2.4 Cookies de publicidad</h4>
                            <p className="leading-relaxed">
                                Se utilizan para ofrecer anuncios más relevantes para usted y sus intereses. También se utilizan para limitar el número de veces que ve un anuncio y ayudar a medir la efectividad de las campañas publicitarias.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h3 className="text-2xl font-semibold text-brand-yellow mb-4">3. Control de cookies</h3>
                        <p className="leading-relaxed">
                            Puede controlar y/o eliminar las cookies según desee. Puede eliminar todas las cookies que ya están en su dispositivo y puede configurar la mayoría de los navegadores para evitar que se coloquen. Sin embargo, si lo hace, es posible que deba ajustar manualmente algunas preferencias cada vez que visite un sitio y que algunos servicios y funcionalidades no funcionen.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-2xl font-semibold text-brand-yellow mb-4">4. Cookies de terceros</h3>
                        <p className="leading-relaxed">
                            En algunos casos especiales, también utilizamos cookies proporcionadas por terceros de confianza. La siguiente sección detalla qué cookies de terceros puede encontrar a través de este sitio.
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mt-4">
                            <li>Google Analytics: para entender cómo los visitantes interactúan con nuestro sitio</li>
                            <li>Redes sociales: para permitir la integración con plataformas sociales</li>
                            <li>Servicios de pago: para procesar transacciones seguras</li>
                        </ul>
                    </section>

                    <section>
                        <h3 className="text-2xl font-semibold text-brand-yellow mb-4">5. Actualizaciones de la política</h3>
                        <p className="leading-relaxed">
                            Podemos actualizar esta Política de Cookies periódicamente. Cuando lo hagamos, revisaremos la fecha de "última actualización" en la parte superior de la política. Le animamos a revisar esta política periódicamente para estar informado sobre cómo estamos protegiendo su información.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-2xl font-semibold text-brand-yellow mb-4">6. Contacto</h3>
                        <p className="leading-relaxed">
                            Si tiene preguntas sobre nuestra Política de Cookies, no dude en contactarnos:
                            <br /><br />
                            Email: info@esportshall.com
                            <br />
                            Dirección: Av. d'Eduard Maristany, 59, 08930 Sant Adrià de Besòs, Barcelona, España
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default CookiesPolicy; 