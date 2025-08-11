import {
  Scoreboard,
  Game,
  GameHistory,
  GameModeSelector,
} from '@/features/game';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <h1 className={styles.title}>
          Rock, Paper, Scissors
        </h1>

        <div className={styles.content}>
          {/* Game Mode Selector */}
          <GameModeSelector />

          {/* Scoreboard */}
          <Scoreboard />

          {/* Game */}
          <div className={styles.gameWrapper}>
            <Game />
          </div>
        </div>

        {/* Game History */}
        <div className={styles.gameHistory}>
          <GameHistory />
        </div>
      </div>
    </div>
  );
}

export default App;
