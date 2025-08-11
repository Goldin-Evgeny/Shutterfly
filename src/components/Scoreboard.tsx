import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useGameStore } from '../store/gameStore';
import { RotateCcw } from 'lucide-react';

export const Scoreboard = () => {
  const { playerScore, computerScore, player2Score, gameMode, resetScores } =
    useGameStore();

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold text-white">
          Scoreboard
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="text-center w-16">
            <div className="text-3xl font-bold text-blue-600">
              {playerScore}
            </div>
            <div className="text-sm text-gray-300">Player 1</div>
          </div>
          <div className="text-2xl font-bold text-gray-300">vs</div>
          <div className="text-center w-16">
            <div className="text-3xl font-bold text-red-600">
              {gameMode === 'pve' ? computerScore : player2Score}
            </div>
            <div className="text-sm text-gray-300">
              {gameMode === 'pve' ? 'Computer' : 'Player 2'}
            </div>
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
  );
};
