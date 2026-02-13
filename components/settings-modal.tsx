'use client';

import { useTheme } from '@/lib/theme-provider';
import { useEffect } from 'react';

export function SettingsModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-[#f0ece4] dark:bg-[#0a0a0a] rounded-[24px] p-8 max-w-md w-full mx-4 shadow-2xl transition-colors">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif italic text-[32px] text-[#0a0a0a] dark:text-[#f0ece4] transition-colors">
            Settings
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[rgba(0,0,0,0.05)] dark:bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(0,0,0,0.1)] dark:hover:bg-[rgba(255,255,255,0.1)] flex items-center justify-center transition-colors"
          >
            <span className="text-[#0a0a0a] dark:text-[#f0ece4] text-xl transition-colors">×</span>
          </button>
        </div>

        {/* Dark Mode Toggle */}
        <div className="bg-white dark:bg-[#1a1a1a] rounded-[16px] p-6 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-serif italic text-[16px] text-[#0a0a0a] dark:text-[#f0ece4] mb-1 transition-colors">
                Dark Mode
              </div>
              <div className="text-sm text-[#8a8578] dark:text-[#a8a29e] transition-colors">
                Toggle dark theme
              </div>
            </div>

            <button
              onClick={toggleTheme}
              className={`relative w-14 h-8 rounded-full transition-colors ${
                theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-[#e5e1d8]'
              }`}
            >
              <div
                className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white dark:bg-[#f0ece4] transition-transform ${
                  theme === 'dark' ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
