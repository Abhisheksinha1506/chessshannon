// types/supabase.ts
// Generated types for Supabase database

export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export type Database = {
    public: {
        Tables: {
            profiles: {
                Row: {
                    id: string
                    email: string | null
                    username: string | null
                    api_key: string | null
                    created_at: string
                    updated_at: string
                    max_links: number
                    subscription_tier: string
                }
                Insert: {
                    id: string
                    email?: string | null
                    username?: string | null
                    api_key?: string | null
                    created_at?: string
                    updated_at?: string
                    max_links?: number
                    subscription_tier?: string
                }
                Update: {
                    id?: string
                    email?: string | null
                    username?: string | null
                    api_key?: string | null
                    created_at?: string
                    updated_at?: string
                    max_links?: number
                    subscription_tier?: string
                }
            }
            shortened_urls: {
                Row: {
                    id: number
                    chess_sequence: string
                    original_url: string
                    hash_value: number
                    user_id: string | null
                    is_public: boolean
                    custom_sequence: boolean
                    title: string | null
                    description: string | null
                    password_hash: string | null
                    requires_auth: boolean
                    created_at: string
                    expires_at: string | null
                    max_visits: number | null
                    visit_count: number
                    last_visited: string | null
                    is_active: boolean
                    is_reported: boolean
                }
                Insert: {
                    id?: number
                    chess_sequence: string
                    original_url: string
                    hash_value: number
                    user_id?: string | null
                    is_public?: boolean
                    custom_sequence?: boolean
                    title?: string | null
                    description?: string | null
                    password_hash?: string | null
                    requires_auth?: boolean
                    created_at?: string
                    expires_at?: string | null
                    max_visits?: number | null
                    visit_count?: number
                    last_visited?: string | null
                    is_active?: boolean
                    is_reported?: boolean
                }
                Update: {
                    id?: number
                    chess_sequence?: string
                    original_url?: string
                    hash_value?: number
                    user_id?: string | null
                    is_public?: boolean
                    custom_sequence?: boolean
                    title?: string | null
                    description?: string | null
                    password_hash?: string | null
                    requires_auth?: boolean
                    created_at?: string
                    expires_at?: string | null
                    max_visits?: number | null
                    visit_count?: number
                    last_visited?: string | null
                    is_active?: boolean
                    is_reported?: boolean
                }
            }
            visits: {
                Row: {
                    id: number
                    url_id: number
                    visited_at: string
                    ip_address: string | null
                    user_agent: string | null
                    referrer: string | null
                    country: string | null
                    city: string | null
                    device_type: string | null
                    browser: string | null
                    os: string | null
                    utm_source: string | null
                    utm_medium: string | null
                    utm_campaign: string | null
                }
                Insert: {
                    id?: number
                    url_id: number
                    visited_at?: string
                    ip_address?: string | null
                    user_agent?: string | null
                    referrer?: string | null
                    country?: string | null
                    city?: string | null
                    device_type?: string | null
                    browser?: string | null
                    os?: string | null
                    utm_source?: string | null
                    utm_medium?: string | null
                    utm_campaign?: string | null
                }
                Update: {
                    id?: number
                    url_id?: number
                    visited_at?: string
                    ip_address?: string | null
                    user_agent?: string | null
                    referrer?: string | null
                    country?: string | null
                    city?: string | null
                    device_type?: string | null
                    browser?: string | null
                    os?: string | null
                    utm_source?: string | null
                    utm_medium?: string | null
                    utm_campaign?: string | null
                }
            }
            chess_openings: {
                Row: {
                    id: number
                    name: string
                    eco_code: string | null
                    moves: string
                    fen_position: string | null
                    popularity_score: number
                    is_available: boolean
                }
                Insert: {
                    id?: number
                    name: string
                    eco_code?: string | null
                    moves: string
                    fen_position?: string | null
                    popularity_score?: number
                    is_available?: boolean
                }
                Update: {
                    id?: number
                    name?: string
                    eco_code?: string | null
                    moves: string
                    fen_position?: string | null
                    popularity_score?: number
                    is_available?: boolean
                }
            }
            canonical_moves: {
                Row: {
                    id: number
                    move_notation: string
                    move_index: number
                    piece_type: string | null
                    is_capture: boolean
                    is_check: boolean
                    popularity_score: number
                }
                Insert: {
                    id?: number
                    move_notation: string
                    move_index: number
                    piece_type?: string | null
                    is_capture?: boolean
                    is_check?: boolean
                    popularity_score?: number
                }
                Update: {
                    id?: number
                    move_notation?: string
                    move_index?: number
                    piece_type?: string | null
                    is_capture?: boolean
                    is_check?: boolean
                    popularity_score?: number
                }
            }
            reports: {
                Row: {
                    id: number
                    url_id: number
                    reporter_ip: string | null
                    reporter_email: string | null
                    category: string | null
                    description: string | null
                    created_at: string
                    status: string
                    admin_notes: string | null
                }
                Insert: {
                    id?: number
                    url_id: number
                    reporter_ip?: string | null
                    reporter_email?: string | null
                    category?: string | null
                    description?: string | null
                    created_at?: string
                    status?: string
                    admin_notes?: string | null
                }
                Update: {
                    id?: number
                    url_id?: number
                    reporter_ip?: string | null
                    reporter_email?: string | null
                    category?: string | null
                    description?: string | null
                    created_at?: string
                    status?: string
                    admin_notes?: string | null
                }
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            increment_visit_count: {
                Args: {
                    url_id_param: number
                }
                Returns: void
            }
            cleanup_expired_urls: {
                Args: Record<PropertyKey, never>
                Returns: void
            }
        }
        Enums: {
            [_ in never]: never
        }
    }
}
