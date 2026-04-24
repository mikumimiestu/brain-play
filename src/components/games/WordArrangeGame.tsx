import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GameHeader } from '@/components/GameHeader';
import {
  arrangeQuestions,
  shuffleArray,
  scrambleWord,
  type Difficulty,
  type ArrangeQuestion,
} from '@/data/gameData';
import { CircleCheck as CheckCircle2, Circle as XCircle, ChevronRight, RotateCcw, Tag, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WordArrangeGameProps {
  difficulty: Difficulty;
  onFinish: (score: number, total: number) => void;
  onHome: () => void;
}

type AnswerState = 'idle' | 'correct' | 'wrong';

interface Letter {
  id: string;
  char: string;
  used: boolean;
}

export function WordArrangeGame({ difficulty, onFinish, onHome }: WordArrangeGameProps) {
  const [questions] = useState<ArrangeQuestion[]>(() =>
    shuffleArray(arrangeQuestions[difficulty])
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answerState, setAnswerState] = useState<AnswerState>('idle');
  const [letters, setLetters] = useState<Letter[]>([]);
  const [selectedLetters, setSelectedLetters] = useState<{ id: string; char: string }[]>([]);

  const question = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;

  const initLetters = useCallback((q: ArrangeQuestion) => {
    let scrambled = scrambleWord(q.answer);
    // Ensure it's actually scrambled (not same as answer)
    let attempts = 0;
    while (scrambled.join('') === q.answer && attempts < 10) {
      scrambled = scrambleWord(q.answer);
      attempts++;
    }
    setLetters(
      scrambled.map((char, i) => ({
        id: `${char}-${i}-${Math.random()}`,
        char,
        used: false,
      }))
    );
    setSelectedLetters([]);
    setAnswerState('idle');
  }, []);

  useEffect(() => {
    initLetters(question);
  }, [currentIndex, question, initLetters]);

  const currentWord = selectedLetters.map((l) => l.char).join('');
  const getPoints = () => difficulty === 'easy' ? 10 : difficulty === 'medium' ? 20 : 30;

  const handleLetterClick = (letter: Letter) => {
    if (letter.used || answerState !== 'idle') return;
    setLetters((prev) =>
      prev.map((l) => (l.id === letter.id ? { ...l, used: true } : l))
    );
    setSelectedLetters((prev) => [...prev, { id: letter.id, char: letter.char }]);
  };

  const handleRemoveLetter = (index: number) => {
    if (answerState !== 'idle') return;
    const removed = selectedLetters[index];
    setSelectedLetters((prev) => prev.filter((_, i) => i !== index));
    setLetters((prev) =>
      prev.map((l) => (l.id === removed.id ? { ...l, used: false } : l))
    );
  };

  const handleReset = () => {
    if (answerState !== 'idle') return;
    initLetters(question);
  };

  const handleCheck = () => {
    if (currentWord.length !== question.answer.length || answerState !== 'idle') return;
    const correct = currentWord.toUpperCase() === question.answer.toUpperCase();
    setAnswerState(correct ? 'correct' : 'wrong');
    if (correct) setScore((s) => s + getPoints());
  };

  const handleNext = () => {
    if (isLast) {
      onFinish(score, questions.length);
      return;
    }
    setCurrentIndex((i) => i + 1);
  };

  const LETTER_COLORS = [
    'bg-sky-100 text-sky-800 border-sky-300 hover:bg-sky-200 dark:bg-sky-900/50 dark:text-sky-200 dark:border-sky-700',
    'bg-orange-100 text-orange-800 border-orange-300 hover:bg-orange-200 dark:bg-orange-900/50 dark:text-orange-200 dark:border-orange-700',
    'bg-emerald-100 text-emerald-800 border-emerald-300 hover:bg-emerald-200 dark:bg-emerald-900/50 dark:text-emerald-200 dark:border-emerald-700',
    'bg-rose-100 text-rose-800 border-rose-300 hover:bg-rose-200 dark:bg-rose-900/50 dark:text-rose-200 dark:border-rose-700',
    'bg-amber-100 text-amber-800 border-amber-300 hover:bg-amber-200 dark:bg-amber-900/50 dark:text-amber-200 dark:border-amber-700',
  ];

  const getLetterColor = (index: number) => LETTER_COLORS[index % LETTER_COLORS.length];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-emerald-50/20 to-accent/10 flex flex-col px-4 py-6">
      <div className="max-w-lg mx-auto w-full">
        <GameHeader
          gameType="arrange"
          difficulty={difficulty}
          currentIndex={currentIndex}
          total={questions.length}
          score={score}
          onHome={onHome}
        />

        <Card className="shadow-xl border-2">
          <CardContent className="p-6 space-y-5">
            {/* Hint */}
            <div className="rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 p-4">
              <div className="flex items-start gap-3">
                <Lightbulb className="size-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Petunjuk</p>
                    <Badge variant="secondary" className="gap-1 text-xs">
                      <Tag className="size-3" />
                      {question.category}
                    </Badge>
                  </div>
                  <p className="text-foreground font-medium">{question.hint}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {question.answer.length} huruf
                  </p>
                </div>
              </div>
            </div>

            {/* Answer Area */}
            <div>
              <p className="text-xs text-muted-foreground mb-2">Kata yang kamu susun:</p>
              <div className="min-h-14 rounded-xl border-2 border-dashed border-border bg-muted/30 p-3 flex flex-wrap gap-2 items-center justify-center">
                {selectedLetters.length === 0 ? (
                  <p className="text-muted-foreground text-sm">Klik huruf di bawah untuk menyusun kata</p>
                ) : (
                  selectedLetters.map((letter, idx) => (
                    <button
                      key={`${letter.id}-selected`}
                      onClick={() => handleRemoveLetter(idx)}
                      disabled={answerState !== 'idle'}
                      className={cn(
                        'size-10 rounded-lg border-2 font-bold text-sm transition-all duration-150',
                        'hover:scale-95 active:scale-90',
                        answerState === 'idle'
                          ? 'bg-primary text-primary-foreground border-primary/80 hover:bg-primary/90 cursor-pointer'
                          : answerState === 'correct'
                          ? 'bg-emerald-500 text-white border-emerald-600'
                          : 'bg-rose-500 text-white border-rose-600'
                      )}
                    >
                      {letter.char}
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* Available Letters */}
            <div>
              <p className="text-xs text-muted-foreground mb-2">Huruf tersedia:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {letters.map((letter, idx) => (
                  <button
                    key={letter.id}
                    onClick={() => handleLetterClick(letter)}
                    disabled={letter.used || answerState !== 'idle'}
                    className={cn(
                      'size-10 rounded-lg border-2 font-bold text-sm transition-all duration-150',
                      letter.used
                        ? 'opacity-25 cursor-not-allowed bg-muted border-border'
                        : cn(
                            getLetterColor(idx),
                            'hover:scale-110 active:scale-95 cursor-pointer'
                          )
                    )}
                  >
                    {letter.char}
                  </button>
                ))}
              </div>
            </div>

            {/* Controls (idle state) */}
            {answerState === 'idle' && (
              <div className="flex gap-3">
                <Button variant="outline" onClick={handleReset} className="gap-2">
                  <RotateCcw className="size-4" />
                  Reset
                </Button>
                <Button
                  className="flex-1"
                  onClick={handleCheck}
                  disabled={currentWord.length !== question.answer.length}
                >
                  Cek Jawaban
                </Button>
              </div>
            )}

            {/* Feedback */}
            {answerState !== 'idle' && (
              <div
                className={cn(
                  'rounded-xl p-4 text-center space-y-1 animate-in fade-in slide-in-from-bottom-2 duration-300',
                  answerState === 'correct'
                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300'
                    : 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300'
                )}
              >
                <div className="flex items-center justify-center gap-2">
                  {answerState === 'correct' ? (
                    <CheckCircle2 className="size-5" />
                  ) : (
                    <XCircle className="size-5" />
                  )}
                  <p className="font-semibold">
                    {answerState === 'correct'
                      ? `Benar! +${getPoints()} poin 🎉`
                      : 'Salah! 😔'}
                  </p>
                </div>
                {answerState === 'wrong' && (
                  <p className="text-sm">
                    Jawaban yang benar:{' '}
                    <span className="font-bold">{question.answer}</span>
                  </p>
                )}
              </div>
            )}

            {/* Next Button */}
            {answerState !== 'idle' && (
              <Button
                className="w-full animate-in fade-in duration-300"
                onClick={handleNext}
              >
                {isLast ? 'Lihat Hasil' : 'Soal Berikutnya'}
                <ChevronRight className="size-4" />
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
