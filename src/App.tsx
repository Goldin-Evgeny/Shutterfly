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
import { Card } from './components/ui/card';

function App() {
  const gameStarted = useGameStarted();
  const resetAll = useGameStore(s => s.resetAll);

  const handleBackToMenu = () => {
    resetAll(); // This will reset everything including gameStarted to false
  };

  if (!gameStarted) {
    return <div className={styles.app}>
      <div className={styles.container}>
        <GameModeSelector />
      </div>
    </div>;
  }

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        {!gameStarted && <h1 className={styles.title}>
          Rock, Paper, Scissors
        </h1>}
        {gameStarted && (
          /* Game Screen */
          <>
            {/* Back to Menu Button */}
            <div className={styles.menuButtonContainer}>
              <Button
                onClick={handleBackToMenu}
                type="button"
                size="sm"
              >
                ← Back
              </Button>
            </div>
          </>
        )}
        <div>
          <div className={styles.content}>
            {!gameStarted && (
              /* Game Mode Selection Screen */
              <GameModeSelector />
            )}
          </div>

          {/* Game History - only show when game has started */}
          {gameStarted && (
            <>


              {/* Scoreboard */}
              <Scoreboard />

              {/* Game */}
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
    </div>
  );
}

export default App;
