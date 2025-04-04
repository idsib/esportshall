"use client";

import { useState, useEffect } from 'react';
import { usePathname } from "next/navigation";
import MainLayout from '../components/layout/mainLayout';
import { Footer } from '@/app/components/layout/footer';

export const fetchTeams = async () => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            authorization: 'Bearer 3eYgBOgZIU9N5Wfgi15H2ASzZ0aIGB_zpLHl3fKZgTgSC9zbVq4'
        }
    };

    try {
        const response = await fetch('https://api.pandascore.co/teams?sort=acronym&page=1&per_page=50', options); // Se modifica la url si se quiere un filtro distinto
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

export default function TeamsPage() {
    const [teams, setTeams] = useState([]);
    const pathname = usePathname();

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchTeams(); // Llama a la función fetchTeams para obtener los datos de los equipos
            console.log("Fetched teams:", data); // Verifica los datos aquí
            setTeams(data);
        };

        fetchData();
    }, []);

    console.log("Rendering teams:", teams); // Verifica los datos en el renderizado

    return (
        <div>
            <MainLayout>
                <div className="teams-container">
                    <h1 className="text-2xl font-bold">Equipos eSports</h1>
                    <ul>
                        {Array.isArray(teams) && teams.length > 0 ? (
                            teams.map((team: any) => (
                                <li key={team.id} className="team-item">
                                    <p>{team.name}</p>
                                </li>
                            ))
                        ) : (
                            <p>Cargando todos los equipos...</p> // Mensaje de carga, si no funciona la carga de equipo se quedará ese mensaje en la pantalla
                        )}
                    </ul>
                </div>
                <Footer />
            </MainLayout>
        </div>
    );
}