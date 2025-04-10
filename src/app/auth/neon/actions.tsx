'use server'
import { neon } from '@neondatabase/serverless';
import { User } from './User'
import { hashMD5 } from './hashPass'
const bcrypt = require('bcrypt');
const sql = neon(`${process.env.DATABASE_URL}`);

export async function register(formData: FormData) {
    const completeName = formData.get('firstName') + ' ' + formData.get('lastName');
    const email = formData.get('email');
    const password = formData.get('password');
    const hashPass = await bcrypt.hash(password, 10)
    await sql(
        'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
        [completeName, email, hashPass]
    );
}

export async function login(email : string, password : string) {
    const hashPass = await bcrypt.hash(password, 10)
    const user = await sql(
        'SELECT * FROM users WHERE email = $1',
        [email]
    );
    if (bcrypt.compare(user[0].password, hashPass)) {
        try {
            const token: string = await hashMD5(user[0].name);
            await sql('INSERT INTO users (token) VALUES ($1)', [token]);
            console.log('Almacenado en el localStorage y base de datos')
            return token;
        } catch (error) {
            console.log('No almacenado en el localStorage y base de datos')
            console.log('Error' + error)

        }
    } else {
        console.log('Contraseña incorrecta')
    }

}

export async function test() {

    // Insertar datos correctamente
    const prueba = await sql(
        'SELECT * FROM users'
    );

    console.log(prueba);
}