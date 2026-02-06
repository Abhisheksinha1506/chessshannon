'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const shortenSchema = z.object({
    url: z.string().url('Please enter a valid URL'),
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
                }),
            })

            const json = await response.json()

            if (!response.ok) {
                throw new Error(json.error || 'Failed to shorten URL')
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
        <main className="min-h-screen bg-[#264653] font-sans h-screen">
            <div className="w-[60%] mx-auto pt-[100px] text-center text-[#e9c46a] text-[40px] font-sans">
                <h1>Link Shortener</h1>
            </div>

            <div className="flex flex-col w-[80%] mx-auto mt-[50px]">
                {/* Input Div */}
                <form onSubmit={handleSubmit(onSubmit)} className="w-[80%] mx-auto mb-[25px] flex flex-row justify-between">
                    <input
                        {...register('url')}
                        type="text"
                        placeholder="Enter URL here . . ."
                        className="w-[70%] text-[18px] p-[10px] border border-white rounded-[10px] text-black"
                        required
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-[#2a9d8f] text-white text-[18px] border border-[#2a9d8f] rounded-[10px] p-[10px] ml-[5px] flex items-center justify-center hover:bg-[#297c74] transition duration-200"
                    >
                        {loading ? 'Shortening...' : 'Shorten URL'}
                    </button>
                    <button
                        type="button"
                        onClick={handleClear}
                        className="bg-[#2a9d8f] text-white text-[18px] border border-[#2a9d8f] rounded-[10px] p-[10px] ml-[5px] flex items-center justify-center hover:bg-[#297c74] transition duration-200"
                    >
                        Clear
                    </button>
                </form>

                {/* Error Div (Placed here to be visible) */}
                {(errors.url || error) && (
                    <div className="w-[80%] mx-auto text-[#e76f51] italic text-[18px] text-center mb-4">
                        <p>{errors.url?.message || error}</p>
                    </div>
                )}

                {/* Output Div */}
                <div className="flex flex-row w-[80%] justify-between bg-[#e9c46a] mx-auto p-[5px] border-[3px] border-[#e9c46a] rounded-[10px] items-center mb-[50px]">
                    <div className="flex text-[18px] text-black font-bold whitespace-nowrap px-2">Your short URL:</div>
                    <div className="flex text-black p-[5px] text-[24px] overflow-hidden truncate">
                        {result ? (
                            <a href={result.shortUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                {result.shortUrl}
                            </a>
                        ) : (
                            <span className="opacity-50 text-base">...</span>
                        )}
                    </div>
                    <button
                        type="button"
                        onClick={copyToClipboard}
                        className="bg-[#2a9d8f] text-white text-[18px] border border-[#2a9d8f] rounded-[10px] p-[10px] ml-[5px] flex items-center justify-center hover:bg-[#297c74] transition duration-200 whitespace-nowrap"
                    >
                        {copied ? 'Copied!' : 'Copy'}
                    </button>
                </div>

                {/* Info Section */}
                <div className="w-[80%] mx-auto text-[#fff] text-center mb-[40px] space-y-4">
                    <p className="text-[18px]">
                        This application creates short, memorable links using chess notation.
                    </p>
                    <p className="text-[18px]">
                        Unlimited links can be generated because the number of possible unique chess games (<a href="https://en.wikipedia.org/wiki/Shannon_number" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#e9c46a] transition-colors">Shannon Number</a>) exceeds the number of atoms in the observable university, ensuring we never run out of combinations.
                    </p>
                </div>

                {/* Footer */}
                <footer className="text-center text-[#e9c46a] pb-10 flex items-center justify-center gap-2">
                    <span>&copy; {new Date().getFullYear()}</span>
                    <span>|</span>
                    <a
                        href="https://www.linkedin.com/in/abhisheksinha1506/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center hover:text-white transition-colors duration-200"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                    </a>
                </footer>
            </div>
        </main>
    )
}
