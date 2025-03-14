export const Lives = async () => {

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            authorization: 'Bearer 3eYgBOgZIU9N5Wfgi15H2ASzZ0aIGB_zpLHl3fKZgTgSC9zbVq4'
        }
    };

    const response = fetch('https://api.pandascore.co/tournaments?filter[region][0]=ASIA&filter[tier][0]=a&filter[winner_type][0]=Player&range[detailed_stats][0]=true&range[detailed_stats][1]=true&range[has_bracket][0]=true&range[has_bracket][1]=true&range[region][0]=ASIA&range[region][1]=ASIA&range[tier][0]=a&range[tier][1]=a&range[winner_type][0]=Player&range[winner_type][1]=Player&sort=begin_at&page=1&per_page=50', options)
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(err => console.error(err));

    console.log(response)
}