'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export default function LandingPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    let frame = 0;
    const ringCount = 70;
    const centerX = canvas.width * 0.62;
    const centerY = canvas.height * 0.32;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < ringCount; i++) {
        const progress = i / ringCount;
        const baseRadius = 20 + i * 15;
        
        // Wobble calculation
        const wobbleAmount = progress * 8;
        const wobbleX = Math.sin(frame * 0.02 + i * 0.3) * wobbleAmount;
        const wobbleY = Math.cos(frame * 0.02 + i * 0.2) * wobbleAmount;
        
        const x = centerX + wobbleX;
        const y = centerY + wobbleY;
        const radiusX = baseRadius;
        const radiusY = baseRadius * 0.82; // Ellipse ratio
        const rotation = (frame * 0.001 + i * 0.02) % (Math.PI * 2);
        
        // HSL color cycling
        const hue = (180 + i * 4.5 + frame * 0.1) % 360;
        const saturation = 15 + progress * 30; // 15% → 45%
        const lightness = 78 - progress * 18; // 78% → 60%
        const opacity = 0.08 + progress * 0.22; // 0.08 → 0.30
        
        ctx.strokeStyle = `hsla(${hue}, ${saturation}%, ${lightness}%, ${opacity})`;
        ctx.lineWidth = 1.1;
        
        ctx.beginPath();
        ctx.ellipse(x, y, radiusX, radiusY, rotation, 0, Math.PI * 2);
        ctx.stroke();
      }
      
      frame++;
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  useEffect(() => {
    // Scroll reveal animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const siblings = Array.from(entry.target.parentElement?.children || []);
            const index = siblings.indexOf(entry.target);
            
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, index * 120);
          }
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    document.querySelectorAll('.stagger-text').forEach((el) => observer.observe(el));

    // Vote bar animation
    const voteBarObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      },
      { threshold: 0.3 }
    );

    document.querySelectorAll('.vote-bar-inner').forEach((el) => voteBarObserver.observe(el));

    return () => {
      observer.disconnect();
      voteBarObserver.disconnect();
    };
  }, []);

  return (
    <main className="relative bg-[#f0ece4] text-[#0a0a0a]">
      {/* Nav */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        isScrolled 
          ? 'bg-[rgba(240,236,228,0.85)] backdrop-blur-[20px] py-4' 
          : 'bg-transparent py-7'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#0a0a0a] flex items-center justify-center">
              <span className="text-[#f0ece4] text-sm">→</span>
            </div>
            <span className="font-serif italic text-xl">Debate Me</span>
          </div>
          
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
            <Link 
              href="/start" 
              className="px-4 py-2 bg-[#0a0a0a] text-[#f0ece4] rounded-full text-xs uppercase tracking-[2px] hover:scale-105 transition-transform"
            >
              Start Debate
            </Link>
          </div>
        </div>
      </nav>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none"
        />
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h1 className="font-serif italic text-[140px] leading-[0.92] tracking-[-2px] mb-8 reveal">
            Debate Me.
          </h1>
          <p className="font-sans font-light text-xl text-[#8a8578] max-w-[480px] mx-auto reveal">
            Argue with AI. Let the internet decide who won.
          </p>
          <button className="mt-12 px-8 py-4 bg-[#0a0a0a] text-[#f0ece4] rounded-full font-sans text-sm uppercase tracking-[2px] hover:scale-[1.06] hover:shadow-[0_12px_48px_rgba(0,0,0,0.15)] transition-all duration-300 reveal">
            Enter the Arena →
          </button>
        </div>
      </section>

      {/* Stagger Section */}
      <section className="py-[200px] px-6 max-w-6xl mx-auto">
        <h2 className="text-[72px] font-serif italic leading-[1.05] tracking-[-2px] text-left mb-[200px] stagger-text">
          You argue your <span className="text-[#2a5cff]">point</span>.
        </h2>
        <h2 className="text-[72px] font-serif italic leading-[1.05] tracking-[-2px] text-right stagger-text">
          AI argues <span className="text-[#e03e36]">back</span>.
        </h2>
      </section>

      {/* About Section */}
      <section className="py-[160px] px-6 max-w-[640px] mx-auto">
        <p className="font-sans font-light text-lg leading-relaxed text-[#8a8578] reveal">
          Every debate is three rounds. You and AI trade arguments. When it's over, 
          the internet votes. Your Elo rating rises or falls. Simple as that.
        </p>
      </section>

      {/* Principles Section (Dark) */}
      <section className="bg-[#0a0a0a] text-[#f0ece4] py-[160px] px-6">
        <div className="max-w-6xl mx-auto">
          <h3 className="font-serif italic text-[64px] tracking-[-2px] mb-20 reveal">
            Principles.
          </h3>
          
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { num: '01', title: 'No moderation', desc: 'Say what you think. We don't police opinions.' },
              { num: '02', title: 'Pure merit', desc: 'Arguments win, not credentials or followers.' },
              { num: '03', title: 'Radical transparency', desc: 'Every vote, every argument, fully public.' }
            ].map((principle) => (
              <div key={principle.num} className="reveal">
                <div className="font-serif italic text-[48px] text-[rgba(240,236,228,0.4)] mb-4">
                  {principle.num}.
                </div>
                <h4 className="font-sans font-medium text-xl mb-3">
                  {principle.title}
                </h4>
                <p className="font-sans font-light text-[rgba(240,236,228,0.5)]">
                  {principle.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Arena Preview */}
      <section className="py-[160px] px-6">
        <div className="max-w-4xl mx-auto bg-white rounded-[24px] p-12 shadow-lg reveal hover:bg-[rgba(0,0,0,0.01)] transition-all duration-300">
          <div className="flex items-center justify-between mb-8">
            <h4 className="font-serif italic text-2xl">
              "Pineapple belongs on pizza."
            </h4>
            <span className="px-4 py-2 bg-[#f0ece4] rounded-full text-[10px] uppercase tracking-[2px]">
              Round 1 of 3
            </span>
          </div>

          <div className="space-y-6">
            <div className="flex justify-start">
              <div className="bg-[rgba(42,92,255,0.08)] border border-[rgba(42,92,255,0.2)] rounded-2xl p-4 max-w-[70%]">
                <div className="text-[10px] uppercase tracking-[2px] text-[#2a5cff] mb-2">
                  HUMAN
                </div>
                <p className="font-sans font-light">
                  The sweet and savory contrast is what makes it work...
                </p>
              </div>
            </div>

            <div className="flex justify-end">
              <div className="bg-[rgba(224,62,54,0.08)] border border-[rgba(224,62,54,0.2)] rounded-2xl p-4 max-w-[70%]">
                <div className="text-[10px] uppercase tracking-[2px] text-[#e03e36] mb-2">
                  AI
                </div>
                <p className="font-sans font-light">
                  But the moisture from pineapple ruins the crust texture...
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <div className="h-[6px] bg-[#f0ece4] rounded-full overflow-hidden">
              <div 
                className="vote-bar-inner h-full rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #2a5cff 0%, #2a5cff 52%, transparent 52%, transparent 53%, #e03e36 53%, #e03e36 100%)'
                }}
              />
            </div>
            <div className="flex justify-between mt-2 text-[#8a8578] text-sm font-sans">
              <span>52% Human</span>
              <span>48% AI</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-[160px] px-6 max-w-6xl mx-auto">
        {[
          { num: '01', title: 'Pick your battleground', desc: 'Food. Tech. Philosophy. Sports. Life. Choose your arena.' },
          { num: '02', title: 'Argue in real-time', desc: 'Three rounds. 150 words per argument. No second chances.' },
          { num: '03', title: 'Let the crowd decide', desc: 'Your debate goes public. The internet votes. Elo adjusts.' },
          { num: '04', title: 'Climb the ranks', desc: 'Win debates, gain Elo, unlock badges. Become a legend.' }
        ].map((feature) => (
          <div key={feature.num} className="flex gap-12 mb-20 reveal hover:bg-[rgba(0,0,0,0.01)] hover:-mx-6 px-6 py-4 rounded-2xl transition-all duration-300">
            <div className="font-serif italic text-[72px] text-[#8a8578] leading-none">
              {feature.num}.
            </div>
            <div className="flex-1">
              <h4 className="font-serif italic text-[36px] tracking-[-1px] mb-3">
                {feature.title}
              </h4>
              <p className="font-sans font-light text-lg text-[#8a8578] max-w-[480px]">
                {feature.desc}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* Leaderboard Preview (Dark) */}
      <section className="bg-[#0a0a0a] text-[#f0ece4] py-[160px] px-6">
        <div className="max-w-6xl mx-auto">
          <h3 className="font-serif italic text-[64px] tracking-[-2px] mb-20 reveal">
            Rankings.
          </h3>

          <div className="space-y-4">
            {[
              { rank: 1, name: 'Sophie', elo: 1847, record: '24W – 3L', rate: '89%' },
              { rank: 2, name: 'Marcus', elo: 1792, record: '31W – 7L', rate: '82%' },
              { rank: 3, name: 'Priya', elo: 1736, record: '19W – 5L', rate: '79%' }
            ].map((user) => (
              <div
                key={user.rank}
                className="flex items-center gap-8 py-4 border-b border-[rgba(240,236,228,0.06)] reveal hover:bg-[rgba(255,255,255,0.04)] hover:-mx-6 px-6 rounded-lg transition-all duration-300"
              >
                <span className="font-serif italic text-2xl w-12">{user.rank}.</span>
                <div className="w-8 h-8 rounded-full bg-[#2a5cff]" />
                <span className="font-sans flex-1">{user.name}</span>
                <span className="font-serif italic text-xl">{user.elo}</span>
                <span className="font-sans text-[rgba(240,236,228,0.5)]">{user.record}</span>
                <span className="font-sans">{user.rate}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-[200px] px-6 text-center">
        <h3 className="font-serif italic text-[96px] tracking-[-2px] leading-[0.95] mb-12 reveal">
          Ready to argue?
        </h3>
        <Link
          href="/auth/signup"
          className="inline-block px-12 py-5 bg-[#0a0a0a] text-[#f0ece4] rounded-full font-sans text-sm uppercase tracking-[2px] hover:scale-[1.06] hover:shadow-[0_12px_48px_rgba(0,0,0,0.15)] transition-all duration-300 reveal"
        >
          Start Your First Debate →
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-[rgba(0,0,0,0.06)] py-12 px-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center text-[#8a8578] font-sans text-sm">
          <div className="font-serif italic">Debate Me</div>
          <div className="flex gap-8">
            <Link href="/about" className="hover:text-[#0a0a0a] transition-colors">About</Link>
            <Link href="/rules" className="hover:text-[#0a0a0a] transition-colors">Rules</Link>
            <Link href="/privacy" className="hover:text-[#0a0a0a] transition-colors">Privacy</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
