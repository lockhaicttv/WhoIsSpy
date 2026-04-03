import { and, eq } from 'drizzle-orm';
import { PREMIUM_PACKAGES, flattenByLocale } from '../constants/defaultKeywords';
import { DEFAULT_KEYWORDS_LOCALIZED } from '../constants/localizedKeywords';
import {
    ADVANCED_PACK_KEYWORDS,
    CULTURE_PACK_KEYWORDS,
    ENTERTAINMENT_PACK_KEYWORDS,
    SCIENCE_PACK_KEYWORDS
} from '../constants/premiumKeywords';
import { getCurrentLanguage } from '../utils/i18n';
import db from './database';
import { Keyword, NewKeyword, UserPurchase, keywords, userPurchases } from './schema';

// ============================================================
// LAZY LOCALE SEEDING
// ============================================================
// Instead of seeding ALL locales at startup (which doesn't scale to 50+ languages),
// we only seed English + the user's current language on first launch.
// Additional locales are seeded on-demand when the user switches language.
// This keeps first-launch fast and DB lean.
// ============================================================

/**
 * Check if a specific locale's free keywords have been seeded into the DB.
 */
export const isLocaleSeeded = (locale: string): boolean => {
  try {
    const count = db.select().from(keywords).all()
      .filter(kw => !kw.isPremium && kw.locale === locale).length;
    return count > 0;
  } catch (error) {
    console.error(`Error checking if locale "${locale}" is seeded:`, error);
    return false;
  }
};

/**
 * Seed free keywords for a single locale into the DB.
 * No-op if that locale is already seeded.
 */
export const seedLocaleKeywords = (locale: string): void => {
  try {
    if (isLocaleSeeded(locale)) return;

    const pairs = flattenByLocale(DEFAULT_KEYWORDS_LOCALIZED, locale);
    if (pairs.length === 0) {
      console.warn(`⚠️ No keyword translations found for locale "${locale}"`);
      return;
    }

    const keywordsToInsert: NewKeyword[] = pairs.map(kw => ({
      civilianWord: kw.civilian,
      spyWord: kw.spy,
      category: kw.category,
      difficulty: kw.difficulty,
      locale,
      isPremium: false,
      packageId: null,
      isActive: true,
      createdAt: new Date(),
    }));

    db.insert(keywords).values(keywordsToInsert).run();
    console.log(`✅ Seeded ${keywordsToInsert.length} free keywords for locale "${locale}"`);
  } catch (error) {
    console.error(`Error seeding keywords for locale "${locale}":`, error);
  }
};

/**
 * Ensure keywords exist for a given locale.
 * Called on language switch — seeds on-demand if needed, then falls back to 'en'.
 */
export const ensureLocaleKeywords = (locale: string): void => {
  // Always ensure English exists (it's the fallback)
  if (!isLocaleSeeded('en')) {
    seedLocaleKeywords('en');
  }
  // Seed the requested locale if not already done
  if (locale !== 'en') {
    seedLocaleKeywords(locale);
  }
};

// Initialize keywords table — only seeds English + current device language
export const initializeKeywords = () => {
  try {
    const existingKeywords = db.select().from(keywords).all();
    
    if (existingKeywords.length === 0) {
      // Fresh install: seed English + current language
      const currentLocale = getCurrentLanguage();
      console.log(`Initializing keywords for "en" + "${currentLocale}"...`);

      seedLocaleKeywords('en');
      if (currentLocale !== 'en') {
        seedLocaleKeywords(currentLocale);
      }
    } else {
      // Existing install: ensure current language is seeded (migration path)
      const currentLocale = getCurrentLanguage();
      ensureLocaleKeywords(currentLocale);
    }
  } catch (error) {
    console.error('Error initializing keywords:', error);
  }
};

