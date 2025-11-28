<template>
  <ul class="achievements">
    <li
      v-for="a in entries"
      :key="a.id"
      class="achievements__item"
      :class="{ 'is-on': a.achieved }"
    >
      <span class="achievements__icon" v-html="iconSvg(a.icon)" aria-hidden="true"></span>
      <div>
        <div class="achievements__title">
          {{ a.label }}
        </div>
        <p class="achievements__desc text-muted">
          {{ a.description }}
        </p>
        <span class="achievements__state" :class="{ 'is-on': a.achieved }">
          {{ a.achieved ? 'Débloqué' : 'Non débloqué' }}
        </span>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAchievementsStore } from '@/stores/achievements'
import type { Stats, IconName } from '@/constants/achievements'   // <— récupère IconName

const props = defineProps<Stats>()
const store = useAchievementsStore()
const entries = computed(() =>
  store.getAllWithStatus({
    watchedCount: props.watchedCount,
    watchedMinutes: props.watchedMinutes,
  })
)

function iconSvg(name: IconName) {
  switch (name) {
    case 'star':
      return '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>'
    case 'trophy':
      return '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M6 2h12v3h3v3a5 5 0 0 1-5 5 6 6 0 0 1-4 1 6 6 0 0 1-4-1A5 5 0 0 1 3 8V5h3V2zm0 5H5v1a3 3 0 0 0 3 3V7H6zm12 0h-2v4a3 3 0 0 0 3-3V7zM9 20h6v2H9v-2zm1-4h4l1 2H9l1-2z"/></svg>'
    case 'hourglass':
      return '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M6 2h12v4l-4 4 4 4v6H6v-6l4-4-4-4V2z"/></svg>'
    case 'controller': // manette
      return '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M7 8l-2.5 5.5A2.5 2.5 0 0 0 6.8 17H9l2-2h2l2 2h2.2a2.5 2.5 0 0 0 2.3-3.5L17 8H7zm1.5 1.5h1.5v1.5H12v1.5h-2v2H8.5v-2h-2v-1.5h2v-1.5zm7.75.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-1.5 2.5a1 1 0 1 1 2.001.001A1 1 0 0 1 14.75 13.5z"/></svg>'
    case 'clapper': // clap cinéma
      return '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M4 4h3l2 4H6zM9 4h3l2 4h-3zM14 4h3l2 4h-3zM3 10h18v9H3z"/></svg>'
    case 'crown':
      return '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M3 7l3 4 4-6 4 6 3-4 3 10H3z"/></svg>'
    case 'fire':
      return '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M13 3s-1 2-1 4a3 3 0 0 0-3-3c0 4-3 5-3 9a7 7 0 0 0 14 0c0-4-3-6-3-10-2 0-3 2-4 4 0-2-0.5-3.5-1-4z"/></svg>'
    case 'medal':
      return '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M7 2h4l1 3 1-3h4l-3 6a5 5 0 1 1-4 0z"/></svg>'
    case 'ticket':
      return '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M4 7h16v3a2 2 0 0 0 0 4v3H4v-3a2 2 0 0 0 0-4z"/></svg>'
    case 'popcorn':
      return '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M7 5a3 3 0 0 1 5-2 3 3 0 0 1 5 2 2 2 0 0 1 1 2l-2 11H8L6 7a2 2 0 0 1 1-2z"/></svg>'
  }
}
</script>

<style scoped>
.achievements { padding-left: 0; margin: 0; display: grid; gap: var(--space-4); }
.achievements__item {
  list-style: none;
  display: grid;
  grid-template-columns: 22px 1fr;
  gap: var(--space-3);
  align-items: flex-start;
  padding: var(--space-2) 0;
  border-left: 4px solid var(--color-border);
}
.achievements__item.is-on {
  border-left-color: var(--color-success);
  background: color-mix(in srgb, var(--color-success) 12%, transparent);
  padding-left: var(--space-2);
  border-radius: 8px;
}
.achievements__icon { color: var(--color-text-muted); margin-top: 2px; }
.achievements__item.is-on .achievements__icon { color: var(--color-success); }
.achievements__title { font-weight: 600; }
.achievements__desc { margin: 2px 0 4px; font-size: var(--font-size-sm); }
.achievements__state {
  font-size: var(--font-size-sm);
  padding: 0 0.4rem;
  border-radius: 999px;
  border: 1px solid var(--color-border);
}
.achievements__state.is-on {
  border-color: var(--color-success);
  color: var(--color-success);
}
</style>