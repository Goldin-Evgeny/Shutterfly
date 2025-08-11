export const CHOICES = ['rock','paper','scissors'] as const;
export type Choice = typeof CHOICES[number];

export const beats: Record<Choice, Choice> = {
  rock: 'scissors',
  paper: 'rock',
  scissors: 'paper'
} as const;

export const winnerOf = (p1: Choice, p2: Choice): 'player1'|'player2'|'draw' =>
  p1 === p2 ? 'draw' : (beats[p1] === p2 ? 'player1' : 'player2');

export const randomChoice = (rng = Math.random): Choice =>
  CHOICES[Math.floor(rng() * CHOICES.length)];