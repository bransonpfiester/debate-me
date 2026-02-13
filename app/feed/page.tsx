'use client';

import { useState } from 'react';
import Link from 'next/link';

const CATEGORIES = ['All', 'Trending', 'Biggest Upsets', 'Food', 'Tech', 'Philosophy', 'Sports', 'Life'];

const MOCK_DEBATES = [
  {
    id: 1,
    user: { name: 'Sarah', avatar: 'S', color: '#2a5cff' },
    take: 'Remote work is killing company culture and innovation.',
    category: 'Tech',
    votes: { human: 64, ai: 36 },
    totalVotes: 247,
    timeAgo: '2h ago'
  },
  {
    id: 2,
    user: { name: 'Marcus', avatar: 'M', color: '#e03e36' },
    take: 'Expensive coffee is a complete waste of money.',
    category: 'Food',
    votes: { human: 43, ai: 57 },
    totalVotes: 189,
    timeAgo: '5h ago'
  },
  {
    id: 3,
    user: { name: 'Priya', avatar: 'P', color: '#8a8578' },
    take: 'Philosophy should be a required subject in all schools.',
    category: 'Philosophy',
    votes: { human: 71, ai: 29 },
    totalVotes: 312,
    timeAgo: '8h ago'
  }
];

export default function FeedPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [showPrompt, setShowPrompt] = useState(true);

  return (
    <div className="min-h-screen bg-[#f0ece4]">
      {/* Nav - reused from landing */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[rgba(240,236,228,0.85)] backdrop-blur-[20px] py-4">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#0a0a0a] flex items-center justify-center">
              <span className="text-[#f0ece4] text-sm">→</span>
            </div>
            <span className="font-serif italic text-xl">Debate Me</span>
          </Link>
          
          <div className="flex items-center gap-8">
            <Link href="/feed" className="font-sans text-sm opacity-100">
              Feed
            </Link>
            <Link href="/leaderboard" className="font-sans text-sm opacity-50 hover:opacity-100 transition-opacity">
              Leaderboard
            </Link>
            <Link href="/profile" className="font-sans text-sm opacity-50 hover:opacity-100 transition-opacity">
              Profile
            </Link>
            <Link 
              href="/start" 
              className="px-4 py-2 bg-[#0a0a0a] text-[#f0ece4] rounded-full text-xs uppercase tracking-[2px] hover:scale-105 transition-transform"
            >
              Start Debate
            </Link>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-20 px-6 max-w-4xl mx-auto">
        {/* Daily Prompt Banner */}
        {showPrompt && (
          <div className="bg-white rounded-[24px] p-8 mb-12 shadow-sm border border-[rgba(0,0,0,0.06)] flex items-center justify-between">
            <div className="flex-1">
              <div className="font-serif italic text-xs uppercase tracking-[2px] text-[#8a8578] mb-2">
                Today's Prompt
              </div>
              <p className="font-serif italic text-[24px] tracking-[-1px]">
                Is college still worth it in 2026?
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link 
                href="/start?prompt=college"
                className="font-sans text-xs uppercase tracking-[2px] text-[#0a0a0a] hover:underline"
              >
                Debate This →
              </Link>
              <button
                onClick={() => setShowPrompt(false)}
                className="w-6 h-6 rounded-full hover:bg-[rgba(0,0,0,0.05)] flex items-center justify-center transition-colors"
              >
                <span className="text-[#8a8578]">×</span>
              </button>
            </div>
          </div>
        )}

        {/* Filter Tabs */}
        <div className="flex gap-6 mb-12 overflow-x-auto pb-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`font-sans text-[11px] uppercase tracking-[2px] whitespace-nowrap pb-2 transition-all ${
                activeFilter === cat
                  ? 'text-[#0a0a0a] border-b-2 border-[#0a0a0a]'
                  : 'text-[#8a8578] hover:text-[#0a0a0a]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Debate Cards */}
        <div className="space-y-6">
          {MOCK_DEBATES.map((debate) => (
            <Link
              key={debate.id}
              href={`/debate/${debate.id}`}
              className="block bg-white rounded-[24px] p-8 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
            >
              {/* Top Row */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white font-sans text-sm"
                    style={{ backgroundColor: debate.user.color }}
                  >
                    {debate.user.avatar}
                  </div>
                  <span className="font-sans text-sm">{debate.user.name}</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-[#f0ece4] rounded-full font-sans text-[10px] uppercase tracking-[2px]">
                    vs AI
                  </span>
                  <span className="px-3 py-1 bg-[#f0ece4] rounded-full font-sans text-[10px] uppercase tracking-[2px]">
                    {debate.category}
                  </span>
                </div>
              </div>

              {/* Take */}
              <p className="font-serif italic text-[22px] leading-[1.3] tracking-[-0.5px] mb-6">
                "{debate.take}"
              </p>

              {/* Vote Bar */}
              <div className="mb-3">
                <div className="h-[6px] bg-[#f0ece4] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${debate.votes.human}%`,
                      background: `linear-gradient(90deg, #2a5cff 0%, #2a5cff ${debate.votes.human}%, transparent ${debate.votes.human}%, transparent ${debate.votes.human + 1}%, #e03e36 ${debate.votes.human + 1}%, #e03e36 100%)`
                    }}
                  />
                </div>
              </div>

              {/* Meta */}
              <div className="flex items-center justify-between text-sm text-[#8a8578] font-sans">
                <div className="flex items-center gap-4">
                  <span>{debate.votes.human}% Human</span>
                  <span>{debate.votes.ai}% AI</span>
                </div>
                <div className="flex items-center gap-4">
                  <span>{debate.totalVotes} votes</span>
                  <span>{debate.timeAgo}</span>
                </div>
              </div>

              <div className="mt-4 font-sans text-xs uppercase tracking-[2px] text-[#0a0a0a] hover:underline">
                Read debate →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
