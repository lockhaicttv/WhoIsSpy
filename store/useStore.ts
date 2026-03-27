import { create } from 'zustand'
import createGameSlice, { GameSlice } from './slices/gameSlice'
import createPlayerSlice, { PlayerSlice } from './slices/playerSlice'
import createKeywordSlice, { KeywordSlice } from './slices/keywordSlice'

export type MyState = GameSlice & PlayerSlice & KeywordSlice

export const useStore = create<MyState>()((...a) => ({
  ...createGameSlice(...a),
  ...createPlayerSlice(...a),
  ...createKeywordSlice(...a),
}))

export default useStore
