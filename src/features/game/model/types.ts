// features/game/model/types.ts
export type Choice = 'rock' | 'paper' | 'scissors';
export type GameMode = 'pve' | 'pvp';
export type Winner = 'player1' | 'player2' | 'draw';

export type Round = {
  id: string; // stable key for lists
  p1: Choice;
  p2: Choice;
  winner: Winner;
  mode: GameMode;
  ts: number; // number is safer than Date in state/persist
};

export type GameState = {
  mode: GameMode;
  p1Score: number;
  p2Score: number;
  p1Choice: Choice | null;
  p2Choice: Choice | null;
  current: 'player1' | 'player2' | null;
  history: Round[];
};

export type GameActions = {
  setMode: (mode: GameMode) => void;
  choose: (c: Choice) => void;
  resetRound: () => void;
  resetAll: () => void;
};
