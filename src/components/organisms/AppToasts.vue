<template>
  <section
    class="toasts"
    role="status"
    aria-live="polite"
    aria-atomic="true"
  >
    <TransitionGroup name="toast">
      <article
        v-for="t in toasts"
        :key="t.id"
        class="toast card"
        :class="[`toast--${t.variant || 'info'}`]"
      >
        <div class="toast__icon" aria-hidden="true" v-html="iconSvg(t.icon)"></div>
        <div class="toast__body">
          <strong>{{ t.title }}</strong>
          <div v-if="t.message" class="text-muted">{{ t.message }}</div>
        </div>
        <button class="toast__close" aria-label="Fermer" @click="remove(t.id)">✕</button>
      </article>
    </TransitionGroup>
  </section>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useToastsStore } from '@/stores/toasts'
import type { IconName } from '@/constants/achievements'

const toastStore = useToastsStore()
const { list: toasts } = storeToRefs(toastStore)
const { remove } = toastStore

function iconSvg(name?: IconName) {
  switch (name) {
    case 'star':
      return '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>'
    case 'trophy':
      return '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6 2h12v3h3v3a5 5 0 0 1-5 5 6 6 0 0 1-4 1 6 6 0 0 1-4-1A5 5 0 0 1 3 8V5h3V2zm0 5H5v1a3 3 0 0 0 3 3V7H6zm12 0h-2v4a3 3 0 0 0 3-3V7zM9 20h6v2H9v-2zm1-4h4l1 2H9l1-2z"/></svg>'
    case 'hourglass':
      return '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6 2h12v4l-4 4 4 4v6H6v-6l4-4-4-4V2zm2 4.83L11.17 10 8 13.17V20h8v-6.83L12.83 10 16 6.83V4H8v2.83z"/></svg>'
    case 'controller':
      return '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M7 8l-2.5 5.5A2.5 2.5 0 0 0 6.8 17H9l2-2h2l2 2h2.2a2.5 2.5 0 0 0 2.3-3.5L17 8H7z"/></svg>'
    case 'clapper':
      return '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M4 4h3l2 4H6zM9 4h3l2 4h-3zM14 4h3l2 4h-3zM3 10h18v9H3z"/></svg>'
    case 'crown':
      return '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3 7l3 4 4-6 4 6 3-4 3 10H3z"/></svg>'
    case 'fire':
      return '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M13 3s-1 2-1 4a3 3 0 0 0-3-3c0 4-3 5-3 9a7 7 0 0 0 14 0c0-4-3-6-3-10-2 0-3 2-4 4 0-2-0.5-3.5-1-4z"/></svg>'
    case 'medal':
      return '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M7 2h4l1 3 1-3h4l-3 6a5 5 0 1 1-4 0z"/></svg>'
    case 'ticket':
      return '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M4 7h16v3a2 2 0 0 0 0 4v3H4v-3a2 2 0 0 0 0-4z"/></svg>'
    case 'popcorn':
      return '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M7 5a3 3 0 0 1 5-2 3 3 0 0 1 5 2 2 2 0 0 1 1 2l-2 11H8L6 7a2 2 0 0 1 1-2z"/></svg>'
    default:
      return ''
  }
}
</script>

<style scoped>
.toasts {
  position: fixed;
  right: 16px;
  bottom: 16px;
  display: grid;
  gap: var(--space-2);
  z-index: 1000;
  max-width: min(92vw, 360px);
}
.toast {
  display: grid;
  grid-template-columns: 20px 1fr auto;
  gap: var(--space-3);
  align-items: start;
  padding: var(--space-3);
  border-left: 4px solid var(--color-border);
}
.toast__icon { color: var(--color-primary); margin-top: 2px; }
.toast--success { border-left-color: var(--color-success); }
.toast__close {
  background: transparent;
  border: none;
  color: var(--color-text-muted);
  cursor: pointer;
  font-size: 16px;
}
.toast-enter-active, .toast-leave-active { transition: all .18s ease; }
.toast-enter-from { opacity: 0; transform: translateY(8px); }
.toast-leave-to { opacity: 0; transform: translateY(8px); }
</style>