'use server'
import noticias from "./noticias.json";
import { neon } from '@neondatabase/serverless';

const sql = neon(`${process.env.DATABASE_URL}`);

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

const JSON_FILE: NoticiasJSON = noticias;

export async function converter() {
    try {
        const fuentes = Object.values(JSON_FILE.Noticias);
        for (const fuente of fuentes) {
            for (const articulo of fuente.articulos) {
                await sql(
                    'INSERT INTO noticias (pagina, link_fuente, titulo, texto, link_articulo, fecha, imagen) VALUES ($1, $2, $3, $4, $5, $6, $7)',
                    [fuente.pagina, fuente.link, articulo.titulo, articulo.texto, articulo.link, articulo.fecha, articulo.imagen]
                );
            }
        }
    } catch (error) {

        console.log(error)

    }
}
