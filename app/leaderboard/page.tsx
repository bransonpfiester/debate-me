'use client';

import { useState } from 'react';
import Link from 'next/link';

const CATEGORIES = ['Global', 'This Week', 'Food', 'Tech', 'Philosophy', 'Sports', 'Life'];

const MOCK_LEADERBOARD = [
  { rank: 1, name: 'Sophie', avatar: 'S', color: '#ffd700', elo: 1947, wins: 48, losses: 6, winRate: 89 },
  { rank: 2, name: 'Marcus', avatar: 'M', color: '#c0c0c0', elo: 1892, wins: 42, losses: 8, winRate: 84 },
  { rank: 3, name: 'Priya', avatar: 'P', color: '#cd7f32', elo: 1836, wins: 35, losses: 7, winRate: 83 },
  { rank: 4, name: 'Alex', avatar: 'A', color: '#2a5cff', elo: 1789, wins: 29, losses: 9, winRate: 76 },
  { rank: 5, name: 'Jordan', avatar: 'J', color: '#e03e36', elo: 1734, wins: 26, losses: 11, winRate: 70 },
  { rank: 6, name: 'Taylor', avatar: 'T', color: '#8a8578', elo: 1701, wins: 23, losses: 12, winRate: 66 },
  { rank: 7, name: 'Morgan', avatar: 'M', color: '#2a5cff', elo: 1678, wins: 21, losses: 13, winRate: 62 },
  { rank: 8, name: 'Casey', avatar: 'C', color: '#e03e36', elo: 1645, wins: 19, losses: 14, winRate: 58 },
  { rank: 9, name: 'Riley', avatar: 'R', color: '#8a8578', elo: 1612, wins: 17, losses: 15, winRate: 53 },
  { rank: 10, name: 'Sam', avatar: 'S', color: '#2a5cff', elo: 1589, wins: 15, losses: 16, winRate: 48 }
];

export default function LeaderboardPage() {
  const [activeFilter, setActiveFilter] = useState('Global');

  const getRankColor = (rank: number) => {
    if (rank === 1) return '#ffd700'; // gold
    if (rank === 2) return '#c0c0c0'; // silver
    if (rank === 3) return '#cd7f32'; // bronze
    return '#0a0a0a';
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f0ece4]">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[rgba(10,10,10,0.85)] backdrop-blur-[20px] py-4 border-b border-[rgba(240,236,228,0.06)]">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#f0ece4] flex items-center justify-center">
              <span className="text-[#0a0a0a] text-sm">→</span>
            </div>
            <span className="font-serif italic text-xl">Debate Me</span>
          </Link>
          
          <div className="flex items-center gap-8">
            <Link href="/feed" className="font-sans text-sm opacity-50 hover:opacity-100 transition-opacity">
              Feed
            </Link>
            <Link href="/leaderboard" className="font-sans text-sm opacity-100">
              Leaderboard
            </Link>
            <Link href="/profile" className="font-sans text-sm opacity-50 hover:opacity-100 transition-opacity">
              Profile
            </Link>
          </div>
        </div>
      </nav>

      <div className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
        {/* Header */}
        <h1 className="font-serif italic text-[96px] tracking-[-2px] leading-[0.95] mb-16">
          Rankings.
        </h1>

        {/* Filter Tabs */}
        <div className="flex gap-8 mb-12 border-b border-[rgba(240,236,228,0.06)]">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`font-sans text-sm uppercase tracking-[2px] pb-4 transition-all ${
                activeFilter === cat
                  ? 'text-[#f0ece4] border-b-2 border-[#f0ece4]'
                  : 'text-[rgba(240,236,228,0.4)] hover:text-[rgba(240,236,228,0.7)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Leaderboard Table */}
        <div className="space-y-1">
          {MOCK_LEADERBOARD.map((user, index) => (
            <div
              key={index}
              className="flex items-center gap-8 py-6 px-6 rounded-lg hover:bg-[rgba(255,255,255,0.04)] transition-all duration-300 reveal"
              style={{
                backgroundColor: user.rank === 4 ? 'rgba(42,92,255,0.05)' : 'transparent'
              }}
            >
              {/* Rank */}
              <div
                className="font-serif italic text-2xl w-12"
                style={{ color: getRankColor(user.rank) }}
              >
                {user.rank}.
              </div>

              {/* Avatar */}
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm"
                style={{ backgroundColor: user.color }}
              >
                {user.avatar}
              </div>

              {/* Name */}
              <div className="font-sans flex-1">{user.name}</div>

              {/* Elo */}
              <div className="font-serif italic text-xl w-24 text-right">{user.elo}</div>

              {/* Record */}
              <div className="font-sans text-[rgba(240,236,228,0.5)] w-32 text-right hidden md:block">
                {user.wins}W – {user.losses}L
              </div>

              {/* Win Rate */}
              <div className="font-sans w-16 text-right hidden md:block">{user.winRate}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
