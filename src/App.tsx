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
    resetAll(); // This will reset everything including gameStarted to false
  };

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <h1 className={styles.title}>
          Rock, Paper, Scissors
        </h1>

        <div className={styles.content}>
          {!gameStarted ? (
            /* Game Mode Selection Screen */
            <GameModeSelector />
          ) : (
            /* Game Screen */
            <>
              {/* Back to Menu Button */}
              <div className={styles.menuButtonContainer}>
                <Button
                  onClick={handleBackToMenu}
                  type="button"
                  variant="outline"
                  size="sm"
                >
                  ← Back to Menu
                </Button>
              </div>

              {/* Scoreboard */}
              <Scoreboard />

              {/* Game */}
              <div className={styles.gameWrapper}>
                <Game />
              </div>
            </>
          )}
        </div>

        {/* Game History - only show when game has started */}
        {gameStarted && (
          <div className={styles.gameHistory}>
            <GameHistory />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
