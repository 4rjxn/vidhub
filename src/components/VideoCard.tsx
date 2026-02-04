
import React from 'react';
import { VideoMetadata } from '../types';

interface VideoCardProps {
  video: VideoMetadata;
  onDelete: (id: string) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onDelete }) => {
  return (
    <div className="group relative glass rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1">
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={video.thumbnail} 
          alt={video.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
          }}
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <a 
            href={video.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-white hover:bg-white hover:text-indigo-600 transition-all transform hover:scale-110"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </a>
        </div>
        {video.category && (
          <span className="absolute top-3 left-3 px-2 py-1 bg-black/60 backdrop-blur text-[10px] font-bold uppercase tracking-wider text-white rounded">
            {video.category}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start gap-2 mb-2">
          <h4 className="font-bold text-slate-100 line-clamp-2 leading-snug group-hover:text-indigo-300 transition-colors">
            {video.title}
          </h4>
          <button 
            onClick={() => onDelete(video.id)}
            className="p-1 text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
            title="Remove video"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
        
        {video.aiInsights && (
          <div className="mt-2 bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-3">
            <div className="flex items-center gap-1.5 mb-1">
              <svg className="w-3.5 h-3.5 text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-tight">AI Insight</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed italic">
              "{video.aiInsights}"
            </p>
          </div>
        )}

        <div className="mt-auto pt-4 flex items-center justify-between text-[11px] text-slate-500 font-medium">
          <span>Added {new Date(video.addedAt).toLocaleDateString()}</span>
          <span className="text-slate-600 uppercase">ID: {video.id}</span>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
