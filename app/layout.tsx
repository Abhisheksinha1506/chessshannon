import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Inter, Outfit } from 'next/font/google'

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
})

const outfit = Outfit({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-outfit',
})

export const metadata: Metadata = {
    title: 'ChessMoves | High-Performance URL Shortener',
    description: 'Zero-friction URL shortening using chess notation. Secure, fast, and powered by the Shannon number.',
    keywords: ['URL shortener', 'chess', 'tools', 'privacy', 'notation'],
    authors: [{ name: 'ChessMoves Team' }],
}

export const viewport: Viewport = {
    themeColor: '#020617',
    width: 'device-width',
    initialScale: 1,
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className={`${inter.variable} ${outfit.variable} dark antialiased`}>
            <body className="bg-chess-bg-primary text-chess-text-primary selection:bg-chess-accent-primary/30">
                <main className="min-h-screen relative">
                    {children}
                </main>
            </body>
        </html>
    )
}
