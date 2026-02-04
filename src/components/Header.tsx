
import React from 'react';
import { User } from '../types';

interface HeaderProps {
  user?: User;
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  return (
    <header className="sticky top-0 z-50 glass border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center group-hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-500/20">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
            </svg>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">ClipVault</h1>
        </div>
        
        <nav className="flex gap-4 items-center">
          {user ? (
            <>
              <div className="hidden sm:flex flex-col items-end mr-2">
                <span className="text-xs font-bold text-white leading-none mb-1">{user.name}</span>
                <span className="text-[10px] text-slate-500 uppercase tracking-widest leading-none">Pro Plan</span>
              </div>
              <button 
                onClick={onLogout}
                className="text-sm font-medium text-slate-400 hover:text-red-400 transition-colors bg-slate-800/50 px-3 py-1.5 rounded-lg border border-slate-700/50"
              >
                Logout
              </button>
            </>
          ) : (
            <button className="bg-white text-slate-900 px-4 py-2 rounded-full text-sm font-bold hover:bg-slate-200 transition-all">
              Sign In
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
