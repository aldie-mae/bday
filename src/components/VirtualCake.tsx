import React, { useState } from 'react';
import { Sparkles, Wand2, RotateCcw, Heart, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playBlowCandleSound, playConfettiPop, playBirthdayMelody } from '../utils/audio';

interface VirtualCakeProps {
  boyfriendName: string;
}

export const VirtualCake: React.FC<VirtualCakeProps> = ({ boyfriendName }) => {
  const totalCandles = 5;
  const [blownCandles, setBlownCandles] = useState<boolean[]>(new Array(totalCandles).fill(false));
  const [flavor, setFlavor] = useState<'blueVelvet' | 'chocolate' | 'vanilla'>('blueVelvet');
  const [userWish, setUserWish] = useState('');
  const [isWishSaved, setIsWishSaved] = useState(false);

  const allBlown = blownCandles.every(Boolean);

  const blowSingleCandle = (index: number) => {
    if (blownCandles[index]) return;
    playBlowCandleSound();

    const updated = [...blownCandles];
    updated[index] = true;
    setBlownCandles(updated);

    if (updated.every(Boolean)) {
      handleAllBlownCelebration();
    }
  };

  const blowAllCandles = () => {
    playBlowCandleSound();
    setBlownCandles(new Array(totalCandles).fill(true));
    handleAllBlownCelebration();
  };

  const handleAllBlownCelebration = () => {
    playConfettiPop();
    setTimeout(() => {
      playBirthdayMelody();
    }, 400);

    confetti({
      particleCount: 130,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#3b82f6', '#60a5fa', '#93c5fd', '#fbbf24', '#f59e0b', '#10b981'],
    });
  };

  const relightCandles = () => {
    setBlownCandles(new Array(totalCandles).fill(false));
    setIsWishSaved(false);
  };

  const handleSaveWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (userWish.trim()) {
      setIsWishSaved(true);
      playConfettiPop();
    }
  };

  const flavorStyles = {
    blueVelvet: {
      topFrosting: 'bg-sky-400',
      bottomCake: 'bg-blue-600',
      creamAccent: 'bg-sky-100',
      accentColor: 'text-blue-600',
      name: 'Ocean Blue Velvet 🫐',
    },
    chocolate: {
      topFrosting: 'bg-amber-900',
      bottomCake: 'bg-amber-950',
      creamAccent: 'bg-amber-700',
      accentColor: 'text-amber-800',
      name: 'Decadent Chocolate 🍫',
    },
    vanilla: {
      topFrosting: 'bg-indigo-300',
      bottomCake: 'bg-blue-500',
      creamAccent: 'bg-blue-100',
      accentColor: 'text-indigo-700',
      name: 'Vanilla Blueberry 🍦',
    },
  };

  const currentTheme = flavorStyles[flavor];

  return (
    <section id="cake" className="py-10 sm:py-14 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-lg border border-blue-100 text-center">
          
          {/* Header */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            Interactive Birthday Cake
          </div>

          <h2 className="font-display text-3xl sm:text-4xl text-slate-800 mb-2">
            Make a Wish, {boyfriendName}! 🎂✨
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-md mx-auto mb-6">
            Click on individual candles or blow them all at once to make your birthday wish come true!
          </p>

          {/* Flavor selector pills */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {(['blueVelvet', 'chocolate', 'vanilla'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFlavor(f)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  flavor === f
                    ? 'bg-blue-600 text-white shadow-xs scale-105'
                    : 'bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                {flavorStyles[f].name}
              </button>
            ))}
          </div>

          {/* The Visual Animated Birthday Cake */}
          <div className="relative mx-auto w-72 sm:w-80 h-64 flex flex-col items-center justify-end pb-4 my-2 select-none">
            
            {/* Candles Row */}
            <div className="flex items-end justify-center gap-3 sm:gap-4 mb-0 z-20">
              {blownCandles.map((isBlown, index) => (
                <div
                  key={index}
                  onClick={() => blowSingleCandle(index)}
                  className="flex flex-col items-center cursor-pointer group"
                  title={isBlown ? 'Candle is blown out!' : 'Click to blow out this candle'}
                >
                  {/* Flame or smoke */}
                  <div className="h-7 flex items-center justify-center">
                    {!isBlown ? (
                      <div className="relative animate-flame">
                        <div className="absolute -inset-1 bg-amber-400/40 rounded-full blur-xs" />
                        <div className="w-3.5 h-5 bg-gradient-to-t from-orange-500 via-amber-400 to-yellow-200 rounded-full shadow-xs" />
                      </div>
                    ) : (
                      <div className="w-1.5 h-3 bg-slate-300 rounded-full opacity-60 transition-opacity" />
                    )}
                  </div>

                  {/* Wick */}
                  <div className="w-0.5 h-1.5 bg-slate-700" />

                  {/* Candle Body */}
                  <div
                    className={`w-3.5 sm:w-4 h-10 rounded-t-sm shadow-xs transition-transform group-hover:scale-105 ${
                      index % 2 === 0
                        ? 'bg-gradient-to-b from-blue-300 via-blue-400 to-blue-600'
                        : 'bg-gradient-to-b from-sky-300 via-sky-400 to-sky-500'
                    }`}
                  >
                    <div className="w-full h-1 bg-white/40 my-1" />
                    <div className="w-full h-1 bg-white/40 my-1" />
                  </div>
                </div>
              ))}
            </div>

            {/* Top Tier Cake */}
            <div className={`relative w-44 sm:w-48 h-16 rounded-t-2xl shadow-inner transition-colors duration-300 ${currentTheme.topFrosting}`}>
              <div className="absolute -bottom-2 inset-x-0 flex justify-around">
                <span className={`w-4 h-4 rounded-full ${currentTheme.creamAccent} shadow-xs`} />
                <span className={`w-5 h-5 rounded-full ${currentTheme.creamAccent} shadow-xs`} />
                <span className={`w-3 h-3 rounded-full ${currentTheme.creamAccent} shadow-xs`} />
                <span className={`w-5 h-5 rounded-full ${currentTheme.creamAccent} shadow-xs`} />
                <span className={`w-4 h-4 rounded-full ${currentTheme.creamAccent} shadow-xs`} />
              </div>
              <div className="absolute inset-0 flex items-center justify-around px-4 opacity-70">
                <span className="w-1.5 h-1.5 bg-yellow-300 rounded-full" />
                <span className="w-1.5 h-1.5 bg-white rounded-full" />
                <span className="w-1.5 h-1.5 bg-cyan-200 rounded-full" />
                <span className="w-1.5 h-1.5 bg-sky-200 rounded-full" />
              </div>
            </div>

            {/* Bottom Tier Cake */}
            <div className={`relative w-64 sm:w-72 h-20 rounded-t-3xl shadow-md transition-colors duration-300 ${currentTheme.bottomCake}`}>
              <div className={`absolute top-0 inset-x-0 h-3 ${currentTheme.creamAccent}`} />
              
              <div className="absolute inset-x-0 top-5 text-center">
                <span className="font-handwriting text-xl text-white drop-shadow font-bold tracking-wider">
                  ★ Happy Birthday {boyfriendName || 'Pogi'} ★
                </span>
              </div>

              <div className="absolute bottom-1 inset-x-0 flex justify-evenly">
                {Array.from({ length: 9 }).map((_, i) => (
                  <span key={i} className={`w-4 h-4 rounded-full ${currentTheme.creamAccent}`} />
                ))}
              </div>
            </div>

            {/* Cake Stand */}
            <div className="w-72 sm:w-80 h-3 bg-slate-200 rounded-full shadow-md border-b-2 border-slate-300" />
            <div className="w-24 h-4 bg-slate-300 rounded-b-md shadow-inner" />
          </div>

          {/* Blow Controls */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {!allBlown ? (
              <button
                onClick={blowAllCandles}
                className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 transform active:scale-95"
              >
                <Wand2 className="w-4 h-4" />
                <span>Blow Out All Candles 💨</span>
              </button>
            ) : (
              <button
                onClick={relightCandles}
                className="px-6 py-3 rounded-full bg-slate-800 hover:bg-slate-900 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Relight Candles 🕯️</span>
              </button>
            )}
          </div>

          {/* Post-Blowing Wish Reveal Form */}
          {allBlown && (
            <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-50 border border-blue-200 text-left sm:text-center animate-fade-in">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold mb-3">
                <Heart className="w-3.5 h-3.5 fill-blue-500 text-blue-500" />
                Wish Granted!
              </div>
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-slate-800 mb-2">
                All candles blown out! 🎉
              </h3>
              <p className="text-slate-600 text-sm max-w-lg mx-auto mb-5">
                May every single dream you chase this year come true. What did you wish for, {boyfriendName || 'Pogi'}? Lock it in below!
              </p>

              {!isWishSaved ? (
                <form onSubmit={handleSaveWish} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={userWish}
                    onChange={(e) => setUserWish(e.target.value)}
                    placeholder="Enter your birthday wish or goal..."
                    className="flex-1 px-4 py-2.5 rounded-xl border border-blue-300 bg-white text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-400"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs whitespace-nowrap transition-colors"
                  >
                    Lock In Wish 🌟
                  </button>
                </form>
              ) : (
                <div className="p-4 bg-white/90 rounded-xl border border-blue-200 max-w-md mx-auto text-center">
                  <div className="flex items-center justify-center gap-1.5 text-blue-700 font-bold text-sm mb-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Wish Locked in the Universe!</span>
                  </div>
                  {userWish && (
                    <p className="font-handwriting text-xl text-blue-900">
                      "{userWish}"
                    </p>
                  )}
                  <p className="text-xs text-slate-500 mt-1">
                    I will always be right beside you cheering for every single dream. 💙
                  </p>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </section>
  );
};
