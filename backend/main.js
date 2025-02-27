/* const bcrypt = require('bcrypt');
const saltRounds = 10; */

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
  // Criptamos la contraseña con bcypt.
  /* let hasedPassword;
   bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) {
      return;
    }
  });

   bcrypt.hash(password, salt, (err, hash) => {
    if (err) {
      return;
    }
    hasedPassword = hash;
    console.log('Hashed password:', hash);
  }); */
  const userData = [completeName, email, password];
  
  await fetch('http://localhost:5000/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

};