// features/game/ui/Scoreboard.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';

import { useGameStore } from '../model/store';
import { useMode, useScores } from '../model/selectors';

export const Scoreboard = () => {
  const mode = useMode();
  const { p1, p2 } = useScores();          // derived from store: { p1Score, p2Score }
  const resetAll = useGameStore(s => s.resetAll);

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
            <div className="text-3xl font-bold text-blue-600">{p1}</div>
            <div className="text-sm text-gray-300">Player 1</div>
          </div>
          <div className="text-2xl font-bold text-gray-300">vs</div>
          <div className="text-center w-16">
            <div className="text-3xl font-bold text-red-600">{p2}</div>
            <div className="text-sm text-gray-300">
              {mode === 'pve' ? 'Computer' : 'Player 2'}
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <Button
            onClick={resetAll}
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
