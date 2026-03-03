import React from 'react';

interface AudioPlayerProps {
  src: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ src }) => {
  return (
    <div className="w-full min-w-[200px] max-w-[300px]">
      <audio
        controls
        src={src}
        preload="none"
        className="h-8 w-full outline-none"
      >
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};
