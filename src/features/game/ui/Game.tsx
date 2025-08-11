import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { ComicText } from '@/components/ui/ComicText';
import buttonStyles from '@/components/ui/button/Button.module.css';

import rockIcon from '../assets/rock.svg';
import paperIcon from '../assets/paper.svg';
import scissorsIcon from '../assets/scissors.svg';

import { useGameStore } from '../model/store';
import {
  useMode,
  useRound,
  useWinner,
  useCanMakeChoice,
  useTurnText,
  useHeadline,
  useIsRoundComplete,
} from '../model/selectors';
import type { Choice } from '../model/types';

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
    <div className="space-y-6 max-w-md mx-auto">
      <Card className="min-h-[200px]">
        <CardHeader>
          <CardTitle className="text-center text-xl">
            {winner ? (
              <ComicText className="text-2xl" fontSize={2} key={winner}>
                {headline}
              </ComicText>
            ) : (
              headline
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-start gap-8">
            <div className="text-center flex flex-col items-center">
              <div className="text-sm text-gray-300 mb-2">Player 1</div>
              {shouldShowP1Choice && p1 && (
                <div className="text-4xl min-h-16 flex items-center justify-center">
                  <img src={choiceIcons[p1]} alt={p1} className="w-12" />
                </div>
              )}
            </div>
            <div className="text-center flex flex-col items-center">
              <div className="text-sm text-gray-300 mb-2">
                {mode === 'pve' ? 'Computer' : 'Player 2'}
              </div>
              {p2 && (
                <div className="text-4xl min-h-16 flex items-center justify-center">
                  <img src={choiceIcons[p2]} alt={p2} className="w-12" />
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-center">{turnText}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center">
            <div className={buttonStyles.choiceContainer}>
              {(['rock', 'paper', 'scissors'] as const).map(c => (
                <button
                  key={c}
                  onClick={() => choose(c)}
                  disabled={!canMakeChoice}
                  className={`${buttonStyles.choiceButton} ${choiceColors[c]} ${buttonStyles[c]}`}
                  type="button"
                >
                  <img src={choiceIcons[c]} alt={c} className="w-8" />
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {(isRoundComplete || p1 || p2) && (
        <div className="flex justify-center">
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
