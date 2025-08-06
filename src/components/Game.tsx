import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { useGameStore, type Choice } from '../store/gameStore'
import rockIcon from '../assets/rock.svg'
import paperIcon from '../assets/paper.svg'
import scissorsIcon from '../assets/scissors.svg'
import { ComicText } from '../components/magicui/comic-text'

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

const resultTexts = {
    win: 'You win! 🎉',
    lose: 'Computer wins! 😔',
    draw: "It's a draw! 🤝",
    default: 'Choose your weapon!'
}

export const Game = () => {
    const {
        playerChoice,
        computerChoice,
        result,
        makeChoice,
        resetGame
    } = useGameStore()

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
                                {resultTexts[result as keyof typeof resultTexts] || resultTexts.default}
                            </ComicText>
                        ) : (
                            resultTexts.default
                        )}
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
                    <div className="flex justify-center">
                        <div className="relative w-48 h-40">
                            {/* Rock - Top */}
                            <Button
                                onClick={() => makeChoice('rock')}
                                className={`${choiceColors.rock} text-white absolute top-2 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full p-0 flex items-center justify-center hover:scale-110 transition-transform`}
                                size="lg"
                            >
                                <img
                                    src={choiceIcons.rock}
                                    alt="rock"
                                    className="w-8 h-8"
                                />
                            </Button>

                            {/* Paper - Bottom Left */}
                            <Button
                                onClick={() => makeChoice('paper')}
                                className={`${choiceColors.paper} text-white absolute bottom-2 left-4 w-16 h-16 rounded-full p-0 flex items-center justify-center hover:scale-110 transition-transform`}
                                size="lg"
                            >
                                <img
                                    src={choiceIcons.paper}
                                    alt="paper"
                                    className="w-8 h-8"
                                />
                            </Button>

                            {/* Scissors - Bottom Right */}
                            <Button
                                onClick={() => makeChoice('scissors')}
                                className={`${choiceColors.scissors} text-white absolute bottom-2 right-4 w-16 h-16 rounded-full p-0 flex items-center justify-center hover:scale-110 transition-transform`}
                                size="lg"
                            >
                                <img
                                    src={choiceIcons.scissors}
                                    alt="scissors"
                                    className="w-8 h-8"
                                />
                            </Button>
                        </div>
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