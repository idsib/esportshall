import { sql } from 'drizzle-orm'
import { text, timestamp, pgTable } from 'drizzle-orm/pg-core'

export const teams = pgTable('teams', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at').default(sql`now()`),
  updatedAt: timestamp('updated_at').default(sql`now()`),
}) 