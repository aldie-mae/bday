import React from 'react';
import { X, Printer, Heart, Sparkles } from 'lucide-react';
import { BirthdayProfile } from '../types';

interface KeepsakeCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: BirthdayProfile;
}

export const KeepsakeCardModal: React.FC<KeepsakeCardModalProps> = ({
  isOpen,
  onClose,
  profile,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl my-8">
        
        {/* Action Controls - hidden during print */}
        <div className="no-print flex items-center justify-between border-b border-blue-100 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-500" />
            <h3 className="font-heading font-bold text-lg text-slate-800">
              Printable Birthday Keepsake Card
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-4 h-4" />
              Print / Save PDF
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Card Area */}
        <div className="print-page border-4 border-dashed border-blue-300 rounded-2xl p-6 sm:p-8 bg-gradient-to-b from-blue-50/70 via-sky-50/50 to-indigo-50/40 text-center relative overflow-hidden">
          {/* Decorative Corner Icons */}
          <div className="absolute top-2 left-2 text-blue-300 text-xl select-none">💙</div>
          <div className="absolute top-2 right-2 text-sky-300 text-xl select-none">✨</div>
          <div className="absolute bottom-2 left-2 text-blue-300 text-xl select-none">🎉</div>
          <div className="absolute bottom-2 right-2 text-sky-300 text-xl select-none">🎂</div>

          {/* Card Photo Frame */}
          <div className="w-48 h-48 sm:w-56 sm:h-56 mx-auto rounded-2xl overflow-hidden border-4 border-blue-400 shadow-md mb-4 bg-slate-900">
            <img
              src={profile.heroImageUrl}
              alt="Pogi in silly birthday hat"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          <h2 className="font-display text-2xl sm:text-3xl text-blue-600 mb-2">
            Happy Birthday, {profile.boyfriendName}! 🎂💙
          </h2>

          <p className="font-handwriting text-2xl sm:text-3xl text-blue-950 leading-snug max-w-md mx-auto mb-4">
            "{profile.mainQuote}"
          </p>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md mx-auto mb-6">
            {profile.sweetMessage}
          </p>

          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white border border-blue-200 shadow-xs text-xs text-blue-700 font-bold">
            <Heart className="w-3.5 h-3.5 fill-blue-500 text-blue-500" />
            <span>With all my love forever, {profile.senderName}</span>
          </div>
        </div>

        <p className="no-print text-center text-xs text-slate-400 mt-4">
          Tip: You can print this directly or save as a PDF for a physical keepsake card!
        </p>

      </div>
    </div>
  );
};
