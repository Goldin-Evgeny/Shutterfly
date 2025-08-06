import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { useGameStore } from '../store/gameStore'
import { Hand, Scissors, Square } from 'lucide-react'

const choiceIcons = {
    rock: Hand,
    paper: Square,
    scissors: Scissors
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
            <Card>
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
        <Card>
            <CardHeader>
                <CardTitle className="text-center">Recent Games</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                    {gameHistory.slice(0, 10).map((game, index) => {
                        const PlayerIcon = choiceIcons[game.playerChoice]
                        const ComputerIcon = choiceIcons[game.computerChoice]

                        return (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <PlayerIcon className="w-5 h-5 text-blue-600" />
                                    <span className="text-sm">vs</span>
                                    <ComputerIcon className="w-5 h-5 text-red-600" />
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
                        )
                    })}
                </div>
            </CardContent>
        </Card>
    )
} 