'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ArenaPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [currentRound, setCurrentRound] = useState(1);
  const [userArgument, setUserArgument] = useState('');
  const [debateRounds, setDebateRounds] = useState<Array<{round: number, user: string, ai: string}>>([]);
  const [isAIThinking, setIsAIThinking] = useState(false);

  const wordCount = userArgument.trim().split(/\s+/).filter(w => w).length;
  const maxWords = 150;

  const handleSubmitArgument = async () => {
    if (wordCount === 0 || wordCount > maxWords) return;

    // Add user argument
    setIsAIThinking(true);
    
    // TODO: Call Anthropic Claude API for AI response
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
    
    const aiResponse = "This is a placeholder AI response. The actual implementation will use the Anthropic Claude API to generate intelligent counterdebateRounds.";
    
    setDebateRounds([...debateRounds, {
      round: currentRound,
      user: userArgument,
      ai: aiResponse
    }]);
    
    setUserArgument('');
    setIsAIThinking(false);

    // Move to next round or finish
    if (currentRound < 3) {
      setTimeout(() => {
        setCurrentRound(currentRound + 1);
      }, 1000);
    }
  };

  const handlePublish = () => {
    // TODO: Save debate to database
    router.push(`/debate/${params.id}`);
  };

  const isComplete = currentRound > 3 || debateRounds.length >= 3;

  return (
    <div className="min-h-screen bg-[#f0ece4] py-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Arena Card */}
        <div className="bg-white rounded-[24px] p-12 shadow-lg">
          {/* Header */}
          <div className="flex items-center justify-between mb-12 pb-6 border-b border-[rgba(0,0,0,0.06)]">
            <h2 className="font-serif italic text-2xl max-w-[70%]">
              "Pineapple belongs on pizza."
            </h2>
            <span className="px-4 py-2 bg-[#f0ece4] rounded-full font-sans text-[10px] uppercase tracking-[2px]">
              Round {Math.min(currentRound, 3)} of 3
            </span>
          </div>

          {/* Arguments */}
          <div className="space-y-8 mb-12">
            {debateRounds.map((arg, index) => (
              <div key={index}>
                {/* Round Label */}
                {index === 0 || arg.round !== debateRounds[index - 1].round && (
                  <div className="font-serif italic text-[36px] text-[#8a8578] mb-6 text-center">
                    Round {arg.round}
                  </div>
                )}

                {/* User Argument */}
                <div className="flex justify-start mb-6 animate-fadeInUp">
                  <div className="bg-[rgba(42,92,255,0.08)] border border-[rgba(42,92,255,0.2)] rounded-2xl p-6 max-w-[75%]">
                    <div className="font-sans text-[10px] uppercase tracking-[2px] text-[#2a5cff] mb-3">
                      HUMAN
                    </div>
                    <p className="font-sans font-light text-[15px] leading-relaxed">
                      {arg.user}
                    </p>
                  </div>
                </div>

                {/* AI Argument */}
                <div className="flex justify-end animate-fadeInUp">
                  <div className="bg-[rgba(224,62,54,0.08)] border border-[rgba(224,62,54,0.2)] rounded-2xl p-6 max-w-[75%]">
                    <div className="font-sans text-[10px] uppercase tracking-[2px] text-[#e03e36] mb-3">
                      AI
                    </div>
                    <p className="font-sans font-light text-[15px] leading-relaxed">
                      {arg.ai}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Current Round Preview (if not complete) */}
            {!isComplete && debateRounds.length < currentRound && (
              <div className="text-center">
                <div className="font-serif italic text-[36px] text-[#8a8578] mb-6">
                  Round {currentRound}
                </div>
              </div>
            )}

            {/* AI Thinking */}
            {isAIThinking && (
              <div className="flex justify-end animate-pulse">
                <div className="bg-[rgba(224,62,54,0.08)] border border-[rgba(224,62,54,0.2)] rounded-2xl p-6 max-w-[75%]">
                  <div className="font-sans text-[10px] uppercase tracking-[2px] text-[#e03e36] mb-3">
                    AI
                  </div>
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-[#e03e36] rounded-full animate-bounce" style={{animationDelay: '0ms'}} />
                    <div className="w-2 h-2 bg-[#e03e36] rounded-full animate-bounce" style={{animationDelay: '150ms'}} />
                    <div className="w-2 h-2 bg-[#e03e36] rounded-full animate-bounce" style={{animationDelay: '300ms'}} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          {!isComplete ? (
            <div className="border-t border-[rgba(0,0,0,0.06)] pt-8">
              <textarea
                value={userArgument}
                onChange={(e) => setUserArgument(e.target.value)}
                placeholder="Type your argument..."
                className="w-full h-32 bg-transparent font-sans text-[15px] resize-none focus:outline-none placeholder:text-[#8a8578] mb-4"
                disabled={isAIThinking}
              />
              
              <div className="flex items-center justify-between">
                <span className={`font-sans text-sm ${
                  wordCount > maxWords ? 'text-[#e03e36]' : 'text-[#8a8578]'
                }`}>
                  {wordCount} / {maxWords} words
                </span>
                
                <button
                  onClick={handleSubmitArgument}
                  disabled={wordCount === 0 || wordCount > maxWords || isAIThinking}
                  className="px-8 py-3 bg-[#0a0a0a] text-[#f0ece4] rounded-full font-sans text-sm uppercase tracking-[2px] hover:scale-[1.02] hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)] transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  Submit Argument
                </button>
              </div>
            </div>
          ) : (
            <div className="border-t border-[rgba(0,0,0,0.06)] pt-8 text-center">
              <button
                onClick={handlePublish}
                className="px-12 py-4 bg-[#0a0a0a] text-[#f0ece4] rounded-full font-sans text-sm uppercase tracking-[2px] hover:scale-[1.06] hover:shadow-[0_12px_48px_rgba(0,0,0,0.15)] transition-all duration-300"
              >
                Publish to Feed →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
