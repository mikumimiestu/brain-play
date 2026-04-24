import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { type Difficulty, type GameType } from '@/data/gameData';
import { Trophy, Star, RotateCcw, Hop as Home, Medal, TrendingUp, Gamepad2, Zap, Brain } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ScoreResultProps {
  score: number;
  total: number;
  gameType: GameType;
  difficulty: Difficulty;
  onRestart: () => void;
  onHome: () => void;
}

const GAME_LABELS: Record<GameType, string> = {
  image: 'Tebak Gambar',
  word: 'Tebak Kata',
  arrange: 'Susun Kata',
};

const DIFF_MULTIPLIER: Record<Difficulty, number> = {
  easy: 10,
  medium: 20,
  hard: 30,
};

function getMaxScore(total: number, difficulty: Difficulty) {
  return total * DIFF_MULTIPLIER[difficulty];
}

function getGrade(percentage: number) {
  if (percentage >= 90) return { label: 'Luar Biasa!', emoji: '🏆', color: 'text-amber-500' };
  if (percentage >= 75) return { label: 'Bagus Sekali!', emoji: '🎉', color: 'text-emerald-500' };
  if (percentage >= 60) return { label: 'Cukup Baik!', emoji: '👍', color: 'text-sky-500' };
  if (percentage >= 40) return { label: 'Terus Berlatih!', emoji: '💪', color: 'text-amber-500' };
  return { label: 'Jangan Menyerah!', emoji: '🌱', color: 'text-muted-foreground' };
}

function StarDisplay({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-1 justify-center">
      {[1, 2, 3].map((i) => (
        <Star
          key={i}
          className={cn(
            'size-8 transition-all duration-500',
            i <= count
              ? 'fill-amber-400 text-amber-400 drop-shadow-sm'
              : 'text-muted-foreground/30'
          )}
        />
      ))}
    </div>
  );
}

const DIFF_BADGES: Record<Difficulty, { label: string; icon: React.ReactNode; className: string }> = {
  easy: {
    label: 'Mudah',
    icon: <Star className="size-3" />,
    className: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  },
  medium: {
    label: 'Sedang',
    icon: <Zap className="size-3" />,
    className: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  },
  hard: {
    label: 'Sulit',
    icon: <Brain className="size-3" />,
    className: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
  },
};

export function ScoreResult({
  score,
  total,
  gameType,
  difficulty,
  onRestart,
  onHome,
}: ScoreResultProps) {
  const maxScore = getMaxScore(total, difficulty);
  const percentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
  const stars = percentage >= 90 ? 3 : percentage >= 60 ? 2 : percentage >= 30 ? 1 : 0;
  const grade = getGrade(percentage);
  const diff = DIFF_BADGES[difficulty];

  // Approximate correct answers
  const pointsPerQuestion = DIFF_MULTIPLIER[difficulty];
  const correctCount = Math.round(score / pointsPerQuestion);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-amber-50/20 to-accent/10 flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-5">
        {/* Main Result Card */}
        <Card className="shadow-2xl border-2 overflow-hidden">
          {/* Trophy Header */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/30 p-8 text-center border-b">
            <div className="size-20 rounded-full bg-amber-100 dark:bg-amber-900/40 border-4 border-amber-200 dark:border-amber-700 mx-auto flex items-center justify-center mb-4 shadow-lg">
              <Trophy className="size-10 text-amber-500" />
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground mb-1">
              Game Selesai!
            </h1>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Gamepad2 className="size-4" />
              <span>{GAME_LABELS[gameType]}</span>
              <span>•</span>
              <span
                className={cn(
                  'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium',
                  diff.className
                )}
              >
                {diff.icon}
                {diff.label}
              </span>
            </div>
          </div>

          <CardContent className="p-6 space-y-6">
            {/* Stars */}
            <StarDisplay count={stars} />

            {/* Grade */}
            <div className="text-center">
              <p className={cn('text-2xl font-bold', grade.color)}>
                {grade.emoji} {grade.label}
              </p>
            </div>

            {/* Score Details */}
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-xl bg-muted/50 p-3 text-center">
                <Trophy className="size-5 text-amber-500 mx-auto mb-1" />
                <p className="text-2xl font-bold text-foreground">{score}</p>
                <p className="text-xs text-muted-foreground">Total Poin</p>
              </div>
              <div className="rounded-xl bg-muted/50 p-3 text-center">
                <Medal className="size-5 text-emerald-500 mx-auto mb-1" />
                <p className="text-2xl font-bold text-foreground">
                  {correctCount}/{total}
                </p>
                <p className="text-xs text-muted-foreground">Benar</p>
              </div>
              <div className="rounded-xl bg-muted/50 p-3 text-center">
                <TrendingUp className="size-5 text-sky-500 mx-auto mb-1" />
                <p className="text-2xl font-bold text-foreground">{percentage}%</p>
                <p className="text-xs text-muted-foreground">Akurasi</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0</span>
                <span>Maks: {maxScore} poin</span>
              </div>
              <div className="h-3 bg-muted rounded-full overflow-hidden">
                <div
                  className={cn(
                    'h-full rounded-full transition-all duration-1000 ease-out',
                    percentage >= 90
                      ? 'bg-amber-400'
                      : percentage >= 60
                      ? 'bg-emerald-500'
                      : percentage >= 30
                      ? 'bg-sky-500'
                      : 'bg-rose-500'
                  )}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>

            {/* Encouragement */}
            {percentage < 60 && (
              <div className="rounded-xl bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-800 p-3 text-center">
                <p className="text-sm text-sky-700 dark:text-sky-300">
                  💡 Coba lagi untuk meningkatkan skormu! Kamu pasti bisa!
                </p>
              </div>
            )}
            {percentage >= 90 && (
              <div className="rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 p-3 text-center">
                <p className="text-sm text-amber-700 dark:text-amber-300">
                  🌟 Sempurna! Kamu adalah juara BrainPlay!
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" onClick={onHome} className="gap-2 h-12">
            <Home className="size-4" />
            Menu Utama
          </Button>
          <Button onClick={onRestart} className="gap-2 h-12">
            <RotateCcw className="size-4" />
            Main Lagi
          </Button>
        </div>
      </div>
    </div>
  );
}
