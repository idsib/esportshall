"use client";

import { useState, useEffect } from 'react';
import { usePathname } from "next/navigation";
import MainLayout from '../components/layout/mainLayout';
import { Footer } from '@/app/components/layout/footer';
import { fetchVideogames } from '@/lib/api';

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