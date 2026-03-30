import { eq, and } from 'drizzle-orm';
import db from './index';
import { keywords, userPurchases, Keyword, NewKeyword, UserPurchase, NewUserPurchase } from './schema';
import { DEFAULT_KEYWORDS, PREMIUM_PACKAGES } from '../constants/defaultKeywords';
import { 
  ADVANCED_PACK_KEYWORDS, 
  CULTURE_PACK_KEYWORDS,
  SCIENCE_PACK_KEYWORDS,
  ENTERTAINMENT_PACK_KEYWORDS
} from '../constants/premiumKeywords';

// Initialize keywords table with default free keywords
export const initializeKeywords = () => {
  try {
    // Check if keywords already exist
    const existingKeywords = db.select().from(keywords).all();
    
    if (existingKeywords.length === 0) {
      console.log('Initializing default keywords...');
      
      const keywordsToInsert: NewKeyword[] = DEFAULT_KEYWORDS.map((kw) => ({
        civilianWord: kw.civilian,
        spyWord: kw.spy,
        category: kw.category,
        difficulty: kw.difficulty,
        isPremium: false,
        packageId: null,
        isActive: true,
        createdAt: new Date(),
      }));

      db.insert(keywords).values(keywordsToInsert).run();
      console.log(`✅ Initialized ${keywordsToInsert.length} free keywords`);
    }
  } catch (error) {
    console.error('Error initializing keywords:', error);
  }
};

// Seed premium keywords into database (call this manually when packages are ready)
export const seedPremiumKeywords = () => {
  try {
    console.log('🌱 Seeding premium keywords...');
    
    // Seed Advanced Pack (200 keywords)
    const advancedKeywords: NewKeyword[] = ADVANCED_PACK_KEYWORDS.map((kw) => ({
      civilianWord: kw.civilian,
      spyWord: kw.spy,
      category: kw.category,
      difficulty: kw.difficulty,
      isPremium: true,
      packageId: PREMIUM_PACKAGES.ADVANCED,
      isActive: true,
      createdAt: new Date(),
    }));
    
    // Seed Culture Pack (250 keywords)
    const cultureKeywords: NewKeyword[] = CULTURE_PACK_KEYWORDS.map((kw) => ({
      civilianWord: kw.civilian,
      spyWord: kw.spy,
      category: kw.category,
      difficulty: kw.difficulty,
      isPremium: true,
      packageId: PREMIUM_PACKAGES.CULTURE,
      isActive: true,
      createdAt: new Date(),
    }));

    // Seed Science Pack (200 keywords)
    const scienceKeywords: NewKeyword[] = SCIENCE_PACK_KEYWORDS.map((kw) => ({
      civilianWord: kw.civilian,
      spyWord: kw.spy,
      category: kw.category,
      difficulty: kw.difficulty,
      isPremium: true,
      packageId: PREMIUM_PACKAGES.SCIENCE,
      isActive: true,
      createdAt: new Date(),
    }));

    // Seed Entertainment Pack (300 keywords)
    const entertainmentKeywords: NewKeyword[] = ENTERTAINMENT_PACK_KEYWORDS.map((kw) => ({
      civilianWord: kw.civilian,
      spyWord: kw.spy,
      category: kw.category,
      difficulty: kw.difficulty,
      isPremium: true,
      packageId: PREMIUM_PACKAGES.ENTERTAINMENT,
      isActive: true,
      createdAt: new Date(),
    }));

    // Insert premium keywords in batches
    if (advancedKeywords.length > 0) {
      db.insert(keywords).values(advancedKeywords).run();
      console.log(`✅ Seeded ${advancedKeywords.length} keywords for Advanced Pack`);
    }

    if (cultureKeywords.length > 0) {
      db.insert(keywords).values(cultureKeywords).run();
      console.log(`✅ Seeded ${cultureKeywords.length} keywords for Culture Pack`);
    }

    if (scienceKeywords.length > 0) {
      db.insert(keywords).values(scienceKeywords).run();
      console.log(`✅ Seeded ${scienceKeywords.length} keywords for Science Pack`);
    }

    if (entertainmentKeywords.length > 0) {
      db.insert(keywords).values(entertainmentKeywords).run();
      console.log(`✅ Seeded ${entertainmentKeywords.length} keywords for Entertainment Pack`);
    }

    console.log('✅ Premium keywords seeding complete!');
    
    // Log total count
    const total = db.select().from(keywords).all().length;
    console.log(`📊 Total keywords in database: ${total}`);
  } catch (error) {
    console.error('Error seeding premium keywords:', error);
  }
};

// Check if premium keywords are already seeded
export const arePremiumKeywordsSeeded = (): boolean => {
  try {
    const premiumCount = db
      .select()
      .from(keywords)
      .where(eq(keywords.isPremium, true))
      .all()
      .length;
    
    return premiumCount > 0;
  } catch (error) {
    console.error('Error checking premium keywords:', error);
    return false;
  }
};

