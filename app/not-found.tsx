import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="min-h-screen bg-chess-bg-primary text-chess-text-primary flex flex-col items-center justify-center p-4">
            <div className="space-y-6 text-center max-w-md">
                <div className="text-9xl animate-bounce filter drop-shadow-glow">♟</div>
                <h1 className="text-4xl font-bold chess-gradient-text uppercase tracking-tighter">
                    Move Not Found
                </h1>
                <p className="text-chess-text-secondary text-lg">
                    This chess sequence hasn't been played yet or the link has expired.
                </p>
                <Link
                    href="/"
                    className="inline-block btn-gradient px-8 py-4 rounded-xl font-bold tracking-tight hover:scale-105 transition-transform"
                >
                    Back to Opening
                </Link>
            </div>
        </div>
    )
}
