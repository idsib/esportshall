const TermsOfService = () => {
    return (
        <div className="pb-12 px-4 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-brand-yellow text-center mb-12">
                    Términos de Servicio
                </h1>
                
                <div className="space-y-8 text-gray-800 dark:text-gray-200 bg-white dark:bg-dark-200 p-8 rounded-xl shadow-lg">
                    <section>
                        <h3 className="text-2xl font-semibold text-brand-yellow mb-4">1. Aceptación de los Términos</h3>
                        <p className="leading-relaxed">
                            Al acceder y utilizar la plataforma EsportsHall, aceptas estar legalmente vinculado por estos Términos de Servicio. Si no estás de acuerdo con alguna parte de estos términos, no podrás acceder o utilizar nuestros servicios.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-2xl font-semibold text-brand-yellow mb-4">2. Descripción del Servicio</h3>
                        <p className="leading-relaxed">
                            EsportsHall es una plataforma que conecta a la comunidad de esports en España, proporcionando servicios de organización de torneos, gestión de equipos y creación de comunidades. Nos reservamos el derecho de modificar, suspender o discontinuar cualquier aspecto del servicio en cualquier momento.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-2xl font-semibold text-brand-yellow mb-4">3. Registro y Cuentas de Usuario</h3>
                        <div className="space-y-4">
                            <p className="leading-relaxed">
                                Para utilizar ciertas funciones de nuestra plataforma, deberás crear una cuenta. Al hacerlo:
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Debes proporcionar información precisa y completa</li>
                                <li>Eres responsable de mantener la seguridad de tu cuenta</li>
                                <li>No debes compartir tus credenciales de acceso</li>
                                <li>Debes tener al menos 16 años de edad</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h3 className="text-2xl font-semibold text-brand-yellow mb-4">4. Conducta del Usuario</h3>
                        <div className="space-y-4">
                            <p className="leading-relaxed">
                                Al utilizar nuestros servicios, te comprometes a:
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>No violar ninguna ley o regulación aplicable</li>
                                <li>No acosar, amenazar o intimidar a otros usuarios</li>
                                <li>No publicar contenido ofensivo o inapropiado</li>
                                <li>No interferir con el funcionamiento normal de la plataforma</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h3 className="text-2xl font-semibold text-brand-yellow mb-4">5. Propiedad Intelectual</h3>
                        <p className="leading-relaxed">
                            Todo el contenido presente en EsportsHall, incluyendo pero no limitado a textos, gráficos, logos, iconos, imágenes, clips de audio, descargas digitales y compilaciones de datos, es propiedad de EsportsHall o sus proveedores de contenido y está protegido por las leyes de propiedad intelectual.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-2xl font-semibold text-brand-yellow mb-4">6. Limitación de Responsabilidad</h3>
                        <p className="leading-relaxed">
                            EsportsHall no será responsable por daños indirectos, incidentales, especiales, consecuentes o punitivos, incluyendo pérdida de beneficios, datos, uso, buena voluntad u otras pérdidas intangibles, resultantes de tu acceso o uso de los servicios.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-2xl font-semibold text-brand-yellow mb-4">7. Modificaciones de los Términos</h3>
                        <p className="leading-relaxed">
                            Nos reservamos el derecho de modificar estos términos en cualquier momento. Te notificaremos cualquier cambio publicando los nuevos términos en esta ubicación. La continuación del uso de la plataforma después de dichos cambios constituirá tu aceptación de los nuevos términos.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-2xl font-semibold text-brand-yellow mb-4">8. Contacto</h3>
                        <p className="leading-relaxed">
                            Si tienes alguna pregunta sobre estos Términos de Servicio, puedes contactarnos en:
                            <br />
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

export default TermsOfService;
