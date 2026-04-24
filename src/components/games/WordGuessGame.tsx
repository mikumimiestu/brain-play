import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GameHeader } from '@/components/GameHeader';
import {
  wordQuestions,
  shuffleArray,
  type Difficulty,
  type WordQuestion,
} from '@/data/gameData';
import { CircleCheck as CheckCircle2, Circle as XCircle, ChevronRight, Lightbulb, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WordGuessGameProps {
  difficulty: Difficulty;
  onFinish: (score: number, total: number) => void;
  onHome: () => void;
}

type AnswerState = 'idle' | 'correct' | 'wrong';

export function WordGuessGame({ difficulty, onFinish, onHome }: WordGuessGameProps) {
  const [questions] = useState<WordQuestion[]>(() =>
    shuffleArray(wordQuestions[difficulty])
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [answerState, setAnswerState] = useState<AnswerState>('idle');
  const [showHint, setShowHint] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const question = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;

  useEffect(() => {
    setInputValue('');
    setAnswerState('idle');
    setShowHint(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  }, [currentIndex]);

  const getPoints = () => {
    const base = difficulty === 'easy' ? 10 : difficulty === 'medium' ? 20 : 30;
    return showHint ? Math.floor(base * 0.5) : base;
  };

  const handleSubmit = () => {
    if (answerState !== 'idle' || !inputValue.trim()) return;
    const userAnswer = inputValue.trim().toUpperCase();
    const correct = userAnswer === question.answer.toUpperCase();
    setAnswerState(correct ? 'correct' : 'wrong');
    if (correct) setScore((s) => s + getPoints());
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSubmit();
  };

  const handleNext = () => {
    if (isLast) {
      onFinish(score, questions.length);
      return;
    }
    setCurrentIndex((i) => i + 1);
  };

  // Build letter boxes for hint
  const renderHintBoxes = () => {
    if (!showHint) return null;
    return (
      <div className="flex flex-wrap gap-2 justify-center">
        {question.answer.split('').map((char, i) => (
          <div
            key={i}
            className={cn(
              'size-9 rounded-lg border-2 border-primary/30 flex items-center justify-center',
              'text-sm font-bold text-muted-foreground bg-muted',
              i === 0 && 'border-primary/60 text-primary bg-primary/5'
            )}
          >
            {i === 0 ? char : '_'}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-sky-50/20 to-accent/10 flex flex-col px-4 py-6">
      <div className="max-w-lg mx-auto w-full">
        <GameHeader
          gameType="word"
          difficulty={difficulty}
          currentIndex={currentIndex}
          total={questions.length}
          score={score}
          onHome={onHome}
        />

        <Card className="shadow-xl border-2">
          <CardContent className="p-6 space-y-5">
            {/* Clue */}
            <div className="rounded-2xl bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-800 p-5">
              <div className="flex items-start gap-3">
                <Lightbulb className="size-5 text-sky-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-sky-600 dark:text-sky-400 font-medium mb-1">Petunjuk</p>
                  <p className="text-foreground font-medium leading-relaxed">{question.clue}</p>
                </div>
              </div>
            </div>

            {/* Hint boxes */}
            {showHint && (
              <div className="animate-in fade-in slide-in-from-top-2 duration-300 space-y-2">
                <p className="text-xs text-center text-muted-foreground">Format jawaban:</p>
                {renderHintBoxes()}
                <p className="text-xs text-center text-amber-600 dark:text-amber-400">
                  ⚠️ Menggunakan petunjuk mengurangi poin 50%
                </p>
              </div>
            )}

            {/* Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Jawaban Kamu
              </label>
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ketik jawabanmu..."
                disabled={answerState !== 'idle'}
                className={cn(
                  'text-center text-base font-semibold uppercase tracking-widest h-12',
                  answerState === 'correct' &&
                    'border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30',
                  answerState === 'wrong' &&
                    'border-rose-500 bg-rose-50 text-rose-700 dark:bg-rose-950/30'
                )}
              />
            </div>

            {/* Action Buttons (idle state) */}
            {answerState === 'idle' && (
              <div className="flex gap-3">
                {!showHint && (
                  <Button
                    variant="outline"
                    className="flex-1 gap-2"
                    onClick={() => setShowHint(true)}
                  >
                    <Eye className="size-4" />
                    Petunjuk (-50%)
                  </Button>
                )}
                <Button
                  className="flex-1"
                  onClick={handleSubmit}
                  disabled={!inputValue.trim()}
                >
                  Periksa Jawaban
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
                      : `Salah! 😔`}
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
