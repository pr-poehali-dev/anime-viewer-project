
import React from 'react';
import { cn } from "@/lib/utils";

interface HeaderProps {
  title: string;
  isControlsVisible: boolean;
}

const PlayerHeader: React.FC<HeaderProps> = ({ title, isControlsVisible }) => {
  return (
    <div 
      className={cn(
        "absolute top-0 left-0 right-0 bg-gradient-to-b from-black/70 to-transparent p-4 transition-opacity duration-300", 
        isControlsVisible ? "opacity-100" : "opacity-0"
      )}
    >
      <h2 className="text-white font-medium">{title}</h2>
    </div>
  );
};

export default PlayerHeader;
