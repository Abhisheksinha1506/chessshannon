import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { supabaseAdmin } from './lib/supabase/server'

export const config = {
    matcher: [
        /*
         * Match all request paths except for:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
}

const RESERVED_PATHS = ['robots.txt', 'sitemap.xml', '404', 'expired', '']

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Extract sequence (everything after the last slash)
    const sequence = decodeURIComponent(pathname.split('/').pop() || '')

    // Skip if empty (home page)
    if (!sequence) {
        return NextResponse.next()
    }

    // Skip reserved paths and actual static files (extensions)
    const isStaticFile = /\.(ico|png|jpg|jpeg|webp|svg|css|js|map|json|txt|xml)$/i.test(sequence)
    if (RESERVED_PATHS.includes(sequence) || isStaticFile || pathname.startsWith('/api')) {
        return NextResponse.next()
    }

    // Attempt to find the URL in Supabase
    const { data, error } = await supabaseAdmin
        .from('shortened_urls')
        .select('original_url, expires_at, max_visits, visit_count, id')
        .eq('chess_sequence', sequence)
        .eq('is_active', true)
        .single()

    if (error || !data) {
        return NextResponse.next()
    }

    const row = data as any

    // Check expiration
    if (row.expires_at && new Date(row.expires_at) < new Date()) {
        return NextResponse.next()
    }

    // Check max visits
    if (row.max_visits && row.visit_count >= row.max_visits) {
        return NextResponse.next()
    }

    // Increment visit count (fire-and-forget)
    void (supabaseAdmin as any).rpc('increment_visit_count', { url_id_param: row.id })

    // Perform high-speed redirect
    return NextResponse.redirect(new URL(row.original_url))
}
