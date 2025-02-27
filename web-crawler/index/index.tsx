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

export default function Noticias() {
  const [noticias, setNoticias] = useState<NoticiasData | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch("/noticias.json") // Ruta donde se guardan las noticias
      .then((res) => res.json())
      .then((data: NoticiasData) => {
        setNoticias(data);
        setCargando(false);
      })
      .catch((error) => {
        console.error("Error al cargar noticias:", error);
        setCargando(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div id="top" className="text-center">
        <h1 id="encabezado" className="text-4xl font-bold mb-6">NOTICIAS</h1>
      </div>

      {cargando ? (
        <p className="text-center text-lg">Cargando noticias...</p>
      ) : noticias ? (
        Object.values(noticias.Noticias).map((pagina, index) => (
          <div key={index} className="mb-6">
            <div className="bg-blue-600 text-white py-2 px-4 rounded-md mb-4">
              <h2 id="pagina" className="text-xl font-semibold">{pagina.pagina}</h2>
            </div>

            {pagina.articulos.map((articulo, idx) => (
              <div key={idx} className="bg-white shadow-md p-4 mb-4 rounded-lg">
                <h4 id="titulo" className="text-lg font-bold">{articulo.titulo}</h4>
                <p id="texto" className="text-gray-700">{articulo.texto}</p>
                <a
                  id="link"
                  href={articulo.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Leer más
                </a>
              </div>
            ))}
          </div>
        ))
      ) : (
        <p className="text-center text-red-500">No se encontraron noticias.</p>
      )}
    </div>
  );
}