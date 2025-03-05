const crypto = require('crypto');
const salt = crypto.randomBytes(16).toString('hex');

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
  const hasedPassword = crypto.pbkdf2Sync(password, salt, 
    1000, 64, `sha512`).toString(`hex`)
 
  const userData = ({ 
    "completeName"    : completeName,
    "email"  : email,
    "password"    : hasedPassword 
});
  console.log("Aqui los datos en el fetch: " + JSON.stringify(userData));
  
  await fetch('http://localhost:5001/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

};

export const logUserInBackend = async (email, password) => {
  // Criptamos la contraseña con bcypt.
  const hasedPassword = crypto.pbkdf2Sync(password, salt, 
    1000, 64, `sha512`).toString(`hex`)
 
  const userData = ({ 
    "email"  : email,
    "password"    : hasedPassword 
});
  console.log("Aqui los datos en el fetch: " + JSON.stringify(userData));
  
  await fetch('http://localhost:5001/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

};