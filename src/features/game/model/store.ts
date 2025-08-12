import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { randomChoice, winnerOf } from './rules';
import type { Choice, GameActions, GameState, GameMode, Winner } from './types';

const createGameResult = (
  p1: Choice,
  p2: Choice,
  mode: GameMode,
  winner: Winner
) => ({
  id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
  p1,
  p2,
  winner,
  mode,
  ts: Date.now(),
});

const updateGameState = (
  state: GameState,
  p1: Choice,
  p2: Choice,
  mode: GameMode
) => {
  const winner = winnerOf(p1, p2);
  const gameResult = createGameResult(p1, p2, mode, winner);

  return {
    p1Choice: p1,
    p2Choice: p2,
    p1Score: winner === 'player1' ? state.p1Score + 1 : state.p1Score,
    p2Score: winner === 'player2' ? state.p2Score + 1 : state.p2Score,
    history: [gameResult, ...state.history],
  };
};

const getResetState = (includeGameStarted = false) => ({
  p1Score: 0,
  p2Score: 0,
  history: [],
  p1Choice: null,
  p2Choice: null,
  current: null,
  ...(includeGameStarted && { gameStarted: false }),
});

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
          const state = get();

          if (state.mode === 'pve') {
            const cpu = randomChoice();
            set(prevState => updateGameState(prevState, choice, cpu, 'pve'));
            return;
          }

          // PvP
          if (state.current === null) {
            set({ p1Choice: choice, current: 'player2' });
            return;
          }

          if (state.current === 'player2') {
            const p1 = state.p1Choice!;
            set(prevState => ({
              ...updateGameState(prevState, p1, choice, 'pvp'),
              current: null,
            }));
          }
        },

        resetRound: () =>
          set({ p1Choice: null, p2Choice: null, current: null }),

        resetScores: () => set(getResetState()),

        resetAll: () => set(getResetState(true)),
      }),
      { name: 'rps-store' } // use for persist
    )
  )
);
