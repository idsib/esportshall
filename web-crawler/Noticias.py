import feedparser as fp
import json
import newspaper
from newspaper import Article

# Establecer el limite de descargas, lo aumentaré después de pruebas
limite = 4

datos = {'Noticias': {}}

# Cargar las páginas desde el JSON
with open('paginas.json', encoding='utf-8') as archivos_datos:
    paginas = json.load(archivos_datos)

# Iterar por cada página de noticias
for pagina, valor in paginas.items():
    print(f"Descargando artículos de: {pagina}")

    newsPaper = {
        "pagina": pagina,
        "link": valor['link'],
        "articulos": []
    }

    contador = 0  # Se reinicia para cada página

    # Si hay un RSS, se le da prioridad
    if 'rss' in valor:
        v = fp.parse(valor['rss'])

        for entrada in v.entries:
            if contador >= limite:
                break

            try:
                contenido = Article(entrada.link)
                contenido.download()
                contenido.parse()

                article = {
                    'titulo': contenido.title,
                    'texto': contenido.text,
                    'link': entrada.link
                }
                newsPaper['articulos'].append(article)

                print(f"{contador+1}. Artículo descargado de {pagina}, URL: {entrada.link}")
                contador += 1

            except Exception as e:
                print(f"Error al descargar {entrada.link}: {e}")
                print("Continuando...")
                continue

    else:
        # Si no hay RSS, se usa Newspaper
        hoja = newspaper.build(valor['link'], memoize_articles=False)

        for contenido in hoja.articles:
            if contador >= limite:
                break

            try:
                contenido.download()
                contenido.parse()

                article = {
                    'titulo': contenido.title,
                    'texto': contenido.text,
                    'link': contenido.url
                }
                newsPaper['articulos'].append(article)

                print(f"{contador+1}. Artículo descargado de {pagina}, URL: {contenido.url}")
                contador += 1

            except Exception as e:
                print(f"Error al descargar {contenido.url}: {e}")
                print("Continuando...")
                continue

    # Guardar los datos en la estructura final
    datos['Noticias'][pagina] = newsPaper

# Guardar en el archivo JSON (noticias.json)
try:
    with open('noticias.json', 'w', encoding='utf-8') as outfile:
        json.dump(datos, outfile, ensure_ascii=False, indent=4)
    print("Noticias guardadas en noticias.json")
except Exception as e:
    print(f"Error al guardar noticias.json: {e}")