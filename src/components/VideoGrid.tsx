
import React from 'react';
import VideoCard from './VideoCard';
import { VideoMetadata } from '../types';

interface VideoGridProps {
  videos: VideoMetadata[];
  onDelete: (id: string) => void;
}

const VideoGrid: React.FC<VideoGridProps> = ({ videos, onDelete }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {videos.map((video) => (
        <VideoCard 
          key={video.id} 
          video={video} 
          onDelete={onDelete} 
        />
      ))}
    </div>
  );
};

export default VideoGrid;
