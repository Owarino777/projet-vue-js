<template>
  <li class="movie">
    <div
      class="movie__btn"
      :class="{ 'is-watched': movie.watched }"
      role="button"
      tabindex="0"
      :aria-pressed="movie.watched ? 'true' : 'false'"
      :aria-label="movie.watched ? 'Marquer comme non regardé' : 'Marquer comme regardé'"
      @click="onToggle"
      @keydown.enter.prevent="onToggle"
      @keydown.space.prevent="onToggle"
    >
      <div class="movie__main">
        <strong class="movie__title">{{ movie.title }}</strong>
        <span class="text-muted">{{ movie.runtimeMinutes }} min</span>
      </div>
      <div class="movie__tags">
        <AppBadge v-if="movie.watched">Regardé</AppBadge>
        <AppButton
          size="sm"
          variant="ghost"
          aria-label="Supprimer"
          @click.stop="$emit('remove', movie.id)"
        >✕</AppButton>
      </div>
    </div>
  </li>
</template>

<script setup lang="ts">
import AppBadge from '@/components/atoms/AppBadge.vue'
import AppButton from '@/components/atoms/AppButton.vue'
import type { AddedMovie } from '@/types/omdb'

const props = defineProps<{ movie: AddedMovie }>()
const emit = defineEmits<{ (e: 'toggle', id: string): void; (e: 'remove', id: string): void }>()
function onToggle() {
  emit('toggle', props.movie.id)
}
</script>

<style scoped>
.movie { list-style: none; }
.movie__btn {
  width: 100%;
  text-align: left;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  border-radius: 8px;
  padding: var(--space-3);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-3);
  transition: background .15s ease, border-color .15s ease;
  cursor: pointer;
}
.movie__btn:hover { background: var(--color-surface-2); }
.movie__btn.is-watched {
  border-color: var(--color-success);
  background: color-mix(in srgb, var(--color-success) 18%, transparent);
}
@media (prefers-color-scheme: light) {
  .movie__btn.is-watched {
    background: color-mix(in srgb, var(--color-success) 12%, var(--color-surface));
  }
}
.movie__main { display: flex; gap: var(--space-2); align-items: baseline; }
.movie__title { font-weight: 600; }
.movie__tags { display: flex; gap: var(--space-2); align-items: center; }
</style>