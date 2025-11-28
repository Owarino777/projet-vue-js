<template>
  <form class="search" @submit.prevent="onSubmit" role="search" aria-label="Recherche de films">
    <AppInput
      id="q"
      label="Rechercher un film"
      v-model="local"
      placeholder="Ex: Inception"
      autocomplete="off"
    />
    <AppButton
      type="submit"
      variant="primary"
      size="md"
      aria-label="Lancer la recherche"
      :disabled="disabled"
    >
      Rechercher
    </AppButton>
  </form>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import AppInput from '@/components/atoms/AppInput.vue'
import AppButton from '@/components/atoms/AppButton.vue'
import { useDebouncedFn } from '@/composables/useDebounce'

const props = defineProps<{ modelValue: string; auto?: boolean; disabled?: boolean }>()
const emit = defineEmits<{
  (e: 'update:modelValue', v: string): void
  (e: 'search', v: string): void
}>()

const local = ref(props.modelValue)
watch(
  () => props.modelValue,
  (v) => (local.value = v)
)
watch(local, (v) => emit('update:modelValue', v))

const debounced = useDebouncedFn(() => emit('search', local.value), 400)
function onSubmit() {
  emit('search', local.value)
}
watch(
  () => local.value,
  () => {
    if (props.auto) debounced()
  }
)
</script>

<style scoped>
.search {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: var(--space-3);
  align-items: end;
}
</style>