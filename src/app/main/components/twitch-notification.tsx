import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTheme } from '@/context/theme-context';

interface Channel {
    name: string;
    url: string;
    isLive: boolean;
    profileImage?: string;
    viewerCount?: number;
    title?: string;
}

const TwitchNotification: React.FC = () => {
    const { theme } = useTheme();
    const channels: Channel[] = [
        { name: 'LPL English', url: 'https://www.twitch.tv/lplenglish', isLive: false },
        { name: 'Esportmaniacos', url: 'https://www.twitch.tv/esportmaniacos', isLive: false },
        { name: 'Caedrel', url: 'https://www.twitch.tv/caedrel', isLive: false },
        { name: 'LVPES', url: 'https://www.twitch.tv/lvpes', isLive: false },
        { name: 'LVPES2', url: 'https://www.twitch.tv/lvpes2', isLive: false },
        { name: 'Galandarx', url: 'https://www.twitch.tv/galandarx', isLive: false },
        { name: 'LCK', url: 'https://www.twitch.tv/lck', isLive: false },
        { name: 'LCS', url: 'https://www.twitch.tv/lcs', isLive: false },
        { name: 'LEC', url: 'https://www.twitch.tv/lec', isLive: false },
        { name: 'Riot Games', url: 'https://www.twitch.tv/riotgames', isLive: false },
        { name: 'Riot Games Esports', url: 'https://www.twitch.tv/riotgamesesports', isLive: false },
        { name: 'Riot Games EU', url: 'https://www.twitch.tv/riotgameseu', isLive: false },
        { name: 'Riot Games NA', url: 'https://www.twitch.tv/riotgamesna', isLive: false },
        { name: 'Toad Amarillo', url: 'https://www.twitch.tv/toadamarillo', isLive: false },
        { name: 'Circuito Tormenta', url: 'https://www.twitch.tv/circuitotormenta', isLive: false },
        { name: 'ACE', url: 'https://www.twitch.tv/ligaaceesports', isLive: false },
        { name: 'PrimeLeague', url: 'https://www.twitch.tv/primeleague', isLive: false },
    ];

    const [channelStatuses, setChannelStatuses] = useState<Channel[]>(channels);
    const [liveChannels, setLiveChannels] = useState<Channel[]>([]);
    const [isAnyChannelLive, setIsAnyChannelLive] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [currentLiveChannel, setCurrentLiveChannel] = useState<Channel | null>(null);

    useEffect(() => {
        const fetchLiveStatus = async () => {
            try {
                const updatedChannels = await Promise.all(
                    channels.map(async (channel) => {
                        try {
                            const channelData = await getChannelData(channel.name);
                            return {
                                ...channel,
                                isLive: channelData.isLive,
                                profileImage: channelData.profileImage,
                                viewerCount: channelData.viewerCount,
                                title: channelData.title
                            };
                        } catch (channelError) {
                            console.error(`Error fetching data for ${channel.name}:`, channelError);
                            return { ...channel, isLive: false };
                        }
                    })
                );

                setChannelStatuses(updatedChannels);

                const live = updatedChannels.filter(channel => channel.isLive);
                setLiveChannels(live);
                setIsAnyChannelLive(live.length > 0);

                if (live.length > 0) {
                    setCurrentLiveChannel(live[0]);
                } else {
                    setCurrentLiveChannel(null);
                }
            } catch (error) {
                console.error('Error fetching live statuses:', error);
                setIsAnyChannelLive(false);
                setCurrentLiveChannel(null);
            }
        };

        fetchLiveStatus();
        const interval = setInterval(fetchLiveStatus, 60000); // Update cada 60 segundos

        return () => clearInterval(interval);
    }, []);

    const getChannelData = async (channelName: string): Promise<{
        isLive: boolean;
        profileImage?: string;
        viewerCount?: number;
        title?: string;
    }> => {
        const clientId = 'axwf6h7w35wbl24nyiup5klqd8ta0y';
        const accessToken = 'v4mkes0vkiptw2wiol2qoe9c361igt';
        const defaultResult = { isLive: false };

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000); // Timeout de 5 segundos

            let profileImage: string | undefined;
            try {
                const userResponse = await fetch(
                    `https://api.twitch.tv/helix/users?login=${channelName}`,
                    {
                        method: 'GET',
                        headers: {
                            'Client-ID': clientId,
                            'Authorization': `Bearer ${accessToken}`,
                        },
                        signal: controller.signal
                    }
                );

                if (userResponse.ok) {
                    const userData = await userResponse.json();
                    profileImage = userData.data && userData.data.length > 0 ?
                        userData.data[0].profile_image_url : undefined;
                } else {
                    console.warn(`Could not fetch profile for ${channelName}: ${userResponse.status}`);
                }
            } catch (userError) {
                console.warn(`Error fetching user data for ${channelName}:`, userError);
            }

            clearTimeout(timeoutId);

            const streamController = new AbortController();
            const streamTimeoutId = setTimeout(() => streamController.abort(), 5000);

            try {
                const streamResponse = await fetch(
                    `https://api.twitch.tv/helix/streams?user_login=${channelName}`,
                    {
                        method: 'GET',
                        headers: {
                            'Client-ID': clientId,
                            'Authorization': `Bearer ${accessToken}`,
                        },
                        signal: streamController.signal
                    }
                );

                clearTimeout(streamTimeoutId);

                if (!streamResponse.ok) {
                    console.warn(`Error fetching stream data for ${channelName}: ${streamResponse.status}`);
                    return { isLive: false, profileImage };
                }

                const streamData = await streamResponse.json();
                const isLive = streamData.data && streamData.data.length > 0;

                if (isLive) {
                    const stream = streamData.data[0];
                    return {
                        isLive: true,
                        profileImage,
                        viewerCount: stream.viewer_count,
                        title: stream.title
                    };
                }

                return { isLive: false, profileImage };
            } catch (streamError) {
                clearTimeout(streamTimeoutId);
                console.warn(`Error checking stream status for ${channelName}:`, streamError);
                return { isLive: false, profileImage };
            }
        } catch (error) {
            console.error(`Unexpected error for ${channelName}:`, error);
            return defaultResult;
        }
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <div className="relative">
            <button
                onClick={toggleDropdown}
                className={`relative flex items-center h-8 px-3 rounded transition-colors ${theme === 'dark'
                    ? 'bg-neutral-800 hover:bg-neutral-700'
                    : 'bg-gray-100 hover:bg-gray-200'
                    } ${!isAnyChannelLive ? 'justify-center' : 'justify-between'}`}
            >
                {currentLiveChannel && isAnyChannelLive ? (
                    <>
                        <div className="flex items-center">
                            <div className="relative w-6 h-6 mr-2 rounded-full overflow-hidden bg-gray-700 flex items-center justify-center">
                                {currentLiveChannel.profileImage ? (
                                    <img
                                        src={currentLiveChannel.profileImage}
                                        alt={currentLiveChannel.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <span className="text-xs text-gray-300">{currentLiveChannel.name.charAt(0)}</span>
                                )}
                            </div>
                            <span className="text-sm font-medium truncate max-w-[80px]">{currentLiveChannel.name}</span>
                        </div>
                        <div className="flex items-center ml-2">
                            <span className="relative flex h-3 w-3 ml-1">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
                            </span>
                        </div>
                    </>
                ) : (
                    <>
                        <span className="text-sm mr-1">Live</span>
                        <span className="relative flex h-3 w-3">
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-gray-500"></span>
                        </span>
                    </>
                )}
            </button>

            {showDropdown && (
                <div className={`absolute right-0 mt-2 w-80 rounded-md shadow-lg z-50 ${theme === 'dark'
                    ? 'bg-neutral-800 border border-neutral-700'
                    : 'bg-white border border-gray-200'
                    }`}>
                    <div className="p-3">
                        <h3 className={`text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                            }`}>
                            {isAnyChannelLive ? 'Canales en directo' : 'Canales de Twitch'}
                        </h3>

                        {isAnyChannelLive ? (
                            <ul className="space-y-3">
                                {liveChannels.map((channel) => (
                                    <li key={channel.name} className={`p-2 rounded ${theme === 'dark' ? 'hover:bg-neutral-700' : 'hover:bg-gray-50'
                                        }`}>
                                        <Link
                                            href={channel.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block"
                                        >
                                            <div className="flex items-center">
                                                <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3 bg-gray-700 flex items-center justify-center">
                                                    {channel.profileImage ? (
                                                        <img
                                                            src={channel.profileImage}
                                                            alt={channel.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        // Fallback for when no image is available
                                                        <span className="text-lg font-medium text-gray-300">{channel.name.charAt(0)}</span>
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center justify-between">
                                                        <p className={`text-sm font-medium truncate ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                                                            }`}>
                                                            {channel.name}
                                                        </p>
                                                        <div className="flex items-center ml-2">
                                                            <span className="flex items-center text-yellow-400 text-xs font-medium">
                                                                <span className="h-2 w-2 bg-yellow-500 rounded-full mr-1"></span>
                                                                LIVE
                                                            </span>
                                                        </div>
                                                    </div>
                                                    {channel.title && (
                                                        <p className={`text-xs truncate mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                                            }`}>
                                                            {channel.title}
                                                        </p>
                                                    )}
                                                    {channel.viewerCount !== undefined && (
                                                        <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                                                            }`}>
                                                            {channel.viewerCount.toLocaleString()} espectadores
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className={`text-sm py-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                }`}>
                                No hay canales en directo en este momento.
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TwitchNotification;