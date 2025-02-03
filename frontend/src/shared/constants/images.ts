export const ImagePaths = {
  games: {
    base: '/images/games',
    getGameImage: (slug: string) => `/images/games/${slug}.jpg`,
  },
  players: {
    base: '/images/players',
    getPlayerImage: (id: string) => `/images/players/${id}.jpg`,
  },
  teams: {
    base: '/images/teams',
    getTeamLogo: (id: string) => `/images/teams/${id}.png`,
  },
  logos: {
    base: '/images/logos',
    siteLogo: '/images/logos/site-logo.png',
  },
  backgrounds: {
    base: '/images/backgrounds',
  },
  icons: {
    base: '/images/icons',
  },
} as const;
