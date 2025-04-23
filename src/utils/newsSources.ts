export type GameType = 'all' | 'lol' | 'valorant' | 'cs2';

export interface NewsSource {
  name: string;
  url: string;
  feeds: Record<GameType, string>;
}

export const newsSources: Record<string, NewsSource> = {
  newsAPI: {
    name: "NewsAPI",
    url: "https://newsapi.org",
    feeds: {
      lol: "https://newsapi.org/v2/everything?q=league+of+legends&language=es&sortBy=publishedAt",
      valorant: "https://newsapi.org/v2/everything?q=valorant&language=es&sortBy=publishedAt",
      cs2: "https://newsapi.org/v2/everything?q=(cs2+OR+counter-strike)&language=es&sortBy=publishedAt",
      all: "https://newsapi.org/v2/everything?q=(league+of+legends+OR+valorant+OR+cs2+OR+counter-strike)&language=es&sortBy=publishedAt"
    }
  }
};

export const games = [
  { id: 'all', name: 'Todos los juegos', icon: '🎮' },
  { id: 'lol', name: 'League of Legends', icon: '⚔️' },
  { id: 'valorant', name: 'Valorant', icon: '🔫' },
  { id: 'cs2', name: 'CS2', icon: '🎯' }
]; 