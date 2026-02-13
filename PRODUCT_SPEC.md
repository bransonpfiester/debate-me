# Debate Me — Full Product Spec

## Design DNA
This app follows a **Topology.vc-inspired editorial aesthetic** — premium, restrained, confident. Think venture capital website meets competitive gaming platform. Every screen should feel like a beautifully typeset magazine page, not a typical SaaS app.

### Color Palette
- Background: warm cream `#f0ece4`
- Foreground/text: near-black `#0a0a0a`
- Human/blue accent: `#2a5cff`
- AI/red accent: `#e03e36`
- Muted text: `#8a8578`
- Cards: white `#ffffff` with very subtle box shadows
- Dark sections: `#0a0a0a` background with cream `#f0ece4` text

### Typography
- **Headings:** Instrument Serif — always 400 weight, use italic liberally for emphasis. Large sizes (48–140px), tight letter-spacing (-2px), tight line-height (0.92–1.05)
- **Body:** DM Sans — weight 300 for body text, 400–500 for labels. Clean and airy
- **Labels/nav/badges:** DM Sans — 10–12px, uppercase, letter-spacing 2–2.5px

### Layout Principles
- Generous whitespace — sections get 120–200px vertical padding
- Content doesn't fill the full width. Max-widths of 640px for paragraphs, 480px for descriptions
- Numbered items use italic serif numbers ("01.", "02.") as a design element
- Borders are ultra-subtle: `rgba(0,0,0,0.06)` on light backgrounds, `rgba(255,255,255,0.06)` on dark
- Cards use `border-radius: 24px`, soft layered shadows
- No heavy borders, no thick outlines, no gradients on backgrounds

### Animation
- Scroll-triggered reveals using `translateY(40px) → 0` with `cubic-bezier(0.16, 1, 0.3, 1)` easing
- Staggered delays for sibling elements (120ms between each)
- Hover states are subtle: slight background tint, no dramatic transforms
- Nav gets frosted glass (`backdrop-filter: blur(20px)`) on scroll

### Dark Sections
Used for high-contrast moments: Principles, Leaderboard
- Background `#0a0a0a`, text `#f0ece4`
- Muted text becomes `rgba(240,236,228,0.4–0.5)`
- Borders become `rgba(240,236,228,0.06)`

## App Structure & Screens

### 1. Landing Page
Single-page scroll with:
- Hero with animated swirling rings canvas background
- Stagger text animation
- About section
- Principles (dark section)
- Arena preview
- Features
- Leaderboard preview (dark section)
- CTA
- Footer

**Hero Background - Concentric Swirling Rings:**
- Full-viewport `<canvas>` behind hero text
- ~70 elliptical rings that slowly wobble and shift color
- Canvas: full viewport, behind hero content
- Ring count: 70
- Center position: 62% from left, 32% from top
- Shape: ellipses, not circles (vertical axis = 82% of horizontal)
- Wobble: sinusoidal, outer rings wobble more than inner
- Color: HSL cycling hue (start ~180°, shift +4.5° per ring, advance slowly over time)
- Saturation: 15% inner → 45% outer
- Lightness: 78% inner → 60% outer
- Opacity: 0.08 inner → 0.30 outer
- Line width: 1.1px
- Background: match page background `#f0ece4`

### 2. Home / Feed Page

**Top Nav (persistent across all pages):**
- Left: Logo mark (dark circle with arrow icon) + "Debate Me" in italic serif
- Right: nav links — Feed, Leaderboard, Profile, "Start Debate" (styled as small pill button with dark background/cream text)
- On scroll: frosted glass background with `backdrop-filter: blur(20px)`

**Daily Prompt Banner:**
- Full-width cream card at top with subtle border
- Left: italic serif text "Today's Prompt" as a label
- Center: the prompt in italic serif, 22–28px (e.g., "Is college still worth it?")
- Right: "Debate This →" link in uppercase small text
- Dismissable with × icon

**Feed:**
- Vertical stack of debate cards, each card is white rounded rectangle (24px radius)
- Card layout:
  - Top row: user avatar (small colored circle with initial) + username on left, "vs AI" badge on right, category pill (e.g., "Food" — cream background, uppercase 10px text)
  - Middle: the hot take in italic serif, 20–22px
  - Bottom: vote bar (thin 6px track, blue/red split) with percentages, vote count + time ago in muted text
  - "Read debate →" as subtle link
- Cards have soft shadow
- Hover: slight lift (`translateY(-2px)`)

**Filter Tabs (above feed):**
- Horizontal row: All | Trending | Biggest Upsets | Food | Tech | Philosophy | Sports | Life
- Style: uppercase, 11px, letter-spacing 2px, muted color, active tab gets full opacity + thin underline

### 3. Start a Debate Page

**Step 1 — Submit Take:**
- Centered layout, generous whitespace
- Large italic serif heading: "Drop your take."
- Big text input — minimal border, large font (18px serif italic), placeholder: "Pineapple belongs on pizza..."
- Below: horizontal scrollable category pills (selectable pills with borders)
- "Or use today's prompt →" link below in muted text
- "Enter the Arena →" button (dark pill)

