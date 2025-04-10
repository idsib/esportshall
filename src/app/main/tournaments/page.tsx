"use client";

import { useState, useEffect } from 'react';
import { usePathname } from "next/navigation";
import MainLayout from '../components/layout/mainLayout';
import { Footer } from '@/app/components/layout/footer';

export const fetchTournaments = async () => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            authorization: 'Bearer 3eYgBOgZIU9N5Wfgi15H2ASzZ0aIGB_zpLHl3fKZgTgSC9zbVq4'
        }
    };

    try {
        const response = await fetch('https://api.pandascore.co/valorant/tournaments/upcoming', options); // URL para obtener torneos de League of Legends
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

export default function TournamentsPage() {
    const [tournaments, setTournaments] = useState([]);
    const pathname = usePathname();

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchTournaments(); // Llama a la función fetchTournaments para obtener los datos de los torneos
            console.log("Fetched tournaments:", data); // Verifica los datos aquí
            setTournaments(data);
        };

        fetchData();
    }, []);

    console.log("Rendering tournaments:", tournaments); // Verifica los datos en el renderizado

    return (
        <div>
            <MainLayout>
                <div className="tournaments-container">
                    <h1 className="text-2xl font-bold">Torneos de League of Legends</h1>
                    <ul>
                        {Array.isArray(tournaments) && tournaments.length > 0 ? (
                            tournaments.map((tournament: any) => (
                                <li key={tournament.id} className="tournament-item">
                                    <p><strong>Nombre:</strong> {tournament.name}</p>
                                    <p><strong>region:</strong> {tournament.region}</p>
                                    <p><strong>country:</strong> {tournament.country}</p>
                                    <p><strong>id:</strong> {tournament.id}</p>
                                    <p><strong>price:</strong> {tournament.prizepool}</p>
                                    <p><strong>Inicio:</strong> {tournament.begin_at || "Por confirmar"}</p>
                                    <p><strong>Fin:</strong> {tournament.end_at || "Por confirmar"}</p>
                                </li>
                            ))
                        ) : (
                            <p>Cargando todos los torneos...</p> // Mensaje de carga, si no funciona la carga de torneos se quedará ese mensaje en la pantalla
                        )}
                    </ul>
                </div>
                <Footer />
            </MainLayout>
        </div>
    );
}