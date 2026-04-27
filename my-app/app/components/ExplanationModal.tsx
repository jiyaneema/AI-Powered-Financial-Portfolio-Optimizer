import React from 'react';
import { HiXMark, HiSparkles } from 'react-icons/hi2';

interface ExplanationModalProps {
  isOpen: boolean;
  onClose: () => void;
  explanation: string;
  error?: string;
}

const ExplanationModal: React.FC<ExplanationModalProps> = ({ isOpen, onClose, explanation, error }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-2xl max-h-[85vh] overflow-y-auto glass-card rounded-[2.5rem] border border-white/10 shadow-2xl shadow-black/50 p-8 sm:p-10 animate-fade-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 inline-flex items-center justify-center h-10 w-10 rounded-full bg-slate-900/80 hover:bg-slate-800 transition ring-1 ring-white/10 text-slate-300 hover:text-white"
          aria-label="Close modal"
        >
          <HiXMark className="h-6 w-6" />
        </button>

        {/* Header */}
        <div className="mb-8 flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-400 to-fuchsia-500 text-slate-950 shadow-lg shadow-cyan-500/20">
            <HiSparkles className="h-7 w-7" />
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-white">AI Portfolio Insight</h2>
            <p className="mt-2 text-slate-400">Personalized financial recommendation based on your profile</p>
          </div>
        </div>

        {/* Content */}
        {error ? (
          <div className="rounded-[1.75rem] bg-rose-500/10 border border-rose-500/30 p-6">
            <p className="text-rose-200 leading-7 whitespace-pre-wrap">{error}</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="rounded-[1.75rem] bg-slate-950/80 p-6 border border-slate-700/60 leading-8 text-slate-200 whitespace-pre-wrap">
              {explanation}
            </div>

            {/* Info Box */}
            <div className="rounded-[1.5rem] bg-slate-950/60 border border-slate-700/50 p-5">
              <p className="text-sm text-slate-400">
                <span className="font-semibold text-cyan-300">💡 Tip:</span> Review this recommendation periodically and adjust as your financial situation or goals change.
              </p>
            </div>
          </div>
        )}

        {/* Footer Button */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={onClose}
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/25 transition hover:-translate-y-0.5"
          >
            Got it, thanks!
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExplanationModal;
