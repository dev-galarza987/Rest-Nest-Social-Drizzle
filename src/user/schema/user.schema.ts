import { index, jsonb, pgTable, serial, text, timestamp, uniqueIndex, varchar } from "drizzle-orm/pg-core";

/**
 * @description: Tabla de usuarios, usa drizzle-orm.
 */
export const users = pgTable('users', {
  id: serial('user_id').primaryKey(),
  name: text('name').notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  metadata: jsonb('metadata').$type<{ age?: number; preferences?: string[] }>().default({}),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
},
  (table) => ({
    emailUniqueIndex: uniqueIndex('users_email_unique_idx').on(table.email),
    nameSearchIndex: index('users_name_search_idx').on(table.name),
  })
);

export type UserSelect = typeof users.$inferSelect;
export type UserInsert = typeof users.$inferInsert;
