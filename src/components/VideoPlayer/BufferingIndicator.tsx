import React from "react";

interface BufferingIndicatorProps {
  isBuffering: boolean;
}

const BufferingIndicator: React.FC<BufferingIndicatorProps> = ({
  isBuffering,
}) => {
  if (!isBuffering) return null;

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
    </div>
  );
};

export default BufferingIndicator;
