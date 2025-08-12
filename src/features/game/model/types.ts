// features/game/model/types.ts
export type Choice = 'rock' | 'paper' | 'scissors';
export type GameMode = 'pve' | 'pvp';
export type Winner = 'player1' | 'player2' | 'draw';

export type Round = {
  id: string;
  p1: Choice;
  p2: Choice;
  winner: Winner;
  mode: GameMode;
  ts: number;
};

export type GameState = {
  mode: GameMode;
  gameStarted: boolean;
  p1Score: number;
  p2Score: number;
  p1Choice: Choice | null;
  p2Choice: Choice | null;
  current: 'player1' | 'player2' | null;
  history: Round[];
};

export type GameActions = {
  setMode: (mode: GameMode) => void;
  startGame: () => void;
  choose: (c: Choice) => void;
  resetRound: () => void;
  resetScores: () => void;
  resetAll: () => void;
};
