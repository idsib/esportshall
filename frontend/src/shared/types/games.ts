export type Game = {
  id: string;
  name: string;
  slug: string;
  imageUrl: string;
  description: string;
  // Add other game-related fields as needed
};

export const GAMES: Game[] = [
  {
    id: 'lol',
    name: 'League of Legends',
    slug: 'lol',
    imageUrl: '/games/lol.jpg',
    description: '...',
  },
  {
    id: 'valorant',
    name: 'Valorant',
    slug: 'valorant',
    imageUrl: '/games/valorant.jpg',
    description: '...',
  }
];
