import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { type Difficulty, type GameType } from '@/data/gameData';
import { Hop as Home, Trophy, Zap, Brain, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GameHeaderProps {
  gameType: GameType;
  difficulty: Difficulty;
  currentIndex: number;
  total: number;
  score: number;
  onHome: () => void;
}

const GAME_LABELS: Record<GameType, string> = {
  image: 'Tebak Gambar',
  word: 'Tebak Kata',
  arrange: 'Susun Kata',
};

const DIFFICULTY_CONFIG: Record<Difficulty, { label: string; icon: React.ReactNode; className: string }> = {
  easy: {
    label: 'Mudah',
    icon: <Star className="size-3" />,
    className: 'bg-emerald-100 text-emerald-700 border-emerald-300 dark:bg-emerald-900/40 dark:text-emerald-300',
  },
  medium: {
    label: 'Sedang',
    icon: <Zap className="size-3" />,
    className: 'bg-amber-100 text-amber-700 border-amber-300 dark:bg-amber-900/40 dark:text-amber-300',
  },
  hard: {
    label: 'Sulit',
    icon: <Brain className="size-3" />,
    className: 'bg-rose-100 text-rose-700 border-rose-300 dark:bg-rose-900/40 dark:text-rose-300',
  },
};

export function GameHeader({
  gameType,
  difficulty,
  currentIndex,
  total,
  score,
  onHome,
}: GameHeaderProps) {
  const progress = ((currentIndex) / total) * 100;
  const diff = DIFFICULTY_CONFIG[difficulty];

  return (
    <div className="w-full space-y-3 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon-sm" onClick={onHome} title="Kembali ke Home">
            <Home className="size-4" />
          </Button>
          <span className="font-semibold text-sm text-foreground">
            {GAME_LABELS[gameType]}
          </span>
          <span
            className={cn(
              'inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium',
              diff.className
            )}
          >
            {diff.icon}
            {diff.label}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Trophy className="size-4 text-amber-500" />
          <span className="font-bold text-foreground">{score}</span>
          <span className="text-muted-foreground text-sm">poin</span>
        </div>
      </div>

      <div className="space-y-1">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Soal {Math.min(currentIndex + 1, total)} dari {total}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
    </div>
  );
}
