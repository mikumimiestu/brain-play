import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GameHeader } from '@/components/GameHeader';
import {
  imageQuestions,
  shuffleArray,
  type Difficulty,
  type ImageQuestion,
} from '@/data/gameData';
import { CircleCheck as CheckCircle2, Circle as XCircle, ChevronRight, Tag } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageGuessGameProps {
  difficulty: Difficulty;
  onFinish: (score: number, total: number) => void;
  onHome: () => void;
}

type AnswerState = 'idle' | 'correct' | 'wrong';

export function ImageGuessGame({ difficulty, onFinish, onHome }: ImageGuessGameProps) {
  const [questions] = useState<ImageQuestion[]>(() =>
    shuffleArray(imageQuestions[difficulty])
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [answerState, setAnswerState] = useState<AnswerState>('idle');
  const [imageLoaded, setImageLoaded] = useState(false);

  const question = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;

  useEffect(() => {
    setImageLoaded(false);
    setSelectedOption(null);
    setAnswerState('idle');
  }, [currentIndex]);

  const handleSelect = (option: string) => {
    if (answerState !== 'idle') return;
    setSelectedOption(option);
    const correct = option === question.answer;
    setAnswerState(correct ? 'correct' : 'wrong');
    if (correct) setScore((s) => s + getPoints());
  };

  const getPoints = () => {
    return difficulty === 'easy' ? 10 : difficulty === 'medium' ? 20 : 30;
  };

  const handleNext = () => {
    if (isLast) {
      onFinish(score + (answerState === 'correct' ? 0 : 0), questions.length);
      return;
    }
    setCurrentIndex((i) => i + 1);
  };

  const handleFinish = () => {
    onFinish(score, questions.length);
  };

  const optionStyle = (opt: string) => {
    if (answerState === 'idle') {
      return 'border-border hover:border-primary hover:bg-accent cursor-pointer';
    }
    if (opt === question.answer) {
      return 'border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300';
    }
    if (opt === selectedOption && answerState === 'wrong') {
      return 'border-rose-500 bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300';
    }
    return 'border-border opacity-50';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-orange-50/20 to-accent/10 flex flex-col px-4 py-6">
      <div className="max-w-lg mx-auto w-full">
        <GameHeader
          gameType="image"
          difficulty={difficulty}
          currentIndex={currentIndex}
          total={questions.length}
          score={score}
          onHome={onHome}
        />

        <Card className="overflow-hidden shadow-xl border-2">
          {/* Image */}
          <div className="relative aspect-video bg-muted overflow-hidden">
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-muted animate-pulse">
                <span className="text-muted-foreground text-sm">Memuat gambar...</span>
              </div>
            )}
            <img
              src={question.image}
              alt="Tebak gambar"
              className={cn(
                'w-full h-full object-cover transition-opacity duration-300',
                imageLoaded ? 'opacity-100' : 'opacity-0'
              )}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageLoaded(true)}
            />
            <div className="absolute top-3 left-3">
              <Badge variant="secondary" className="gap-1 bg-background/80 backdrop-blur-sm">
                <Tag className="size-3" />
                {question.category}
              </Badge>
            </div>
          </div>

          <CardContent className="p-5 space-y-4">
            <p className="text-center font-semibold text-foreground text-base">
              Apa nama dari gambar ini?
            </p>

            {/* Options */}
            <div className="grid grid-cols-2 gap-3">
              {question.options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleSelect(opt)}
                  disabled={answerState !== 'idle'}
                  className={cn(
                    'rounded-xl border-2 px-4 py-3 text-sm font-medium text-left transition-all duration-200',
                    optionStyle(opt)
                  )}
                >
                  <span className="flex items-center gap-2">
                    {answerState !== 'idle' && opt === question.answer && (
                      <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                    )}
                    {answerState !== 'idle' &&
                      opt === selectedOption &&
                      answerState === 'wrong' && (
                        <XCircle className="size-4 text-rose-500 shrink-0" />
                      )}
                    {opt}
                  </span>
                </button>
              ))}
            </div>

            {/* Feedback */}
            {answerState !== 'idle' && (
              <div
                className={cn(
                  'rounded-xl p-3 text-center text-sm font-semibold animate-in fade-in slide-in-from-bottom-2 duration-300',
                  answerState === 'correct'
                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300'
                    : 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300'
                )}
              >
                {answerState === 'correct' ? (
                  <span>🎉 Benar! +{getPoints()} poin</span>
                ) : (
                  <span>😔 Salah! Jawaban yang benar: {question.answer}</span>
                )}
              </div>
            )}

            {/* Next Button */}
            {answerState !== 'idle' && (
              <Button
                className="w-full animate-in fade-in duration-300"
                onClick={isLast ? handleFinish : handleNext}
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
