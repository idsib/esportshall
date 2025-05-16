"use server"
// Función modular para actualizar usuarios, dependiendo de lo que le llegue a la función actualizara o no los datos correspondientes.
import { neon } from '@neondatabase/serverless';

const sql = neon(`${process.env.DATABASE_URL}`);

export async function updateUserProfile(email : any, username : String, bio : String, location : String, website : String, x : String, instagram: string, twitch: string, favoriteCommunity: string) {
    // Condicional para actualizar el nombre.
    if (username) {
        try {
            // Actualiza el nombre del usuario en la base de datos utilizando el correo como filtro.
            await sql('UPDATE users SET name = $1 WHERE email = $2 ', [username, email]);
        } catch (error) {
            console.log(error)
        }
    }
    if (bio) {
        try {
            // Actualiza la bio del usuario en la base de datos haciendo como un inner join con las tablas users_ai y users utilizando el correo como filtro.
            await sql('UPDATE users_ai SET bio = $1 FROM users WHERE users_ai.user_id = users.id AND users.email = $2', [bio, email]);
        } catch (error) {
            console.log(error)
        }
    }
    if (location) {
        try {
            await sql('UPDATE users_ai SET location = $1 FROM users WHERE users_ai.user_id = users.id AND users.email = $2', [location, email]);
        } catch (error) {
            console.log(error)
        }
    }
    if (website) {
        try {
            await sql('UPDATE users_ai SET website = $1 FROM users WHERE users_ai.user_id = users.id AND users.email = $2', [website, email]);
        } catch (error) {
            console.log(error)
        }
    }
    if (x) {
        try {
            await sql('UPDATE users_ai SET x = $1 FROM users WHERE users_ai.user_id = users.id AND users.email = $2', [x, email]);
        } catch (error) {
            console.log(error)
        }
    }
    if (instagram) {
        try {
            await sql('UPDATE users_ai SET instagram = $1 FROM users WHERE users_ai.user_id = users.id AND users.email = $2', [instagram, email]);
        } catch (error) {
            console.log(error)
        }
    }
    if (twitch) {
        try {
            await sql('UPDATE users_ai SET twitch = $1 FROM users WHERE users_ai.user_id = users.id AND users.email = $2', [twitch, email]);
        } catch (error) {
            console.log(error)
        }
    }
    if (favoriteCommunity) {
        try {
            await sql('UPDATE users_ai SET favoriteCommunity = $1 FROM users WHERE users_ai.user_id = users.id AND users.email = $2', [favoriteCommunity, email]);
        } catch (error) {
            console.log(error)
        }
    }

}