import { db, getExpoDb } from './database';
import { arePremiumKeywordsSeeded, initializeKeywords, seedPremiumKeywords } from './keywordService';

// Re-export db instance
export { db };

// Initialize database tables
export const initDatabase = () => {
  try {
    // Get the database instance (lazily initialized)
    const expoDb = getExpoDb();

    // Create groups table
    expoDb.execSync(`
      CREATE TABLE IF NOT EXISTS groups (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        created_at INTEGER NOT NULL,
        updated_at INTEGER NOT NULL
      );
    `);

    // Create group_members table
    expoDb.execSync(`
      CREATE TABLE IF NOT EXISTS group_members (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        group_id INTEGER NOT NULL,
        name TEXT NOT NULL,
        "order" INTEGER NOT NULL,
        FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE CASCADE
      );
    `);

    // Create keywords table
    expoDb.execSync(`
      CREATE TABLE IF NOT EXISTS keywords (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        civilian_word TEXT NOT NULL,
        spy_word TEXT NOT NULL,
        category TEXT NOT NULL,
        difficulty TEXT NOT NULL,
        locale TEXT NOT NULL DEFAULT 'en',
        is_premium INTEGER NOT NULL DEFAULT 0,
        package_id TEXT,
        is_active INTEGER NOT NULL DEFAULT 1,
        created_at INTEGER NOT NULL
      );
    `);

    // Migration: add locale column if missing (for existing installs)
    // Use a permissive DEFAULT so ALTER works on tables with existing rows
    try {
      expoDb.execSync(`ALTER TABLE keywords ADD COLUMN locale TEXT DEFAULT 'en';`);
      // Backfill any NULL values
      expoDb.execSync(`UPDATE keywords SET locale = 'en' WHERE locale IS NULL;`);
      console.log('✅ Added locale column to keywords table');
    } catch (e: any) {
      // "duplicate column name: locale" means column already exists — expected
      if (e?.message && !e.message.includes('duplicate column')) {
        console.error('Migration error (locale column):', e);
      }
    }

    // Create user_purchases table
    expoDb.execSync(`
      CREATE TABLE IF NOT EXISTS user_purchases (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        package_id TEXT NOT NULL UNIQUE,
        package_name TEXT NOT NULL,
        purchase_date INTEGER NOT NULL,
        is_active INTEGER NOT NULL DEFAULT 1
      );
    `);

    console.log('✅ Database initialized successfully');

    // Initialize default free keywords (100 keywords)
    initializeKeywords();

    // Seed premium keywords if not already seeded (450 keywords)
    if (!arePremiumKeywordsSeeded()) {
      console.log('🌱 Seeding premium keywords...');
      seedPremiumKeywords();
    } else {
      console.log('✓ Premium keywords already seeded');
    }
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

export default db;
