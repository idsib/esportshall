/**
 * Utility functions for PandaScore API integration
 */

// Funcion que rege la api en env
const getApiToken = (): string => {
  return process.env.NEXT_PUBLIC_PANDASCORE_API_TOKEN || '';
};

// API Opciones Base
const getApiOptions = () => {
  return {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization: `Bearer ${getApiToken()}`
    }
  };
};

// Juegos que se muestran
export type GameType = 'lol' | 'valorant' | 'cs2';

// Game display names mapping
export const gameDisplayNames: Record<GameType, string> = {
  lol: 'League of Legends',
  valorant: 'Valorant',
  cs2: 'CS2'
};

// Fetch de Teams con filtros
export const fetchTeams = async (page = 1, perPage = 50, game?: GameType, search?: string) => {
  const options = getApiOptions();
  let url = `https://api.pandascore.co/teams?sort=name&page=${page}&per_page=${perPage}`;
  
  // Filtro de Videojuego
  if (game) {
    url += `&filter[videogame]=${game}`;
  }
  
  // Filtro de Search
  if (search && search.trim() !== '') {
    url += `&search[name]=${encodeURIComponent(search.trim())}`;
  }

  try {
    const response = await fetch(url, options);
    
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

// Fetch Jugadores API
export const fetchPlayers = async (page = 1, perPage = 80, game?: GameType, search?: string) => {
  const options = getApiOptions();
  let url = `https://api.pandascore.co/players?sort=name&page=${page}&per_page=${perPage}`;
  
  // Añade filtro de videojuego
  if (game) {
    url += `&filter[videogame]=${game}`;
  }
  
  // Añade filtro de búsqueda
  if (search && search.trim() !== '') {
    url += `&search[name]=${encodeURIComponent(search.trim())}`;
  }

  try {
    const response = await fetch(url, options);
    
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

// Fetch del apartado Torneos con filtros
export const fetchTournaments = async (page = 1, perPage = 50, game: GameType = 'valorant', search?: string) => {
  const options = getApiOptions();
  
  // Map CS2 to cs-go for the API (as PandaScore still uses cs-go endpoint)
  const apiGame = game === 'cs2' ? 'csgo' : game;
  
  let url = `https://api.pandascore.co/${apiGame}/tournaments?page=${page}&per_page=${perPage}`;
  
  // Add search filter if specified
  if (search && search.trim() !== '') {
    url += `&search[name]=${encodeURIComponent(search.trim())}`;
  }

  try {
    const response = await fetch(url, options);
    
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

// Parametros API
export interface Team {
  id: number;
  name: string;
  acronym?: string;
  image_url?: string;
  location?: string;
  modified_at: string;
  slug: string;
  players?: Player[];
}

export interface Player {
  id: number;
  name: string;
  first_name?: string;
  last_name?: string;
  image_url?: string;
  nationality?: string;
  role?: string;
  slug: string;
  birthday?: string;
  modified_at: string;
  team?: Team;
}

export interface Tournament {
  id: number;
  name: string;
  slug: string;
  begin_at?: string;
  end_at?: string;
  league?: {
    id: number;
    name: string;
    image_url?: string;
  };
  series?: {
    id: number;
    name: string;
    full_name?: string;
  };
  winner_id?: number;
  winner_type?: string;
  prizepool?: string;
  modified_at: string;
  region?: string;
  country?: string;
}
