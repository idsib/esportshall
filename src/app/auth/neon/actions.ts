'use server'
import { neon } from '@neondatabase/serverless';

export async function create(formData: FormData) {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const completeName = formData.get('firstName') + ' ' + formData.get('lastName');
    const email = formData.get('email');
    const password = formData.get('password');

    // Insertar datos correctamente
    await sql(
        'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
        [completeName, email, password]
    );
}