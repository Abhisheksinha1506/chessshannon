# I created a URL shortener that uses Chess moves as IDs (10^120 combinations)

I created a chess-based URL shortener that generates links using valid chess move sequences. For example, instead of a random string, you get a link like `https://chess-link.com/e4.c5.Nf3`.

I have a coworker who is constantly talking about how we're running out of good short URLs, but with the Shannon Number (10^120 possible chess games), that's effectively impossible here. So I figured I would create an alternative that creates readable, memorable, and infinitely scalable links for chess nerds.

It's built with Next.js 14 and Supabase, running on Edge Middleware for sub-millisecond redirects.

**Repo/Source:** [Link to GitHub]
**Demo:** [Link to Demo - e.g. localhost:3000]
