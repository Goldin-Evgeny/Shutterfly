// features/game/ui/GameModeSelector.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card/Card';
import { Button } from '@/components/ui/button';
import { useGameStore } from '../../model/store';
import type { GameMode } from '../../model/types';
import { useMode } from '../../model/selectors';
import styles from './GameModeSelector.module.css';

export const GameModeSelector = () => {
  const mode = useMode();
  const setMode = useGameStore(s => s.setMode);
  const startGame = useGameStore(s => s.startGame);

  const handleModeChange = (m: GameMode) => setMode(m);
  const handleStartGame = () => startGame();

  return (
    <Card className={styles.card}>
      <CardHeader>
        <CardTitle className={styles.title}>
          Select Game Mode
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className={styles.buttonContainer}>
          <Button
            onClick={() => handleModeChange('pve')}
            variant={mode === 'pve' ? 'default' : 'outline'}
            className={styles.button}
            size="sm"
          >
            Player vs Computer
          </Button>

          <Button
            onClick={() => handleModeChange('pvp')}
            variant={mode === 'pvp' ? 'default' : 'outline'}
            className={styles.button}
            size="sm"
          >
            Player vs Player
          </Button>
        </div>

        <div className={styles.startButtonContainer}>
          <Button
            onClick={handleStartGame}
            disabled={!mode}
            size="sm"
          >
            Start Game
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
