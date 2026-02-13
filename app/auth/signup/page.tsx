'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement Supabase auth
    console.log('Sign up:', { email, password });
  };

  return (
    <div className="min-h-screen bg-[#f0ece4] flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white rounded-[24px] p-12 shadow-lg">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-full bg-[#0a0a0a] flex items-center justify-center mb-4">
            <span className="text-[#f0ece4] text-xl">→</span>
          </div>
          <h1 className="font-serif italic text-3xl">Debate Me</h1>
          <p className="font-sans text-sm text-[#8a8578] mt-2">
            Argue with AI. Let the internet decide.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border-b border-[rgba(0,0,0,0.1)] pb-3 font-sans text-lg focus:outline-none focus:border-[#0a0a0a] transition-colors"
              required
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border-b border-[rgba(0,0,0,0.1)] pb-3 font-sans text-lg focus:outline-none focus:border-[#0a0a0a] transition-colors"
              required
            />
          </div>

          <button
            type="button"
            className="w-full py-4 border border-[rgba(0,0,0,0.2)] rounded-full font-sans text-sm uppercase tracking-[2px] hover:bg-[rgba(0,0,0,0.02)] transition-colors"
          >
            Continue with Google
          </button>

          <button
            type="submit"
            className="w-full py-4 bg-[#0a0a0a] text-[#f0ece4] rounded-full font-sans text-sm uppercase tracking-[2px] hover:scale-[1.02] hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)] transition-all duration-300"
          >
            Enter the Arena
          </button>
        </form>

        {/* Toggle */}
        <p className="text-center mt-8 font-sans text-sm text-[#8a8578]">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-[#0a0a0a] hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
