// features/game/ui/Scoreboard.tsx
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';

import { useGameStore } from '../../model/store';
import { useMode, useScores } from '../../model/selectors';
import styles from './Scoreboard.module.css';

export const Scoreboard = () => {
  const mode = useMode();
  const { p1, p2 } = useScores(); // derived from store: { p1Score, p2Score }
  const resetScores = useGameStore(s => s.resetScores);

  return (
    <div className={styles.scoreboardCard}>
      <div className={styles.scoreboardHeader}>
        <h3>Scoreboard</h3>
      </div>
      <div className={styles.scoreboardContent}>
        <div className={styles.scoresContainer}>
          <div className={styles.playerScore}>
            <div className={styles.player1Score}>{p1}</div>
            <div className={styles.playerLabel}>Player 1</div>
          </div>
          <div className={styles.vsLabel}>vs</div>
          <div className={styles.playerScore}>
            <div className={styles.player2Score}>{p2}</div>
            <div className={styles.playerLabel}>
              {mode === 'pve' ? 'Computer' : 'Player 2'}
            </div>
          </div>
        </div>

        <div className={styles.resetButtonContainer}>
          <Button
            onClick={resetScores}
            variant="default"
            size="sm"
            className={styles.resetButton}
          >
            <RotateCcw className={styles.resetButtonIcon} />
            Reset Scores
          </Button>
        </div>
      </div>
    </div>
  );
};
