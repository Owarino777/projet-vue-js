import type { OmdbSearchResponse, OmdbMovieDetail } from '@/types/omdb'

const BASE_URL = import.meta.env.VITE_OMDB_API_URL as string
const API_KEY = import.meta.env.VITE_OMDB_API_KEY as string

if (!API_KEY) {
  // Alerte dev pour ne pas crasher silencieusement
   
  console.warn('OMDb: VITE_OMDB_API_KEY manquant. Crée un fichier .env.local avec ta clé.')
}

const detailsCache = new Map<string, OmdbMovieDetail>()

function buildUrl(params: Record<string, string>) {
  const url = new URL(BASE_URL)
  url.search = new URLSearchParams({ apikey: API_KEY, ...params }).toString()
  return url.toString()
}

async function getJson<T>(url: string): Promise<T> {
  const res = await fetch(url, { headers: { Accept: 'application/json' } })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json() as Promise<T>
}

export async function searchMovies(q: string, page = '1') {
  const url = buildUrl({ s: q, type: 'movie', page })
  return getJson<OmdbSearchResponse>(url)
}

export async function getMovieDetail(imdbID: string) {
  if (detailsCache.has(imdbID)) return detailsCache.get(imdbID)!
  const url = buildUrl({ i: imdbID, plot: 'short' })
  const data = await getJson<OmdbMovieDetail>(url)
  detailsCache.set(imdbID, data)
  return data
}