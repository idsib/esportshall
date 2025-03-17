export const Lives = async () => {

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization: 'Bearer 3eYgBOgZIU9N5Wfgi15H2ASzZ0aIGB_zpLHl3fKZgTgSC9zbVq4'
    }
  };

  const response = fetch('https://api.pandascore.co/lives?page=1&per_page=50', options)
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.error(err));

  console.log(response)
}