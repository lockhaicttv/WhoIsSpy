import { StateCreator } from 'zustand'
import { MyState } from '../useStore'
import { setLanguage as setI18nLanguage, loadLanguage } from '../../utils/i18n'

export type SettingsSlice = {
  language: string;
  soundEnabled: boolean;
  setLanguage: (lang: string) => Promise<void>;
  toggleSound: () => void;
  initializeSettings: () => Promise<void>;
}

const createSettingsSlice: StateCreator<MyState, [], [], SettingsSlice> = (set) => ({
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
  
  toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
  
  initializeSettings: async () => {
    try {
      const savedLanguage = await loadLanguage();
      // Ensure we have a valid language code
      const validLanguage = savedLanguage && typeof savedLanguage === 'string' ? savedLanguage : 'en';
      set({ language: validLanguage });
    } catch (error) {
      console.error('Error initializing settings:', error);
      set({ language: 'en' }); // Fallback to English on error
    }
  },
})

export default createSettingsSlice
