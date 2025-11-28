<template>
  <section>
    <header class="flex items-center gap-4" style="justify-content: space-between; margin-bottom: var(--space-4);">
      <div>
        <h2 style="margin:0;">Succès</h2>
        <p class="text-muted" style="margin: .25rem 0 0;">
          Tous les succès de CinéTrack. Les succès non débloqués apparaissent grisés, comme dans les jeux vidéo.
        </p>
      </div>
      <RouterLink to="/" class="text-muted" style="font-size: var(--font-size-sm);">
        ← Retour à l’accueil
      </RouterLink>
    </header>

    <div class="grid" style="gap: var(--space-4);">
      <article class="card">
        <header class="card-header">
          <h3 style="margin:0;">Progression</h3>
        </header>
        <div class="card-body">
          <p>
            <strong>{{ unlockedCount }}</strong> / {{ total }} succès débloqués
          </p>
          <div class="progress-bar">
            <div class="progress-bar__fill" :style="{ width: progress + '%' }"></div>
          </div>
        </div>
      </article>

      <article class="card">
        <header class="card-header">
          <h3 style="margin:0;">Tous les succès</h3>
        </header>
        <div class="card-body">
          <ul class="achievements-grid">
            <li
              v-for="a in entries"
              :key="a.id"
              class="achievement-tile"
              :class="{ 'achievement-tile--locked': !a.achieved }"
            >
              <div class="achievement-tile__icon" v-html="iconSvg(a.icon)" aria-hidden="true"></div>
              <div class="achievement-tile__content">
                <div class="achievement-tile__header">
                  <h4 class="achievement-tile__title">{{ a.label }}</h4>
                  <span class="achievement-tile__badge" :class="{ 'is-locked': !a.achieved }">
                    {{ a.achieved ? 'Débloqué' : 'Verrouillé' }}
                  </span>
                </div>
                <p class="achievement-tile__desc">{{ a.description }}</p>
              </div>
            </li>
          </ul>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useAchievementsStore } from '@/stores/achievements'
import { useMoviesStore } from '@/stores/movies'
import type { IconName } from '@/constants/achievements'

const achievementsStore = useAchievementsStore()
const moviesStore = useMoviesStore()

const entries = computed(() =>
  achievementsStore.getAllWithStatus({
    watchedCount: moviesStore.watchedCount,
    watchedMinutes: moviesStore.watchedTotalMinutes,
  })
)

const total = computed(() => entries.value.length)
const unlockedCount = computed(() => entries.value.filter((a) => a.achieved).length)
const progress = computed(() => (total.value ? Math.round((unlockedCount.value / total.value) * 100) : 0))

function iconSvg(name: IconName) {
  switch (name) {
    case 'star':
      return '<svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>'
    case 'trophy':
      return '<svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M6 2h12v3h3v3a5 5 0 0 1-5 5 6 6 0 0 1-4 1 6 6 0 0 1-4-1A5 5 0 0 1 3 8V5h3V2zm0 5H5v1a3 3 0 0 0 3 3V7H6zm12 0h-2v4a3 3 0 0 0 3-3V7zM9 20h6v2H9v-2zm1-4h4l1 2H9l1-2z"/></svg>'
    case 'hourglass':
      return '<svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M6 2h12v4l-4 4 4 4v6H6v-6l4-4-4-4V2z"/></svg>'
  }
}
</script>

<style scoped>
.achievements-grid {
  padding-left: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: var(--space-3);
}
.achievement-tile {
  list-style: none;
  display: grid;
  grid-template-columns: 40px 1fr;
  gap: var(--space-3);
  padding: var(--space-3);
  border-radius: 10px;
  border: 1px solid var(--color-border);
  background: linear-gradient(135deg, rgba(79, 124, 255, .12), transparent);
  box-shadow: 0 6px 18px rgba(0,0,0,.25);
}
.achievement-tile--locked {
  opacity: 0.45;
  filter: grayscale(0.8);
  background: linear-gradient(135deg, rgba(90, 90, 100, .25), transparent);
}
.achievement-tile__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary);
}
.achievement-tile--locked .achievement-tile__icon {
  color: var(--color-text-muted);
}
.achievement-tile__title {
  margin: 0;
  font-size: var(--font-size-lg);
}
.achievement-tile__desc {
  margin: 4px 0 0;
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}
.achievement-tile__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-2);
}
.achievement-tile__badge {
  font-size: var(--font-size-sm);
  padding: 0 0.5rem;
  border-radius: 999px;
  border: 1px solid var(--color-success);
  color: var(--color-success);
}
.achievement-tile__badge.is-locked {
  border-color: var(--color-border);
  color: var(--color-text-muted);
}

.progress-bar {
  margin-top: var(--space-2);
  border-radius: 999px;
  background: var(--color-surface-2);
  overflow: hidden;
  height: 10px;
}
.progress-bar__fill {
  height: 100%;
  background: linear-gradient(90deg, #4f7cff, #61d98b);
}
</style>