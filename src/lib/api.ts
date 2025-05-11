export const fetchVideogames = async () => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            authorization: 'Bearer 3eYgBOgZIU9N5Wfgi15H2ASzZ0aIGB_zpLHl3fKZgTgSC9zbVq4' // Token de autorización de Pandascore
        }
    };

    try {
        const response = await fetch('https://api.pandascore.co/videogames?page=1&per_page=80', options); // Se modifica la URL si se quiere un filtro distinto
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
