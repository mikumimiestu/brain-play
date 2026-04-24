import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { type Difficulty, type GameType } from '@/data/gameData';
import {
  Image,
  Type,
  Shuffle,
  Zap,
  Brain,
  Trophy,
  Star,
  Gamepad2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface HomePageProps {
  onStart: (gameType: GameType, difficulty: Difficulty) => void;
}

const GAME_OPTIONS: {
  type: GameType;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  borderColor: string;
}[] = [
  {
    type: 'image',
    title: 'Tebak Gambar',
    description: 'Tebak nama dari gambar yang ditampilkan. Pilih jawaban yang paling tepat!',
    icon: <Image className="size-7" />,
    color: 'text-orange-600 dark:text-orange-400',
    bgColor: 'bg-orange-50 dark:bg-orange-950/30',
    borderColor: 'border-orange-200 dark:border-orange-800 hover:border-orange-400',
  },
  {
    type: 'word',
    title: 'Tebak Kata',
    description: 'Baca petunjuknya, lalu tebak kata yang dimaksud. Uji kosakatamu!',
    icon: <Type className="size-7" />,
    color: 'text-sky-600 dark:text-sky-400',
    bgColor: 'bg-sky-50 dark:bg-sky-950/30',
    borderColor: 'border-sky-200 dark:border-sky-800 hover:border-sky-400',
  },
  {
    type: 'arrange',
    title: 'Susun Kata',
    description: 'Susun huruf-huruf yang diacak menjadi kata yang benar. Ayo coba!',
    icon: <Shuffle className="size-7" />,
    color: 'text-emerald-600 dark:text-emerald-400',
    bgColor: 'bg-emerald-50 dark:bg-emerald-950/30',
    borderColor: 'border-emerald-200 dark:border-emerald-800 hover:border-emerald-400',
  },
];

const DIFFICULTY_OPTIONS: {
  level: Difficulty;
  label: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}[] = [
  {
    level: 'easy',
    label: 'Mudah',
    description: 'Cocok untuk pemula',
    icon: <Star className="size-4" />,
    color: 'bg-emerald-100 text-emerald-700 border-emerald-300 hover:bg-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-300 dark:border-emerald-700',
  },
  {
    level: 'medium',
    label: 'Sedang',
    description: 'Butuh sedikit usaha',
    icon: <Zap className="size-4" />,
    color: 'bg-amber-100 text-amber-700 border-amber-300 hover:bg-amber-200 dark:bg-amber-900/40 dark:text-amber-300 dark:border-amber-700',
  },
  {
    level: 'hard',
    label: 'Sulit',
    description: 'Tantangan nyata!',
    icon: <Brain className="size-4" />,
    color: 'bg-rose-100 text-rose-700 border-rose-300 hover:bg-rose-200 dark:bg-rose-900/40 dark:text-rose-300 dark:border-rose-700',
  },
];

export function HomePage({ onStart }: HomePageProps) {
  const [selectedGame, setSelectedGame] = useState<GameType | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);

  const canStart = selectedGame !== null && selectedDifficulty !== null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-accent/20 flex flex-col">
      {/* Header */}
      <header className="pt-12 pb-8 text-center px-4">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="size-12 rounded-2xl bg-primary flex items-center justify-center shadow-lg">
            <Gamepad2 className="size-6 text-primary-foreground" />
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight text-foreground">
            Brain<span className="text-primary">Play</span>
          </h1>
        </div>
        <p className="text-muted-foreground text-lg max-w-md mx-auto leading-relaxed">
          Platform permainan edukatif yang seru dan menyenangkan. Uji pengetahuanmu!
        </p>
        <div className="flex items-center justify-center gap-3 mt-4">
          <Badge variant="secondary" className="gap-1">
            <Trophy className="size-3" /> 3 Jenis Game
          </Badge>
          <Badge variant="secondary" className="gap-1">
            <Zap className="size-3" /> 3 Tingkat Kesulitan
          </Badge>
          <Badge variant="secondary" className="gap-1">
            <Star className="size-3" /> Raih Skor Tertinggi
          </Badge>
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 pb-24 space-y-8">
        {/* Game Type Selection */}
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <span className="size-7 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
              1
            </span>
            Pilih Jenis Game
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {GAME_OPTIONS.map((game) => (
              <Card
                key={game.type}
                onClick={() => setSelectedGame(game.type)}
                className={cn(
                  'cursor-pointer border-2 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg',
                  game.borderColor,
                  selectedGame === game.type
                    ? `${game.bgColor} shadow-md scale-[1.02]`
                    : 'bg-card'
                )}
              >
                <CardContent className="p-5 text-center space-y-3">
                  <div
                    className={cn(
                      'size-14 rounded-2xl mx-auto flex items-center justify-center transition-colors',
                      game.bgColor,
                      game.color
                    )}
                  >
                    {game.icon}
                  </div>
                  <div>
                    <h3 className={cn('font-semibold text-base', game.color)}>
                      {game.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      {game.description}
                    </p>
                  </div>
                  {selectedGame === game.type && (
                    <Badge className="mx-auto" variant="secondary">
                      ✓ Dipilih
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Difficulty Selection */}
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <span className="size-7 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
              2
            </span>
            Pilih Tingkat Kesulitan
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {DIFFICULTY_OPTIONS.map((diff) => (
              <button
                key={diff.level}
                onClick={() => setSelectedDifficulty(diff.level)}
                className={cn(
                  'rounded-xl border-2 p-4 text-center transition-all duration-200 hover:scale-[1.03] hover:shadow-md font-medium',
                  diff.color,
                  selectedDifficulty === diff.level
                    ? 'scale-[1.03] shadow-md ring-2 ring-offset-2 ring-current'
                    : 'opacity-80 hover:opacity-100'
                )}
              >
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  {diff.icon}
                  <span className="text-sm font-semibold">{diff.label}</span>
                </div>
                <p className="text-xs opacity-75">{diff.description}</p>
              </button>
            ))}
          </div>
        </section>

        {/* Start Button */}
        <div className="flex justify-center pt-4">
          <Button
            size="lg"
            onClick={() => canStart && onStart(selectedGame!, selectedDifficulty!)}
            disabled={!canStart}
            className={cn(
              'px-12 py-6 text-lg font-bold rounded-2xl shadow-lg transition-all duration-200',
              canStart
                ? 'hover:scale-105 hover:shadow-xl'
                : 'opacity-50 cursor-not-allowed'
            )}
          >
            <Gamepad2 className="size-5 mr-2" />
            {canStart ? 'Mulai Bermain!' : 'Pilih Game & Kesulitan'}
          </Button>
        </div>
      </main>
    </div>
  );
}
