import styles from './Game.module.css';
import rockIcon from '../../assets/rock.svg';
import paperIcon from '../../assets/paper.svg';
import scissorsIcon from '../../assets/scissors.svg';
import type { Choice } from '../../model/types';
import clsx from 'clsx';

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

type ChoiceButtonsProps = {
  playerChoice: Choice | null;
  onChoice: (choice: Choice) => void;
  isLocked: boolean;
  isComputer?: boolean;
  isPlayer2?: boolean;
  canMakeChoice: boolean;
  p1: Choice | null;
};

export const ChoiceButtons = ({
  playerChoice,
  onChoice,
  isLocked,
  isComputer = false,
  isPlayer2 = false,
  canMakeChoice,
  p1,
}: ChoiceButtonsProps) => (
  <div className={styles.choiceButtonsContainer}>
    <div className={styles.choiceContainer}>
      {(['rock', 'paper', 'scissors'] as const).map(c => (
        <button
          key={c}
          onClick={() => onChoice(c)}
          disabled={
            isLocked || !canMakeChoice || isComputer || (isPlayer2 && !p1)
          }
          className={clsx(
            styles.choiceButton,
            choiceColors[c],
            styles[c],
            isLocked && styles.choiceButtonLocked,
            playerChoice === c && styles.choiceButtonSelected
          )}
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
