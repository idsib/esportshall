// File: app/page.tsx
import { neon } from '@neondatabase/serverless';

export default function Page() {
  async function create(formData: FormData) {
    'use server';
    // Connect to the Neon database
    const sql = neon(`${process.env.DATABASE_URL}`);
    const completeName = formData.get('completeName');
    const email = formData.get('email');
    const password = formData.get('password');
    // Insert the comment from the form into the Postgres database
    await sql('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *", [completeName, email, password]', [completeName, email, password]);
  }

  return (
    <form action={create}>
      <input type="text" placeholder="name" name="completeName" />
      <input type="text" placeholder="email" name="email" />
      <input type="text" placeholder="password" name="password" />
      <button type="submit">Submit</button>
    </form>
  );
}