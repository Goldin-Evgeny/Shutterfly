import styles from './Game.module.css';

import rockIcon from '../../assets/rock.svg';
import paperIcon from '../../assets/paper.svg';
import scissorsIcon from '../../assets/scissors.svg';

import { useGameStore } from '../../model/store';
import {
  useMode,
  useRound,
  useCanMakeChoice,
  useHeadline,
  useIsRoundComplete,
} from '../../model/selectors';
import type { Choice } from '../../model/types';
import { Button } from '../../../../components/ui/button';

const choiceIcons: Record<Choice, string> = {
  rock: rockIcon,
  paper: paperIcon,
  scissors: scissorsIcon,
};

const choiceColors: Record<Choice, string> = {
  rock: styles.rock,
  paper: styles.paper,
  scissors: styles.scissors,
};

export const Game = () => {
  const mode = useMode();
  const { p1, p2 } = useRound();
  const canMakeChoice = useCanMakeChoice();
  const headline = useHeadline();
  const isRoundComplete = useIsRoundComplete();

  const choose = useGameStore(s => s.choose);
  const resetRound = useGameStore(s => s.resetRound);

  const renderChoiceButtons = (
    playerChoice: Choice | null,
    onChoice: (choice: Choice) => void,
    isLocked: boolean,
    isComputer: boolean = false,
    isPlayer2: boolean = false
  ) => (
    <div className={styles.choiceButtonsContainer}>
      <div className={styles.choiceContainer}>
        {(['rock', 'paper', 'scissors'] as const).map(c => (
          <button
            key={c}
            onClick={() => onChoice(c)}
            disabled={
              isLocked || !canMakeChoice || isComputer || (isPlayer2 && !p1)
            }
            className={`${styles.choiceButton} ${choiceColors[c]} ${styles[c]} ${
              isLocked ? styles.choiceButtonLocked : ''
            } ${playerChoice === c ? styles.choiceButtonSelected : ''}`}
            type="button"
          >
            <img
              src={choiceIcons[c]}
              alt={c}
              className={styles.choiceIconSmall}
            />
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className={styles.container}>
      <div className={styles.gameCard}>
        <div className={styles.gameTitle}>{headline}</div>
        <div>
          <div className={styles.choicesContainer}>
            <div className={styles.playerChoice}>
              <div className={styles.playerLabel}>Player 1</div>
              {renderChoiceButtons(p1, choose, Boolean(p1))}
            </div>
            <div className={styles.playerChoice}>
              <div className={styles.playerLabel}>
                {mode === 'pve' ? 'Computer' : 'Player 2'}
              </div>
              {renderChoiceButtons(
                p2,
                choose,
                Boolean(p2),
                mode === 'pve',
                mode === 'pvp'
              )}
            </div>
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
