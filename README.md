# Debate Me

Argue with AI. Let the internet decide who won.

## Design Philosophy

This app follows a **Topology.vc-inspired editorial aesthetic** — premium, restrained, confident. Think venture capital website meets competitive gaming platform.

### Key Features

- **Canvas Animation**: Swirling concentric rings with holographic color cycling
- **Scroll Reveals**: Smooth translateY animations with custom cubic-bezier easing
- **Vote Bars**: GPU-accelerated scaleX animations
- **Frosted Glass Nav**: Backdrop-filter blur on scroll
- **Premium Typography**: Instrument Serif + DM Sans

## Tech Stack

- **Frontend**: Next.js 14 (App Router) + Tailwind CSS + Framer Motion
- **Backend**: Next.js API routes
- **Database**: Supabase (Postgres + Auth)
- **AI**: Anthropic Claude API (claude-sonnet-4-5)
- **Hosting**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Project Structure

```
app/
├── page.tsx                 # Landing page with canvas animation
├── auth/
│   ├── signup/page.tsx     # Sign up page
│   └── login/page.tsx      # Login page
├── feed/page.tsx           # Feed with debate cards
├── start/page.tsx          # Submit your take
├── arena/[id]/page.tsx     # Live 3-round debate
├── debate/[id]/page.tsx    # View completed debate + vote
├── profile/page.tsx        # User profile with stats
└── leaderboard/page.tsx    # Rankings
```

## Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
ANTHROPIC_API_KEY=your_anthropic_key
```

## Database Schema

See `PRODUCT_SPEC.md` for full schema.

## Deployment

Deploy to Vercel:

```bash
vercel
```

## Animation System

All animations use `cubic-bezier(0.16, 1, 0.3, 1)` easing for premium feel:

- **Scroll reveals**: 0.8s, translateY(40px) → 0
- **Vote bars**: 1.5s, scaleX(0) → 1
- **Hover effects**: Subtle scale/background tints
- **Nav blur**: Frosted glass after 80px scroll

## Status

**Phase 1 Complete** ✅
- Landing page with canvas
- Auth screens
- Feed page
- Start debate flow
- Live arena
- Debate view + voting
- Profile page
- Leaderboard

**Phase 2 - In Progress** 🚧
- Supabase integration
- Anthropic Claude API for debates
- Real-time voting
- Badge system
- Mobile optimization

## License

MIT
