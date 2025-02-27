const bcrypt = require('bcrypt');
const saltRounds = 10;

export const GetUsers = async () => {
    await fetch('http://localhost:5000/users'
    .then(response => {
      return response.text();
    })
    .then(data => {
      setUsers(data);
    }))
  };

  export const registerUserInBackend = async (name, surname, email, password) => {
    const completeName = name + " " + surname;
  
    await fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },

      body: JSON.stringify(userData),
    });
  };