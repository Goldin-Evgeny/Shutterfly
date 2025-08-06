import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { useGameStore } from '../store/gameStore'
import rockIcon from '../assets/rock.svg'
import paperIcon from '../assets/paper.svg'
import scissorsIcon from '../assets/scissors.svg'

const choiceIcons = {
    rock: rockIcon,
    paper: paperIcon,
    scissors: scissorsIcon
}

const getResultColor = (result: string) => {
    if (result === 'win') return 'text-green-600'
    if (result === 'lose') return 'text-red-600'
    return 'text-yellow-600'
}

const getResultText = (result: string) => {
    if (result === 'win') return 'Won'
    if (result === 'lose') return 'Lost'
    return 'Draw'
}

export const GameHistory = () => {
    const { gameHistory } = useGameStore()

    if (gameHistory.length === 0) {
        return (
            <Card className="max-w-md mx-auto">
                <CardHeader>
                    <CardTitle className="text-center">Game History</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-center text-gray-500">No games played yet</p>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="max-w-md mx-auto">
            <CardHeader>
                <CardTitle className="text-center">Recent Games</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                    {gameHistory.slice(0, 10).map((game, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-3">
                                <img
                                    src={choiceIcons[game.playerChoice]}
                                    alt={game.playerChoice}
                                    className="w-5 h-5"
                                />
                                <span className="text-sm">vs</span>
                                <img
                                    src={choiceIcons[game.computerChoice]}
                                    alt={game.computerChoice}
                                    className="w-5 h-5"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <span className={`text-sm font-medium ${getResultColor(game.result)}`}>
                                    {getResultText(game.result)}
                                </span>
                                <span className="text-xs text-gray-500">
                                    {game.timestamp.toLocaleTimeString()}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
} 