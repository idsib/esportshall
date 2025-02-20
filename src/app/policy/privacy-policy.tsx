import Link from "next/link";

const PrivacyPolicy = () => {
    return (
        <div className="pb-12 px-4 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-brand-yellow text-center mb-12">
                    Política de Privacidad
                </h1>
                <div className="container-xxl py-5">
                    <div className="container">
                        <div className="row g-5 justify-content-center">
                            <div className="col-lg-7 text-start">
                                <div className="mb-4 text-white">
                                    Esports Hall, con el fin de proteger los derechos individuales, especialmente en relación con el tratamiento automatizado y con el objetivo de ser transparente con el Usuario, ha establecido una política que cubre dicho tratamiento, los fines perseguidos, la legitimidad del mismo y también las herramientas disponibles para que el Usuario pueda ejercer sus derechos.
                                    <br /><br />
                                    Navegar por este sitio web implica la aceptación total de las siguientes disposiciones y condiciones de uso. Se acepta el uso de cookies. En caso de no estar de acuerdo, envíe un correo electrónico a esports.hall@gmail.com.
                                    <br /><br />
                                    La versión actualizada de esta política de privacidad es la única aplicable mientras dure el uso del sitio web hasta que sea reemplazada por otra versión.
                                    <br /><br />
                                    Para más información sobre la protección de datos personales, le invitamos a consultar la página web de la AEPD (Agencia Española de Protección de Datos).<br />
                                    <a href="https://www.agpd.es/portalwebAGPD/index-ides-idphp.php" target="_blank" rel="noopener noreferrer">Sitio web de la AEPD</a>
                                    <br /><br />
                                    <h3>Recopilación de datos</h3>
                                    Sus datos son recopilados por el PROPIETARIO.
                                    <br /><br />
                                    Un dato personal se refiere a toda la información relacionada con una persona física identificada o identificable (interesado). Una persona identificable es aquella que puede ser identificada, directa o indirectamente, en particular mediante referencia a un nombre, un número de identificación (DNI, NIF, NIE, pasaporte) o a uno o más elementos específicos propios de su identidad física, fisiológica, genética, psicológica, económica, cultural o social.
                                    <br /><br />
                                    Los datos que generalmente se recopilarán son: Nombre y apellidos, dirección, correo electrónico, número de teléfono, fecha de nacimiento, datos relacionados con medios de pago. Se pueden recopilar otros tipos de datos y se informará al Usuario.
                                    <br /><br />
                                    <h3>¿Con qué fines se procesan sus datos personales?</h3>
                                    El propósito del tratamiento de los datos personales que puedan ser recopilados es su uso principalmente por el PROPIETARIO para gestionar su relación con usted, ofrecerle productos y servicios según sus intereses, mejorar su experiencia de usuario y, en su caso, procesar sus solicitudes, peticiones o pedidos. Se creará un perfil comercial basado en la información proporcionada. No se tomarán decisiones automatizadas basadas en este perfil.
                                    <br /><br />
                                    <h3>¿Cuál es la base legal para el tratamiento de sus datos?</h3>
                                    La base legal para el tratamiento de sus datos personales es:
                                    <ul>
                                        <li>La correcta ejecución o cumplimiento del contrato.</li>
                                        <li>El interés legítimo del PROPIETARIO.</li>
                                    </ul>
                                    <br />
                                    <h3>¿A qué destinatarios se comunicarán los datos?</h3>
                                    Los datos personales del Usuario podrán ser eventualmente comunicados a terceros relacionados con el PROPIETARIO mediante contrato para la realización de las tareas necesarias para la gestión de su cuenta como cliente, sin que sea necesario su consentimiento.
                                    <br /><br />
                                    <h3>Cookies</h3>
                                    Durante la primera navegación, aparecerá un banner explicativo sobre el uso de cookies, incluyendo la posibilidad de aceptar todas las cookies o solo las cookies técnicas, esenciales para el funcionamiento de la plataforma, excluyendo las cookies analíticas y publicitarias.
                                    <br /><br />
                                    Para más información, consulte nuestra{" "}
                                    <Link href="/cookies-policy">
                                        <span className="text-blue-500 underline"> Política de Cookies</span>
                                    </Link>.
                                    <br /><br />
                                    <h3>Derechos del usuario</h3>
                                    Se informa al usuario de la posibilidad de ejercer sus derechos de acceso, rectificación, cancelación y oposición. Cada persona también tiene derecho a limitar el tratamiento de los datos personales que le conciernen, el derecho a solicitar la eliminación de sus datos, el derecho a la portabilidad de los datos y el derecho a la transferencia de los datos proporcionados al responsable del tratamiento.
                                    <br /><br />
                                    El usuario tiene la posibilidad de presentar una reclamación ante la AEPD (Agencia Española de Protección de Datos) o ante el organismo competente de la Comunidad Autónoma correspondiente, en caso de no haber obtenido una solución satisfactoria en el ejercicio de sus derechos.
                                    <br /><br />
                                    Puede acceder y ejercer estos derechos mediante una solicitud escrita y firmada que podrá enviarse a la dirección: Av. d'Eduard Maristany, 59, 08930 Sant Adrià de Besòs, Barcelona, España, adjuntando fotocopia del DNI o documento equivalente.
                                    <br /><br />
                                    La solicitud también podrá enviarse a la siguiente dirección de correo electrónico: esportshall@gmail.com
                                    <br /><br />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
