import { drizzle } from 'drizzle-orm/expo-sqlite';
import { openDatabaseSync, SQLiteDatabase } from 'expo-sqlite';
import * as schema from './schema';

// Lazy initialization to prevent crashes on app startup in release builds
let _expoDb: SQLiteDatabase | null = null;
let _db: ReturnType<typeof drizzle<typeof schema>> | null = null;
let _initError: Error | null = null;

/**
 * Get the raw expo-sqlite database instance.
 * Lazily initializes on first access.
 */
export const getExpoDb = (): SQLiteDatabase => {
  if (_initError) {
    throw _initError;
  }
  if (!_expoDb) {
    try {
      _expoDb = openDatabaseSync('thelastsignal.db', { enableChangeListener: true });
    } catch (error) {
      _initError = error instanceof Error ? error : new Error(String(error));
      console.error('❌ Failed to open database:', error);
      throw _initError;
    }
  }
  return _expoDb;
};

/**
 * Get the drizzle ORM instance.
 * Lazily initializes on first access.
 */
export const getDb = (): ReturnType<typeof drizzle<typeof schema>> => {
  if (_initError) {
    throw _initError;
  }
  if (!_db) {
    const expoDb = getExpoDb();
    _db = drizzle(expoDb, { schema });
  }
  return _db;
};

// Legacy exports for backwards compatibility
// These are now getters that lazily initialize
export const expoDb = new Proxy({} as SQLiteDatabase, {
  get(_, prop) {
    return (getExpoDb() as any)[prop];
  },
});

export const db = new Proxy({} as ReturnType<typeof drizzle<typeof schema>>, {
  get(_, prop) {
    return (getDb() as any)[prop];
  },
});

export default db;
