import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

// Groups table - stores saved player groups
export const groups = sqliteTable('groups', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
});

// Group members table - stores players in each group
export const groupMembers = sqliteTable('group_members', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  groupId: integer('group_id').notNull().references(() => groups.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  order: integer('order').notNull(), // To maintain player order
});

// Keywords table - stores all game keywords (free + premium)
export const keywords = sqliteTable('keywords', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  civilianWord: text('civilian_word').notNull(),
  spyWord: text('spy_word').notNull(),
  category: text('category').notNull(),
  difficulty: text('difficulty').notNull(), // 'easy', 'medium', 'hard'
  isPremium: integer('is_premium', { mode: 'boolean' }).notNull().default(false),
  packageId: text('package_id'), // null for free, package id for premium
  isActive: integer('is_active', { mode: 'boolean' }).notNull().default(true),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});

// User purchases table - tracks what packages user has bought
export const userPurchases = sqliteTable('user_purchases', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  packageId: text('package_id').notNull().unique(),
  packageName: text('package_name').notNull(),
  purchaseDate: integer('purchase_date', { mode: 'timestamp' }).notNull(),
  isActive: integer('is_active', { mode: 'boolean' }).notNull().default(true),
});

export type Group = typeof groups.$inferSelect;
export type NewGroup = typeof groups.$inferInsert;
export type GroupMember = typeof groupMembers.$inferSelect;
export type NewGroupMember = typeof groupMembers.$inferInsert;
export type Keyword = typeof keywords.$inferSelect;
export type NewKeyword = typeof keywords.$inferInsert;
export type UserPurchase = typeof userPurchases.$inferSelect;
export type NewUserPurchase = typeof userPurchases.$inferInsert;
