import React, { useState } from 'react';
import { X, Sparkles, Check, RotateCcw, Printer } from 'lucide-react';
import { BirthdayProfile } from '../types';
import gabRealPhoto from '../assets/images/gab_real_birthday_photo_1787494906135.jpg';

interface PersonalizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: BirthdayProfile;
  onSaveProfile: (profile: BirthdayProfile) => void;
  onResetProfile: () => void;
  onOpenKeepsakePrint: () => void;
}

export const PersonalizeModal: React.FC<PersonalizeModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSaveProfile,
  onResetProfile,
  onOpenKeepsakePrint,
}) => {
  const [formData, setFormData] = useState<BirthdayProfile>(profile);
  const [saveToast, setSaveToast] = useState(false);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setFormData((prev) => ({
            ...prev,
            heroImageUrl: event.target?.result as string,
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(formData);
    setSaveToast(true);
    setTimeout(() => {
      setSaveToast(false);
      onClose();
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-blue-100 max-h-[90vh] overflow-y-auto">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-blue-100 pb-4 mb-6">
          <div>
            <h3 className="font-heading font-bold text-xl sm:text-2xl text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-500" />
              Customize Birthday Greeting
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Personalize names, photo, and message for Pogi.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Names Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                Boyfriend's Name
              </label>
              <input
                type="text"
                value={formData.boyfriendName}
                onChange={(e) => setFormData({ ...formData, boyfriendName: e.target.value })}
                required
                className="w-full px-3 py-2 border border-blue-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                Cute Nickname
              </label>
              <input
                type="text"
                value={formData.nickname}
                onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
                className="w-full px-3 py-2 border border-blue-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                Your Name / Signature
              </label>
              <input
                type="text"
                value={formData.senderName}
                onChange={(e) => setFormData({ ...formData, senderName: e.target.value })}
                required
                className="w-full px-3 py-2 border border-blue-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          {/* Photo */}
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-2">
              Featured Birthday Photo
            </label>
            <div className="flex flex-col sm:flex-row gap-3 items-center">
              <div className="w-20 h-20 rounded-xl overflow-hidden border-2 border-blue-300 shrink-0 bg-slate-900">
                <img src={formData.heroImageUrl} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 w-full space-y-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="block w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
                />
                <input
                  type="text"
                  value={formData.heroImageCaption}
                  onChange={(e) => setFormData({ ...formData, heroImageCaption: e.target.value })}
                  placeholder="Photo caption..."
                  className="w-full px-3 py-1.5 border border-blue-200 rounded-lg text-xs"
                />
              </div>
            </div>
          </div>

          {/* Main Quote */}
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
              Highlighted Quote
            </label>
            <input
              type="text"
              value={formData.mainQuote}
              onChange={(e) => setFormData({ ...formData, mainQuote: e.target.value })}
              className="w-full px-3 py-2 border border-blue-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-400 font-sans"
            />
          </div>

          {/* Sweet Message */}
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
              Full Birthday Message Paragraph
            </label>
            <textarea
              value={formData.sweetMessage}
              onChange={(e) => setFormData({ ...formData, sweetMessage: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-blue-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-400 font-sans"
            />
          </div>

          {/* Modal Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-blue-100">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onResetProfile}
                className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 flex items-center gap-1 transition-colors"
                title="Reset to default messages"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Defaults
              </button>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenKeepsakePrint();
                }}
                className="px-3 py-2 rounded-xl text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 flex items-center gap-1 transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                Print Keepsake Card
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                {saveToast ? 'Saved!' : 'Save Changes'}
              </button>
            </div>
          </div>
        </form>

      </div>
    </div>
  );
};
