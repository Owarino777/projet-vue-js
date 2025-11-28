<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <nav class="flex items-center gap-2" role="navigation" aria-label="Pagination">
    <AppButton size="sm" variant="ghost" aria-label="Page précédente" :disabled="page<=1" @click="$emit('prev')">
      ←
    </AppButton>
    <span aria-live="polite" class="text-muted">Page {{ page }} / {{ pageCount }}</span>
    <AppButton size="sm" variant="ghost" aria-label="Page suivante" :disabled="page>=pageCount" @click="$emit('next')">
      →
    </AppButton>
  </nav>
</template>

<script setup lang="ts">
import AppButton from '@/components/atoms/AppButton.vue'
defineProps<{ page: number; pageCount: number }>()
defineEmits<{ (e: 'prev'): void; (e: 'next'): void }>()
</script>