import { create } from 'zustand'
import createGameSlice, { GameSlice } from './slices/gameSlice'
import createPlayerSlice, { PlayerSlice } from './slices/playerSlice'
import createKeywordSlice, { KeywordSlice } from './slices/keywordSlice'
import createSettingsSlice, { SettingsSlice } from './slices/settingsSlice'

export type MyState = GameSlice & PlayerSlice & KeywordSlice & SettingsSlice

export const useStore = create<MyState>()((...a) => ({
  ...createGameSlice(...a),
  ...createPlayerSlice(...a),
  ...createKeywordSlice(...a),
  ...createSettingsSlice(...a),
}))

// Load keywords and settings on store initialization
useStore.getState().loadKeywords();
useStore.getState().initializeSettings();

export default useStore
