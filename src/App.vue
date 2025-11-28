<script setup lang="ts">
import { watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useMoviesStore } from '@/stores/movies'
import { useAchievementsStore } from '@/stores/achievements'
import { useToastsStore } from '@/stores/toasts'
import { RouterLink } from 'vue-router'

const movies = useMoviesStore()
const achievements = useAchievementsStore()
const toasts = useToastsStore()

const { watchedCount, watchedTotalMinutes } = storeToRefs(movies)

watch(
  [watchedCount, watchedTotalMinutes],
  ([c, m]) => {
    const newly = achievements.checkAndUnlock({ watchedCount: c, watchedMinutes: m })
    for (const a of newly) {
      toasts.success('Succès débloqué !', a.label, a.icon)
    }
  },
  { immediate: true }
)
</script>

<template>
  <div>
    <header class="container" role="banner" style="padding: var(--space-6) 0 var(--space-4);">
      <div class="flex items-center" style="justify-content: space-between;">
        <div>
          <h1 style="margin: 0;">CinéTrack</h1>
          <p class="text-muted" style="margin: 0;">Recherche OMDb • Suivi de films • Statistiques</p>
        </div>
        <nav class="flex items-center gap-4" aria-label="Navigation principale">
          <RouterLink to="/" class="text-muted">Accueil</RouterLink>
          <RouterLink to="/achievements" class="text-muted">Succès</RouterLink>
        </nav>
      </div>
    </header>
    <main id="main" class="container" role="main">
      <router-view />
    </main>

    <AppToasts />
  </div>
</template>

<style scoped></style>