// Get all available keywords (free + unlocked premium)
export const getAvailableKeywords = (): Keyword[] => {
  try {
    // Get all unlocked packages
    const unlockedPackages = db
      .select()
      .from(userPurchases)
      .where(eq(userPurchases.isActive, true))
      .all();

    const packageIds = unlockedPackages.map((p) => p.packageId);

    // Get free keywords + unlocked premium keywords
    const availableKeywords = db
      .select()
      .from(keywords)
      .where(
        and(
          eq(keywords.isActive, true)
        )
      )
      .all()
      .filter((kw) => !kw.isPremium || packageIds.includes(kw.packageId || ''));

    return availableKeywords;
  } catch (error) {
    console.error('Error getting available keywords:', error);
    return [];
  }
};

// Get random keyword from available pool
export const getRandomKeyword = (): Keyword | null => {
  try {
    const available = getAvailableKeywords();
    if (available.length === 0) return null;
    
    const randomIndex = Math.floor(Math.random() * available.length);
    return available[randomIndex];
  } catch (error) {
    console.error('Error getting random keyword:', error);
    return null;
  }
};

// Get keywords by category
export const getKeywordsByCategory = (category: string): Keyword[] => {
  try {
    const available = getAvailableKeywords();
    return available.filter((kw) => kw.category === category);
  } catch (error) {
    console.error('Error getting keywords by category:', error);
    return [];
  }
};

// Get keywords by difficulty
export const getKeywordsByDifficulty = (difficulty: string): Keyword[] => {
  try {
    const available = getAvailableKeywords();
    return available.filter((kw) => kw.difficulty === difficulty);
  } catch (error) {
    console.error('Error getting keywords by difficulty:', error);
    return [];
  }
};

// Get all categories
export const getAllCategories = (): string[] => {
  try {
    const available = getAvailableKeywords();
    const categories = Array.from(new Set(available.map((kw) => kw.category)));
    return categories.sort();
  } catch (error) {
    console.error('Error getting categories:', error);
    return [];
  }
};

// Add custom keyword
export const addCustomKeyword = (
  civilianWord: string,
  spyWord: string,
  category: string,
  difficulty: 'easy' | 'medium' | 'hard'
): number => {
  try {
    const result = db
      .insert(keywords)
      .values({
        civilianWord,
        spyWord,
        category,
        difficulty,
        isPremium: false,
        packageId: null,
        isActive: true,
        createdAt: new Date(),
      })
      .returning({ id: keywords.id })
      .get();

    return result.id;
  } catch (error) {
    console.error('Error adding custom keyword:', error);
    throw error;
  }
};

// Delete keyword
export const deleteKeyword = (id: number): void => {
  try {
    db.delete(keywords).where(eq(keywords.id, id)).run();
  } catch (error) {
    console.error('Error deleting keyword:', error);
    throw error;
  }
};

// Deactivate keyword (soft delete)
export const deactivateKeyword = (id: number): void => {
  try {
    db
      .update(keywords)
      .set({ isActive: false })
      .where(eq(keywords.id, id))
      .run();
  } catch (error) {
    console.error('Error deactivating keyword:', error);
    throw error;
  }
};

// === USER PURCHASE FUNCTIONS ===

// Check if package is unlocked
export const isPackageUnlocked = (packageId: string): boolean => {
  try {
    const purchase = db
      .select()
      .from(userPurchases)
      .where(
        and(
          eq(userPurchases.packageId, packageId),
          eq(userPurchases.isActive, true)
        )
      )
      .get();

    return !!purchase;
  } catch (error) {
    console.error('Error checking package unlock:', error);
    return false;
  }
};

// Unlock package (simulate purchase)
export const unlockPackage = (packageId: string, packageName: string): void => {
  try {
    // Check if already purchased
    if (isPackageUnlocked(packageId)) {
      console.log(`Package ${packageId} already unlocked`);
      return;
    }

    db.insert(userPurchases).values({
      packageId,
      packageName,
      purchaseDate: new Date(),
      isActive: true,
    }).run();

    console.log(`✅ Unlocked package: ${packageName}`);
  } catch (error) {
    console.error('Error unlocking package:', error);
    throw error;
  }
};

// Get all user purchases
export const getUserPurchases = (): UserPurchase[] => {
  try {
    return db
      .select()
      .from(userPurchases)
      .where(eq(userPurchases.isActive, true))
      .all();
  } catch (error) {
    console.error('Error getting user purchases:', error);
    return [];
  }
};

// Get statistics
export const getKeywordStats = () => {
  try {
    const allKeywords = db.select().from(keywords).where(eq(keywords.isActive, true)).all();
    const available = getAvailableKeywords();
    const locked = allKeywords.filter((kw) => kw.isPremium);

    return {
      total: allKeywords.length,
      available: available.length,
      locked: locked.length,
      free: allKeywords.filter((kw) => !kw.isPremium).length,
      premium: locked.length,
    };
  } catch (error) {
    console.error('Error getting keyword stats:', error);
    return {
      total: 0,
      available: 0,
      locked: 0,
      free: 0,
      premium: 0,
    };
  }
};
