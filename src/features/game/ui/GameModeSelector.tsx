// features/game/ui/GameModeSelector.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/button';
import { Monitor, Users } from 'lucide-react';

import { useGameStore } from '../model/store';
import type { GameMode } from '../model/types';
import { useMode } from '../model/selectors';

export const GameModeSelector = () => {
  const mode = useMode();
  const setMode = useGameStore(s => s.setMode);

  const handleModeChange = (m: GameMode) => setMode(m);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center text-xl text-white">
          Select Game Mode
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4">
          <Button
            onClick={() => handleModeChange('pve')}
            variant={mode === 'pve' ? 'default' : 'outline'}
            className="flex-1 flex flex-col items-center gap-2 py-6"
          >
            <Monitor className="h-6 w-6" />
            <div>
              <div className="font-semibold">Player vs Computer</div>
              <div className="text-xs text-gray-300">Play against AI</div>
            </div>
          </Button>

          <Button
            onClick={() => handleModeChange('pvp')}
            variant={mode === 'pvp' ? 'default' : 'outline'}
            className="flex-1 flex flex-col items-center gap-2 py-6"
          >
            <Users className="h-6 w-6" />
            <div>
              <div className="font-semibold">Player vs Player</div>
              <div className="text-xs text-gray-300">Two players take turns</div>
            </div>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
