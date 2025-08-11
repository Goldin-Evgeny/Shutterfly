import { Scoreboard, Game, GameHistory, GameModeSelector } from '@/features/game';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-white mb-8">
          Rock, Paper, Scissors
        </h1>

        <div className="flex flex-col gap-4">
          {/* Game Mode Selector */}
          <GameModeSelector />

          {/* Scoreboard */}
          <Scoreboard />

          {/* Game */}
          <div>
            <Game />
          </div>
        </div>

        {/* Game History */}
        <div className="mt-8">
          <GameHistory />
        </div>
      </div>
    </div>
  );
}

export default App;
