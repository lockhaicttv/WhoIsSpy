import { drizzle } from 'drizzle-orm/expo-sqlite';
import { openDatabaseSync } from 'expo-sqlite';
import * as schema from './schema';

// Open the database
export const expoDb = openDatabaseSync('thelastsignal.db', { enableChangeListener: true });

// Create drizzle instance
export const db = drizzle(expoDb, { schema });

export default db;