// Seed premium keywords into database (call this manually when packages are ready)
export const seedPremiumKeywords = () => {
  try {
    console.log('🌱 Seeding premium keywords...');
    
    // Seed Advanced Pack (200 keywords) - English only for now
    const advancedKeywords: NewKeyword[] = ADVANCED_PACK_KEYWORDS.map((kw) => ({
      civilianWord: kw.civilian,
      spyWord: kw.spy,
      category: kw.category,
      difficulty: kw.difficulty,
      locale: 'en',
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
      locale: 'en',
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
      locale: 'en',
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
      locale: 'en',
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

// Get all available keywords (free + unlocked premium) for the current locale
export const getAvailableKeywords = (locale?: string): Keyword[] => {
  try {
    const currentLocale = locale || getCurrentLanguage();

    // Ensure this locale's keywords are seeded (lazy, no-op if already done)
    ensureLocaleKeywords(currentLocale);

    // Get all unlocked packages
    const unlockedPackages = db
      .select()
      .from(userPurchases)
      .where(eq(userPurchases.isActive, true))
      .all();

    const packageIds = unlockedPackages.map((p) => p.packageId);

    // Get keywords filtered by locale and access
    const availableKeywords = db
      .select()
      .from(keywords)
      .where(
        and(
          eq(keywords.isActive, true)
        )
      )
      .all()
      .filter((kw) => {
        // For free keywords: must be exact locale match
        if (!kw.isPremium) {
          return kw.locale === currentLocale;
        }
        // For premium keywords: exact locale match, or fallback to English
        const localeMatch = kw.locale === currentLocale
          || (kw.locale === 'en' && currentLocale !== 'en');
        const accessMatch = packageIds.includes(kw.packageId || '');
        return localeMatch && accessMatch;
      });

    return availableKeywords;
  } catch (error) {
    console.error('Error getting available keywords:', error);
    return [];
  }
};

// Get random keyword from available pool (current locale)
// Prioritizes free keywords in the current locale over English premium fallbacks
export const getRandomKeyword = (locale?: string): Keyword | null => {
  try {
    const available = getAvailableKeywords(locale);
    if (available.length === 0) return null;
    
    const currentLocale = locale || getCurrentLanguage();

    // Prefer keywords that match the exact locale (not premium fallbacks)
    const localeExact = available.filter(kw => kw.locale === currentLocale);
    const pool = localeExact.length > 0 ? localeExact : available;
    
    const randomIndex = Math.floor(Math.random() * pool.length);
    return pool[randomIndex];
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

// Add custom keyword (saved under current locale)
export const addCustomKeyword = (
  civilianWord: string,
  spyWord: string,
  category: string,
  difficulty: 'easy' | 'medium' | 'hard'
): number => {
  try {
    const currentLocale = getCurrentLanguage();
    const result = db
      .insert(keywords)
      .values({
        civilianWord,
        spyWord,
        category,
        difficulty,
        locale: currentLocale,
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

// === CUSTOM KEYWORDS FUNCTIONS ===

// Add multiple custom keywords in bulk
export const addCustomKeywordsBulk = (
  pairs: Array<{ civilianWord: string; spyWord: string }>,
  locale: string
): void => {
  try {
    const currentLocale = locale || getCurrentLanguage();

    const keywordsToInsert: NewKeyword[] = pairs.map((pair) => ({
      civilianWord: pair.civilianWord.trim(),
      spyWord: pair.spyWord.trim(),
      category: 'Custom',
      difficulty: 'medium',
      locale: currentLocale,
      isPremium: false,
      packageId: PREMIUM_PACKAGES.CUSTOM_KEYWORDS,
      isActive: true,
      createdAt: new Date(),
    }));

    if (keywordsToInsert.length > 0) {
      db.insert(keywords).values(keywordsToInsert).run();
      console.log(`✅ Added ${keywordsToInsert.length} custom keywords for locale "${currentLocale}"`);
    }
  } catch (error) {
    console.error('Error adding custom keywords in bulk:', error);
    throw error;
  }
};

// Get all custom keywords for a locale
export const getCustomKeywords = (locale?: string): Keyword[] => {
  try {
    const currentLocale = locale || getCurrentLanguage();
    return db
      .select()
      .from(keywords)
      .where(
        and(
          eq(keywords.packageId, PREMIUM_PACKAGES.CUSTOM_KEYWORDS),
          eq(keywords.locale, currentLocale),
          eq(keywords.isActive, true)
        )
      )
      .all();
  } catch (error) {
    console.error('Error getting custom keywords:', error);
    return [];
  }
};

// Update a custom keyword
export const updateCustomKeyword = (
  id: number,
  civilianWord: string,
  spyWord: string
): void => {
  try {
    db.update(keywords)
      .set({
        civilianWord: civilianWord.trim(),
        spyWord: spyWord.trim(),
      })
      .where(eq(keywords.id, id))
      .run();
    console.log(`✅ Updated custom keyword ID ${id}`);
  } catch (error) {
    console.error('Error updating custom keyword:', error);
    throw error;
  }
};

// Delete a custom keyword
export const deleteCustomKeyword = (id: number): void => {
  try {
    db.delete(keywords).where(eq(keywords.id, id)).run();
    console.log(`✅ Deleted custom keyword ID ${id}`);
  } catch (error) {
    console.error('Error deleting custom keyword:', error);
    throw error;
  }
};

// Delete all custom keywords for a locale
export const deleteAllCustomKeywords = (locale?: string): void => {
  try {
    const currentLocale = locale || getCurrentLanguage();
    db.delete(keywords)
      .where(
        and(
          eq(keywords.packageId, PREMIUM_PACKAGES.CUSTOM_KEYWORDS),
          eq(keywords.locale, currentLocale)
        )
      )
      .run();
    console.log(`✅ Deleted all custom keywords for locale "${currentLocale}"`);
  } catch (error) {
    console.error('Error deleting all custom keywords:', error);
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

// Get statistics (for the current locale)
export const getKeywordStats = (locale?: string) => {
  try {
    const currentLocale = locale || getCurrentLanguage();
    const allKeywords = db.select().from(keywords).where(eq(keywords.isActive, true)).all();
    
    // Free: exact locale match only. Premium: locale match or English fallback.
    const localeKeywords = allKeywords.filter(kw =>
      !kw.isPremium
        ? kw.locale === currentLocale
        : (kw.locale === currentLocale || (kw.locale === 'en' && currentLocale !== 'en'))
    );
    const available = getAvailableKeywords(currentLocale);
    const locked = localeKeywords.filter((kw) => kw.isPremium);

    return {
      total: localeKeywords.length,
      available: available.length,
      locked: locked.length - available.filter(kw => kw.isPremium).length,
      free: localeKeywords.filter((kw) => !kw.isPremium).length,
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
