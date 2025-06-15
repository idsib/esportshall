'use server'
import noticias from "./noticias.json";
import { neon } from '@neondatabase/serverless';
// Archivo para convertir los JSON que suelta noticias.py a SQL y introducirlos en la base de datos.
const sql = neon(`${process.env.DATABASE_URL}`);
// Definimos las interficies con la estructura del JSON.
interface Articulo {
    titulo: string;
    texto: string;
    link?: string;
    fecha?: string;
    imagen?: string;
}

interface Fuente {
    pagina: string;
    link: string;
    articulos: Articulo[];
}

interface NoticiasJSON {
    Noticias: {
        [clave: string]: Fuente;
    };
}
// Sacamos el JSON con la estructura de la interficie.
const JSON_FILE: NoticiasJSON = noticias;

export async function converter() {
    try {
        // Dissecionamos el JSON con el Object.values para que me devuelva el array de todas las fuentes.
        const fuentes = Object.values(JSON_FILE.Noticias);
        // Doble for of para acceder a toda la información de los artículos
        for (const fuente of fuentes) {
            for (const articulo of fuente.articulos) {
                await sql(
                    // En cada iteración guardaremos toda la información tanto de la fuente como del artículo correspondiente.
                    'INSERT INTO noticias (pagina, link_fuente, titulo, texto, link_articulo, fecha, imagen) VALUES ($1, $2, $3, $4, $5, $6, $7)',
                    [fuente.pagina, fuente.link, articulo.titulo, articulo.texto, articulo.link, articulo.fecha, articulo.imagen]
                );
            }
        }
    } catch (error) {

        console.log(error)

    }
}
