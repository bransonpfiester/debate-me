'use client';

import { useState } from 'react';
import Link from 'next/link';

// Mock data
const MOCK_DEBATE = {
  id: 1,
  user: { name: 'Sarah', avatar: 'S', color: '#2a5cff' },
  take: 'Remote work is killing company culture and innovation.',
  category: 'Tech',
  timeAgo: '2h ago',
  rounds: [
    {
      round: 1,
      user: "When everyone works from home, spontaneous brainstorming sessions disappear. You can't replicate the energy of a physical room in a Zoom call. Innovation requires collision, not isolation.",
      ai: "But remote work enables companies to hire globally, accessing talent they'd never reach otherwise. The best ideas don't come from water cooler chat—they come from diverse perspectives that remote work makes possible."
    },
    {
      round: 2,
      user: "Culture is built through shared experiences. How do you onboard a new hire remotely? How do they absorb the company's values through a screen? It's impossible.",
      ai: "Many remote-first companies have stronger cultures than traditional offices. They're forced to be intentional about culture-building rather than assuming proximity creates connection. Async communication can actually deepen relationships."
    },
    {
      round: 3,
      user: "Sure, async works for some things. But when you need to move fast, nothing beats being in the same room. Speed and agility suffer when your team is scattered across time zones.",
      ai: "Yet remote companies like GitLab and Zapier move faster than most in-office competitors. They've proven that documented processes and clear communication beat hallway conversations. The issue isn't location—it's execution."
    }
  ],
  votes: { human: 64, ai: 36 },
  totalVotes: 247
};

const MOCK_COMMENTS = [
  { user: 'Marcus', avatar: 'M', color: '#e03e36', text: 'Round 2 was the turning point for me. Human made a strong case.' },
  { user: 'Priya', avatar: 'P', color: '#8a8578', text: 'AI destroyed this. The GitLab example sealed it.' }
];

