// features/game/ui/GameHistory.tsx
import rockIcon from '../../assets/rock.svg';
import paperIcon from '../../assets/paper.svg';
import scissorsIcon from '../../assets/scissors.svg';

import { useHistory, useHasHistory } from '../../model/selectors';
import type { Choice, Winner } from '../../model/types';
import styles from './GameHistory.module.css';

const choiceIcons: Record<Choice, string> = {
  rock: rockIcon,
  paper: paperIcon,
  scissors: scissorsIcon,
};

const colorForWinner = (w: Winner) =>
  w === 'player1'
    ? styles.resultTextWon
    : w === 'player2'
      ? styles.resultTextLost
      : styles.resultTextDraw;

const textForWinner = (w: Winner) =>
  w === 'player1' ? 'Won' : w === 'player2' ? 'Lost' : 'Draw';

// reuse one formatter instance instead of calling toLocale each render
const timeFmt = new Intl.DateTimeFormat(undefined, {
  hour: '2-digit',
  minute: '2-digit',
});

export const GameHistory = () => {
  const hasHistory = useHasHistory();
  const history = useHistory(10);

  if (!hasHistory) {
    return (
      <div className={styles.gameHistoryCard}>
        <div className={styles.gameHistoryHeader}>
          <h3>Game History</h3>
        </div>
        <p className={styles.gameHistoryContent}>No games played yet</p>
      </div>
    );
  }

  return (
    <div className={styles.gameHistoryCard}>
      <div className={styles.gameHistoryHeader}>
        <h3>Recent Games</h3>
      </div>
      <div className={styles.historyContainer}>
        {history.map(game => (
          <div key={game.id} className={styles.gameItem}>
            <div className={styles.gameChoices}>
              <div className={styles.choiceContainer}>
                <img
                  src={choiceIcons[game.p1]}
                  alt={game.p1}
                  className={styles.choiceIcon}
                />
                <span className={styles.playerLabel}>P1</span>
              </div>
              <span className={styles.vsLabel}>vs</span>
              <div className={styles.choiceContainer}>
                <img
                  src={choiceIcons[game.p2]}
                  alt={game.p2}
                  className={styles.choiceIcon}
                />
                <span className={styles.playerLabel}>
                  {game.mode === 'pve' ? 'CPU' : 'P2'}
                </span>
              </div>
            </div>

            <div className={styles.gameResult}>
              <span
                className={`${styles.resultText} ${colorForWinner(game.winner)}`}
              >
                {textForWinner(game.winner)}
              </span>
              <span className={styles.gameTime}>
                {timeFmt.format(new Date(game.ts))}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
