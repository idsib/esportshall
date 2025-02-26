export const GetUsers = async () => {
    await fetch('http://localhost:5000/users'
    .then(response => {
      return response.text();
    })
    .then(data => {
      setUsers(data);
    }))
  };