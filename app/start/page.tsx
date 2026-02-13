'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const CATEGORIES = ['Food', 'Tech', 'Philosophy', 'Sports', 'Life', 'Education', 'Pop Culture'];

export default function StartDebatePage() {
  const [take, setTake] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const router = useRouter();

  const handleSubmit = () => {
    if (!take.trim() || !selectedCategory) return;
    
    // TODO: Create debate in database
    router.push('/arena/1'); // Navigate to arena with debate ID
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
        </div>
      </nav>

      {/* Content */}
      <div className="pt-32 pb-20 px-6 max-w-2xl mx-auto">
        <h1 className="font-serif italic text-[64px] tracking-[-2px] leading-[0.95] mb-12 text-center">
          Drop your take.
        </h1>

        {/* Take Input */}
        <div className="bg-white rounded-[24px] p-8 shadow-sm mb-8">
          <textarea
            value={take}
            onChange={(e) => setTake(e.target.value)}
            placeholder="Pineapple belongs on pizza..."
            className="w-full h-32 bg-transparent font-serif italic text-[18px] resize-none focus:outline-none placeholder:text-[#8a8578]"
          />
          <div className="text-right text-sm text-[#8a8578] font-sans">
            {take.length} / 200 characters
          </div>
        </div>

        {/* Category Pills */}
        <div className="mb-8">
          <div className="font-sans text-xs uppercase tracking-[2px] text-[#8a8578] mb-4">
            Pick a category
          </div>
          <div className="flex flex-wrap gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-3 rounded-full font-sans text-sm uppercase tracking-[2px] border transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#0a0a0a] text-[#f0ece4] border-[#0a0a0a]'
                    : 'bg-white text-[#0a0a0a] border-[rgba(0,0,0,0.1)] hover:border-[#0a0a0a]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Daily Prompt Link */}
        <div className="text-center mb-12">
          <Link
            href="/start?prompt=college"
            className="font-sans text-sm text-[#8a8578] hover:text-[#0a0a0a] transition-colors"
          >
            Or use today's prompt →
          </Link>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={!take.trim() || !selectedCategory}
          className="w-full py-5 bg-[#0a0a0a] text-[#f0ece4] rounded-full font-sans text-sm uppercase tracking-[2px] hover:scale-[1.02] hover:shadow-[0_12px_48px_rgba(0,0,0,0.15)] transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
        >
          Enter the Arena →
        </button>
      </div>
    </div>
  );
}
