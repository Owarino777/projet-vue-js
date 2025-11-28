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
import type { Stats } from '@/constants/achievements'

const props = defineProps<Stats>()
const store = useAchievementsStore()
const entries = computed(() =>
  store.getAllWithStatus({
    watchedCount: props.watchedCount,
    watchedMinutes: props.watchedMinutes,
  })
)

function iconSvg(name: 'star' | 'trophy' | 'hourglass') {
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