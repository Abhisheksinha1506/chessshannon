// app/api/shorten/route.ts
// POST /api/shorten - Create a new shortened URL

import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../lib/supabase/server';
import { ChessEncoder, chessEncoder, isSequenceAvailable } from '../../../lib/chess/encoder';
export interface CreateShortUrlRequest {
    url: string;
    customSequence?: string;
    title?: string;
    description?: string;
    password?: string;
    expiresIn?: number; // days
    maxVisits?: number;
}

export const runtime = 'edge';

export async function POST(request: NextRequest) {
    try {
        const body: CreateShortUrlRequest = await request.json();

        const { url, customSequence, title, description, password, expiresIn, maxVisits } = body;

        // Validate URL
        if (!url || !isValidUrl(url)) {
            return NextResponse.json(
                { success: false, error: 'Valid URL required' },
                { status: 400 }
            );
        }

        // Generate or validate chess sequence
        let chessSequence: string;
        let isCustom = false;

        if (customSequence) {
            // Validate custom sequence
            if (!chessEncoder.validateMoveSequence(customSequence)) {
                return NextResponse.json(
                    {
                        success: false,
                        error: 'Invalid chess move sequence',
                        message: 'Please use valid chess notation moves separated by dots'
                    },
                    { status: 400 }
                );
            }

            // Check if available
            const available = await isSequenceAvailable(customSequence, supabaseAdmin);
            if (!available) {
                const suggestions = chessEncoder.getSuggestions(customSequence);
                return NextResponse.json(
                    {
                        success: false,
                        error: 'Chess sequence already taken',
                        suggestions,
                    },
                    { status: 409 }
                );
            }

            chessSequence = customSequence;
            isCustom = true;
        } else {
            // Auto-generate sequence
            chessSequence = await chessEncoder.encodeUrl(url);

            // Handle collision (rare)
            let attempts = 0;
            while (!(await isSequenceAvailable(chessSequence, supabaseAdmin)) && attempts < 5) {
                const encoder = new ChessEncoder({ sequenceLength: 5 + attempts });
                chessSequence = await encoder.encodeUrl(url + Date.now());
                attempts++;
            }

            if (attempts >= 5) {
                return NextResponse.json(
                    { success: false, error: 'Unable to generate unique sequence' },
                    { status: 500 }
                );
            }
        }

        // Calculate hash value
        const hashValue = chessEncoder.decodeChessMoves(chessSequence);

        // Calculate expiration
        let expiresAt = null;
        if (expiresIn) {
            expiresAt = new Date();
            expiresAt.setDate(expiresAt.getDate() + expiresIn);
        }

        // Get user ID if authenticated (optional)
        const authHeader = request.headers.get('authorization');
        let userId = null;

        if (authHeader) {
            // Parse JWT and get user ID (simplified - implement proper auth)
            // userId = getUserIdFromToken(authHeader);
        }

        // Hash password if provided
        let passwordHash = null;
        if (password) {
            // Import bcrypt-edge or similar for edge runtime
            // passwordHash = await hash(password);
            passwordHash = password; // TODO: Implement proper hashing
        }

        // Insert into database
        const { data, error } = await (supabaseAdmin
            .from('shortened_urls') as any)
            .insert({
                chess_sequence: chessSequence,
                original_url: url,
                hash_value: Number(hashValue),
                user_id: userId,
                custom_sequence: isCustom,
                title: title || null,
                description: description || null,
                password_hash: passwordHash,
                expires_at: expiresAt?.toISOString() || null,
                max_visits: maxVisits || null,
            })
            .select()
            .single();

        if (error) {
            console.error('Database error:', error);
            return NextResponse.json(
                { success: false, error: 'Failed to create short URL' },
                { status: 500 }
            );
        }

        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
        const shortUrl = `${baseUrl}/${chessSequence}`;

        return NextResponse.json({
            success: true,
            data: {
                id: (data as any).id,
                shortUrl,
                chessSequence,
                originalUrl: url,
                createdAt: (data as any).created_at,
                expiresAt: (data as any).expires_at,
                isCustom,
            },
        });

    } catch (error) {
        console.error('Error creating short URL:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}

/**
 * Validate URL format
 */
function isValidUrl(string: string): boolean {
    try {
        const url = new URL(string);
        return url.protocol === 'http:' || url.protocol === 'https:';
    } catch {
        return false;
    }
}

// OPTIONS for CORS
export async function OPTIONS(_request: NextRequest) {
    return new NextResponse(null, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
    });
}
