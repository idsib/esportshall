export const Lives = async () => {

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            authorization: 'Bearer 3eYgBOgZIU9N5Wfgi15H2ASzZ0aIGB_zpLHl3fKZgTgSC9zbVq4'
        }
    };

    const response = fetch('https://api.pandascore.co/matches?filter[match_type][0]=all_games_played&filter[status][0]=canceled&filter[videogame][0]=1&filter[winner_type][0]=Player&range[detailed_stats][0]=true&range[detailed_stats][1]=true&range[draw][0]=true&range[draw][1]=true&range[forfeit][0]=true&range[forfeit][1]=true&range[match_type][0]=all_games_played&range[match_type][1]=all_games_played&range[status][0]=canceled&range[status][1]=canceled&range[winner_type][0]=Player&range[winner_type][1]=Player&sort=begin_at&page=1&per_page=50', options)
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(err => console.error(err));

    console.log(response)
}