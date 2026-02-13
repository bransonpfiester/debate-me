'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const supabase = createClient();
      
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username: username || email.split('@')[0],
          },
        },
      });

      if (signUpError) throw signUpError;

      router.push('/feed');
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
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
          {error && (
            <div className="p-4 bg-[rgba(224,62,54,0.1)] border border-[rgba(224,62,54,0.2)] rounded-lg text-sm text-[#e03e36]">
              {error}
            </div>
          )}

          <div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-transparent border-b border-[rgba(0,0,0,0.1)] pb-3 font-sans text-lg focus:outline-none focus:border-[#0a0a0a] transition-colors"
            />
          </div>

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
              minLength={6}
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
            disabled={loading}
            className="w-full py-4 bg-[#0a0a0a] text-[#f0ece4] rounded-full font-sans text-sm uppercase tracking-[2px] hover:scale-[1.02] hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {loading ? 'Creating Account...' : 'Enter the Arena'}
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
