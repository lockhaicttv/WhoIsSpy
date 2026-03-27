import { StateCreator } from 'zustand'
import { MyState } from '../useStore'

export interface KeywordPair {
  id: string;
  civilian: string;
  spy: string;
  category: string;
}

const defaultKeywords: KeywordPair[] = [
  { id: '1', civilian: 'Apple', spy: 'Pear', category: 'Food' },
  { id: '2', civilian: 'Car', spy: 'Bike', category: 'Transport' },
  { id: '3', civilian: 'Dog', spy: 'Wolf', category: 'Animal' },
  { id: '4', civilian: 'Guitar', spy: 'Piano', category: 'Instruments' },
]

export type KeywordSlice = {
  keywords: KeywordPair[];
  addKeyword: (pair: Omit<KeywordPair, 'id'>) => void;
  removeKeyword: (id: string) => void;
  getRandomKeyword: () => KeywordPair | undefined;
}

const createKeywordSlice: StateCreator<MyState, [], [], KeywordSlice> = (set, get) => ({
  keywords: defaultKeywords,
  addKeyword: (pair) => set((state) => ({
    keywords: [...state.keywords, { ...pair, id: Date.now().toString() }]
  })),
  removeKeyword: (id) => set((state) => ({
    keywords: state.keywords.filter(k => k.id !== id)
  })),
  getRandomKeyword: () => {
    const list = get().keywords;
    if (list.length === 0) return undefined;
    return list[Math.floor(Math.random() * list.length)];
  }
})

export default createKeywordSlice
