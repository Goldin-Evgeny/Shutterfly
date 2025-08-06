import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { useGameStore, type Choice } from '../store/gameStore'
import React from 'react'
import rockIcon from '../assets/rock.svg'
import paperIcon from '../assets/paper.svg'
import scissorsIcon from '../assets/scissors.svg'

const choiceIcons = {
    rock: rockIcon,
    paper: paperIcon,
    scissors: scissorsIcon
}

const choiceColors = {
    rock: 'bg-orange-500 hover:bg-orange-600',
    paper: 'bg-blue-500 hover:bg-blue-600',
    scissors: 'bg-green-500 hover:bg-green-600'
}

export const Game = () => {
    const {
        playerChoice,
        computerChoice,
        result,
        makeChoice,
        resetGame
    } = useGameStore()

    const handleChoice = (choice: Choice) => {
        makeChoice(choice)
    }

    const getResultText = () => {
        if (!result) return 'Choose your weapon!'
        if (result === 'win') return 'You win! 🎉'
        if (result === 'lose') return 'Computer wins! 😔'
        return "It's a draw! 🤝"
    }

    return (
        <div className="space-y-6">
            {/* Game Result */}
            <Card className="min-h-[200px]">
                <CardHeader>
                    <CardTitle className="text-center text-xl">
                        {getResultText()}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-center items-center gap-8">
                        <div className="text-center">
                            <div className="text-sm text-gray-600 mb-2">Your Choice</div>
                            {playerChoice && (
                                <div className="text-4xl">
                                    <img
                                        src={choiceIcons[playerChoice]}
                                        alt={playerChoice}
                                        className="w-12 h-12"
                                    />
                                </div>
                            )}
                        </div>
                        <div className="text-center">
                            <div className="text-sm text-gray-600 mb-2">Computer</div>
                            {computerChoice && (
                                <div className="text-4xl">
                                    <img
                                        src={choiceIcons[computerChoice]}
                                        alt={computerChoice}
                                        className="w-12 h-12"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Choice Buttons */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-center">Make Your Choice</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-center gap-4">
                        {(['rock', 'paper', 'scissors'] as Choice[]).map((choice) => (
                            <Button
                                key={choice}
                                onClick={() => handleChoice(choice)}
                                className={`${choiceColors[choice]} text-white text-lg px-6 py-3 min-w-[100px]`}
                                size="lg"
                            >
                                <img
                                    src={choiceIcons[choice]}
                                    alt={choice}
                                    className="w-6 h-6 mr-2"
                                />
                                {choice.charAt(0).toUpperCase() + choice.slice(1)}
                            </Button>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Reset Button */}
            {(playerChoice || computerChoice) && (
                <div className="flex justify-center">
                    <Button onClick={resetGame} variant="outline">
                        Play Again
                    </Button>
                </div>
            )}
        </div>
    )
} 