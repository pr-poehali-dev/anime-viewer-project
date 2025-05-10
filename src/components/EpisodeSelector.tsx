
import React from 'react';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export interface Episode {
  id: string;
  number: number;
  title: string;
  thumbnail?: string;
  duration: string;
}

interface EpisodeSelectorProps {
  episodes: Episode[];
  currentEpisode: string;
  onEpisodeSelect: (episodeId: string) => void;
}

const EpisodeSelector: React.FC<EpisodeSelectorProps> = ({
  episodes,
  currentEpisode,
  onEpisodeSelect
}) => {
  return (
    <div className="bg-card rounded-md border">
      <div className="p-4 border-b">
        <h3 className="font-semibold">Список серий</h3>
      </div>
      <ScrollArea className="h-96">
        <div className="p-2">
          {episodes.map((episode) => (
            <Button
              key={episode.id}
              variant="ghost"
              className={cn(
                "w-full justify-start mb-1 h-auto p-2 rounded-sm",
                currentEpisode === episode.id && "bg-primary/10 text-primary"
              )}
              onClick={() => onEpisodeSelect(episode.id)}
            >
              <div className="flex items-center w-full">
                <div className="flex-shrink-0 w-24 h-16 mr-3 overflow-hidden rounded">
                  {episode.thumbnail ? (
                    <img 
                      src={episode.thumbnail} 
                      alt={`Эпизод ${episode.number}`} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted/50 flex items-center justify-center text-muted-foreground">
                      Нет превью
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <span className="font-medium text-sm">
                      Серия {episode.number}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {episode.duration}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{episode.title}</p>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default EpisodeSelector;
