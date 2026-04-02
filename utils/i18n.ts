import * as Localization from 'expo-localization';
import * as SecureStore from 'expo-secure-store';
import { I18n } from 'i18n-js';

// Import translation files
import ar from '../locales/ar.json';
import de from '../locales/de.json';
import en from '../locales/en.json';
import es from '../locales/es.json';
import fr from '../locales/fr.json';
import hi from '../locales/hi.json';
import id from '../locales/id.json';
import ja from '../locales/ja.json';
import ko from '../locales/ko.json';
import pt from '../locales/pt.json';
import ru from '../locales/ru.json';
import th from '../locales/th.json';
import tr from '../locales/tr.json';
import vi from '../locales/vi.json';
import zh from '../locales/zh.json';

// Create i18n instance
const i18n = new I18n({
  en,
  es,
  fr,
  vi,
  zh,
  de,
  ja,
  ko,
  pt,
  ru,
  ar,
  hi,
  th,
  id,
  tr,
});

// Storage key for language preference
const LANGUAGE_KEY = 'thelastsignal_language';

// Helper function to safely get device locale
const getDeviceLocale = (): string => {
  try {
    if (Localization.getLocales && typeof Localization.getLocales === 'function') {
      const locales = Localization.getLocales();
      if (locales && locales.length > 0) {
        return locales[0].languageTag ?? locales[0].languageCode ?? 'en';
      }
    }
    return 'en';
  } catch (error) {
    console.error('Error getting device locale:', error);
    return 'en';
  }
};

// Set default locale safely
try {
  const deviceLocale = getDeviceLocale();
  const languageCode = typeof deviceLocale === 'string' ? deviceLocale.split('-')[0] : 'en';
  const supportedLanguages = ['en', 'es', 'fr', 'vi', 'zh', 'de', 'ja', 'ko', 'pt', 'ru', 'ar', 'hi', 'th', 'id', 'tr'];

  i18n.locale = supportedLanguages.includes(languageCode) ? languageCode : 'en';
} catch (error) {
  console.error('Error detecting device locale:', error);
  i18n.locale = 'en';
}

// Enable fallback to English if translation is missing
i18n.enableFallback = true;
i18n.defaultLocale = 'en';

/**
 * Get the current language
 */
export const getCurrentLanguage = (): string => {
  return i18n.locale ? i18n.locale.split('-')[0] : 'en';
};

/**
 * Get available languages
 */
export const getAvailableLanguages = () => [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt' },
  { code: 'zh', name: 'Chinese', nativeName: '中文' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語' },
  { code: 'ko', name: 'Korean', nativeName: '한국어' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'th', name: 'Thai', nativeName: 'ไทย' },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe' },
];

/**
 * Set the app language
 */
export const setLanguage = async (languageCode: string): Promise<void> => {
  if (!languageCode || typeof languageCode !== 'string') {
    console.error('Invalid language code:', languageCode);
    return;
  }

  i18n.locale = languageCode;
  try {
    await SecureStore.setItemAsync(LANGUAGE_KEY, languageCode);
  } catch (error) {
    console.error('Error saving language preference:', error);
  }
};

/**
 * Load saved language preference
 */
export const loadLanguage = async (): Promise<string> => {
  try {
    const savedLanguage = await SecureStore.getItemAsync(LANGUAGE_KEY);
    if (savedLanguage && typeof savedLanguage === 'string') {
      i18n.locale = savedLanguage;
      return savedLanguage;
    } else {
      const deviceLocale = getDeviceLocale();
      const languageCode = typeof deviceLocale === 'string' ? deviceLocale.split('-')[0] : 'en';
      const supportedLanguages = ['en', 'es', 'fr', 'vi', 'zh', 'de', 'ja', 'ko', 'pt', 'ru', 'ar', 'hi', 'th', 'id', 'tr'];

      const finalLocale = supportedLanguages.includes(languageCode) ? languageCode : 'en';
      i18n.locale = finalLocale;
      return finalLocale;
    }
  } catch (error) {
    console.error('Error loading language preference:', error);
    i18n.locale = 'en';
    return 'en';
  }
};

/**
 * Translate a key
 */
export const t = (key: string, options?: object): string => {
  try {
    return i18n.t(key, options);
  } catch (error) {
    console.error(`Translation error for key "${key}":`, error);
    return key;
  }
};

/**
 * Check if a translation exists
 */
export const exists = (key: string): boolean => {
  try {
    return i18n.translations[i18n.locale]?.[key] !== undefined;
  } catch (error) {
    return false;
  }
};

export default i18n;
