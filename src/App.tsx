import {
  Scoreboard,
  Game,
  GameHistory,
  GameModeSelector,
} from '@/features/game';
import { useGameStarted } from '@/features/game/model/selectors';
import { useGameStore } from '@/features/game/model/store';
import styles from './App.module.css';
import { Button } from './components/ui/button';

function App() {
  const gameStarted = useGameStarted();
  const resetAll = useGameStore(s => s.resetAll);

  const handleBackToMenu = () => {
    resetAll();
  };

  if (!gameStarted) {
    return (
      <div className={styles.app}>
        <div className={styles.container}>
          <GameModeSelector />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        {!gameStarted && <h1>Rock, Paper, Scissors</h1>}
        {gameStarted && (
          <div className={styles.menuButtonContainer}>
            <Button onClick={handleBackToMenu} type="button" size="sm">
              ← Back
            </Button>
          </div>
        )}
        {!gameStarted && <GameModeSelector />}

        {gameStarted && (
          <>
            <Scoreboard />
            <div className={styles.gameWrapper}>
              <Game />
            </div>
            <div className={styles.gameHistory}>
              <GameHistory />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
