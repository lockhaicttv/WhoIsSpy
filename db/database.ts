import { drizzle } from 'drizzle-orm/expo-sqlite';
import { openDatabaseSync } from 'expo-sqlite';
import * as schema from './schema';

// Open the database — wrapped in try/catch so a native module failure
// doesn't crash the entire app before React can render an error screen.
let expoDb: ReturnType<typeof openDatabaseSync>;
try {
  expoDb = openDatabaseSync('thelastsignal.db', { enableChangeListener: true });
} catch (error) {
  console.error('❌ Failed to open database:', error);
  // Re-throw so callers know the DB isn't available
  throw error;
}

// Create drizzle instance
export const db = drizzle(expoDb, { schema });

export { expoDb };
export default db;
