'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const shortenSchema = z.object({
    url: z.string().url('Please enter a valid URL'),
    customSequence: z.string().optional(),
})

type ShortenFormData = z.infer<typeof shortenSchema>

export function ChessUrlShortener() {
    const [result, setResult] = useState<any>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [copied, setCopied] = useState(false)

    const { register, handleSubmit, reset, formState: { errors } } = useForm<ShortenFormData>({
        resolver: zodResolver(shortenSchema),
    })

    const onSubmit = async (data: ShortenFormData) => {
        setLoading(true)
        setError('')
        setResult(null)

        try {
            const response = await fetch('/api/shorten', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    url: data.url,
                    customSequence: data.customSequence || undefined
                }),
            })

            const json = await response.json()

            if (!response.ok) {
                if (json.suggestions) {
                    setError(`${json.error}. Try: ${json.suggestions.slice(0, 2).join(', ')}`)
                } else {
                    throw new Error(json.error || 'Failed to shorten URL')
                }
                return;
            }

            setResult(json.data)
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const copyToClipboard = () => {
        if (result) {
            navigator.clipboard.writeText(result.shortUrl)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }
    }

    const handleClear = () => {
        reset()
        setResult(null)
        setError('')
        setCopied(false)
    }

    return (
        <main className="min-h-screen bg-[#264653] font-sans py-10 md:py-20">
            <div className="w-full max-w-4xl mx-auto px-4 text-center">
                <h1 className="text-[#e9c46a] text-3xl md:text-5xl font-bold mb-4">Chess Link Shortener</h1>
                <p className="text-white/80 text-lg mb-8">Infinite links encoded in grandmaster moves.</p>
            </div>

            <div className="w-full max-w-4xl mx-auto px-4 space-y-6">
                {/* Input Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm shadow-xl">
                    <div className="flex flex-col space-y-4">
                        <div className="flex flex-col space-y-1">
                            <label className="text-[#e9c46a] text-sm font-medium ml-1">Destination URL</label>
                            <input
                                {...register('url')}
                                type="text"
                                placeholder="https://example.com/very-long-link..."
                                className="w-full text-lg p-3 border border-white/20 rounded-xl bg-white text-black focus:ring-2 focus:ring-[#2a9d8f] outline-none transition-all"
                                required
                            />
                        </div>

                        <div className="flex flex-col space-y-1">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-[#e9c46a] text-sm font-medium">Custom Sequence (Optional)</label>
                                <span className="text-white/40 text-xs italic">Sample: e4.Nf3.d4</span>
                            </div>
                            <input
                                {...register('customSequence')}
                                type="text"
                                placeholder="e.g. e4.e5.Nf3"
                                className="w-full text-lg p-3 border border-white/20 rounded-xl bg-white text-black focus:ring-2 focus:ring-[#2a9d8f] outline-none transition-all"
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 pt-2">
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 bg-[#2a9d8f] text-white text-lg font-bold rounded-xl py-3 px-6 hover:bg-[#21867a] active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100"
                            >
                                {loading ? 'Shortening...' : 'Get Chess Moves'}
                            </button>
                            <button
                                type="button"
                                onClick={handleClear}
                                className="bg-white/10 text-white text-lg font-medium rounded-xl py-3 px-8 hover:bg-white/20 transition-all"
                            >
                                Clear
                            </button>
                        </div>
                    </div>
                </form>

                {/* Error Display */}
                {(errors.url || error) && (
                    <div className="bg-[#e76f51]/10 border border-[#e76f51]/30 p-4 rounded-xl text-[#e76f51] text-center font-medium animate-pulse">
                        {errors.url?.message || error}
                    </div>
                )}

                {/* Result Display */}
                <div className="bg-[#e9c46a] p-1 rounded-2xl shadow-2xl overflow-hidden">
                    <div className="bg-white/90 p-4 md:p-6 rounded-xl flex flex-col md:flex-row items-center gap-4">
                        <div className="flex flex-col items-center md:items-start flex-1 min-w-0 w-full">
                            <span className="text-black/50 text-xs font-bold uppercase tracking-wider mb-1">Your Chess Link</span>
                            <div className="text-black text-xl md:text-2xl font-mono font-bold break-all w-full text-center md:text-left">
                                {result ? (
                                    <span className="group">
                                        <span className="opacity-40 text-base md:text-lg">.../</span>
                                        <span className="text-[#264653] underline decoration-[#2a9d8f] decoration-2 underline-offset-4">
                                            {result.chessSequence}
                                        </span>
                                    </span>
                                ) : (
                                    <span className="opacity-20 italic">e4.Nf3.d4.exd5.O-O</span>
                                )}
                            </div>
                        </div>

                        {result && (
                            <button
                                type="button"
                                onClick={copyToClipboard}
                                className="w-full md:w-auto bg-[#264653] text-white font-bold py-3 px-8 rounded-xl hover:bg-[#1a313a] active:scale-[0.95] transition-all whitespace-nowrap"
                            >
                                {copied ? '✅ Copied!' : 'Copy Link'}
                            </button>
                        )}
                    </div>
                </div>

                {/* Expanded Context/How it Works */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-10">
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                        <h3 className="text-[#e9c46a] font-bold text-xl mb-3 flex items-center gap-2">
                            <span>♟️</span> Why Chess?
                        </h3>
                        <p className="text-white/70 leading-relaxed">
                            Traditional shorteners use random letters. We use <b>Chess Notation</b>. Each link is a valid (or near-valid) opening sequence, making them more interesting to share.
                        </p>
                    </div>
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                        <h3 className="text-[#e9c46a] font-bold text-xl mb-3 flex items-center gap-2">
                            <span>♾️</span> Will they run out?
                        </h3>
                        <p className="text-white/70 leading-relaxed">
                            No. There are 10<sup>120</sup> possible chess games (the <b>Shannon Number</b>). That's more than the atoms in the universe. We'll never run out of unique links.
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <footer className="pt-20 pb-10 text-center space-y-4">
                    <div className="flex justify-center items-center gap-4 text-[#e9c46a]/60">
                        <a href="https://nextjs.org" className="hover:text-[#e9c46a] transition-colors">Next.js</a>
                        <span>•</span>
                        <a href="https://supabase.com" className="hover:text-[#e9c46a] transition-colors">Supabase</a>
                        <span>•</span>
                        <a href="https://vercel.com" className="hover:text-[#e9c46a] transition-colors">Vercel</a>
                    </div>
                    <p className="text-white/30 text-sm">
                        &copy; {new Date().getFullYear()} Chess Shannon Link Shortener. All rights reserved.
                    </p>
                </footer>
            </div>
        </main>
    )
}
