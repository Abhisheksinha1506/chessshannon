// types/index.ts
// General application types

export interface ShortUrl {
    id: number;
    chessSequence: string;
    originalUrl: string;
    shortUrl: string;
    title?: string;
    description?: string;
    createdAt: string;
    expiresAt?: string;
    visitCount: number;
    lastVisited?: string;
    isCustom: boolean;
    isActive: boolean;
}

export interface CreateShortUrlRequest {
    url: string;
    customSequence?: string;
    title?: string;
    description?: string;
    password?: string;
    expiresIn?: number; // days
    maxVisits?: number;
}

export interface CreateShortUrlResponse {
    success: boolean;
    data?: ShortUrl;
    error?: string;
    suggestions?: string[];
}

export interface UrlInfoResponse {
    success: boolean;
    data?: {
        chessSequence: string;
        shortUrl: string;
        originalUrl: string;
        title?: string;
        description?: string;
        createdAt: string;
        expiresAt?: string;
        visitCount: number;
        lastVisited?: string;
        requiresAuth: boolean;
        isActive: boolean;
    };
    error?: string;
}

export interface VisitStats {
    totalVisits: number;
    uniqueVisitors: number;
    visitsByDate: Array<{
        date: string;
        visits: number;
    }>;
    visitsByCountry: Array<{
        country: string;
        visits: number;
    }>;
    visitsByDevice: Array<{
        device: string;
        visits: number;
    }>;
    visitsByBrowser: Array<{
        browser: string;
        visits: number;
    }>;
    topReferrers: Array<{
        referrer: string;
        visits: number;
    }>;
}

export interface UrlStatsResponse {
    success: boolean;
    data?: {
        url: {
            chessSequence: string;
            originalUrl: string;
            title?: string;
            createdAt: string;
        };
        stats: VisitStats;
    };
    error?: string;
}


export interface ValidationResult {
    valid: boolean;
    available?: boolean;
    sequence?: string;
    reason?: string;
}

// Chess encoder types
export interface ChessEncoderConfig {
    sequenceLength?: number;
    separator?: string;
    useCustomMoves?: boolean;
}

// Analytics types
export interface DeviceInfo {
    type: 'desktop' | 'mobile' | 'tablet' | 'bot' | 'unknown';
    browser: string;
    os: string;
    ua: string;
}

export interface GeoLocation {
    country?: string;
    city?: string;
    ip: string;
}
