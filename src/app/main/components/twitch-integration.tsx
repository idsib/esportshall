import React, { useEffect, useState } from 'react';

interface Channel {
    name: string;
    url: string;
    isLive: boolean;
}

const TwitchIntegration: React.FC = () => {
    const channels: Channel[] = [
        { name: 'LPL English', url: 'https://www.twitch.tv/lplenglish', isLive: false },
        { name: 'Esportmaniacos', url: 'https://www.twitch.tv/esportmaniacos', isLive: false },
        { name: 'Caedrel', url: 'https://www.twitch.tv/caedrel', isLive: false },
        { name: 'LVPES', url: 'https://www.twitch.tv/lvpes', isLive: false },
    ];

    const [channelStatuses, setChannelStatuses] = useState<Channel[]>(channels);

    useEffect(() => {
        const fetchLiveStatus = async () => {
            try {
                const updatedChannels = await Promise.all(
                    channels.map(async (channel) => {
                        const isLive = await checkIfChannelIsLive(channel.name);
                        return { ...channel, isLive };
                    })
                );
                setChannelStatuses(updatedChannels);
            } catch (error) {
                console.error('Error fetching live statuses:', error);
            }
        };

        fetchLiveStatus();
        const interval = setInterval(fetchLiveStatus, 60000); // Se actualiza cada 60 segundos

        return () => clearInterval(interval);
    }, []);

    const checkIfChannelIsLive = async (channelName: string): Promise<boolean> => {
        const clientId = 'axwf6h7w35wbl24nyiup5klqd8ta0y'; // Client ID de Twitch
        const accessToken = 'v4mkes0vkiptw2wiol2qoe9c361igt'; // Access Token de Twitch (valido durante 64 días)

        try {
            const response = await fetch(
                `https://api.twitch.tv/helix/streams?user_login=${channelName}`,
                {
                    method: 'GET',
                    headers: {
                        'Client-ID': clientId,
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            if (!response.ok) {
                console.error(`Error fetching live status for ${channelName}:`, response.statusText);
                return false;
            }

            const data = await response.json();
            return data.data && data.data.length > 0; // Si hay datos, es porque el canal está en directo
        } catch (error) {
            console.error(`Error checking live status for ${channelName}:`, error);
            return false;
        }
    };

    return (
        <div>
            <h1>¡Canales en directo!</h1>
            <ul>
                {channelStatuses.map((channel) => (
                    <li key={channel.name}>
                        <a href={channel.url} target="_blank" rel="noopener noreferrer">
                            {channel.name}{' '}
                            {channel.isLive && <span style={{ color: 'red', fontWeight: 'bold' }}>LIVE 🔴</span>}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TwitchIntegration;