import { useEffect, useState } from "react";

interface Articulo {
  titulo: string;
  texto: string;
  link: string;
}

interface Pagina { 
  pagina: string;
  link: string;
  articulos: Articulo[];
}

interface NoticiasData {
  Noticias: Record<string, Pagina>;
}

const NoticiasLista: React.FC<{ noticias: NoticiasData }> = ({ noticias }) => (
  <>
    {Object.values(noticias.Noticias).map((pagina, index) => (
      <div key={index} className="mb-6">
        <div className="bg-blue-600 text-white py-2 px-4 rounded-md mb-4">
          <h2 id="pagina" className="text-xl font-semibold">{pagina.pagina}</h2>
        </div>
        {pagina.articulos.map((articulo, idx) => (
          <div key={idx} className="bg-white shadow-md p-4 mb-4 rounded-lg hover:shadow-lg transition-shadow duration-300">
            <h4 id="titulo" className="text-lg font-bold">{articulo.titulo}</h4>
            <p id="texto" className="text-gray-700">{articulo.texto}</p>
            <a
              id="link"
              href={articulo.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
              aria-label={`Leer más sobre ${articulo.titulo}`}
            >
              Leer más
            </a>
          </div>
        ))}
      </div>
    ))}
  </>
);

export default function Noticias() {
  const [estado, setEstado] = useState<{ cargando: boolean; noticias: NoticiasData | null; error: string | null }>({
    cargando: true,
    noticias: null,
    error: null,
  });

  useEffect(() => {
    fetch("/noticias.json") // Ruta donde se guardan las noticias con el formato
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error al cargar noticias: ${res.statusText}`); // Manejo de errores 
        }
        return res.json(); 
      })
      .then((data: NoticiasData) => {
        setEstado({ cargando: false, noticias: data, error: null }); // Cambié de dos estados a uno solo para manejar el estado de carga y error
      })
      .catch((error) => {
        console.error("Error al cargar noticias:", error);
        setEstado({ cargando: false, noticias: null, error: "No se pudieron cargar las noticias. Intenta nuevamente más tarde." });
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div id="top" className="text-center">
        <h1 id="encabezado" className="text-4xl font-bold mb-6">NOTICIAS</h1>
      </div>

      {estado.error ? (
        <p className="text-center text-red-500">{estado.error}</p> // Error si no se pueden cargar las noticias
      ) : estado.cargando ? (
        <p className="text-center text-lg">Cargando noticias...</p>
      ) : estado.noticias ? (
        <NoticiasLista noticias={estado.noticias} /> // Muestra la lista de noticias
      ) : (
        <p className="text-center text-red-500">No se encontraron noticias.</p> // Mensaje de error si no se encuentran noticias
      )}
    </div>
  );
}