import { useGameStore } from './store';
import { winnerOf } from './rules';
import type { Choice, Winner } from './types';
import { useMemo } from 'react';

export const useMode = () => useGameStore(s => s.mode);
export const useGameStarted = () => useGameStore(s => s.gameStarted);

export const useP1Choice = () => useGameStore(s => s.p1Choice);
export const useP2Choice = () => useGameStore(s => s.p2Choice);
export const useCurrent = () => useGameStore(s => s.current);
export const useP1Score = () => useGameStore(s => s.p1Score);
export const useP2Score = () => useGameStore(s => s.p2Score);

export const useRound = () => {
  const p1Choice = useP1Choice();
  const p2Choice = useP2Choice();
  const current = useCurrent();
  return useMemo(
    () => ({ p1: p1Choice, p2: p2Choice, current }),
    [p1Choice, p2Choice, current]
  );
};

export const useScores = () => {
  const p1Score = useP1Score();
  const p2Score = useP2Score();
  return useMemo(() => ({ p1: p1Score, p2: p2Score }), [p1Score, p2Score]);
};

export const useWinner = (): Winner | null =>
  useGameStore(s =>
    s.p1Choice && s.p2Choice ? winnerOf(s.p1Choice, s.p2Choice) : null
  );

export const useIsRoundComplete = () =>
  useGameStore(s => Boolean(s.p1Choice && s.p2Choice));

export const useCanMakeChoice = () =>
  useGameStore(s => {
    const complete = Boolean(s.p1Choice && s.p2Choice);
    if (s.mode === 'pve') {
      return !complete;
    }
    if (s.current === 'player2') {
      return true;
    }
    if (s.current === null && !complete) {
      return true; // player1's turn
    }
    return false;
  });

export const useTurnText = () =>
  useGameStore(s => {
    const complete = Boolean(s.p1Choice && s.p2Choice);
    if (s.mode === 'pve') {
      return 'Make Your Choice';
    }
    if (s.current === 'player2') {
      return "Player 2's Turn";
    }
    if (complete) {
      return 'Game Complete';
    }
    return "Player 1's Turn";
  });

export const useHeadline = () =>
  useGameStore(s => {
    if (!s.p1Choice || !s.p2Choice) return 'Choose your weapon!';
    const w = winnerOf(s.p1Choice as Choice, s.p2Choice as Choice);
    if (s.mode === 'pve') {
      return w === 'player1'
        ? 'You win! 🎉'
        : w === 'player2'
          ? 'Computer wins! 😔'
          : "It's a draw! 🤝";
    }
    return w === 'player1'
      ? 'Player 1 wins! 🎉'
      : w === 'player2'
        ? 'Player 2 wins! 🎉'
        : "It's a draw! 🤝";
  });

export const useHistory = (limit = 10) => {
  const history = useGameStore(s => s.history);
  return useMemo(() => history.slice(0, limit), [history, limit]);
};

export const useHasHistory = () => useGameStore(s => s.history.length > 0);
