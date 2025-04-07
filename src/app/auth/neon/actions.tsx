'use server'
import { neon } from '@neondatabase/serverless';
import { User } from './User'
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const sql = neon(`${process.env.DATABASE_URL}`);

export async function register(formData: FormData) {
    const completeName = formData.get('firstName') + ' ' + formData.get('lastName');
    const email = formData.get('email');
    const password = formData.get('password');
    const hashPass = await bcrypt.hash(password, 10)


    // Insertar datos correctamente
    await sql(
        'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
        [completeName, email, hashPass]
    );
}

export async function login(formData: FormData) {
    const email = formData.get('email');
    const password = formData.get('password');
    const hashPass = await bcrypt.hash(password, 10)

    // Insertar datos correctamente
    const user = await sql(
        'SELECT * FROM users WHERE email = $1',
        [email]
    );

    console.log("la contraseña guardada = " + user[0].password)
    console.log("la contraseña puesta y haseada = " + hashPass)

    if (bcrypt.compare(user[0].password, hashPass)) {
        
        
    } else {
        console.log('no')

    }

}

export async function test() {

    // Insertar datos correctamente
    const prueba = await sql(
        'SELECT * FROM users'
    );

    console.log(prueba);
}