'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Nav from "../components/layout/nav";
import { Footer } from "../components/layout/footer";

const Games = () => {
    const router = useRouter();

    // Aquí se añaden los juegos que se quieran mostrar en la página, si se quiere añadir un nuevo se tiene que hacer debajo de los demás con un id superior.
    const games = [
        {
            id: 1,
            title: 'AxoFlip',
            image: 'https://img.freepik.com/fotos-premium/ilustracion-creativa-axolotl-descansando-pacificamente-roca-rodeado-brillantes-plantas-acuaticas-ambiente-azul-sereno_167689-5323.jpg',
            link: '/games/axoflip',
            genre: 'Action',
            description: 'Un juego de plataformas único con un axolotl como protagonista'
        },
        {
            id: 2,
            title: 'The Snake',
            image: 'https://www.snakegame.net/media/google-snake-game.png',
            link: '/games/thesnake',
            genre: 'Arcade',
            description: 'El clásico juego de la serpiente con un toque moderno'
        },
        {
            id: 3,
            title: 'Floppy Bird',
            image: 'https://cloudfront-us-east-1.images.arcpublishing.com/elespectador/47DP3QPAENGJXC6W7WXEZY7MM4.jpg',
            link: '/games/floppybird',
            genre: 'Action',
            description: 'Una versión única del famoso juego Flappy Bird'
        },
        {
            id: 4,
            title: 'Tetris',
            image: 'https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2018/07/tetris.jpg?tf=3840x',
            link: '/games/tetris',
            genre: 'Arcade',
            description: 'El rompecabezas clásico que todos conocemos'
        },
        {
            id: 5,
            title: 'Pac-Man',
            image: 'https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2020/04/pac-man-1931043.jpg?tf=3840x',
            link: '/games/pacman',
            genre: 'Arcade',
            description: 'El videojuego arcade más famoso de todos los tiempos'
        },
        {
            id: 6,
            title: '2048',
            image: 'https://images.crazygames.com/games/2048/cover_16x9-1707828856995.png?auto=format,compress&q=75&cs=strip',
            link: '/games/2048',
            genre: 'Puzzle',
            description: 'El juego de lógica matemática que te hará pensar'
        },
    ];

    const genres = Array.from(new Set(games.map(game => game.genre)));

    const categories = [
        { id: 'new', title: 'Nuevos Juegos', games: games },
        ...genres.map(genre => ({
            id: genre.toLowerCase(),
            title: genre,
            games: games.filter(game => game.genre === genre)
        }))
    ];

    const handleGameClick = (link: string) => {
        router.push(link);
    };

    return (
        <>
            <Nav />
            <div className="min-h-screen bg-gray-50 dark:bg-dark-100">
                {/* Hero Section */}
                <div className="relative h-[50vh] w-full">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-50 dark:to-dark-100 z-10" />
                    <img
                        src={games[0].image}
                        alt="Featured Game"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 p-8 z-20">
                        <h1 className="text-4xl font-bold text-white mb-2">{games[0].title}</h1>
                        <p className="text-gray-200 mb-4">{games[0].description}</p>
                        <button
                            onClick={() => handleGameClick(games[0].link)}
                            className="bg-brand-yellow hover:bg-yellow-600 text-black px-6 py-2 rounded-full transition-colors"
                        >
                            Jugar Ahora
                        </button>
                    </div>
                </div>

                {/* Back Button */}
                <div className="container mx-auto px-4 py-6">
                    <button
                        onClick={() => router.push('/')}
                        className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-brand-yellow transition-colors mb-6"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span>Volver al inicio</span>
                    </button>

                    {/* Categories */}
                    {categories.map((category) => (
                        <section key={category.id} className="mb-12">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                {category.title}
                            </h2>
                            <div className="flex space-x-6 overflow-x-auto pb-6 scrollbar-hide">
                                {category.games.map((game) => (
                                    <div
                                        key={game.id}
                                        className="flex-none w-[250px] transform transition-transform hover:scale-105 cursor-pointer"
                                        onClick={() => handleGameClick(game.link)}
                                    >
                                        <div className="relative rounded-lg overflow-hidden shadow-lg">
                                            <img
                                                src={game.image}
                                                alt={game.title}
                                                className="w-full h-[150px] object-cover"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity">
                                                <div className="absolute bottom-0 p-4 w-full">
                                                    <h3 className="text-white font-semibold">{game.title}</h3>
                                                    <p className="text-gray-200 text-sm">{game.genre}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Games;