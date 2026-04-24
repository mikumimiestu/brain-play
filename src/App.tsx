import { useState } from 'react';
import { HomePage } from '@/components/HomePage';
import { MusicPlayer } from '@/components/MusicPlayer';
import { ImageGuessGame } from '@/components/games/ImageGuessGame';
import { WordGuessGame } from '@/components/games/WordGuessGame';
import { WordArrangeGame } from '@/components/games/WordArrangeGame';
import { ScoreResult } from '@/components/ScoreResult';
import { type Difficulty, type GameType } from '@/data/gameData';

type Screen = 'home' | 'playing' | 'result';

interface GameSession {
  gameType: GameType;
  difficulty: Difficulty;
  score: number;
  total: number;
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [session, setSession] = useState<GameSession | null>(null);

  const handleStart = (gameType: GameType, difficulty: Difficulty) => {
    setSession({ gameType, difficulty, score: 0, total: 0 });
    setScreen('playing');
  };

  const handleFinish = (score: number, total: number) => {
    setSession((prev) => (prev ? { ...prev, score, total } : null));
    setScreen('result');
  };

  const handleRestart = () => {
    if (!session) return;
    setSession({ ...session, score: 0, total: 0 });
    setScreen('playing');
  };

  const handleHome = () => {
    setScreen('home');
    setSession(null);
  };

  return (
    <>
      {screen === 'home' && <HomePage onStart={handleStart} />}

      {screen === 'playing' && session && (
        <>
          {session.gameType === 'image' && (
            <ImageGuessGame
              difficulty={session.difficulty}
              onFinish={handleFinish}
              onHome={handleHome}
            />
          )}
          {session.gameType === 'word' && (
            <WordGuessGame
              difficulty={session.difficulty}
              onFinish={handleFinish}
              onHome={handleHome}
            />
          )}
          {session.gameType === 'arrange' && (
            <WordArrangeGame
              difficulty={session.difficulty}
              onFinish={handleFinish}
              onHome={handleHome}
            />
          )}
        </>
      )}

      {screen === 'result' && session && (
        <ScoreResult
          score={session.score}
          total={session.total}
          gameType={session.gameType}
          difficulty={session.difficulty}
          onRestart={handleRestart}
          onHome={handleHome}
        />
      )}

      <MusicPlayer />
    </>
  );
}
