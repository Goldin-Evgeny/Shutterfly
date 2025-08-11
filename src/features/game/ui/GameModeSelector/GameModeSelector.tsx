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

  const handleModeChange = (m: GameMode) => setMode(m);

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
          >
            Player vs Computer
          </Button>

          <Button
            onClick={() => handleModeChange('pvp')}
            variant={mode === 'pvp' ? 'default' : 'outline'}
            className={styles.button}
          >
            Player vs Player
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
