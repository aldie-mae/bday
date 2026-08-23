import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { VirtualCake } from './components/VirtualCake';
import { FloatingHeartsCanvas } from './components/FloatingHeartsCanvas';
import { PersonalizeModal } from './components/PersonalizeModal';
import { KeepsakeCardModal } from './components/KeepsakeCardModal';
import { DEFAULT_PROFILE } from './data/initialData';
import { BirthdayProfile } from './types';
import { playConfettiPop, toggleBackgroundMusic } from './utils/audio';
import { Heart, Sparkles, Wand2, ArrowUp } from 'lucide-react';

export function App() {
  const [profile, setProfile] = useState<BirthdayProfile>(() => {
    try {
      const saved = localStorage.getItem('birthday_profile_pogi') || localStorage.getItem('birthday_profile_gab');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.boyfriendName === 'Gab') {
          parsed.boyfriendName = 'Pogi';
        }
        if (!parsed.senderName || parsed.senderName === 'Your Love') {
          parsed.senderName = 'Aldie';
        }
        if (parsed.nickname === 'My Favorite Goofball 👑') {
          parsed.nickname = 'My Pogi 👑';
        }
        // If user uploaded a custom base64 image, keep it, otherwise update to latest realistic photo
        if (!parsed.heroImageUrl || !parsed.heroImageUrl.startsWith('data:image')) {
          parsed.heroImageUrl = DEFAULT_PROFILE.heroImageUrl;
        }
        return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_PROFILE;
  });

  const [activeSection, setActiveSection] = useState('hero');
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isPersonalizeOpen, setIsPersonalizeOpen] = useState(false);
  const [isKeepsakeOpen, setIsKeepsakeOpen] = useState(false);
  const [floatingEnabled, setFloatingEnabled] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Sync profile changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('birthday_profile_pogi', JSON.stringify(profile));
    } catch (e) {
      console.error(e);
    }
  }, [profile]);

  const handleUpdateProfile = (updates: Partial<BirthdayProfile>) => {
    setProfile((prev) => ({ ...prev, ...updates }));
  };

  const handleResetProfile = () => {
    setProfile(DEFAULT_PROFILE);
    localStorage.removeItem('birthday_profile_pogi');
    localStorage.removeItem('birthday_profile_gab');
  };

  // Track active section and scroll button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);

      const cakeEl = document.getElementById('cake');
      if (cakeEl) {
        const rect = cakeEl.getBoundingClientRect();
        if (rect.top <= 200 && rect.bottom >= 200) {
          setActiveSection('cake');
          return;
        }
      }
      setActiveSection('hero');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleMusic = () => {
    const playing = toggleBackgroundMusic();
    setIsMusicPlaying(playing);
  };

  const handleTriggerSurprise = () => {
    playConfettiPop();
    // Multi-stage confetti celebration
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      colors: ['#3b82f6', '#60a5fa', '#93c5fd', '#38bdf8', '#fbbf24', '#f43f5e', '#a855f7'],
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative bg-slate-50 selection:bg-blue-200 selection:text-blue-950 font-sans">
      {/* Background Floating Embellishments */}
      <FloatingHeartsCanvas isEnabled={floatingEnabled} />

      {/* Decorative top background glow */}
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-blue-100/60 via-sky-50/40 to-transparent pointer-events-none -z-10" />

      {/* Navigation Header */}
      <Navbar
        boyfriendName={profile.boyfriendName}
        isMusicPlaying={isMusicPlaying}
        onToggleMusic={handleToggleMusic}
        onOpenPersonalize={() => setIsPersonalizeOpen(true)}
        onTriggerSurprise={handleTriggerSurprise}
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />

      {/* Main Content */}
      <main className="flex-1 relative z-10 max-w-4xl mx-auto w-full px-4 py-4 space-y-4">
        {/* Hero Section */}
        <HeroSection
          profile={profile}
          onUpdateProfile={handleUpdateProfile}
          onScrollToCake={() => scrollToSection('cake')}
          onOpenPersonalize={() => setIsPersonalizeOpen(true)}
        />

        {/* Interactive Virtual Birthday Cake */}
        <VirtualCake boyfriendName={profile.boyfriendName} />
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-10 px-4 text-center border-t border-blue-100 bg-white/70 backdrop-blur-xs mt-12">
        <div className="max-w-md mx-auto space-y-3">
          <p className="font-handwriting text-2xl sm:text-3xl text-blue-600">
            Happy Birthday to my favorite person in the world! 💙
          </p>
          <p className="text-xs text-slate-500">
            Made with all my love for {profile.boyfriendName}. May this year bring endless happiness and laughter.
          </p>
          <div className="pt-2 flex items-center justify-center gap-3">
            <button
              onClick={() => setIsKeepsakeOpen(true)}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 underline underline-offset-4"
            >
              Print Birthday Keepsake Card
            </button>
            <span className="text-slate-300">•</span>
            <button
              onClick={() => setFloatingEnabled(!floatingEnabled)}
              className="text-xs text-slate-500 hover:text-slate-700"
            >
              {floatingEnabled ? 'Pause floating sparkles' : 'Resume sparkles'}
            </button>
          </div>
        </div>
      </footer>

      {/* Back to Top Floating Action Button */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-30 p-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 hover:scale-110 transition-all focus-visible:outline-blue-500"
          title="Back to top"
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* Modals */}
      <PersonalizeModal
        isOpen={isPersonalizeOpen}
        onClose={() => setIsPersonalizeOpen(false)}
        profile={profile}
        onSaveProfile={(updated) => setProfile(updated)}
        onResetProfile={handleResetProfile}
        onOpenKeepsakePrint={() => setIsKeepsakeOpen(true)}
      />

      <KeepsakeCardModal
        isOpen={isKeepsakeOpen}
        onClose={() => setIsKeepsakeOpen(false)}
        profile={profile}
      />
    </div>
  );
}

export default App;
