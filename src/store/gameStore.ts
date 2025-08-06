import { create } from 'zustand'

export type Choice = 'rock' | 'paper' | 'scissors'
export type GameResult = 'win' | 'lose' | 'draw'

type GameState = {
    playerScore: number
    computerScore: number
    playerChoice: Choice | null
    computerChoice: Choice | null
    result: GameResult | null
    gameHistory: Array<{
        playerChoice: Choice
        computerChoice: Choice
        result: GameResult
        timestamp: Date
    }>
}

type GameActions = {
    makeChoice: (choice: Choice) => void
    resetGame: () => void
    resetScores: () => void
}

const choices: Choice[] = ['rock', 'paper', 'scissors']

const getRandomChoice = (): Choice => {
    return choices[Math.floor(Math.random() * choices.length)]
}

const determineWinner = (playerChoice: Choice, computerChoice: Choice): GameResult => {
    if (playerChoice === computerChoice) return 'draw'

    const winConditions = {
        rock: 'scissors',
        paper: 'rock',
        scissors: 'paper'
    }

    return winConditions[playerChoice] === computerChoice ? 'win' : 'lose'
}

export const useGameStore = create<GameState & GameActions>((set) => ({
    playerScore: 0,
    computerScore: 0,
    playerChoice: null,
    computerChoice: null,
    result: null,
    gameHistory: [],

    makeChoice: (playerChoice: Choice) => {
        const computerChoice = getRandomChoice()
        const result = determineWinner(playerChoice, computerChoice)

        set((state) => {
            const newPlayerScore = result === 'win' ? state.playerScore + 1 : state.playerScore
            const newComputerScore = result === 'lose' ? state.computerScore + 1 : state.computerScore

            return {
                playerChoice,
                computerChoice,
                result,
                playerScore: newPlayerScore,
                computerScore: newComputerScore,
                gameHistory: [
                    {
                        playerChoice,
                        computerChoice,
                        result,
                        timestamp: new Date()
                    },
                    ...state.gameHistory
                ]
            }
        })
    },

    resetGame: () => {
        set({
            playerChoice: null,
            computerChoice: null,
            result: null
        })
    },

    resetScores: () => {
        set({
            playerScore: 0,
            computerScore: 0,
            gameHistory: [],
            playerChoice: null,
            computerChoice: null,
            result: null
        })
    }
})) 