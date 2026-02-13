'use client';

import Link from 'next/link';

const MOCK_USER = {
  name: 'Sarah',
  avatar: 'S',
  color: '#2a5cff',
  elo: 1847,
  wins: 24,
  losses: 3,
  totalDebates: 27,
  winRate: 89,
  bestStreak: 12,
  totalVotes: 2140
};

const BADGES = [
  { id: 1, name: 'First Blood', emoji: '⚔️', earned: true },
  { id: 2, name: 'On Fire', emoji: '🔥', earned: true },
  { id: 3, name: 'AI Slayer', emoji: '🤖', earned: true },
  { id: 4, name: 'Crowd Favorite', emoji: '👑', earned: false },
  { id: 5, name: 'Philosopher', emoji: '🧠', earned: false }
];

const DEBATE_HISTORY = [
  {
    id: 1,
    take: 'Remote work is killing company culture and innovation.',
    category: 'Tech',
    votes: { human: 64, ai: 36 },
    result: 'won',
    timeAgo: '2h ago'
  },
  {
    id: 2,
    take: 'College is a scam in 2026.',
    category: 'Education',
    votes: { human: 41, ai: 59 },
    result: 'lost',
    timeAgo: '1d ago'
  },
  {
    id: 3,
    take: 'Expensive coffee is worth every penny.',
    category: 'Food',
    votes: { human: 73, ai: 27 },
    result: 'won',
    timeAgo: '3d ago'
  }
];

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-[#f0ece4]">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[rgba(240,236,228,0.85)] backdrop-blur-[20px] py-4">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#0a0a0a] flex items-center justify-center">
              <span className="text-[#f0ece4] text-sm">→</span>
            </div>
            <span className="font-serif italic text-xl">Debate Me</span>
          </Link>
          
          <div className="flex items-center gap-8">
            <Link href="/feed" className="font-sans text-sm opacity-50 hover:opacity-100 transition-opacity">
              Feed
            </Link>
            <Link href="/leaderboard" className="font-sans text-sm opacity-50 hover:opacity-100 transition-opacity">
              Leaderboard
            </Link>
            <Link href="/profile" className="font-sans text-sm opacity-100">
              Profile
            </Link>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-20 px-6 max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-8 mb-16">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl"
            style={{ backgroundColor: MOCK_USER.color }}
          >
            {MOCK_USER.avatar}
          </div>
          
          <div>
            <h1 className="font-sans font-medium text-2xl mb-2">{MOCK_USER.name}</h1>
            <div>
              <div className="font-sans text-[10px] uppercase tracking-[2px] text-[#8a8578] mb-1">
                ELO
              </div>
              <div className="font-serif italic text-[48px] leading-none tracking-[-2px]">
                {MOCK_USER.elo}
              </div>
            </div>
            <div className="font-sans text-sm text-[#8a8578] mt-2">
              {MOCK_USER.wins}W – {MOCK_USER.losses}L
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-4 gap-px bg-[rgba(0,0,0,0.06)] rounded-[24px] overflow-hidden mb-16">
          <div className="bg-white p-8 text-center">
            <div className="font-serif italic text-[28px] mb-2">{MOCK_USER.totalDebates}</div>
            <div className="font-sans text-[10px] uppercase tracking-[2px] text-[#8a8578]">
              Total Debates
            </div>
          </div>
          
          <div className="bg-white p-8 text-center">
            <div className="font-serif italic text-[28px] mb-2">{MOCK_USER.winRate}%</div>
            <div className="font-sans text-[10px] uppercase tracking-[2px] text-[#8a8578]">
              Win Rate
            </div>
          </div>
          
          <div className="bg-white p-8 text-center">
            <div className="font-serif italic text-[28px] mb-2">{MOCK_USER.bestStreak} 🔥</div>
            <div className="font-sans text-[10px] uppercase tracking-[2px] text-[#8a8578]">
              Best Streak
            </div>
          </div>
          
          <div className="bg-white p-8 text-center">
            <div className="font-serif italic text-[28px] mb-2">{MOCK_USER.totalVotes}</div>
            <div className="font-sans text-[10px] uppercase tracking-[2px] text-[#8a8578]">
              Total Votes
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="mb-16">
          <h2 className="font-serif italic text-[36px] tracking-[-1px] mb-8">Badges</h2>
          
          <div className="flex gap-8">
            {BADGES.map((badge) => (
              <div
                key={badge.id}
                className={`text-center transition-opacity ${
                  badge.earned ? 'opacity-100' : 'opacity-20'
                }`}
              >
                <div className="text-4xl mb-2 relative">
                  {badge.emoji}
                  {!badge.earned && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg">🔒</span>
                    </div>
                  )}
                </div>
                <div className="font-sans text-[10px] uppercase tracking-[2px] text-[#8a8578]">
                  {badge.name}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Debate History */}
        <div>
          <h2 className="font-serif italic text-[36px] tracking-[-1px] mb-8">History</h2>
          
          <div className="space-y-4">
            {DEBATE_HISTORY.map((debate) => (
              <Link
                key={debate.id}
                href={`/debate/${debate.id}`}
                className="block bg-white rounded-[24px] p-8 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-8">
                  <div className="flex-1">
                    <p className="font-serif italic text-[18px] leading-[1.3] mb-4">
                      "{debate.take}"
                    </p>
                    
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
                    
                    <div className="flex items-center gap-4 text-sm text-[#8a8578] font-sans">
                      <span>{debate.votes.human}% Human</span>
                      <span>{debate.votes.ai}% AI</span>
                      <span>{debate.timeAgo}</span>
                    </div>
                  </div>
                  
                  <div>
                    <span className={`px-4 py-2 rounded-full font-sans text-xs uppercase tracking-[2px] ${
                      debate.result === 'won'
                        ? 'bg-[rgba(42,92,255,0.1)] text-[#2a5cff]'
                        : 'bg-[rgba(224,62,54,0.1)] text-[#e03e36]'
                    }`}>
                      {debate.result}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
