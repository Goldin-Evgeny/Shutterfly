import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { useGameStore, type Choice, type GameResult } from '../store/gameStore'
import rockIcon from '../assets/rock.svg'
import paperIcon from '../assets/paper.svg'
import scissorsIcon from '../assets/scissors.svg'
import { ComicText } from '../components/magicui/comic-text'

const choiceIcons = {
    rock: rockIcon,
    paper: paperIcon,
    scissors: scissorsIcon
}

const choiceColors: Record<Choice, string> = {
    rock: 'bg-orange-500 hover:bg-orange-600',
    paper: 'bg-blue-500 hover:bg-blue-600',
    scissors: 'bg-green-500 hover:bg-green-600'
}

const resultTexts: Record<GameResult | 'default', string> = {
    win: 'Player 1 wins! 🎉',
    lose: 'Player 2 wins! 🎉',
    draw: "It's a draw! 🤝",
    default: 'Choose your weapon!'
}

const pveResultTexts: Record<GameResult | 'default', string> = {
    win: 'You win! 🎉',
    lose: 'Computer wins! 😔',
    draw: "It's a draw! 🤝",
    default: 'Choose your weapon!'
}

export const Game = () => {
    const {
        gameMode,
        playerChoice,
        computerChoice,
        player2Choice,
        result,
        currentPlayer,
        makeChoice,
        resetGame
    } = useGameStore()

    const getResultText = () => {
        if (!result) return gameMode === 'pve' ? pveResultTexts.default : resultTexts.default
        return gameMode === 'pve' ? pveResultTexts[result] : resultTexts[result]
    }

    const getCurrentPlayerText = () => {
        if (gameMode === 'pve') return 'Make Your Choice'
        if (currentPlayer === 'player2') return "Player 2's Turn"
        if (result) return 'Game Complete'
        return "Player 1's Turn"
    }

    const getOpponentChoice = () => {
        if (gameMode === 'pve') {
            return computerChoice
        } else {
            return player2Choice
        }
    }

    const getOpponentLabel = () => {
        return gameMode === 'pve' ? 'Computer' : 'Player 2'
    }

    const canMakeChoice = () => {
        if (gameMode === 'pve') return !result
        if (currentPlayer === 'player2') return true
        if (currentPlayer === null && !result) return true
        return false
    }

    const shouldShowPlayer1Choice = () => {
        if (gameMode === 'pve') return !!playerChoice
        // In PvP mode, only show Player 1's choice when both have chosen or game is complete
        return !!playerChoice && (!!player2Choice || !!result)
    }

    return (
        <div className="space-y-6 max-w-md mx-auto">
            {/* Game Result */}
            <Card className="min-h-[200px]">
                <CardHeader>
                    <CardTitle className="text-center text-xl">
                        {result ? (
                            <ComicText
                                className="text-2xl"
                                fontSize={2}
                                key={result}
                            >
                                {getResultText()}
                            </ComicText>
                        ) : (
                            getResultText()
                        )}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-center items-start gap-8">
                        <div className="text-center flex flex-col items-center">
                            <div className="text-sm text-gray-300 mb-2">Player 1</div>
                            {shouldShowPlayer1Choice() && (
                                <div className="text-4xl min-h-16 flex items-center justify-center">
                                    <img
                                        src={choiceIcons[playerChoice!]}
                                        alt={playerChoice!}
                                        className="w-12 "
                                    />
                                </div>
                            )}
                        </div>
                        <div className="text-center flex flex-col items-center">
                            <div className="text-sm text-gray-300 mb-2">{getOpponentLabel()}</div>
                            {getOpponentChoice() && (
                                <div className="text-4xl min-h-16 flex items-center justify-center">
                                    <img
                                        src={choiceIcons[getOpponentChoice()!]}
                                        alt={getOpponentChoice()!}
                                        className="w-12 "
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
                    <CardTitle className="text-center">{getCurrentPlayerText()}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-center">
                        <div className="relative w-48 h-40">
                            {/* Rock - Top */}
                            <Button
                                onClick={() => makeChoice('rock')}
                                disabled={!canMakeChoice()}
                                className={`${choiceColors.rock} text-white absolute top-2 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full p-0 flex items-center justify-center hover:scale-110 transition-transform disabled:opacity-50 disabled:cursor-not-allowed`}
                                size="lg"
                            >
                                <img
                                    src={choiceIcons.rock}
                                    alt="rock"
                                    className="w-8"
                                />
                            </Button>

                            {/* Paper - Bottom Left */}
                            <Button
                                onClick={() => makeChoice('paper')}
                                disabled={!canMakeChoice()}
                                className={`${choiceColors.paper} text-white absolute bottom-2 left-4 w-16 h-16 rounded-full p-0 flex items-center justify-center hover:scale-110 transition-transform disabled:opacity-50 disabled:cursor-not-allowed`}
                                size="lg"
                            >
                                <img
                                    src={choiceIcons.paper}
                                    alt="paper"
                                    className="w-8"
                                />
                            </Button>

                            {/* Scissors - Bottom Right */}
                            <Button
                                onClick={() => makeChoice('scissors')}
                                disabled={!canMakeChoice()}
                                className={`${choiceColors.scissors} text-white absolute bottom-2 right-4 w-16 h-16 rounded-full p-0 flex items-center justify-center hover:scale-110 transition-transform disabled:opacity-50 disabled:cursor-not-allowed`}
                                size="lg"
                            >
                                <img
                                    src={choiceIcons.scissors}
                                    alt="scissors"
                                    className="w-8"
                                />
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Reset Button */}
            {(result || (gameMode === 'pve' && (playerChoice || getOpponentChoice())) || (gameMode === 'pvp' && playerChoice && player2Choice)) && (
                <div className="flex justify-center">
                    <Button onClick={resetGame} variant="outline">
                        Play Again
                    </Button>
                </div>
            )}
        </div>
    )
} 