# Link Shortener (Powered by Chess Notation)

A high-performance URL shortener that generates unlimited, memorable links using chess notation logic. Powered by the **Shannon Number**, ensuring we never run out of unique combinations.

## 🚀 Features

*   **Zero-Friction Shortening**: Instantly convert long URLs into clean, memorable chess sequences (e.g., `link.com/e4.Nf3`).
*   **Infinite Scalability**: Leverages the Shannon Number (10^120 possible chess games) to guarantee unique IDs forever.
*   **High Performance**: Built on Next.js 14 using Edge Middleware for sub-millisecond redirects.
*   **Analytics Ready**: Tracks visits, referrer data, and more via Supabase.
*   **QR Code Generation**: Instantly generate QR codes for any shortened link.
*   **Secure**: Uses Native Web Crypto API for high-entropy sequence generation.

## 🛠️ Tech Stack

*   **Framework**: Next.js 14 (App Router)
*   **Language**: TypeScript
*   **Database**: Supabase (PostgreSQL)
*   **Styling**: Tailwind CSS
*   **Deployment**: Vercel (recommended)

## 🏁 Getting Started

### Prerequisites

*   Node.js 20+
*   Supabase Account

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/chess-url-shortener.git
    cd chess-url-shortener
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Set up Environment Variables**:
    Create a `.env.local` file in the root directory:
    ```bash
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
    NEXT_PUBLIC_APP_URL=http://localhost:3000
    ```

4.  **Run the application**:
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🗄️ Database Schema

Run the following SQL in your Supabase SQL Editor to set up the necessary tables:

```sql
-- Shortened URLs table
CREATE TABLE public.shortened_urls (
    id BIGSERIAL PRIMARY KEY,
    chess_sequence TEXT UNIQUE NOT NULL,
    original_url TEXT NOT NULL,
    visit_count INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE,
    max_visits INTEGER
);

-- Indexes for performance
CREATE INDEX idx_chess_sequence ON public.shortened_urls(chess_sequence);
CREATE INDEX idx_active_urls ON public.shortened_urls(is_active) WHERE is_active = TRUE;

-- Function to increment visit count safely
CREATE OR REPLACE FUNCTION increment_visit_count(url_id_param BIGINT)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    UPDATE public.shortened_urls 
    SET visit_count = visit_count + 1
    WHERE id = url_id_param;
END;
$$;
```

## 📂 Project Structure

*   `app/page.tsx`: Main UI for the shortener.
*   `app/[sequence]/page.tsx`: Handles the redirection logic.
*   `app/api/shorten/route.ts`: API endpoint to create new short links.
*   `lib/chess/encoder.ts`: Core logic for converting IDs/Hashes into valid chess moves.
*   `middleware.ts`: High-performance edge middleware for rapid redirects.

## 👤 Author

**Abhishek Sinha**
*   LinkedIn: [abhisheksinha1506](https://www.linkedin.com/in/abhisheksinha1506/)

---
© 2026 • Powered by Shannon Number Logic
