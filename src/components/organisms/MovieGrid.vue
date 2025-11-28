<template>
  <section class="grid grid-3 mt-6" aria-label="Tableau de bord">
    <!-- Carte 1: Mes films -->
    <article class="card">
      <header class="card-header">
        <h2 style="margin:0;">Mes films</h2>
        <p class="text-muted" style="margin:.25rem 0 0;">Clique un film pour basculer l’état “regardé”.</p>
      </header>
      <div class="card-body">
        <ul v-if="pageItems.length > 0" class="grid" style="gap: var(--space-3);" aria-live="polite">
          <MovieCard
            v-for="m in pageItems"
            :key="m.id"
            :movie="m"
            @toggle="$emit('toggle', $event)"
            @remove="$emit('remove', $event)"
          />
        </ul>
        <p v-else class="text-muted">Aucun film ajouté pour l’instant.</p>
        <hr class="hr" />
        <div class="flex items-center gap-4">
          <Pagination :page="page" :pageCount="pageCount" @prev="prev" @next="next" />
          <span class="text-muted">{{ total }} film(s)</span>
        </div>
      </div>
    </article>

    <!-- Carte 2: Statistiques -->
    <article class="card">
      <header class="card-header">
        <h2 style="margin:0;">Statistiques</h2>
      </header>
      <div class="card-body">
        <p><strong>{{ watchedCount }}</strong> film(s) regardé(s)</p>
        <p>Durée totale: <strong>{{ totalFormatted }}</strong></p>
      </div>
    </article>

    <!-- Carte 3: Succès -->
    <article class="card">
      <header class="card-header">
        <h2 style="margin:0;">Succès</h2>
      </header>
      <div class="card-body">
        <ul>
          <li>
            <span class="badge" :aria-pressed="watchedCount>=1">Première séance</span>
            <span class="text-muted"> — Regarder 1 film</span>
          </li>
          <li class="mt-4">
            <span class="badge" :aria-pressed="watchedCount>=5">Marathon</span>
            <span class="text-muted"> — Regarder 5 films</span>
          </li>
          <li class="mt-4">
            <span class="badge" :aria-pressed="watchedMinutes>=600">10 heures</span>
            <span class="text-muted"> — 600 minutes</span>
          </li>
        </ul>
      </div>
    </article>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Pagination from '@/components/molecules/Pagination.vue'
import MovieCard from '@/components/molecules/MovieCard.vue'
import type { AddedMovie } from '@/types/omdb'
import { usePagination } from '@/composables/usePagination'
import { minutesToHhMm } from '@/utils/format'

const props = defineProps<{
  movies: AddedMovie[]
  watchedCount: number
  watchedMinutes: number
}>()

defineEmits<{ (e: 'toggle', id: string): void; (e: 'remove', id: string): void }>()

const total = computed(() => props.movies.length)
const { page, pageCount, start, end, next, prev } = usePagination(() => total.value, 5)
const pageItems = computed(() => props.movies.slice(start.value, end.value))
const totalFormatted = computed(() => minutesToHhMm(props.watchedMinutes))
</script>