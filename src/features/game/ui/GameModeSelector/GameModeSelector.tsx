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
    <div className={styles.card}>
      <h3>Select Game Mode</h3>
      <div className={styles.buttonContainer}>
        <Button
          onClick={() => handleModeChange('pve')}
          variant={mode === 'pve' ? 'outline' : 'default'}
          className={styles.button}
          size="sm"
        >
          PvE
        </Button>

        <Button
          onClick={() => handleModeChange('pvp')}
          variant={mode === 'pvp' ? 'outline' : 'default'}
          className={styles.button}
          size="sm"
        >
          PvP
        </Button>
      </div>

      <div className={styles.startButtonContainer}>
        <Button onClick={handleStartGame} disabled={!mode} size="sm">
          Start Game
        </Button>
      </div>
    </div>
  );
};
