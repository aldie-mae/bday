import React, { useState, useRef } from 'react';
import { Sparkles, Heart, PartyPopper, Smile, Camera, Upload, Image as ImageIcon } from 'lucide-react';
import confetti from 'canvas-confetti';
import { BirthdayProfile } from '../types';
import { playConfettiPop, playBirthdayMelody } from '../utils/audio';

interface HeroSectionProps {
  profile: BirthdayProfile;
  onUpdateProfile: (updates: Partial<BirthdayProfile>) => void;
  onScrollToCake: () => void;
  onOpenPersonalize: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  profile,
  onUpdateProfile,
  onScrollToCake,
  onOpenPersonalize,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showStickers, setShowStickers] = useState(true);
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(profile.boyfriendName);
  const [surpriseCount, setSurpriseCount] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onUpdateProfile({ heroImageUrl: event.target.result as string });
          playConfettiPop();
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.6 },
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const launchConfetti = () => {
    playConfettiPop();
    setSurpriseCount((prev) => prev + 1);

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.65, x: 0.5 },
      colors: ['#3b82f6', '#60a5fa', '#93c5fd', '#38bdf8', '#fbbf24', '#f43f5e'],
    });

    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0.1, y: 0.7 },
        colors: ['#60a5fa', '#93c5fd', '#bfdbfe', '#ffffff'],
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 0.9, y: 0.7 },
        colors: ['#3b82f6', '#1d4ed8', '#7dd3fc', '#fef08a'],
      });
    }, 200);
  };

  const handleNameSave = () => {
    if (tempName.trim()) {
      onUpdateProfile({ boyfriendName: tempName.trim() });
    }
    setIsEditingName(false);
  };

  return (
    <section id="hero" className="relative pt-6 pb-10 sm:pt-10 sm:pb-14 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Main featured birthday card */}
        <div className="relative bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-blue-100 text-center transition-all">
          
          {/* Top celebratory pill */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wide bg-blue-100 text-blue-800">
              <PartyPopper className="w-3.5 h-3.5 text-blue-600" />
              Special Birthday Edition
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-sky-100 text-sky-800">
              👑 {profile.nickname || 'My Pogi 👑'}
            </span>
          </div>

          {/* Centerpiece: The Silly Hats Couple Photo Frame */}
          <div
            className="relative mx-auto max-w-md w-full rounded-2xl p-2.5 bg-gradient-to-tr from-blue-300 via-sky-200 to-indigo-300 shadow-md group mb-7 cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={launchConfetti}
            title="Click the photo for celebratory sparkles!"
          >
            <div className="relative overflow-hidden rounded-xl bg-slate-900 aspect-4/3 flex items-center justify-center">
              <img
                src={profile.heroImageUrl}
                alt="Pogi and Aldie in silly birthday hats"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />

              {/* Playful sticker overlays matching the exact hats */}
              {showStickers && (
                <>
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full text-[11px] font-bold text-blue-700 shadow-xs flex items-center gap-1 animate-soft-float select-none">
                    <span>👑</span> Princess {profile.boyfriendName || 'Pogi'}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full text-[11px] font-bold text-pink-600 shadow-xs flex items-center gap-1 select-none">
                    <span>🎂</span> {profile.senderName || 'Aldie'}
                  </div>
                </>
              )}

              {/* Hover tap hint overlay */}
              <div
                className={`absolute inset-0 bg-blue-950/20 backdrop-blur-[1px] flex items-center justify-center transition-opacity duration-300 pointer-events-none ${
                  isHovered ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <span className="px-4 py-2 rounded-full bg-white/95 text-blue-700 font-bold text-xs shadow-lg flex items-center gap-1.5 transform scale-95 group-hover:scale-100 transition-transform">
                  <Sparkles className="w-4 h-4 text-blue-500" /> Tap for Sparkles!
                </span>
              </div>
            </div>

            {/* Hidden file input for original photo replacement */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoUpload}
            />

            {/* Quick action badges */}
            <div className="absolute -bottom-3 right-4 flex items-center gap-1.5 z-10">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowStickers(!showStickers);
                }}
                className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/95 hover:bg-white text-slate-700 shadow border border-blue-200 flex items-center gap-1 transition-colors"
                title="Toggle photo tags"
              >
                <Smile className="w-3 h-3 text-blue-500" />
                {showStickers ? 'Hide Tags' : 'Show Tags'}
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenPersonalize();
                }}
                className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/95 hover:bg-white text-slate-700 shadow border border-blue-200 flex items-center gap-1 transition-colors"
                title="Change photo or text"
              >
                <Camera className="w-3 h-3 text-indigo-500" />
                Edit
              </button>
            </div>
          </div>

          {/* Heading */}
          <div className="mb-4">
            {isEditingName ? (
              <div className="flex items-center justify-center gap-2 max-w-sm mx-auto">
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  className="px-3 py-1.5 border-2 border-blue-400 rounded-xl text-center font-display text-2xl text-blue-600 focus:outline-hidden w-full"
                  placeholder="Boyfriend's name"
                  autoFocus
                  onKeyDown={(e) => e.key === 'Enter' && handleNameSave()}
                />
                <button
                  onClick={handleNameSave}
                  className="px-3 py-1.5 bg-blue-600 text-white rounded-xl text-xs font-bold whitespace-nowrap"
                >
                  Save
                </button>
              </div>
            ) : (
              <h1
                onClick={() => setIsEditingName(true)}
                className="font-display text-3xl sm:text-4xl lg:text-5xl text-blue-600 tracking-tight cursor-pointer hover:opacity-90 transition-opacity"
                title="Click to edit name"
              >
                Happy Birthday, {profile.boyfriendName}! 🎂💙
              </h1>
            )}
          </div>

          {/* Highlighted Quote Box: "To my peace, joy and everything." */}
          <div className="my-6 p-4 sm:p-5 rounded-2xl bg-blue-50/90 border-l-4 border-blue-500 text-left sm:text-center shadow-xs">
            <p className="font-handwriting text-2xl sm:text-3xl text-blue-950 leading-snug">
              "{profile.mainQuote}"
            </p>
          </div>

          {/* Sweet Paragraph */}
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-7">
            {profile.sweetMessage}
          </p>

          {/* Signature badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-800 text-xs font-medium mb-8">
            <Heart className="w-3.5 h-3.5 text-blue-500 fill-blue-500" />
            <span>Forever your biggest fan, <strong>{profile.senderName}</strong></span>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={launchConfetti}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white font-bold text-base shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transform active:scale-95 transition-all flex items-center justify-center gap-2 focus-visible:outline-blue-500"
            >
              <Sparkles className="w-5 h-5" />
              <span>Click for a Surprise! ✨</span>
            </button>

            <button
              onClick={() => {
                playBirthdayMelody();
                onScrollToCake();
              }}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-sky-50 hover:bg-sky-100 text-sky-800 font-semibold text-base border border-sky-200 transition-colors flex items-center justify-center gap-2 focus-visible:outline-sky-500"
            >
              <span>🎂 Blow Your Birthday Candles</span>
            </button>
          </div>

          {surpriseCount > 0 && (
            <p className="text-xs text-blue-600 font-medium mt-3 animate-fade-in">
              🎉 Sparkle counter: {surpriseCount} bursts of love for {profile.boyfriendName || 'Pogi'}! Keep clicking!
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

