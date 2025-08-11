// features/game/model/store.ts
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { randomChoice, winnerOf } from './rules';
import type { Choice, GameActions, GameState, GameMode, Winner } from './types';

export const useGameStore = create<GameState & GameActions>()(
  devtools(
    persist(
      (set, get) => ({
        mode: 'pve',
        gameStarted: false,
        p1Score: 0,
        p2Score: 0,
        p1Choice: null,
        p2Choice: null,
        current: null,
        history: [],

        setMode: (mode: GameMode) =>
          set(() => ({
            mode,
            gameStarted: false,
            p1Choice: null,
            p2Choice: null,
            current: null,
          })),

        startGame: () =>
          set(() => ({
            gameStarted: true,
            p1Choice: null,
            p2Choice: null,
            current: null,
          })),

        choose: (choice: Choice) => {
          const s = get();

          if (s.mode === 'pve') {
            const cpu = randomChoice();
            const w: Winner = winnerOf(choice, cpu);
            const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;

            set(state => ({
              p1Choice: choice,
              p2Choice: cpu,
              p1Score: w === 'player1' ? state.p1Score + 1 : state.p1Score,
              p2Score: w === 'player2' ? state.p2Score + 1 : state.p2Score,
              history: [
                {
                  id,
                  p1: choice,
                  p2: cpu,
                  winner: w,
                  mode: 'pve',
                  ts: Date.now(),
                },
                ...state.history,
              ],
            }));
            return;
          }

          // PvP
          if (s.current === null) {
            set({ p1Choice: choice, current: 'player2' });
            return;
          }
          if (s.current === 'player2') {
            const p1 = s.p1Choice!;
            const p2 = choice;
            const w: Winner = winnerOf(p1, p2);
            const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;

            set(state => ({
              p2Choice: p2,
              current: null,
              p1Score: w === 'player1' ? state.p1Score + 1 : state.p1Score,
              p2Score: w === 'player2' ? state.p2Score + 1 : state.p2Score,
              history: [
                {
                  id,
                  p1,
                  p2,
                  winner: w,
                  mode: 'pvp',
                  ts: Date.now(),
                },
                ...state.history,
              ],
            }));
          }
        },

        resetRound: () =>
          set({ p1Choice: null, p2Choice: null, current: null }),
        
        resetScores: () =>
          set({
            p1Score: 0,
            p2Score: 0,
            history: [],
            p1Choice: null,
            p2Choice: null,
            current: null,
          }),
        
        resetAll: () =>
          set({
            p1Score: 0,
            p2Score: 0,
            history: [],
            gameStarted: false,
            p1Choice: null,
            p2Choice: null,
            current: null,
          }),
      }),
      { name: 'rps-store' } // handy if you add persist
    )
  )
);
