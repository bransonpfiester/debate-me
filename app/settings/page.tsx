'use client';

import { useTheme } from '@/lib/theme-provider';
import Link from 'next/link';

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-[#f0ece4] dark:bg-[#0a0a0a] transition-colors">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[rgba(240,236,228,0.85)] dark:bg-[rgba(10,10,10,0.85)] backdrop-blur-[20px] py-4 transition-colors">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#0a0a0a] dark:bg-[#f0ece4] flex items-center justify-center transition-colors">
              <span className="text-[#f0ece4] dark:text-[#0a0a0a] text-sm transition-colors">→</span>
            </div>
            <span className="font-serif italic text-xl text-[#0a0a0a] dark:text-[#f0ece4] transition-colors">Debate Me</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/feed" className="text-sm text-[#0a0a0a] dark:text-[#f0ece4] hover:opacity-70 transition-opacity">
              Feed
            </Link>
            <Link href="/leaderboard" className="text-sm text-[#0a0a0a] dark:text-[#f0ece4] hover:opacity-70 transition-opacity">
              Leaderboard
            </Link>
            <Link href="/profile" className="text-sm text-[#0a0a0a] dark:text-[#f0ece4] hover:opacity-70 transition-opacity">
              Profile
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="pt-32 pb-20 px-6 max-w-2xl mx-auto">
        <h1 className="font-serif italic text-[64px] tracking-[-2px] leading-[0.95] mb-12 text-[#0a0a0a] dark:text-[#f0ece4] transition-colors">
          Settings.
        </h1>

        {/* Settings Sections */}
        <div className="space-y-8">
          {/* Appearance */}
          <section className="bg-white dark:bg-[#1a1a1a] rounded-[24px] p-8 shadow-sm transition-colors">
            <h2 className="font-sans text-xs uppercase tracking-[2px] text-[#8a8578] dark:text-[#a8a29e] mb-6 transition-colors">
              Appearance
            </h2>
            
            <div className="flex items-center justify-between">
              <div>
                <div className="font-serif italic text-[18px] text-[#0a0a0a] dark:text-[#f0ece4] mb-1 transition-colors">
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
          </section>

          {/* Account (placeholder) */}
          <section className="bg-white dark:bg-[#1a1a1a] rounded-[24px] p-8 shadow-sm transition-colors">
            <h2 className="font-sans text-xs uppercase tracking-[2px] text-[#8a8578] dark:text-[#a8a29e] mb-6 transition-colors">
              Account
            </h2>
            
            <div className="space-y-4 text-sm text-[#8a8578] dark:text-[#a8a29e] transition-colors">
              <div>Email: user@example.com</div>
              <div>Member since: January 2026</div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
