export type Game = {
  slug: 'lol' | 'valorant' | 'cs2';
  name: string;
  icon: string;
};

export const SUPPORTED_GAMES: Game[] = [
  { slug: 'lol', name: 'League of Legends', icon: '🎮' },
  { slug: 'valorant', name: 'Valorant', icon: '🔫' },
  { slug: 'cs2', name: 'Counter-Strike 2', icon: '💣' }
];
