import { create } from 'zustand'

export type Choice = 'rock' | 'paper' | 'scissors'
export type GameResult = 'win' | 'lose' | 'draw'
export type GameMode = 'pve' | 'pvp'

type GameState = {
    gameMode: GameMode
    playerScore: number
    computerScore: number
    player2Score: number
    playerChoice: Choice | null
    computerChoice: Choice | null
    player2Choice: Choice | null
    result: GameResult | null
    currentPlayer: 'player1' | 'player2' | null
    gameHistory: Array<{
        playerChoice: Choice
        computerChoice?: Choice
        player2Choice?: Choice
        result: GameResult
        timestamp: Date
        gameMode: GameMode
    }>
}

type GameActions = {
    setGameMode: (mode: GameMode) => void
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

const determinePvPWinner = (player1Choice: Choice, player2Choice: Choice): GameResult => {
    if (player1Choice === player2Choice) return 'draw'

    const winConditions = {
        rock: 'scissors',
        paper: 'rock',
        scissors: 'paper'
    }

    return winConditions[player1Choice] === player2Choice ? 'win' : 'lose'
}

export const useGameStore = create<GameState & GameActions>((set, get) => ({
    gameMode: 'pve',
    playerScore: 0,
    computerScore: 0,
    player2Score: 0,
    playerChoice: null,
    computerChoice: null,
    player2Choice: null,
    result: null,
    currentPlayer: null,
    gameHistory: [],

    setGameMode: (gameMode: GameMode) => {
        set({
            gameMode,
            playerChoice: null,
            computerChoice: null,
            player2Choice: null,
            result: null,
            currentPlayer: null
        })
    },

    makeChoice: (choice: Choice) => {
        const state = get()
        
        if (state.gameMode === 'pve') {
            const computerChoice = getRandomChoice()
            const result = determineWinner(choice, computerChoice)

            set((state) => {
                const newPlayerScore = result === 'win' ? state.playerScore + 1 : state.playerScore
                const newComputerScore = result === 'lose' ? state.computerScore + 1 : state.computerScore

                return {
                    playerChoice: choice,
                    computerChoice,
                    result,
                    playerScore: newPlayerScore,
                    computerScore: newComputerScore,
                    gameHistory: [
                        {
                            playerChoice: choice,
                            computerChoice,
                            result,
                            timestamp: new Date(),
                            gameMode: 'pve'
                        },
                        ...state.gameHistory
                    ]
                }
            })
        } else {
            // PvP mode
            if (state.currentPlayer === null) {
                // First player's turn
                set({
                    playerChoice: choice,
                    currentPlayer: 'player2'
                })
            } else if (state.currentPlayer === 'player2') {
                // Second player's turn
                const player1Choice = state.playerChoice!
                const result = determinePvPWinner(player1Choice, choice)
                
                set((state) => {
                    const newPlayerScore = result === 'win' ? state.playerScore + 1 : state.playerScore
                    const newPlayer2Score = result === 'lose' ? state.player2Score + 1 : state.player2Score

                    return {
                        player2Choice: choice,
                        result,
                        playerScore: newPlayerScore,
                        player2Score: newPlayer2Score,
                        currentPlayer: null,
                        gameHistory: [
                            {
                                playerChoice: player1Choice,
                                player2Choice: choice,
                                result,
                                timestamp: new Date(),
                                gameMode: 'pvp'
                            },
                            ...state.gameHistory
                        ]
                    }
                })
            }
        }
    },

    resetGame: () => {
        set({
            playerChoice: null,
            computerChoice: null,
            player2Choice: null,
            result: null,
            currentPlayer: null
        })
    },

    resetScores: () => {
        set({
            playerScore: 0,
            computerScore: 0,
            player2Score: 0,
            gameHistory: [],
            playerChoice: null,
            computerChoice: null,
            player2Choice: null,
            result: null,
            currentPlayer: null
        })
    }
})) 