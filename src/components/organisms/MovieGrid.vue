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
            @toggle="$emit('toggle', m.id)"
            @remove="$emit('remove', m.id)"
          />
        </ul>
        <p v-else class="text-muted">Aucun film ajouté pour l’instant.</p>
        <hr class="hr" />
        <div class="flex items-center gap-4">
          <span class="text-muted">{{ movies.length }} film(s)</span>
          <Pagination :page="page" :page-count="pageCount" @prev="prev" @next="next" />
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
        <p><strong>{{ totalFormatted }}</strong> de visionnage cumulé</p>
      </div>
    </article>

    <!-- Carte 3: Succès -->
    <article class="card">
      <header class="card-header">
        <h2 style="margin:0;">Derniers succès</h2>
        <p class="text-muted" style="margin:.25rem 0 0;">Les 5 derniers succès débloqués.</p>
      </header>
      <div class="card-body">
        <ul v-if="lastAchievements.length" class="achievements-mini">
          <li
            v-for="a in lastAchievements"
            :key="a.id"
            class="achievements-mini__item"
          >
            <span class="achievements-mini__icon" v-html="iconSvg(a.icon)" aria-hidden="true"></span>
            <div>
              <div class="achievements-mini__title">{{ a.label }}</div>
              <p class="text-muted" style="margin:2px 0 0; font-size: var(--font-size-sm);">
                {{ a.description }}
              </p>
            </div>
          </li>
        </ul>
        <p v-else class="text-muted">Aucun succès débloqué pour l’instant.</p>
        <hr class="hr" />
        <RouterLink to="/achievements" class="text-muted" style="font-size: var(--font-size-sm);">
          Voir tous les succès →
        </RouterLink>
      </div>
    </article>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import Pagination from '@/components/molecules/Pagination.vue'
import MovieCard from '@/components/molecules/MovieCard.vue'
import type { AddedMovie } from '@/types/omdb'
import { usePagination } from '@/composables/usePagination'
import { minutesToHhMm } from '@/utils/format'
import { useAchievementsStore } from '@/stores/achievements'
import type { IconName } from '@/constants/achievements'

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

// 5 derniers succès débloqués
const achievementsStore = useAchievementsStore()
const lastAchievements = computed(() => achievementsStore.getLastUnlocked(5))

function iconSvg(name: IconName) {
  switch (name) {
    case 'star':
      return '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>'
    case 'trophy':
      return '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M6 2h12v3h3v3a5 5 0 0 1-5 5 6 6 0 0 1-4 1 6 6 0 0 1-4-1A5 5 0 0 1 3 8V5h3V2zm0 5H5v1a3 3 0 0 0 3 3V7H6zm12 0h-2v4a3 3 0 0 0 3-3V7zM9 20h6v2H9v-2zm1-4h4l1 2H9l1-2z"/></svg>'
    case 'hourglass':
      return '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M6 2h12v4l-4 4 4 4v6H6v-6l4-4-4-4V2z"/></svg>'
  }
}
</script>

<style scoped>
.achievements-mini {
  padding-left: 0;
  margin: 0;
  display: grid;
  gap: var(--space-3);
}
.achievements-mini__item {
  list-style: none;
  display: grid;
  grid-template-columns: 20px 1fr;
  gap: var(--space-2);
  align-items: flex-start;
}
.achievements-mini__icon {
  color: var(--color-primary);
  margin-top: 2px;
}
.achievements-mini__title {
  font-weight: 600;
  font-size: var(--font-size-sm);
}
</style>