"use client";

import { useState, useEffect } from 'react';
import { usePathname } from "next/navigation";
import MainLayout from '../components/layout/mainLayout';
import { Footer } from '@/app/components/layout/footer';

export const fetchVideogames = async () => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            authorization: 'Bearer 3eYgBOgZIU9N5Wfgi15H2ASzZ0aIGB_zpLHl3fKZgTgSC9zbVq4' // Token de autorización de Pandascore
        }
    };

    try {
        const response = await fetch('https://api.pandascore.co/videogames?page=1&per_page=80', options); // Se modifica la URL si se quiere un filtro distinto
        if (!response.ok) {
            const errorDetails = await response.text();
            console.error(`Error ${response.status}:`, errorDetails);
            throw new Error(`Error ${response.status}: ${errorDetails}`);
        }
        const data = await response.json();
        return data;
    } catch (err) {
        console.error("API Error:", err);
        return [];
    }
};

export default function VideogamesPage() {
    const [videogames, setVideogames] = useState([]);
    const pathname = usePathname();

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchVideogames(); // Llama a la función fetchVideogames para obtener los datos de los videojuegos
            console.log("Fetched videogames:", data); // Verifica los datos aquí
            setVideogames(data);
        };

        fetchData();
    }, []);

    console.log("Rendering videogames:", videogames); // Verifica los datos en el renderizado

    return (
        <div>
            <MainLayout>
                <div className="videogames-container">
                    <h1 className="text-2xl font-bold">Videojuegos eSports</h1>
                    <ul>
                        {Array.isArray(videogames) && videogames.length > 0 ? (
                            videogames.map((videogame: any) => (
                                <li key={videogame.id} className="videogame-item">
                                    <p>{videogame.name}</p>
                                </li>
                            ))
                        ) : (
                            <p>Cargando todos los juegos...</p> // Mensaje de carga, si no funciona la carga de videojuegos se quedará ese mensaje en la pantalla
                        )}
                    </ul>
                </div>
                <Footer />
            </MainLayout>
        </div>
    );
}