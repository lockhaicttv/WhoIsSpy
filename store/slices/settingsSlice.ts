import { StateCreator } from 'zustand'
import { ensureLocaleKeywords } from '../../db/keywordService'
import { getCurrentLanguage, loadLanguage, setLanguage as setI18nLanguage } from '../../utils/i18n'
import { soundManager } from '../../utils/soundManager'
import { MyState } from '../useStore'

export type SettingsSlice = {
  language: string;
  soundEnabled: boolean;
  setLanguage: (lang: string) => Promise<void>;
  toggleSound: () => void;
  setSoundEnabled: (enabled: boolean) => void;
  initializeSettings: () => Promise<void>;
}

const createSettingsSlice: StateCreator<MyState, [], [], SettingsSlice> = (set, get) => ({
  language: 'en', // Default fallback
  soundEnabled: true,
  
  setLanguage: async (lang: string) => {
    if (!lang || typeof lang !== 'string') {
      console.error('Invalid language code provided to setLanguage:', lang);
      return;
    }
    
    try {
      await setI18nLanguage(lang);
      set({ language: lang });
    } catch (error) {
      console.error('Error setting language:', error);
      set({ language: 'en' }); // Fallback to English on error
    }
  },
  
  toggleSound: () => {
    const newState = !get().soundEnabled;
    set({ soundEnabled: newState });
    soundManager.setMuted(!newState);
  },
  
  setSoundEnabled: (enabled: boolean) => {
    set({ soundEnabled: enabled });
    soundManager.setMuted(!enabled);
  },
  
  initializeSettings: async () => {
    try {
      const savedLanguage = await loadLanguage();
      // Ensure we have a valid language code
      const validLanguage = savedLanguage && typeof savedLanguage === 'string' ? savedLanguage : 'en';
      set({ language: validLanguage });
      // Ensure keywords for this locale are seeded, then reload keywords
      // This is critical: loadKeywords() in useStore.ts runs before the saved
      // language is loaded (it's async), so it loads English keywords by default.
      // We must reload after we know the actual language.
      const currentLocale = getCurrentLanguage();
      ensureLocaleKeywords(currentLocale);
      get().loadKeywords();
      
      // Initialize sound state
      const currentSoundState = get().soundEnabled;
      soundManager.setMuted(!currentSoundState);
    } catch (error) {
      console.error('Error initializing settings:', error);
      set({ language: 'en' }); // Fallback to English on error
    }
  },
})

export default createSettingsSlice
