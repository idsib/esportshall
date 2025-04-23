'use server'
import { neon } from '@neondatabase/serverless';
import { hashMD5 } from './hashPass'
const sql = neon(`${process.env.DATABASE_URL}`);
const bcrypt = require('bcrypt');

export async function register(formData: FormData) {
    const completeName = formData.get('firstName') + ' ' + formData.get('lastName');
    const email = formData.get('email');
    const password = formData.get('password');
    const hashPass = await bcrypt.hash(password, 10)
    await sql(
        'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)',
        [completeName, email, hashPass]
    );
}

export async function login(email: string, password: string) {
    const hashPass = await bcrypt.hash(password, 10)
    try {
        const user = await sql('SELECT * FROM users WHERE email = $1', [email]);
        if (bcrypt.compare(user[0].password, hashPass)) {
            try {
                const token: string = await hashMD5(user[0].name + Date.now())
                const oneMonth = 30 * 24 * 60 * 60 * 1000; // 7 días en milisegundos
                const expirateDate = new Date(Date.now() + oneMonth)
                await sql('INSERT INTO users_token (user_id, token, expiration_date) VALUES ($1, $2, $3)', [user[0].id, token, expirateDate]);
                console.log('Almacenado en el localStorage y base de datos')
                return {token, expirateDate};
            } catch (error) {
                console.log('No almacenado en el localStorage y base de datos, mensaje de error: ' + error)
            }
        } else {
            console.log('Contraseña incorrecta')
        }
    } catch (error) {
        console.log('El usuario no ha sido encontrado, mensaje de error: ' + error)
    }
}

export async function test() {
    // Insertar datos correctamente
    const prueba = await sql(
        'SELECT * FROM users'
    );
    console.log(prueba);
}