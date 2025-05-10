
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import Icon from '@/components/ui/icon';
import { cn } from "@/lib/utils";

interface VideoPlayerProps {
  videoSrc: string;
  title: string;
  poster?: string;
  autoPlay?: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoSrc,
  title,
  poster,
  autoPlay = false
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(100);
  const [muted, setMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isControlsVisible, setIsControlsVisible] = useState(true);
  const [isBuffering, setIsBuffering] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  
  const controlsTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onLoadedMetadata = () => {
      setDuration(video.duration);
    };

    const onTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    const onEnded = () => {
      setIsPlaying(false);
    };

    const onWaiting = () => {
      setIsBuffering(true);
    };

    const onPlaying = () => {
      setIsBuffering(false);
    };

    video.addEventListener('loadedmetadata', onLoadedMetadata);
    video.addEventListener('timeupdate', onTimeUpdate);
    video.addEventListener('ended', onEnded);
    video.addEventListener('waiting', onWaiting);
    video.addEventListener('playing', onPlaying);

    return () => {
      video.removeEventListener('loadedmetadata', onLoadedMetadata);
      video.removeEventListener('timeupdate', onTimeUpdate);
      video.removeEventListener('ended', onEnded);
      video.removeEventListener('waiting', onWaiting);
      video.removeEventListener('playing', onPlaying);
    };
  }, []);

  // Автоскрытие элементов управления
  useEffect(() => {
    if (isPlaying && !isHovering) {
      controlsTimerRef.current = setTimeout(() => {
        setIsControlsVisible(false);
      }, 3000);
    } else {
      setIsControlsVisible(true);
      if (controlsTimerRef.current) {
        clearTimeout(controlsTimerRef.current);
      }
    }

    return () => {
      if (controlsTimerRef.current) {
        clearTimeout(controlsTimerRef.current);
      }
    };
  }, [isPlaying, isHovering]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !muted;
    setMuted(!muted);
  };

  const handleVolumeChange = (newValue: number[]) => {
    const video = videoRef.current;
    if (!video) return;

    const volumeValue = newValue[0];
    video.volume = volumeValue / 100;
    setVolume(volumeValue);
    
    if (volumeValue === 0) {
      setMuted(true);
      video.muted = true;
    } else if (muted) {
      setMuted(false);
      video.muted = false;
    }
  };

  const handleSeek = (newValue: number[]) => {
    const video = videoRef.current;
    if (!video) return;

    const seekTime = newValue[0];
    video.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const toggleFullScreen = () => {
    const container = containerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen().catch(err => {
        console.error(`Ошибка при переходе в полноэкранный режим: ${err.message}`);
      });
      setIsFullScreen(true);
    } else {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const video = videoRef.current;
    if (!video) return;

    // Пробел - пауза/воспроизведение
    if (e.code === 'Space') {
      e.preventDefault();
      togglePlay();
    }
    
    // Стрелка вправо - перемотать вперед на 10 секунд
    if (e.code === 'ArrowRight') {
      e.preventDefault();
      video.currentTime = Math.min(video.currentTime + 10, video.duration);
    }
    
    // Стрелка влево - перемотать назад на 10 секунд
    if (e.code === 'ArrowLeft') {
      e.preventDefault();
      video.currentTime = Math.max(video.currentTime - 10, 0);
    }
    
    // F - полноэкранный режим
    if (e.code === 'KeyF') {
      e.preventDefault();
      toggleFullScreen();
    }
    
    // M - приглушить/включить звук
    if (e.code === 'KeyM') {
      e.preventDefault();
      toggleMute();
    }
  };

  // Форматирование времени (из секунд в формат MM:SS)
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div 
      ref={containerRef}
      className="relative bg-black w-full aspect-video rounded-md overflow-hidden focus:outline-none"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={() => {
        setIsControlsVisible(true);
        if (controlsTimerRef.current) {
          clearTimeout(controlsTimerRef.current);
        }
        if (isPlaying) {
          controlsTimerRef.current = setTimeout(() => {
            setIsControlsVisible(false);
          }, 3000);
        }
      }}
    >
      {/* Видео */}
      <video 
        ref={videoRef}
        className="w-full h-full"
        poster={poster}
        autoPlay={autoPlay}
        onClick={togglePlay}
        src={videoSrc}
      />

      {/* Наложение для контроля видео */}
      <div 
        className={cn(
          "absolute inset-0 bg-gradient-to-t from-black/70 to-transparent transition-opacity duration-300",
          isControlsVisible ? "opacity-100" : "opacity-0"
        )}
        onClick={togglePlay}
      />

      {/* Центральная кнопка плей/пауза (большая) */}
      {!isPlaying && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <Button 
            size="icon" 
            variant="ghost" 
            className="h-20 w-20 rounded-full bg-black/30 text-white hover:bg-black/50"
            onClick={togglePlay}
          >
            <Icon name="Play" className="h-12 w-12" />
          </Button>
        </div>
      )}

      {/* Индикатор буферизации */}
      {isBuffering && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      )}

      {/* Панель управления (нижняя) */}
      <div 
        className={cn(
          "absolute bottom-0 left-0 right-0 px-4 py-3 transition-opacity duration-300 space-y-2", 
          isControlsVisible ? "opacity-100" : "opacity-0"
        )}
      >
        {/* Прогресс-бар */}
        <div className="w-full flex items-center">
          <Slider 
            value={[currentTime]} 
            min={0}
            max={duration || 100}
            step={0.1}
            onValueChange={handleSeek}
            className="w-full cursor-pointer"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {/* Кнопка воспроизведения */}
            <Button 
              size="icon" 
              variant="ghost" 
              className="h-8 w-8 text-white hover:bg-white/20"
              onClick={togglePlay}
            >
              <Icon name={isPlaying ? "Pause" : "Play"} className="h-5 w-5" />
            </Button>

            {/* Время */}
            <span className="text-xs text-white">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {/* Громкость */}
            <div className="flex items-center group">
              <Button 
                size="icon" 
                variant="ghost" 
                className="h-8 w-8 text-white hover:bg-white/20"
                onClick={toggleMute}
              >
                <Icon 
                  name={
                    muted ? "VolumeX" : 
                    volume < 30 ? "Volume1" : 
                    volume < 70 ? "Volume2" : "Volume"
                  } 
                  className="h-5 w-5" 
                />
              </Button>
              
              <div className="w-0 overflow-hidden transition-all duration-200 group-hover:w-24">
                <Slider
                  value={[muted ? 0 : volume]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={handleVolumeChange}
                  className="mx-2"
                />
              </div>
            </div>

            {/* Полноэкранный режим */}
            <Button 
              size="icon" 
              variant="ghost" 
              className="h-8 w-8 text-white hover:bg-white/20"
              onClick={toggleFullScreen}
            >
              <Icon name={isFullScreen ? "Minimize2" : "Maximize2"} className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Заголовок видео (верхняя часть) */}
      <div 
        className={cn(
          "absolute top-0 left-0 right-0 bg-gradient-to-b from-black/70 to-transparent p-4 transition-opacity duration-300", 
          isControlsVisible ? "opacity-100" : "opacity-0"
        )}
      >
        <h2 className="text-white font-medium">{title}</h2>
      </div>
    </div>
  );
};

export default VideoPlayer;
