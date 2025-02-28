'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const Games = () => {
    const router = useRouter();

    const games = [
        { id: 1, title: 'AxoFlip', image: 'https://i.natgeofe.com/n/de94c416-6d23-45f5-9708-e8d56289268e/naturepl_01132178_3x2.jpg', link: '/games/axoflip', genre: 'Action' },
        { id: 2, title: 'The Snake', image: 'https://www.snakegame.net/media/google-snake-game.png', link: '/games/thesnake', genre: 'Action' },
        { id: 3, title: 'Floppy Bird', image: 'https://cloudfront-us-east-1.images.arcpublishing.com/elespectador/47DP3QPAENGJXC6W7WXEZY7MM4.jpg', link: '/games/floppybird', genre: 'Action' },
    ];

    const genres = Array.from(new Set(games.map(game => game.genre)));

    const handleGameClick = (link: string) => {
        router.push(link);
    };

    return (
        <div className="pt-24 pb-12 px-4 min-h-screen bg-gray-50 dark:bg-dark-100">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-brand-yellow text-center mb-12">
                    Esports Hall Games
                </h1>

                <div className="space-y-8 text-gray-800 dark:text-gray-200 bg-white dark:bg-dark-200 p-8 rounded-xl shadow-lg">
                    <section>
                        <h3 className="text-2xl font-semibold text-brand-yellow mb-4">Disfruta de los mejores juegos de navegador.</h3>
                    </section>

                    <section>
                        <h3 className="text-2xl font-semibold text-brand-yellow mb-4">Más Populares</h3>
                        <div className="flex overflow-x-auto space-x-4">
                            {games.map((game) => (
                                <div key={game.id} className="min-w-[200px] rounded-lg overflow-hidden shadow-lg cursor-pointer" onClick={() => handleGameClick(game.link)}>
                                    <img src={game.image} alt={game.title} className="w-full h-32 object-cover" />
                                    <div className="p-2 text-center">{game.title}</div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {genres.map((genre) => (
                        <section key={genre}>
                            <h3 className="text-2xl font-semibold text-brand-yellow mb-4">{genre}</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {games.filter(game => game.genre === genre).map((game) => (
                                    <div key={game.id} className="rounded-lg overflow-hidden shadow-lg cursor-pointer" onClick={() => handleGameClick(game.link)}>
                                        <img src={game.image} alt={game.title} className="w-full h-32 object-cover" />
                                        <div className="p-2 text-center">{game.title}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Games;