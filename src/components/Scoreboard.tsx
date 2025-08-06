import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { useGameStore } from '../store/gameStore'
import { RotateCcw } from 'lucide-react'

export const Scoreboard = () => {
    const { playerScore, computerScore, resetScores } = useGameStore()

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle className="text-center text-2xl font-bold text-gray-800">
                    Scoreboard
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                    <div className="text-center w-16">
                        <div className="text-3xl font-bold text-blue-600">{playerScore}</div>
                        <div className="text-sm text-gray-600">Player</div>
                    </div>
                    <div className="text-2xl font-bold text-gray-400">vs</div>
                    <div className="text-center w-16">
                        <div className="text-3xl font-bold text-red-600">{computerScore}</div>
                        <div className="text-sm text-gray-600">Computer</div>
                    </div>
                </div>

                <div className="flex justify-center">
                    <Button
                        onClick={resetScores}
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2"
                    >
                        <RotateCcw className="h-4 w-4" />
                        Reset Scores
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
} 