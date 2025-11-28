<template>
  <section aria-labelledby="search-title">
    <h2 id="search-title" class="visually-hidden">Recherche</h2>
    <div class="card" style="padding: var(--space-4);">
      <div style="max-width: 720px; margin: 0 auto;">
        <SearchBar v-model="q" :auto="true" :disabled="searching" @search="onSearch" />
        <p class="text-muted mb-2" aria-live="polite">
          <span v-if="q && !searching && !error">{{ filteredResults.length }} résultat(s)</span>
          <span v-if="error">{{ error }}</span>
        </p>

        <ul
          v-if="filteredResults.length"
          class="grid"
          style="gap: var(--space-3);"
          aria-label="Résultats de recherche"
        >
          <li
            v-for="r in filteredResults"
            :key="r.imdbID"
            class="card"
            style="padding: var(--space-3); list-style:none;"
          >
            <div class="flex items-center gap-4">
              <img
                v-if="r.Poster && r.Poster !== 'N/A'"
                :src="r.Poster"
                :alt="`Affiche de ${r.Title}`"
                loading="lazy"
                width="48"
                height="72"
                style="border-radius:6px; object-fit:cover;"
              />
              <div style="flex:1 1 auto;">
                <strong>{{ r.Title }}</strong>
                <div class="text-muted">{{ r.Year }}</div>
              </div>
              <AppButton size="sm" variant="primary" :aria-label="`Ajouter ${r.Title}`" @click="add(r)">
                Ajouter
              </AppButton>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>

  <MovieGrid
    class="mt-6"
    :movies="sorted"
    :watched-count="watchedCount"
    :watched-minutes="watchedMinutes"
    @toggle="toggle"
    @remove="removeMovie"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useMoviesStore } from '@/stores/movies'
import SearchBar from '@/components/molecules/SearchBar.vue'
import MovieGrid from '@/components/organisms/MovieGrid.vue'
import AppButton from '@/components/atoms/AppButton.vue'
import type { OmdbSearchItem } from '@/types/omdb'

const store = useMoviesStore()
const {
  query,
  searching,
  searchError,
  results,
  sortedItems,
  watchedCount,
  watchedTotalMinutes,
  items,              // <-- on récupère aussi la liste complète
} = storeToRefs(store)

const q = query
const error = searchError
const sorted = sortedItems
const watchedMinutes = watchedTotalMinutes

// Résultats filtrés : on enlève ceux déjà dans la watchlist
const filteredResults = computed(() =>
  results.value.filter((r) => !items.value.some((m) => m.id === r.imdbID))
)

function onSearch(v: string) {
  store.doSearch(v)
}

function add(r: OmdbSearchItem) {
  store.addFromSearch(r)
}

function toggle(id: string) {
  store.toggleWatched(id)
}

function removeMovie(id: string) {
  if (confirm('Supprimer ce film de votre watchlist ?')) {
    store.remove(id)
  }
}
</script>