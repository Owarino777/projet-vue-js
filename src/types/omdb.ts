export interface OmdbSearchItem {
  Title: string
  Year: string
  imdbID: string
  Type: 'movie' | 'series' | 'episode' | string
  Poster: string
}

export interface OmdbSearchResponse {
  Search?: OmdbSearchItem[]
  totalResults?: string
  Response: 'True' | 'False'
  Error?: string
}

export interface OmdbMovieDetail {
  Title: string
  Year: string
  Runtime: string // "123 min"
  imdbID: string
  Poster: string
  Response?: 'True' | 'False'
  Error?: string
}

export type Minutes = number

export interface AddedMovie {
  id: string
  title: string
  year?: string
  runtimeMinutes: Minutes
  poster?: string
  watched: boolean
  addedAt: number
}