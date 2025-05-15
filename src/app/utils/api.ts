/**
 * Este archivo se utiliza para recoger los parámetros de PandaScore API para que se puedan ver en nuestra web
 * De aquí se sacan los datos de los equipos, jugadores, torneos y partidos
 * Los datos no son nuestros, los recogemos de PandaScore con nuestro token
 */

// Función para construir la URL del proxy de API
const getProxyUrl = (endpoint: string, params: URLSearchParams): string => {
  // Añadir el endpoint como parámetro
  params.append('endpoint', endpoint);
  
  // Construir la URL del proxy
  return `/api/pandascore?${params.toString()}`;
};

// API Opciones Base
const getApiOptions = () => {
  return {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  };
};

// Juegos que se muestran
export type GameType = 'lol' | 'valorant' | 'cs2';

// Se muestra al usuario los juegos disponibles
export const gameDisplayNames: Record<GameType, string> = {
  lol: 'League of Legends',
  valorant: 'Valorant',
  cs2: 'CS2'
};

// Fetch de Teams con filtros
export const fetchTeams = async (
  page = 1,
  perPage = 50,
  game?: GameType,
  search?: string,
  teamId?: number,
  location?: string
) => {
  try {
    // Crear los parámetros de la consulta
    const params = new URLSearchParams();
    params.append('sort', 'name');
    params.append('page', String(page));
    params.append('per_page', String(perPage));

    // Filtro de Videojuego - usando el parámetro correcto según la documentación
    if (game) {
      // Map CS2 to cs-go for the API (as PandaScore still uses cs-go endpoint)
      const apiGame = game === 'cs2' ? 'csgo' : game;
      // Usamos videogame_id para filtrar por juego
      const videogameIds: Record<string, number> = {
        'lol': 1,     // League of Legends
        'csgo': 3,    // CS:GO/CS2
        'valorant': 26 // Valorant
      };
      
      // Verificamos que el juego exista en nuestro mapeo
      if (videogameIds[apiGame] !== undefined) {
        params.append('filter[videogame_id]', String(videogameIds[apiGame]));
      }
    }

    // Filtro por ID de equipo si se especifica
    if (teamId) {
      params.append('filter[id]', String(teamId));
    }

    // Filtro por ubicación si se especifica
    if (location) {
      params.append('filter[location]', location);
    }

    // Filtro de Search por nombre
    if (search && search.trim() !== '') {
      params.append('search[name]', search.trim());
    }

    // Construir la URL del proxy
    const url = getProxyUrl('teams', params);
    const options = getApiOptions();

    // Realizar la solicitud
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
export const fetchPlayers = async (
  page = 1,
  perPage = 50,
  game?: GameType,
  search?: string,
  playerId?: number,
  nationality?: string
) => {
  try {
    // Crear los parámetros de la consulta
    const params = new URLSearchParams();
    params.append('sort', 'name');
    params.append('page', String(page));
    params.append('per_page', String(perPage));

    // Filtro de Videojuego - usando el parámetro correcto según la documentación
    if (game) {
      // Map CS2 to cs-go for the API (as PandaScore still uses cs-go endpoint)
      const apiGame = game === 'cs2' ? 'csgo' : game;
      // Usamos videogame_id para filtrar por juego
      const videogameIds: Record<string, number> = {
        'lol': 1,     // League of Legends
        'csgo': 3,    // CS:GO/CS2
        'valorant': 26 // Valorant
      };
      
      // Verificamos que el juego exista en nuestro mapeo
      if (videogameIds[apiGame] !== undefined) {
        params.append('filter[videogame_id]', String(videogameIds[apiGame]));
      }
    }

    // Filtro por ID de jugador si se especifica
    if (playerId) {
      params.append('filter[id]', String(playerId));
    }

    // Filtro por nacionalidad si se especifica
    if (nationality) {
      params.append('filter[nationality]', nationality);
    }

    // Filtro de Search por nombre
    if (search && search.trim() !== '') {
      params.append('search[name]', search.trim());
    }

    // Construir la URL del proxy
    const url = getProxyUrl('players', params);
    const options = getApiOptions();

    // Realizar la solicitud
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
  try {
    // Map CS2 to cs-go for the API (as PandaScore still uses cs-go endpoint)
    const apiGame = game === 'cs2' ? 'csgo' : game;
    
    // Mapeo de juegos a sus respectivos endpoints en PandaScore
    const gameEndpoints: Record<string, string> = {
      'lol': 'lol',
      'csgo': 'csgo',
      'valorant': 'valorant'
    };
    
    // Verificar que el juego exista en nuestro mapeo
    if (!gameEndpoints[apiGame]) {
      console.warn(`Game type '${game}' not found in gameEndpoints.`);
      return [];
    }
    
    // Crear los parámetros de la consulta
    const params = new URLSearchParams();
    params.append('page', String(page));
    params.append('per_page', String(perPage));
    
    // Add search filter if specified
    if (search && search.trim() !== '') {
      params.append('search[name]', search.trim());
    }
    
    // Construir la URL del proxy
    const endpoint = `${gameEndpoints[apiGame]}/tournaments`;
    const url = getProxyUrl(endpoint, params);
    const options = getApiOptions();
    
    // Realizar la solicitud
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

// Fetch de Matches con filtros
export const fetchMatches = async (
  page = 1,
  perPage = 50,
  game?: GameType,
  search?: string,
  status?: 'running' | 'not_started' | 'finished',
  tournamentId?: number,
  teamId?: number,
  sort?: string
) => {
  try {
    // Crear los parámetros de la consulta
    const params = new URLSearchParams();

    // Parámetros de paginación
    params.append('page', String(page));
    params.append('per_page', String(perPage));

    // Parámetro de ordenación
    if (sort && typeof sort === 'string') {
      params.append('sort', sort);
    } else {
      // Por defecto, ordenar por fecha de inicio (más recientes primero)
      params.append('sort', '-begin_at');
    }

    // Filtro de Videojuego
    if (game) {
      // Mapear los slugs de videojuegos que espera la API
      const gameMapping: Record<string, string> = {
        'lol': 'league-of-legends',
        'csgo': 'cs-go',
        'cs2': 'cs-go',  // CS2 se mapea a CS:GO en la API
        'valorant': 'valorant'
      };

      // Verificar si el juego existe en nuestro mapeo
      const mappedGame = gameMapping[game];
      if (mappedGame) {
        // Usar el slug del videojuego para filtrar
        params.append('filter[videogame]', mappedGame);
      } else {
        console.warn(`Game type '${game}' not found in gameMapping.`);
      }
    }

    // Filtro por estado del partido
    if (status) {
      params.append('filter[status]', status);
    }

    // Filtro por torneo
    if (tournamentId) {
      params.append('filter[tournament_id]', String(tournamentId));
    }

    // Filtro por equipo
    if (teamId) {
      params.append('filter[team_id]', String(teamId));
    }

    // Filtro de búsqueda por nombre
    if (search && search.trim() !== '') {
      params.append('search[name]', search.trim());
    }

    // Construir la URL del proxy
    const url = getProxyUrl('matches', params);
    const options = getApiOptions();

    // Realizar la solicitud
    const response = await fetch(url, options);    

    if (!response.ok) {
      const errorDetails = await response.text();
      console.error(`Error ${response.status}:`, errorDetails);
      throw new Error(`Error ${response.status}: ${errorDetails}`);
    }

    const data = await response.json();
    console.log('Matches data received:', data.length);
    return data;
  } catch (err) {
    console.error("API Error:", err);
    // Devolver un array vacío en caso de error para evitar que la UI se rompa
    return [];
  }
};

// Fetch de videojuegos
export interface Videogame {
  id: number;
  name: string;
  slug: string;
  current_version?: string;
  image_url?: string;
  description?: string;
  release_date?: string;
  platforms?: string[];
  publisher?: string;
  developer?: string;
}

export const fetchVideogames = async (page = 1, perPage = 50, search?: string) => {
  try {
    const options = getApiOptions();

    // Construir la URL base
    let url = 'https://api.pandascore.co/videogames';

    // Añadir parámetros como query string
    const params = new URLSearchParams();

    // Parámetros de paginación
    params.append('page', String(page));
    params.append('per_page', String(perPage));

    // Parámetro de ordenación (por defecto, ordenar por nombre)
    params.append('sort', 'name');

    // Filtro de búsqueda
    if (search && search.trim() !== '') {
      params.append('search[name]', search.trim());
    }

    // Añadir parámetros a la URL
    url = `${url}?${params.toString()}`;

    console.log('Fetching videogames with URL:', url);

    // Realizar la petición
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorDetails = await response.text();
      console.error(`Error ${response.status}:`, errorDetails);
      throw new Error(`Error ${response.status}: ${errorDetails}`);
    }

    const data = await response.json();
    console.log('Videogames data received:', data.length);
    return data as Videogame[];
  } catch (err) {
    console.error("API Error:", err);
    // Devolver un array vacío en caso de error para evitar que la UI se rompa
    return [];
  }
};

// Fetch de ligas
export const fetchLeagues = async (
  page = 1,
  perPage = 50,
  game?: GameType,
  search?: string
) => {
  try {
    const options = getApiOptions();

    // Construir la URL base según el juego seleccionado
    const baseUrl = 'https://api.pandascore.co';

    // Mapear los slugs de videojuegos que espera la API
    let endpoint = '/leagues';

    if (game) {
      switch (game) {
        case 'valorant':
          endpoint = '/valorant/leagues';
          break;
        case 'lol':
          endpoint = '/lol/leagues';
          break;
        case 'cs2':
          endpoint = '/csgo/leagues';
          break;
      }
      console.log(`Using game-specific endpoint: ${endpoint}`);
    } else {
      console.warn('Using general leagues endpoint');
    }

    // Añadir parámetros como query string
    const params = new URLSearchParams();

    // Parámetros de paginación
    params.append('page', String(page));
    params.append('per_page', String(perPage));

    // Parámetro de ordenación (por defecto, ordenar por nombre)
    params.append('sort', 'name');

    // Filtro de búsqueda
    if (search) {
      params.append('search[name]', search);
    }

    // Construir la URL final
    const finalUrl = `${baseUrl}${endpoint}?${params.toString()}`;
    console.log(`Requesting leagues from: ${finalUrl}`);

    // Realizar la petición
    const response = await fetch(finalUrl, options);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("API Error:", err);
    return [];
  }
};

// Fetch de partidos en vivo (mantenemos esta función por compatibilidad)
export const fetchLiveMatches = async (game?: GameType) => {
  try {
    const options = getApiOptions();

    // Construir la URL base
    let url = 'https://api.pandascore.co/lives';

    // Añadir parámetros como query string
    const params = new URLSearchParams();

    // Filtro de Videojuego si se especifica
    if (game) {
      // Map CS2 to cs-go for the API (as PandaScore still uses cs-go endpoint)
      const apiGame = game === 'cs2' ? 'csgo' : game;

      // Filtrar por slug del videojuego
      params.append('filter[videogame]', apiGame);
    }

    // Añadir parámetros a la URL si hay alguno
    if (params.toString()) {
      url = `${url}?${params.toString()}`;
    }

    console.log('Fetching live matches with URL:', url);

    // Realizar la petición
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorDetails = await response.text();
      console.error(`Error ${response.status}:`, errorDetails);
      throw new Error(`Error ${response.status}: ${errorDetails}`);
    }

    const data = await response.json();
    console.log('Live matches data received:', data.length);
    return data;
  } catch (err) {
    console.error("API Error:", err);
    // Devolver un array vacío en caso de error para evitar que la UI se rompa
    return [];
  }
};

// API de ligas
export interface League {
  id: number;
  name: string;
  image_url?: string;
  slug: string;
  url?: string;
  videogame: {
    id: number;
    name: string;
    slug: string;
  };
  series?: {
    id: number;
    name: string;
    slug: string;
    full_name?: string;
  }[];
  modified_at: string;
}
// API de equipos
export interface Team {
  id: number;
  name: string;
  acronym?: string;
  image_url?: string;
  location?: string;
  modified_at: string;
  slug: string;
  players?: Player[];
  current_videogame?: {
    id: number;
    name: string;
    slug: string;
  };
}
// API de jugadores
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
// API de torneos
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
// API de partidos
export interface Match {
  id: number;
  begin_at: string;
  end_at?: string;
  detailed_stats: boolean;
  draw: boolean;
  forfeit: boolean;
  game_advantage?: number;
  games: Game[];
  live?: {
    opens_at: string;
    supported: boolean;
    url: string;
  };
  match_type: string;
  modified_at: string;
  name: string;
  number_of_games: number;
  opponents: {
    opponent: Team;
    type: string;
  }[];
  results: {
    score: number;
    team_id: number;
  }[];
  scheduled_at: string;
  slug: string;
  status: string;
  streams_list: {
    embed_url: string;
    language: string;
    main: boolean;
    official: boolean;
    raw_url: string;
  }[];
  tournament: {
    id: number;
    name: string;
    slug: string;
    begin_at: string;
    end_at: string;
  };
  tournament_id: number;
  videogame: {
    id: number;
    name: string;
    slug: string;
  };
  videogame_version?: string;
  winner?: Team;
  winner_id?: number;
  serie?: {
    id: number;
    name: string;
    full_name?: string;
    slug: string;
  };
  serie_id?: number;
  league?: {
    id: number;
    name: string;
    image_url?: string;
    slug: string;
  };
  league_id?: number;
  live_embed_url?: string;
  not_started?: boolean;
  past?: boolean;
  running?: boolean;
}
// API de juegos
export interface Game {
  begin_at?: string;
  complete?: boolean;
  detailed_stats?: boolean;
  end_at?: string;
  finished?: boolean;
  forfeit?: boolean;
  id: number;
  length?: number;
  match_id: number;
  position: number;
  status: string;
  winner?: {
    id: number;
    type: string;
  };
  winner_type?: string;
}