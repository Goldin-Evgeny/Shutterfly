import styles from './Game.module.css';

import { useGameStore } from '../../model/store';
import {
  useMode,
  useRound,
  useCanMakeChoice,
  useHeadline,
  useIsRoundComplete,
} from '../../model/selectors';
import { Button } from '@/components/ui/button';
import { ChoiceButtons } from './ChoiceButtons';

export const Game = () => {
  const mode = useMode();
  const { p1, p2 } = useRound();
  const canMakeChoice = useCanMakeChoice();
  const headline = useHeadline();
  const isRoundComplete = useIsRoundComplete();

  const choose = useGameStore(s => s.choose);
  const resetRound = useGameStore(s => s.resetRound);

  return (
    <div className={styles.container}>
      <div className={styles.gameCard}>
        <div className={styles.gameTitle}>{headline}</div>
        <div className={styles.choicesContainer}>
          <div className={styles.playerChoice}>
            <div className={styles.playerLabel}>Player 1</div>
            <ChoiceButtons
              playerChoice={p1}
              onChoice={choose}
              isLocked={Boolean(p1)}
              canMakeChoice={canMakeChoice}
              p1={p1}
            />
          </div>
          <div className={styles.playerChoice}>
            <div className={styles.playerLabel}>
              {mode === 'pve' ? 'Computer' : 'Player 2'}
            </div>
            <ChoiceButtons
              playerChoice={p2}
              onChoice={choose}
              isLocked={Boolean(p2)}
              isComputer={mode === 'pve'}
              isPlayer2={mode === 'pvp'}
              canMakeChoice={canMakeChoice}
              p1={p1}
            />
          </div>
        </div>
      </div>

      {(isRoundComplete || p1 || p2) && (
        <div className={styles.playAgainContainer}>
          <Button onClick={resetRound} type="button" size="sm">
            Play Again
          </Button>
        </div>
      )}
    </div>
  );
};
