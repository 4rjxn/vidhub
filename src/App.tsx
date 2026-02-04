
import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import VideoInput from './components/VideoInput';
import VideoGrid from './components/VideoGrid';
import LoginView from './components/LoginView';
import CategoryFilter from './components/CategoryFilter';
import { VideoMetadata, User } from './types';
import { generateVideoInsights } from './services/geminiService';

const App: React.FC = () => {
  const [videos, setVideos] = useState<VideoMetadata[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Auth logic
  useEffect(() => {
    const savedUser = localStorage.getItem('clipvault_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (email: string) => {
    const newUser = { email, name: email.split('@')[0] };
    setUser(newUser);
    localStorage.setItem('clipvault_user', JSON.stringify(newUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('clipvault_user');
  };

  // Video Persistence
  useEffect(() => {
    const saved = localStorage.getItem('clipvault_videos');
    if (saved) {
      try {
        setVideos(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved videos", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('clipvault_videos', JSON.stringify(videos));
  }, [videos]);

  // Derived state: categories
  const categories = useMemo(() => {
    const cats = videos.map(v => v.category).filter(Boolean) as string[];
    return Array.from(new Set(cats)).sort();
  }, [videos]);

  // Filtered videos
  const filteredVideos = useMemo(() => {
    if (selectedCategory === 'All') return videos;
    return videos.filter(v => v.category === selectedCategory);
  }, [videos, selectedCategory]);

  const extractVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const handleAddVideo = async (url: string) => {
    const id = extractVideoId(url);
    if (!id) {
      alert("Please enter a valid YouTube URL");
      return;
    }

    if (videos.some(v => v.id === id)) {
      alert("This video is already in your vault!");
      return;
    }

    setIsLoading(true);
    try {
      const aiData = await generateVideoInsights(url);
      
      const newVideo: VideoMetadata = {
        id,
        url,
        title: aiData.title,
        thumbnail: `https://img.youtube.com/vi/${id}/maxresdefault.jpg`,
        addedAt: Date.now(),
        aiInsights: aiData.insights,
        category: aiData.category
      };

      setVideos(prev => [newVideo, ...prev]);
    } catch (error) {
      console.error("Error adding video:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteVideo = (id: string) => {
    setVideos(prev => prev.filter(v => v.id !== id));
  };

  if (!user) {
    return <LoginView onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen pb-20 bg-[#0f172a]">
      <Header user={user} onLogout={handleLogout} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl mb-4">
            Welcome, {user.name}.
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Your curated collection of insights. Paste a YouTube link to expand your vault.
          </p>
        </div>

        <div className="flex justify-center mb-16">
          <VideoInput onAdd={handleAddVideo} isLoading={isLoading} />
        </div>

        <section>
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-slate-200 mb-6 flex items-center gap-2">
              <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              Filter by Category
            </h3>
            <CategoryFilter 
              categories={categories} 
              selectedCategory={selectedCategory} 
              onSelect={setSelectedCategory} 
            />
          </div>

          <div className="flex items-center justify-between mb-8 border-b border-slate-800 pb-4">
            <h3 className="text-lg font-medium text-slate-400">
              Showing {filteredVideos.length} {selectedCategory !== 'All' ? selectedCategory : 'total'} videos
            </h3>
            {videos.length > 0 && (
              <button 
                onClick={() => { if(confirm('Clear all?')) setVideos([]); }}
                className="text-sm text-red-400 hover:text-red-300 transition-colors"
              >
                Clear All
              </button>
            )}
          </div>
          
          <VideoGrid 
            videos={filteredVideos} 
            onDelete={handleDeleteVideo} 
          />
        </section>
      </main>

      {/* Empty State */}
      {filteredVideos.length === 0 && !isLoading && (
        <div className="flex flex-col items-center justify-center py-20 opacity-50">
          <svg className="w-20 h-20 mb-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          <p className="text-slate-500 italic text-lg text-center">
            {selectedCategory === 'All' 
              ? 'No videos saved yet. Start by pasting a link above!' 
              : `No videos found in category "${selectedCategory}".`}
          </p>
        </div>
      )}
    </div>
  );
};

export default App;
