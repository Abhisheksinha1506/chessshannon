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
