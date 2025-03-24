"use client";

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from "next/navigation";
import MainLayout from '../components/layout/mainLayout';
import { Footer } from '@/app/components/layout/footer';


export const Lives = async () => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            authorization: 'Bearer 3eYgBOgZIU9N5Wfgi15H2ASzZ0aIGB_zpLHl3fKZgTgSC9zbVq4'
        }
    };

    try {
        const response = await fetch('https://api.pandascore.co/teams?filter[videogame_id][0]=1&sort=acronym&page=1&per_page=50', options);
        const data = await response.json();
        return data;
    } catch (err) {
        console.error(err);
        return [];
    }
};

export default function TeamsPage() {
    const [teams, setTeams] = useState([]);
    const pathname = usePathname();

    useEffect(() => {
        const fetchTeams = async () => {
            const data = await Lives();
            setTeams(data);
        };

        fetchTeams();
    }, []);

    return (
        <div>
            <MainLayout>
                <div className="teams-container">
                    <h1 className="text-2xl font-bold">Teams</h1>
                    <ul>
                        {teams.length > 0 ? (
                            teams.map((team: any) => (
                                <li key={team.id} className="team-item">
                                    <p><strong>Name:</strong> {team.name}</p>
                                    <p><strong>Acronym:</strong> {team.acronym}</p>
                                </li>
                            ))
                        ) : (
                            <p>Loading teams...</p>
                        )}
                    </ul>
                </div>
                <Footer />
            </MainLayout>
        </div>
    );
}