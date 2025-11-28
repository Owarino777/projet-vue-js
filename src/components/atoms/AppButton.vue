<template>
  <button
    :type="type"
    class="app-btn"
    :class="[`app-btn--${variant}`, `app-btn--${size}`]"
    :aria-label="ariaLabel"
    :disabled="disabled"
    @click.stop="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
defineProps<{
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'ghost'
  size?: 'sm' | 'md'
  ariaLabel?: string
  disabled?: boolean
}>()

defineEmits<{ (e: 'click', ev: MouseEvent): void }>()
</script>

<style scoped>
.app-btn {
  border: 1px solid var(--color-border);
  background: var(--color-surface-2);
  color: var(--color-text);
  border-radius: 8px;
  cursor: pointer;
  transition: background .15s ease, border-color .15s ease, color .15s ease;
}
.app-btn:disabled { opacity: .6; cursor: not-allowed; }

.app-btn--primary {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: var(--color-primary-contrast);
}
.app-btn--primary:hover:not(:disabled) {
  background: var(--color-primary-hover);
  border-color: var(--color-primary-hover);
}

.app-btn--ghost {
  background: transparent;
}

.app-btn--sm { padding: 6px 10px; font-size: var(--font-size-sm); }
.app-btn--md { padding: 10px 14px; font-size: var(--font-size-base); }

/* On garde un hover léger pour le reste */
.app-btn:hover:not(:disabled) {
  /* pas de filter ici pour ne pas casser le contraste des variantes */
}
</style>