export default function DebateViewPage({ params }: { params: { id: string } }) {
  const [hasVoted, setHasVoted] = useState(false);
  const [userVote, setUserVote] = useState<'human' | 'ai' | null>(null);
  const [comment, setComment] = useState('');

  const handleVote = (vote: 'human' | 'ai') => {
    setUserVote(vote);
    setHasVoted(true);
    // TODO: Save vote to database
  };

  const handleAddComment = () => {
    if (!comment.trim()) return;
    // TODO: Save comment to database
    setComment('');
  };

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
            <Link href="/profile" className="font-sans text-sm opacity-50 hover:opacity-100 transition-opacity">
              Profile
            </Link>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-20 px-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12 pb-8 border-b border-[rgba(0,0,0,0.06)]">
          <h1 className="font-serif italic text-[48px] leading-[1.1] tracking-[-2px] mb-6">
            "{MOCK_DEBATE.take}"
          </h1>
          
          <div className="flex items-center gap-4 text-[#8a8578] font-sans text-sm">
            <div className="flex items-center gap-2">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs"
                style={{ backgroundColor: MOCK_DEBATE.user.color }}
              >
                {MOCK_DEBATE.user.avatar}
              </div>
              <span>{MOCK_DEBATE.user.name}</span>
            </div>
            <span>vs AI</span>
            <span className="px-3 py-1 bg-[#f0ece4] rounded-full text-[10px] uppercase tracking-[2px]">
              {MOCK_DEBATE.category}
            </span>
            <span>{MOCK_DEBATE.timeAgo}</span>
          </div>
        </div>

        {/* Debate Content */}
        <div className="space-y-16 mb-16">
          {MOCK_DEBATE.rounds.map((round) => (
            <div key={round.round}>
              <div className="font-serif italic text-[24px] text-[#8a8578] mb-8 text-center">
                Round {round.round}
              </div>

              {/* User Argument */}
              <div className="flex justify-start mb-8">
                <div className="bg-[rgba(42,92,255,0.08)] border border-[rgba(42,92,255,0.2)] rounded-2xl p-6 max-w-[75%]">
                  <div className="font-sans text-[10px] uppercase tracking-[2px] text-[#2a5cff] mb-3">
                    HUMAN
                  </div>
                  <p className="font-sans font-light text-[15px] leading-relaxed">
                    {round.user}
                  </p>
                </div>
              </div>

              {/* AI Argument */}
              <div className="flex justify-end">
                <div className="bg-[rgba(224,62,54,0.08)] border border-[rgba(224,62,54,0.2)] rounded-2xl p-6 max-w-[75%]">
                  <div className="font-sans text-[10px] uppercase tracking-[2px] text-[#e03e36] mb-3">
                    AI
                  </div>
                  <p className="font-sans font-light text-[15px] leading-relaxed">
                    {round.ai}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Voting Section */}
        <div className="bg-white rounded-[24px] p-12 shadow-sm mb-12">
          <h3 className="font-serif italic text-[24px] mb-8 text-center">
            Who won this debate?
          </h3>

          {!hasVoted ? (
            <div className="flex gap-6">
              <button
                onClick={() => handleVote('human')}
                className="flex-1 py-5 border-2 border-[#2a5cff] text-[#2a5cff] rounded-full font-sans text-sm uppercase tracking-[2px] hover:bg-[rgba(42,92,255,0.05)] transition-all"
              >
                Human won
              </button>
              <button
                onClick={() => handleVote('ai')}
                className="flex-1 py-5 border-2 border-[#e03e36] text-[#e03e36] rounded-full font-sans text-sm uppercase tracking-[2px] hover:bg-[rgba(224,62,54,0.05)] transition-all"
              >
                AI won
              </button>
            </div>
          ) : (
            <div>
              <div className="h-[6px] bg-[#f0ece4] rounded-full overflow-hidden mb-4">
                <div
                  className="vote-bar-inner h-full rounded-full animate"
                  style={{
                    background: `linear-gradient(90deg, #2a5cff 0%, #2a5cff ${MOCK_DEBATE.votes.human}%, transparent ${MOCK_DEBATE.votes.human}%, transparent ${MOCK_DEBATE.votes.human + 1}%, #e03e36 ${MOCK_DEBATE.votes.human + 1}%, #e03e36 100%)`
                  }}
                />
              </div>
              
              <div className="flex justify-between text-sm font-sans mb-2">
                <span className={userVote === 'human' ? 'text-[#2a5cff] font-medium' : 'text-[#8a8578]'}>
                  {MOCK_DEBATE.votes.human}% Human
                </span>
                <span className={userVote === 'ai' ? 'text-[#e03e36] font-medium' : 'text-[#8a8578]'}>
                  {MOCK_DEBATE.votes.ai}% AI
                </span>
              </div>
              
              <div className="text-center text-sm text-[#8a8578] font-sans">
                {MOCK_DEBATE.totalVotes} total votes
              </div>
            </div>
          )}
        </div>

        {/* Comments */}
        <div className="bg-white rounded-[24px] p-12 shadow-sm">
          <h3 className="font-serif italic text-[24px] mb-8">Comments</h3>

          <div className="space-y-6 mb-8">
            {MOCK_COMMENTS.map((c, i) => (
              <div key={i} className="flex gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm flex-shrink-0"
                  style={{ backgroundColor: c.color }}
                >
                  {c.avatar}
                </div>
                <div className="flex-1">
                  <div className="font-sans font-medium text-sm mb-1">{c.user}</div>
                  <p className="font-sans font-light text-sm text-[#8a8578]">{c.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Add Comment */}
          <div className="border-t border-[rgba(0,0,0,0.06)] pt-6">
            <input
              type="text"
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
              className="w-full bg-transparent border-b border-[rgba(0,0,0,0.1)] pb-3 font-sans text-sm focus:outline-none focus:border-[#0a0a0a] transition-colors"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