**Step 2 — Debate Arena (live debate):**
- Full page, centered card (white card style)
- Top bar: your take in italic serif + "Round 1 of 3" badge
- Split conversation:
  - Your arguments appear on left in blue-tinted bubbles
  - AI responses on right in red-tinted bubbles
  - Each bubble has uppercase speaker tag ("HUMAN" / "AI")
  - Bubbles animate in with `translateY(16px) → 0` fade
- Bottom: text input area with word count ("87 / 150 words"), "Submit Argument" dark pill button
- Between rounds: brief "Round 2" text flash in italic serif, centered
- After round 3: input area replaced with "Publish to Feed →" button

### 4. Debate View Page (reading a completed debate)

**Header:**
- The hot take as large italic serif heading (36–48px)
- Below: username + avatar, "vs AI", category pill, time ago — all in one row, muted styling
- Thin bottom border separating header from content

**Debate Content:**
- Same bubble layout as arena, but all three rounds visible
- Round labels ("Round 1", "Round 2", "Round 3") as small italic serif numbers between pairs
- Generous spacing between rounds (40–60px)

**Voting Section:**
- Below debate, separated by thin border
- "Who won this debate?" in serif, 24px
- Two large buttons side by side:
  - "Human won" — blue outline, blue text, rounded pill
  - "AI won" — red outline, red text, rounded pill
- After voting: buttons collapse into vote bar with animated fill + percentages
- Total vote count below in muted text

**Optional Comments:**
- Simple list below, each comment: small avatar dot + username + comment text
- "Add a comment..." input at bottom, minimal styling

### 5. Profile Page

**Header:**
- Large colored circle avatar (48px) with user initial
- Username in medium weight, 24px
- Below: Elo rating in italic serif, large (36–48px), with "ELO" label above in uppercase muted text
- Win/loss record: "42W – 18L"

**Stats Row:**
- Horizontal row of 4 stat blocks, separated by thin vertical borders:
  - Total Debates / Win Rate % / Best Streak 🔥 / Total Votes Received
  - Each: number in serif italic (28px), label in uppercase muted (10px)

**Badges:**
- Section heading "Badges" in italic serif
- Horizontal row of badge items:
  - Each badge: icon/emoji + name below in small uppercase text
  - Earned badges full opacity, unearned are 0.2 opacity with lock icon
  - Examples: "First Blood", "On Fire", "AI Slayer", "Crowd Favorite", "Philosopher"

**Debate History:**
- Section heading "History" in italic serif
- Same card format as feed
- Each shows take, vote split, result ("Won" in blue or "Lost" in red pill badge)

### 6. Leaderboard Page

**Header:**
- "Rankings." in large italic serif (64–96px)

**Toggle Tabs:**
- "Global" | "This Week" | "By Category"

**Table:**
- Columns: Rank (italic serif), Username (with colored dot), Elo (italic serif), Record, Win Rate
- Top 3 get gold/silver/bronze colored rank numbers
- Current user's row highlighted with subtle cream/blue background tint
- Rows animate in on scroll with staggered `translateX(-20px)` reveals

**Category Filter:**
- When "By Category" selected: dropdown or horizontal pill selector
- Categories: Food, Tech, Philosophy, Sports, Life, Education, Pop Culture

### 7. Auth Screens (Sign Up / Log In)

**Layout:**
- Centered card on cream background
- Top: Logo (dark circle + "Debate Me" italic)
- Tagline below: "Argue with AI. Let the internet decide." in muted text
- Email + password inputs — minimal, large, thin bottom-border style
- "Continue with Google" button — outline style, rounded pill
- "Enter the Arena" submit button — dark pill
- Toggle at bottom: "Already have an account? Log in" / "New here? Sign up" — muted link

### Mobile Adaptations
- Nav becomes: logo left, hamburger menu right
- Feed cards stack full-width with 24px horizontal padding
- Debate bubbles expand to 85% width
- Leaderboard hides Record and Win Rate columns
- Feature rows collapse to single column (hide number)
- All section padding reduces to 100px vertical, 24px horizontal
- CTA button becomes full-width on mobile

## Tech Stack
- **Frontend:** Next.js 14 (App Router) + Tailwind CSS + Framer Motion
- **Backend:** Next.js API routes
- **Database:** Supabase (Postgres + Auth)
- **AI:** Anthropic Claude API (claude-sonnet-4-5-20250929) for debate engine
- **Hosting:** Vercel
- **Fonts:** Google Fonts — Instrument Serif + DM Sans

## Database Schema

### users
- id
- username
- email
- avatar_color
- elo_rating
- wins
- losses
- streak
- best_streak
- created_at

### debates
- id
- user_id
- topic
- category
- status (active/completed)
- created_at

### rounds
- id
- debate_id
- round_number
- user_argument
- ai_argument
- created_at

### votes
- id
- debate_id
- voter_id
- vote_for (human/ai)
- created_at

### badges
- id
- user_id
- badge_type
- earned_at

## Implementation Priority

### Phase 1 - Core Pages (Build First)
1. Landing page with canvas animation
2. Auth screens (sign up/login)
3. Feed page with debate cards
4. Start debate page (submit take)
5. Debate arena (live debate with AI)
6. Debate view page (read completed debates)

### Phase 2 - User Features
7. Profile page
8. Leaderboard page
9. Voting system
10. Comments

### Phase 3 - Polish
11. Mobile responsiveness
12. Animations & transitions
13. Badge system
14. Daily prompts
