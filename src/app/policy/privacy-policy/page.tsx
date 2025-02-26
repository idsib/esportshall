const PrivacyPolicy = () => {
    return (
        <div className="pt-24 pb-12 px-4 min-h-screen bg-gray-50 dark:bg-dark-100">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-brand-yellow text-center mb-12">
                    Política de Privacidad
                </h1>
                
                <div className="space-y-8 text-gray-800 dark:text-gray-200 bg-white dark:bg-dark-200 p-8 rounded-xl shadow-lg">
                    <section>
                        <h3 className="text-2xl font-semibold text-brand-yellow mb-4">1. Introducción</h3>
                        <p className="leading-relaxed">
                            En EsportsHall, nos tomamos muy en serio la privacidad de nuestros usuarios. Esta política describe cómo recopilamos, usamos y protegemos su información personal cuando utiliza nuestra plataforma y servicios.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-2xl font-semibold text-brand-yellow mb-4">2. Información que recopilamos</h3>
                        <div className="space-y-4">
                            <h4 className="text-xl font-semibold">2.1 Información proporcionada por usted</h4>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Nombre y apellidos</li>
                                <li>Dirección de correo electrónico</li>
                                <li>Número de teléfono</li>
                                <li>Fecha de nacimiento</li>
                                <li>Información de perfil de juego</li>
                                <li>Información de pago (procesada de forma segura)</li>
                            </ul>

                            <h4 className="text-xl font-semibold">2.2 Información recopilada automáticamente</h4>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Dirección IP</li>
                                <li>Tipo de navegador</li>
                                <li>Dispositivo utilizado</li>
                                <li>Páginas visitadas</li>
                                <li>Tiempo de permanencia en el sitio</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h3 className="text-2xl font-semibold text-brand-yellow mb-4">3. Uso de la información</h3>
                        <p className="leading-relaxed">
                            Utilizamos la información recopilada para:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mt-4">
                            <li>Proporcionar y mejorar nuestros servicios</li>
                            <li>Personalizar su experiencia</li>
                            <li>Procesar transacciones</li>
                            <li>Enviar comunicaciones importantes</li>
                            <li>Prevenir actividades fraudulentas</li>
                            <li>Cumplir con obligaciones legales</li>
                        </ul>
                    </section>

                    <section>
                        <h3 className="text-2xl font-semibold text-brand-yellow mb-4">4. Compartir información</h3>
                        <p className="leading-relaxed">
                            No vendemos ni alquilamos su información personal a terceros. Sin embargo, podemos compartir su información con:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mt-4">
                            <li>Proveedores de servicios que nos ayudan a operar la plataforma</li>
                            <li>Autoridades legales cuando sea requerido por ley</li>
                            <li>Otros usuarios (solo la información que usted elija hacer pública)</li>
                        </ul>
                    </section>

                    <section>
                        <h3 className="text-2xl font-semibold text-brand-yellow mb-4">5. Sus derechos</h3>
                        <p className="leading-relaxed">
                            Usted tiene derecho a:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mt-4">
                            <li>Acceder a sus datos personales</li>
                            <li>Rectificar datos inexactos</li>
                            <li>Solicitar la eliminación de sus datos</li>
                            <li>Oponerse al procesamiento de sus datos</li>
                            <li>Portabilidad de datos</li>
                            <li>Retirar su consentimiento en cualquier momento</li>
                        </ul>
                    </section>

                    <section>
                        <h3 className="text-2xl font-semibold text-brand-yellow mb-4">6. Seguridad</h3>
                        <p className="leading-relaxed">
                            Implementamos medidas de seguridad técnicas y organizativas apropiadas para proteger sus datos personales contra el acceso, modificación, divulgación o destrucción no autorizada.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-2xl font-semibold text-brand-yellow mb-4">7. Contacto</h3>
                        <p className="leading-relaxed">
                            Para ejercer sus derechos o realizar consultas sobre esta política, puede contactarnos en:
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

export default PrivacyPolicy; 