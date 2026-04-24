import { useEffect, useRef, useState } from 'react';
import { Pause, Play, Volume2, VolumeX, Music, SkipBack, SkipForward, ListMusic } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Sesuaikan path ini dengan struktur folder public kamu.
const TRACKS = [
  {
    title: 'GUESS MODE V1',
    url: '/audio/guess_mode_v1.mp3',
  },
  {
    title: 'GUESS MODE V2',
    url: '/audio/guess_mode_v2.mp3',
  },
  {
    title: 'GUESSING MODE V1',
    url: '/audio/guessing_mode.mp3',
  },
  {
    title: 'RISE UP',
    url: '/audio/rise_up.mp3',
  },
];

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  
  // Set default ke false, kita akan ubah ke true saat ada interaksi pertama
  const [isPlaying, setIsPlaying] = useState(false); 
  const [volume, setVolume] = useState(0.3);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  
  // State untuk mengecek apakah user sudah pernah interaksi dengan halaman
  const [hasInteracted, setHasInteracted] = useState(false);

  const currentTrack = TRACKS[currentTrackIndex];

  // Trik Autoplay: Dengarkan klik pertama user di mana saja pada halaman
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        setIsPlaying(true); // Otomatis play musik setelah interaksi pertama
      }
    };

    // Pasang listener untuk klik atau tekan keyboard
    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('keydown', handleFirstInteraction);

    return () => {
      // Bersihkan listener setelah komponen unmount atau sudah berinteraksi
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };
  }, [hasInteracted]);

  // Handle Volume
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = isMuted ? 0 : volume;
    audio.loop = false;
  }, [volume, isMuted]);

  // Handle Play/Pause & Track Changes with Browser Auto-play Policy Handling
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    if (isPlaying) {
      audio.play().catch((error) => {
        console.warn("Auto-play diblokir oleh browser. Menunggu interaksi user...", error);
        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying, currentTrackIndex]);

  const togglePlay = () => {
    setIsPlaying((p) => !p);
    setHasInteracted(true); // Jika user klik play langsung dari player
  };
  
  const toggleMute = () => setIsMuted((m) => !m);

  const handleVolumeChange = (val: number[]) => {
    setVolume(val[0]);
    setIsMuted(val[0] === 0);
  };

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    setIsPlaying(true);
  };

  const selectTrack = (index: number) => {
    setCurrentTrackIndex(index);
    setIsPlaying(true);
    setShowPlaylist(false); // Tutup menu playlist setelah lagu dipilih
  };

  return (
    <>
      <audio 
        ref={audioRef} 
        src={currentTrack.url} 
        preload="auto" 
        onEnded={handleNext} 
      />

      <div
        className={cn(
          'fixed bottom-4 right-4 z-50 transition-all duration-300 flex flex-col items-end gap-2',
          isExpanded ? 'w-80' : 'w-auto' 
        )}
      >
        {/* Playlist Pop-up Menu */}
        {isExpanded && showPlaylist && (
          <div className="w-full rounded-2xl border bg-card/95 backdrop-blur-md shadow-xl p-2 max-h-48 overflow-y-auto flex flex-col gap-1 animate-in slide-in-from-bottom-2 fade-in">
            {TRACKS.map((track, index) => (
              <button
                key={index}
                onClick={() => selectTrack(index)}
                className={cn(
                  "w-full text-left px-3 py-2 text-xs rounded-xl transition-all duration-200 flex items-center justify-between group",
                  index === currentTrackIndex
                    ? "bg-primary/10 text-primary font-semibold"
                    : "hover:bg-muted text-muted-foreground hover:text-foreground"
                )}
              >
                <span className="truncate">{track.title}</span>
                {index === currentTrackIndex && <Music className="size-3.5" />}
              </button>
            ))}
          </div>
        )}

        {/* Main Player Bar */}
        <div className="w-full rounded-2xl border bg-card/90 backdrop-blur-md shadow-xl p-2">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon-sm"
              className={cn(
                "shrink-0 transition-colors",
                isExpanded ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground"
              )}
              onClick={() => {
                setIsExpanded((e) => !e);
                if (isExpanded) setShowPlaylist(false);
              }}
              title="Toggle player"
            >
              <Music className="size-4" />
            </Button>

            {isExpanded && (
              <>
                {/* Track Title (Clickable to open playlist) */}
                <div 
                  className="flex-1 overflow-hidden flex items-center gap-1.5 cursor-pointer hover:bg-muted/50 rounded-md px-1.5 py-1 transition-colors"
                  onClick={() => setShowPlaylist((p) => !p)}
                  title="Pilih Lagu"
                >
                  <span className="text-xs font-medium text-foreground truncate block w-full whitespace-nowrap">
                    {currentTrack.title}
                  </span>
                  <ListMusic className={cn(
                    "size-3.5 shrink-0 transition-colors",
                    showPlaylist ? "text-primary" : "text-muted-foreground"
                  )} />
                </div>

                <div className="flex items-center gap-0.5 shrink-0">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={handlePrev}
                    className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground"
                  >
                    <SkipBack className="size-3.5" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={togglePlay}
                    className={cn(
                      'h-7 w-7 p-0 transition-colors',
                      isPlaying
                        ? 'text-primary hover:text-primary/80'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    {isPlaying ? <Pause className="size-4" /> : <Play className="size-4" />}
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={handleNext}
                    className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground"
                  >
                    <SkipForward className="size-3.5" />
                  </Button>
                </div>

                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={toggleMute}
                  className="shrink-0 text-muted-foreground hover:text-foreground ml-1"
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="size-4" />
                  ) : (
                    <Volume2 className="size-4" />
                  )}
                </Button>

                <div className="w-16 shrink-0 hidden sm:block">
                  <Slider
                    min={0}
                    max={1}
                    step={0.05}
                    value={[isMuted ? 0 : volume]}
                    onValueChange={handleVolumeChange}
                    className="cursor-pointer"
                  />
                </div>
              </>
            )}

            {!isExpanded && (
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={togglePlay}
                className={cn(
                  'shrink-0 transition-colors',
                  isPlaying
                    ? 'text-primary hover:text-primary/80'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {isPlaying ? <Pause className="size-4" /> : <Play className="size-4" />}
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}