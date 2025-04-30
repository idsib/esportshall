import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export async function GET() {
  try {
    // Ruta al archivo de noticias
    const filePath = path.join(process.cwd(), 'src/app/main/web-crawler/noticias.json');
    
    // Leer el archivo
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const noticias = JSON.parse(fileContents);

    return NextResponse.json(noticias);
  } catch (error) {
    console.error('Error al leer las noticias:', error);
    return NextResponse.json(
      { error: 'Error al cargar las noticias' },
      { status: 500 }
    );
  }
} 