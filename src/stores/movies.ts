/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { AddedMovie, OmdbSearchItem } from '@/types/omdb'
import { getMovieDetail, searchMovies } from '@/services/omdb'
import { parseRuntimeToMinutes } from '@/utils/format'

const LS_KEY = 'movies:v1'

export const useMoviesStore = defineStore('movies', () => {
  // Recherche
  const query = ref('')
  const searching = ref(false)
  const searchError = ref<string | null>(null)
  const results = ref<OmdbSearchItem[]>([])
  const resultsTotal = ref<number>(0)

  // Liste utilisateur
  const items = ref<AddedMovie[]>(loadFromStorage())

  // Getters
  const sortedItems = computed(() => [...items.value].sort((a, b) => b.addedAt - a.addedAt))
  const watchedItems = computed(() => sortedItems.value.filter((m) => m.watched))
  const watchedCount = computed(() => watchedItems.value.length)
  const watchedTotalMinutes = computed(() =>
    watchedItems.value.reduce((sum, m) => sum + (m.runtimeMinutes || 0), 0)
  )

  function persist() {
    localStorage.setItem(LS_KEY, JSON.stringify(items.value))
  }

  function loadFromStorage(): AddedMovie[] {
    try {
      const raw = localStorage.getItem(LS_KEY)
      if (!raw) return []
      const data = JSON.parse(raw) as AddedMovie[]
      return Array.isArray(data) ? data : []
    } catch {
      return []
    }
  }

  async function doSearch(q: string) {
    query.value = q.trim()
    results.value = []
    resultsTotal.value = 0
    searchError.value = null

    if (!query.value) return

    try {
      searching.value = true
      const res = await searchMovies(query.value, '1')
      if (res.Response === 'False') {
        searchError.value = res.Error || 'Aucun résultat'
        return
      }
      results.value = res.Search ?? []
      resultsTotal.value = Number(res.totalResults || 0)
    } catch (e: any) {
      searchError.value = e?.message || 'Erreur réseau'
    } finally {
      searching.value = false
    }
  }

  async function addFromSearch(item: OmdbSearchItem) {
    const exists = items.value.some((m) => m.id === item.imdbID)
    if (exists) return
    const detail = await getMovieDetail(item.imdbID)
    const minutes = parseRuntimeToMinutes(detail.Runtime)
    const movie: AddedMovie = {
      id: item.imdbID,
      title: item.Title,
      year: item.Year,
      runtimeMinutes: minutes,
      poster: item.Poster && item.Poster !== 'N/A' ? item.Poster : undefined,
      watched: false,
      addedAt: Date.now(),
    }
    items.value.push(movie)
    persist()
  }

  function toggleWatched(id: string) {
    const m = items.value.find((x) => x.id === id)
    if (!m) return
    m.watched = !m.watched
    persist()
  }

  function remove(id: string) {
    items.value = items.value.filter((x) => x.id !== id)
    persist()
  }

  return {
    // recherche
    query,
    searching,
    searchError,
    results,
    resultsTotal,
    doSearch,
    addFromSearch,

    // liste
    items,
    sortedItems,
    watchedItems,
    watchedCount,
    watchedTotalMinutes,
    toggleWatched,
    remove,
  }
})