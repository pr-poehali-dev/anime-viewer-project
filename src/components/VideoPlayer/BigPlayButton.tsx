
import React from 'react';
import { Button } from "@/components/ui/button";
import Icon from '@/components/ui/icon';

interface BigPlayButtonProps {
  isVisible: boolean;
  onClick: () => void;
}

const BigPlayButton: React.FC<BigPlayButtonProps> = ({ isVisible, onClick }) => {
  if (!isVisible) return null;
  
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
      <Button 
        size="icon" 
        variant="ghost" 
        className="h-20 w-20 rounded-full bg-black/30 text-white hover:bg-black/50"
        onClick={onClick}
      >
        <Icon name="Play" className="h-12 w-12" />
      </Button>
    </div>
  );
};

export default BigPlayButton;
