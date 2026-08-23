import React from 'react';
import { Volume2, VolumeX, Sparkles, SlidersHorizontal, Cake, Heart } from 'lucide-react';

interface NavbarProps {
  boyfriendName: string;
  isMusicPlaying: boolean;
  onToggleMusic: () => void;
  onOpenPersonalize: () => void;
  onTriggerSurprise: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  boyfriendName,
  isMusicPlaying,
  onToggleMusic,
  onOpenPersonalize,
  onTriggerSurprise,
  activeSection,
  onNavigate,
}) => {
  const navItems = [
    { id: 'hero', label: 'Greeting' },
    { id: 'cake', label: 'Make a Wish' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/90 border-b border-blue-100 shadow-xs transition-all">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Brand title, exactly one text element */}
        <button
          onClick={() => onNavigate('hero')}
          className="text-left font-display text-xl sm:text-2xl text-blue-600 hover:text-blue-700 transition-colors whitespace-nowrap shrink-0 truncate max-w-[200px] sm:max-w-xs focus-visible:outline-blue-500"
        >
          Happy Birthday, {boyfriendName || 'Pogi'}! 💙
        </button>

        {/* Zone 2: Nav links, 1-2 words, single line */}
        <nav className="hidden sm:flex items-center gap-1.5">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase transition-all whitespace-nowrap shrink-0 focus-visible:outline-blue-500 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onToggleMusic}
            title={isMusicPlaying ? 'Pause birthday tune' : 'Play cute birthday tune'}
            aria-label="Toggle birthday music"
            className={`p-2 rounded-full border transition-all focus-visible:outline-blue-500 ${
              isMusicPlaying
                ? 'bg-blue-100 text-blue-700 border-blue-300 animate-pulse'
                : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-blue-50 hover:text-blue-600'
            }`}
          >
            {isMusicPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={onOpenPersonalize}
            className="flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-blue-100 hover:text-blue-700 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-blue-500"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Customize</span>
          </button>

          <button
            onClick={onTriggerSurprise}
            className="flex items-center gap-1.5 py-1.5 px-3.5 rounded-full text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-xs hover:shadow transition-all transform active:scale-95 whitespace-nowrap shrink-0 focus-visible:outline-blue-500"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Surprise!</span>
          </button>
        </div>
      </div>
    </header>
  );
};
