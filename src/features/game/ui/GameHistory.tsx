// features/game/ui/GameHistory.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import rockIcon from '../assets/rock.svg';
import paperIcon from '../assets/paper.svg';
import scissorsIcon from '../assets/scissors.svg';

import { useHistory, useHasHistory } from '../model/selectors';
import type { Choice, Winner } from '../model/types';

const choiceIcons: Record<Choice, string> = {
  rock: rockIcon,
  paper: paperIcon,
  scissors: scissorsIcon,
};

const colorForWinner = (w: Winner) =>
  w === 'player1' ? 'text-green-600' :
    w === 'player2' ? 'text-red-600' :
      'text-yellow-600';

const textForWinner = (w: Winner) =>
  w === 'player1' ? 'Won' :
    w === 'player2' ? 'Lost' :
      'Draw';

// reuse one formatter instance instead of calling toLocale each render
const timeFmt = new Intl.DateTimeFormat(undefined, { hour: '2-digit', minute: '2-digit' });

export const GameHistory = () => {
  const hasHistory = useHasHistory();
  const history = useHistory(10);

  if (!hasHistory) {
    return (
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Game History</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-400">No games played yet</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Recent Games</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 hover:scrollbar-thumb-gray-500 pr-2">
          {history.map((game) => (
            <div
              key={game.id}
              className="flex items-center justify-between p-3 bg-gray-800 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-center">
                  <img
                    src={choiceIcons[game.p1]}
                    alt={game.p1}
                    className="w-5"
                  />
                  <span className="text-xs text-gray-400">P1</span>
                </div>
                <span className="text-sm">vs</span>
                <div className="flex flex-col items-center">
                  <img
                    src={choiceIcons[game.p2]}
                    alt={game.p2}
                    className="w-5"
                  />
                  <span className="text-xs text-gray-400">
                    {game.mode === 'pve' ? 'CPU' : 'P2'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className={`text-sm font-medium ${colorForWinner(game.winner)}`}>
                  {textForWinner(game.winner)}
                </span>
                <span className="text-xs text-gray-400">
                  {timeFmt.format(new Date(game.ts))}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
