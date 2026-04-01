import { StateCreator } from 'zustand'
import { getAvailableKeywords, getRandomKeyword as getRandomFromDb } from '../../db/keywordService'
import { getCurrentLanguage } from '../../utils/i18n'
import { MyState } from '../useStore'

export interface KeywordPair {
  id: string;
  civilian: string;
  spy: string;
  category: string;
}

export type KeywordSlice = {
  keywords: KeywordPair[];
  loadKeywords: () => void;
  addKeyword: (pair: Omit<KeywordPair, 'id'>) => void;
  removeKeyword: (id: string) => void;
  getRandomKeyword: () => KeywordPair | undefined;
}

const createKeywordSlice: StateCreator<MyState, [], [], KeywordSlice> = (set, get) => ({
  keywords: [],
  
  // Load keywords from database (filtered by current locale)
  loadKeywords: () => {
    try {
      const locale = getCurrentLanguage();
      const dbKeywords = getAvailableKeywords(locale);
      const keywords: KeywordPair[] = dbKeywords.map((kw) => ({
        id: kw.id.toString(),
        civilian: kw.civilianWord,
        spy: kw.spyWord,
        category: kw.category,
      }));
      set({ keywords });
    } catch (error) {
      console.error('Error loading keywords:', error);
    }
  },

  addKeyword: (pair) => set((state) => ({
    keywords: [...state.keywords, { ...pair, id: Date.now().toString() }]
  })),

  removeKeyword: (id) => set((state) => ({
    keywords: state.keywords.filter(k => k.id !== id)
  })),

  getRandomKeyword: () => {
    // First try to get from database (locale-aware)
    const locale = getCurrentLanguage();
    const dbKeyword = getRandomFromDb(locale);
    if (dbKeyword) {
      return {
        id: dbKeyword.id.toString(),
        civilian: dbKeyword.civilianWord,
        spy: dbKeyword.spyWord,
        category: dbKeyword.category,
      };
    }

    // Fallback to in-memory keywords
    const list = get().keywords;
    if (list.length === 0) return undefined;
    return list[Math.floor(Math.random() * list.length)];
  }
})

export default createKeywordSlice
