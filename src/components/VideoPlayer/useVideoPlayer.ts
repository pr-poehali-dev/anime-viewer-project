
import { useState, useRef, useEffect } from 'react';

export const useVideoPlayer = (autoPlay: boolean = false) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(100);
  const [muted, setMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [isControlsVisible, setIsControlsVisible] = useState(true);
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

  const toggleFullScreen = (containerRef: React.RefObject<HTMLDivElement>) => {
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

  const handleKeyboardControls = (e: React.KeyboardEvent, containerRef: React.RefObject<HTMLDivElement>) => {
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
      toggleFullScreen(containerRef);
    }
    
    // M - приглушить/включить звук
    if (e.code === 'KeyM') {
      e.preventDefault();
      toggleMute();
    }
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const handleMouseMove = () => {
    setIsControlsVisible(true);
    if (controlsTimerRef.current) {
      clearTimeout(controlsTimerRef.current);
    }
    if (isPlaying) {
      controlsTimerRef.current = setTimeout(() => {
        setIsControlsVisible(false);
      }, 3000);
    }
  };

  return {
    videoRef,
    isPlaying,
    volume,
    muted,
    currentTime,
    duration,
    isFullScreen,
    isControlsVisible,
    isBuffering,
    isHovering,
    togglePlay,
    toggleMute,
    handleVolumeChange,
    handleSeek,
    toggleFullScreen: (containerRef: React.RefObject<HTMLDivElement>) => toggleFullScreen(containerRef),
    handleKeyboardControls,
    handleMouseEnter,
    handleMouseLeave,
    handleMouseMove,
  };
};
