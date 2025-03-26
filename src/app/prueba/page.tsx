// File: app/page.tsx
import { neon } from '@neondatabase/serverless';

export default function Page() {
  async function create(formData: FormData) {
    'use server';
    
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

  return (
    <form action={create}>
      <input type="text" placeholder="name" name="completeName" />
      <input type="text" placeholder="email" name="email" />
      <input type="password" placeholder="password" name="password" />
      <button type="submit">Submit</button>
    </form>
  );
}
