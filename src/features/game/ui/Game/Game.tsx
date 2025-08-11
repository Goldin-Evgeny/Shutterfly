import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card/Card';
import { ComicText } from '@/components/ui/comicText';
import buttonStyles from '@/components/ui/button/Button.module.css';
import styles from './Game.module.css';

import rockIcon from '../../assets/rock.svg';
import paperIcon from '../../assets/paper.svg';
import scissorsIcon from '../../assets/scissors.svg';

import { useGameStore } from '../../model/store';
import {
  useMode,
  useRound,
  useWinner,
  useCanMakeChoice,
  useTurnText,
  useHeadline,
  useIsRoundComplete,
} from '../../model/selectors';
import type { Choice } from '../../model/types';

const choiceIcons: Record<Choice, string> = {
  rock: rockIcon,
  paper: paperIcon,
  scissors: scissorsIcon,
};

const choiceColors: Record<Choice, string> = {
  rock: buttonStyles.rock,
  paper: buttonStyles.paper,
  scissors: buttonStyles.scissors,
};

export const Game = () => {
  const mode = useMode();
  const { p1, p2 } = useRound();
  const winner = useWinner();
  const canMakeChoice = useCanMakeChoice();
  const turnText = useTurnText();
  const headline = useHeadline();
  const isRoundComplete = useIsRoundComplete();

  const choose = useGameStore(s => s.choose);
  const resetRound = useGameStore(s => s.resetRound);

  const shouldShowP1Choice =
    mode === 'pve'
      ? Boolean(p1)
      : Boolean(p1) && (Boolean(p2) || isRoundComplete);

  return (
    <div className={styles.container}>
      <Card className={styles.gameCard}>
        <CardHeader>
          <CardTitle className={styles.gameTitle}>
            {winner ? (
              <ComicText className={styles.comicText} fontSize={2} key={winner}>
                {headline}
              </ComicText>
            ) : (
              headline
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className={styles.choicesContainer}>
            <div className={styles.playerChoice}>
              <div className={styles.playerLabel}>Player 1</div>
              {shouldShowP1Choice && p1 && (
                <div className={styles.choiceIcon}>
                  <img src={choiceIcons[p1]} alt={p1} className={styles.choiceIconLarge} />
                </div>
              )}
            </div>
            <div className={styles.playerChoice}>
              <div className={styles.playerLabel}>
                {mode === 'pve' ? 'Computer' : 'Player 2'}
              </div>
              {p2 && (
                <div className={styles.choiceIcon}>
                  <img src={choiceIcons[p2]} alt={p2} className={styles.choiceIconLarge} />
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className={styles.turnCard}>
        <CardHeader>
          <CardTitle className={styles.turnTitle}>{turnText}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className={styles.choiceButtonsContainer}>
            <div className={buttonStyles.choiceContainer}>
              {(['rock', 'paper', 'scissors'] as const).map(c => (
                <button
                  key={c}
                  onClick={() => choose(c)}
                  disabled={!canMakeChoice}
                  className={`${buttonStyles.choiceButton} ${choiceColors[c]} ${buttonStyles[c]}`}
                  type="button"
                >
                  <img src={choiceIcons[c]} alt={c} className={styles.choiceIconSmall} />
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {(isRoundComplete || p1 || p2) && (
        <div className={styles.playAgainContainer}>
          <button
            onClick={resetRound}
            className={`${buttonStyles.button} ${buttonStyles.outline}`}
            type="button"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};
