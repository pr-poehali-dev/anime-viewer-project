
import React from 'react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import Icon from '@/components/ui/icon';
import { formatTime } from './utils';
import { cn } from "@/lib/utils";

interface ControlsProps {
  isPlaying: boolean;
  muted: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  isFullScreen: boolean;
  isControlsVisible: boolean;
  togglePlay: () => void;
  toggleMute: () => void;
  handleVolumeChange: (newValue: number[]) => void;
  handleSeek: (newValue: number[]) => void;
  toggleFullScreen: () => void;
}

export const PlayerControls: React.FC<ControlsProps> = ({
  isPlaying,
  muted,
  volume,
  currentTime,
  duration,
  isFullScreen,
  isControlsVisible,
  togglePlay,
  toggleMute,
  handleVolumeChange,
  handleSeek,
  toggleFullScreen
}) => {
  return (
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
          <VolumeControl 
            muted={muted} 
            volume={volume} 
            toggleMute={toggleMute} 
            handleVolumeChange={handleVolumeChange} 
          />

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
  );
};

interface VolumeControlProps {
  muted: boolean;
  volume: number;
  toggleMute: () => void;
  handleVolumeChange: (newValue: number[]) => void;
}

export const VolumeControl: React.FC<VolumeControlProps> = ({
  muted,
  volume,
  toggleMute,
  handleVolumeChange
}) => {
  return (
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
  );
};
