import { StateCreator } from 'zustand'
import { MyState } from '../useStore'

export type Role = 'civilian' | 'spy' | 'blank'

export interface Player {
  id: string;
  name: string;
  role: Role;
  isAlive: boolean;
  hasSeenRole: boolean;
}

export type PlayerSlice = {
  players: Player[];
  addPlayer: (name: string) => void;
  removePlayer: (id: string) => void;
  updatePlayerName: (id: string, name: string) => void;
  setPlayers: (players: Player[]) => void;
  resetPlayers: () => void;
  assignRoles: (numSpies: number, numBlanks?: number) => void;
  eliminatePlayer: (id: string) => void;
  markRoleSeen: (id: string) => void;
}

const createPlayerSlice: StateCreator<MyState, [], [], PlayerSlice> = (set, get) => ({
  players: [],
  addPlayer: (name) => set((state) => ({
    players: [...state.players, { id: Date.now().toString(), name, role: 'civilian', isAlive: true, hasSeenRole: false }]
  })),
  removePlayer: (id) => set((state) => ({
    players: state.players.filter(p => p.id !== id)
  })),
  updatePlayerName: (id, name) => set((state) => ({
    players: state.players.map(p => p.id === id ? { ...p, name } : p)
  })),
  setPlayers: (players) => set({ players }),
  resetPlayers: () => set((state) => ({
    players: state.players.map(p => ({ ...p, role: 'civilian', isAlive: true, hasSeenRole: false }))
  })),
  assignRoles: (numSpies, numBlanks = 0) => set((state) => {
    const newPlayers = [...state.players].map(p => ({ ...p, role: 'civilian' as Role, isAlive: true, hasSeenRole: false }));
    let availableIndices = newPlayers.map((_, i) => i);
    for (let i = availableIndices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [availableIndices[i], availableIndices[j]] = [availableIndices[j], availableIndices[i]];
    }
    
    for (let i = 0; i < numSpies; i++) {
        if (availableIndices.length > 0) newPlayers[availableIndices.pop()!].role = 'spy';
    }
    for (let i = 0; i < numBlanks; i++) {
        if (availableIndices.length > 0) newPlayers[availableIndices.pop()!].role = 'blank';
    }
    
    return { players: newPlayers };
  }),
  eliminatePlayer: (id) => set((state) => ({
    players: state.players.map(p => p.id === id ? { ...p, isAlive: false } : p)
  })),
  markRoleSeen: (id) => set((state) => ({
    players: state.players.map(p => p.id === id ? { ...p, hasSeenRole: true } : p)
  })),
})

export default createPlayerSlice
