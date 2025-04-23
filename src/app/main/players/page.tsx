"use client";

import { useState, useEffect } from 'react';
import { usePathname } from "next/navigation";
import MainLayout from '../components/layout/mainLayout';
import { Footer } from '@/app/components/layout/footer';

export const fetchPlayers = async () => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            authorization: 'Bearer 3eYgBOgZIU9N5Wfgi15H2ASzZ0aIGB_zpLHl3fKZgTgSC9zbVq4' // Token de autorización de Pandascore
        }
    };

    try {
        const response = await fetch('https://api.pandascore.co/players?sort=birthday&page=1&per_page=80', options); // Se modifica la URL si se quiere un filtro distinto
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

export default function PlayersPage() {
    const [players, setPlayers] = useState([]);
    const pathname = usePathname();

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchPlayers(); // Llama a la función fetchPlayers para obtener los datos de los jugadores
            console.log("Fetched players:", data); // Verifica los datos aquí
            setPlayers(data);
        };

        fetchData();
    }, []);

    console.log("Rendering players:", players); // Verifica los datos en el renderizado

    return (
        <div>
            <MainLayout>
                <div className="players-container">
                    <h1 className="text-2xl font-bold">Jugadores eSports</h1>
                    <ul>
                        {Array.isArray(players) && players.length > 0 ? (
                            players.map((player: any) => (
                                <li key={player.id} className="player-item">
                                    <p><strong>Nombre:</strong> {player.name}</p>
                                    <p><strong>Alias:</strong> {player.slug}</p>
                                    <p><strong>Fecha de nacimiento:</strong> {player.birthday || "Desconocida"}</p>
                                </li>
                            ))
                        ) : (
                            <p>Cargando todos los jugadores...</p> // Mensaje de carga, si no funciona la carga de jugadores se quedará ese mensaje en la pantalla
                        )}
                    </ul>
                </div>
                <Footer />
            </MainLayout>
        </div>
    );
}