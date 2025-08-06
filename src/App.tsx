import { Scoreboard } from './components/Scoreboard'
import { Game } from './components/Game'
import { GameHistory } from './components/GameHistory'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Rock, Paper, Scissors
        </h1>

        <div className="flex flex-col gap-4">
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
  )
}

export default App
