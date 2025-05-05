import feedparser as fp
import json
import newspaper
from newspaper import Article
import os

# Archivo donde se guardarán las noticias
JSON_FILE = "web-crawler/noticias.json"

# Intentar cargar noticias previas para evitar duplicados
if os.path.exists(JSON_FILE):
    with open(JSON_FILE, "r", encoding="utf-8") as file:
        datos = json.load(file)
else:
    datos = {"Noticias": {}}

# Cargar las páginas desde el JSON
try:
    with open("web-crawler/paginas.json") as archivos_datos:
        paginas = json.load(archivos_datos)
except FileNotFoundError:
    print("Error: El archivo 'web-crawler/paginas.json' no existe. Verifica la ruta y vuelve a intentarlo.")
    exit(1)

# Función para obtener artículos sin duplicados
def obtener_noticias(limite):
    for pagina, valor in paginas.items():
        print(f"Descargando artículos de: {pagina}")

        # Verificar si ya hay artículos previos de esta página
        if pagina not in datos["Noticias"]:
            datos["Noticias"][pagina] = {"pagina": pagina, "link": valor["link"], "articulos": []}

        # Obtener enlaces ya guardados para evitar duplicados
        enlaces_guardados = {articulo["link"] for articulo in datos["Noticias"][pagina]["articulos"]}

        # Si hay RSS, descargar desde el feed xml
        if "rss" in valor:
            feed = fp.parse(valor["rss"])
            for i, entrada in enumerate(feed.entries):
                if i >= limite:
                    break
                if entrada.link not in enlaces_guardados:
                    try:
                        articulo = Article(entrada.link)
                        articulo.download()
                        articulo.parse()
                        datos["Noticias"][pagina]["articulos"].append({
                            "titulo": articulo.title,  # Título del artículo
                            "texto": articulo.text,  # Texto del artículo
                            "link": entrada.link,  # URL del artículo
                            "fecha": entrada.published if hasattr(entrada, "published") else "Fecha no disponible",  # Fecha de publicación
                            "imagen": articulo.top_image  # URL portada de la noticia
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
                            "titulo": contenido.title,  # Título del artículo
                            "texto": contenido.text,  # Texto del artículo
                            "link": contenido.url,  # URL del artículo
                            "fecha": contenido.publish_date.isoformat() if contenido.publish_date else "Fecha no disponible",  # Fecha de publicación
                            "imagen": contenido.top_image  # URL portada de la noticia
                        })
                        print(f"✔ {contenido.title}")
                    except Exception as e:
                        print(f"Error en {contenido.url}: {e}")

# Guardar en el archivo JSON (noticias.json) actualizado sin duplicados
def guardar_noticias():
    with open(JSON_FILE, "w", encoding="utf-8") as outfile:
        json.dump(datos, outfile, ensure_ascii=False, indent=4)
    print("Noticias actualizadas y guardadas sin duplicados.")

# Función principal para iniciar el crawler
def start_crawler(limite):
    obtener_noticias(limite)
    guardar_noticias()

# Punto de entrada del script
if __name__ == "__main__":
    import sys
    args = sys.argv[1:]
    if len(args) > 0:
        limite = int(args[0])
    else:
        limite = 50
    start_crawler(limite)