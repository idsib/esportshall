import { NextRequest, NextResponse } from 'next/server';

// Configuración CORS - permitimos tanto el origen específico como localhost para desarrollo
const ALLOWED_ORIGIN = 'https://esportshall.es, http://localhost:3000, https://esportshall.vercel.app';

// Manejador de OPTIONS mejorado para el preflight de CORS
export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, authorization, x-auth-token',
      'Access-Control-Allow-Credentials': 'true',
    },
  });
}

export async function GET(request: NextRequest) {
  try {
    // Obtener los parámetros de la URL
    const { searchParams } = new URL(request.url);
    const endpoint = searchParams.get('endpoint') || '';
    
    // Verificar que se proporcionó un endpoint
    if (!endpoint) {
      return NextResponse.json({ error: 'Endpoint parameter is required' }, { 
        status: 400,
        headers: {
          'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization, authorization, x-auth-token',
          'Access-Control-Allow-Credentials': 'true',
        }
      });
    }
    
    // Construir la URL para la API de PandaScore
    const apiUrl = `https://api.pandascore.co/${endpoint}`;
    
    // Obtener el token de API del entorno - intentamos ambas versiones de la variable
    // Primero intentamos la versión sin prefijo (mejor para servidor)
    // Si no existe, usamos la versión con prefijo NEXT_PUBLIC_
    const apiToken = process.env.PANDASCORE_API_TOKEN || process.env.NEXT_PUBLIC_PANDASCORE_API_TOKEN;
    
    if (!apiToken) {
      console.error('No se encontró el token de API de PandaScore en las variables de entorno');
      console.error('Variables disponibles:', Object.keys(process.env).filter(key => key.includes('PANDA')));
      return NextResponse.json({ error: 'API token is not configured' }, { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization, authorization, x-auth-token',
          'Access-Control-Allow-Credentials': 'true',
        }
      });
    }
    
    // Preparar los parámetros para reenviar a la API de PandaScore
    const forwardParams = new URLSearchParams();
    
    // Copiar todos los parámetros excepto 'endpoint'
    searchParams.forEach((value, key) => {
      if (key !== 'endpoint') {
        forwardParams.append(key, value);
      }
    });
    
    // Construir la URL completa con los parámetros
    const fullUrl = `${apiUrl}${forwardParams.toString() ? `?${forwardParams.toString()}` : ''}`;
    
    console.log(`Proxying request to: ${fullUrl}`);
    
    // Hacer la solicitud a la API de PandaScore
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${apiToken}`
      },
      cache: 'no-store' // Desactivar caché para evitar problemas con CORS
    });
    
    // Verificar si la respuesta es exitosa
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`PandaScore API error (${response.status}):`, errorText);
      return NextResponse.json(
        { error: `PandaScore API error: ${response.statusText}`, details: errorText },
        { 
          status: response.status,
          headers: {
            'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization, authorization, x-auth-token',
            'Access-Control-Allow-Credentials': 'true',
          }
        }
      );
    }
    
    // Obtener los datos de la respuesta
    const data = await response.json();
    
    // Devolver los datos con headers CORS
    return NextResponse.json(data, {
      headers: {
        'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, authorization, x-auth-token',
        'Access-Control-Allow-Credentials': 'true',
      }
    });
  } catch (error) {
    console.error('Error proxying request to PandaScore API:', error);
    return NextResponse.json(
      { error: 'Error proxying request to PandaScore API' },
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization, authorization, x-auth-token',
          'Access-Control-Allow-Credentials': 'true',
        }
      }
    );
  }
}
