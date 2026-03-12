export interface Database {
  public: {
    Tables: {
      artists: {
        Row: {
          id: string
          name: string
          slug: string
          nationality: string
          birth_year: number | null
          death_year: number | null
          medium: string[]
          movement: string[]
          bio: string | null
          image_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          nationality: string
          birth_year?: number | null
          death_year?: number | null
          medium?: string[]
          movement?: string[]
          bio?: string | null
          image_url?: string | null
        }
        Update: Partial<Database['public']['Tables']['artists']['Insert']>
      }
      auction_results: {
        Row: {
          id: string
          artist_id: string
          title: string
          auction_house: string
          sale_title: string | null
          date: string
          estimate_low: number | null
          estimate_high: number | null
          hammer_price: number | null
          currency: string
          medium: string | null
          dimensions: string | null
          image_url: string | null
          lot: string | null
          sold: boolean
          created_at: string
        }
        Insert: {
          id?: string
          artist_id: string
          title: string
          auction_house: string
          sale_title?: string | null
          date: string
          estimate_low?: number | null
          estimate_high?: number | null
          hammer_price?: number | null
          currency?: string
          medium?: string | null
          dimensions?: string | null
          image_url?: string | null
          lot?: string | null
          sold?: boolean
        }
        Update: Partial<Database['public']['Tables']['auction_results']['Insert']>
      }
      api_scores: {
        Row: {
          id: string
          artist_id: string
          score: number
          rating: string
          momentum: number
          market_depth: number
          recognition: number
          consistency: number
          calculated_at: string
        }
        Insert: {
          id?: string
          artist_id: string
          score: number
          rating: string
          momentum: number
          market_depth: number
          recognition: number
          consistency: number
        }
        Update: Partial<Database['public']['Tables']['api_scores']['Insert']>
      }
      price_index: {
        Row: {
          id: string
          artist_id: string
          year: number
          median_price: number | null
          index_value: number
          volume: number | null
          sell_through_rate: number | null
          avg_estimate_ratio: number | null
          created_at: string
        }
        Insert: {
          id?: string
          artist_id: string
          year: number
          median_price?: number | null
          index_value: number
          volume?: number | null
          sell_through_rate?: number | null
          avg_estimate_ratio?: number | null
        }
        Update: Partial<Database['public']['Tables']['price_index']['Insert']>
      }
      exhibitions: {
        Row: {
          id: string
          title: string
          venue: string
          city: string
          country: string
          start_date: string | null
          end_date: string | null
          type: string
          url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          venue: string
          city: string
          country: string
          start_date?: string | null
          end_date?: string | null
          type?: string
          url?: string | null
        }
        Update: Partial<Database['public']['Tables']['exhibitions']['Insert']>
      }
      artist_exhibitions: {
        Row: {
          artist_id: string
          exhibition_id: string
        }
        Insert: {
          artist_id: string
          exhibition_id: string
        }
        Update: Partial<Database['public']['Tables']['artist_exhibitions']['Insert']>
      }
      newsletter_issues: {
        Row: {
          id: string
          number: number
          title: string
          slug: string
          published_at: string | null
          summary: string | null
          content: string | null
          is_premium: boolean
          created_at: string
        }
        Insert: {
          id?: string
          number: number
          title: string
          slug: string
          published_at?: string | null
          summary?: string | null
          content?: string | null
          is_premium?: boolean
        }
        Update: Partial<Database['public']['Tables']['newsletter_issues']['Insert']>
      }
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          tier: string
          watchlist: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          tier?: string
          watchlist?: string[]
        }
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type InsertTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type UpdateTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']
