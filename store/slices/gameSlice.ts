import { StateCreator } from 'zustand'
import { MyState } from '../useStore'

export type GamePhase = 'setup' | 'role_distribution' | 'role_reveal' | 'discussion' | 'voting' | 'victory'

export type GameSlice = {
  phase: GamePhase;
  setPhase: (phase: GamePhase) => void;
  civilianWord: string;
  spyWord: string;
  setWords: (civ: string, spy: string) => void;
  winner: 'civilians' | 'spies' | null;
  setWinner: (winner: 'civilians' | 'spies' | null) => void;
}

const createGameSlice: StateCreator<MyState, [], [], GameSlice> = (set) => ({
  phase: 'setup',
  setPhase: (phase) => set({ phase }),
  civilianWord: '',
  spyWord: '',
  setWords: (civ, spy) => set({ civilianWord: civ, spyWord: spy }),
  winner: null,
  setWinner: (winner) => set({ winner }),
})

export default createGameSlice
