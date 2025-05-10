
import React, { useRef } from 'react';
import { cn } from "@/lib/utils";
import { useVideoPlayer } from './useVideoPlayer';
import PlayerHeader from './Header';
import BigPlayButton from './BigPlayButton';
import BufferingIndicator from './BufferingIndicator';
import { PlayerControls } from './Controls';

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
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    videoRef,
    isPlaying,
    volume,
    muted,
    currentTime,
    duration,
    isFullScreen,
    isControlsVisible,
    isBuffering,
    togglePlay,
    toggleMute,
    handleVolumeChange,
    handleSeek,
    toggleFullScreen,
    handleKeyboardControls,
    handleMouseEnter,
    handleMouseLeave,
    handleMouseMove
  } = useVideoPlayer(autoPlay);

  return (
    <div 
      ref={containerRef}
      className="relative bg-black w-full aspect-video rounded-md overflow-hidden focus:outline-none"
      tabIndex={0}
      onKeyDown={(e) => handleKeyboardControls(e, containerRef)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
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

      {/* Верхняя панель с заголовком */}
      <PlayerHeader title={title} isControlsVisible={isControlsVisible} />

      {/* Центральная кнопка воспроизведения */}
      <BigPlayButton isVisible={!isPlaying} onClick={togglePlay} />

      {/* Индикатор буферизации */}
      <BufferingIndicator isBuffering={isBuffering} />

      {/* Панель управления (нижняя) */}
      <PlayerControls 
        isPlaying={isPlaying}
        muted={muted}
        volume={volume}
        currentTime={currentTime}
        duration={duration}
        isFullScreen={isFullScreen}
        isControlsVisible={isControlsVisible}
        togglePlay={togglePlay}
        toggleMute={toggleMute}
        handleVolumeChange={handleVolumeChange}
        handleSeek={handleSeek}
        toggleFullScreen={() => toggleFullScreen(containerRef)}
      />
    </div>
  );
};

export default VideoPlayer;
