import feedparser as fp
import json
import newspaper
from newspaper import Article
import os

# Límite de descarga eliminado de momento (puede que lo vuelva a poner pero alto)
# limite = 50

# Archivo donde se guardarán las noticias
JSON_FILE = "noticias.json"

# Intentar cargar noticias previas para evitar duplicados
if os.path.exists(JSON_FILE):
    with open(JSON_FILE, "r", encoding="utf-8") as file:
        datos = json.load(file)
else:
    datos = {"Noticias": {}}

# Cargar las páginas desde el JSON
with open("paginas.json") as archivos_datos:
    paginas = json.load(archivos_datos)

# Función para obtener artículos sin duplicados
def obtener_noticias():
    for pagina, valor in paginas.items():
        print(f"Descargando artículos de: {pagina}")

        # Verificar si ya hay artículos previos de esta página
        if pagina not in datos["Noticias"]:
            datos["Noticias"][pagina] = {"pagina": pagina, "link": valor["link"], "articulos": []}

        # Obtener enlaces ya guardados para evitar duplicados
        enlaces_guardados = {articulo["link"] for articulo in datos["Noticias"][pagina]["articulos"]}

        # Si hay RSS, descargar desde el feed
        if "rss" in valor:
            feed = fp.parse(valor["rss"])
            for entrada in feed.entries:
                if entrada.link not in enlaces_guardados:
                    try:
                        articulo = Article(entrada.link)
                        articulo.download()
                        articulo.parse()
                        datos["Noticias"][pagina]["articulos"].append({
                            "titulo": articulo.title,
                            "texto": articulo.text,
                            "link": entrada.link
                        })
                        print(f"✔ {articulo.title}")
                    except Exception as e:
                        print(f"Error en {entrada.link}: {e}")

        # Si no hay RSS, se usa Newspaper
        else:
            hoja = newspaper.build(valor["link"], memoize_articles=False)
            for contenido in hoja.articles:
                if contenido.url not in enlaces_guardados:
                    try:
                        contenido.download()
                        contenido.parse()
                        datos["Noticias"][pagina]["articulos"].append({
                            "titulo": contenido.title,
                            "texto": contenido.text,
                            "link": contenido.url
                        })
                        print(f"✔ {contenido.title}")
                    except Exception as e:
                        print(f"Error en {contenido.url}: {e}")

# Ejecutar la descarga de noticias
obtener_noticias()

# Guardar en el archivo JSON (noticias.json) actualizado sin duplicados
with open(JSON_FILE, "w", encoding="utf-8") as outfile:
    json.dump(datos, outfile, ensure_ascii=False, indent=4)

print("Noticias actualizadas y guardadas sin duplicados.")