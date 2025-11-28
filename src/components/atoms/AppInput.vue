<template>
  <div class="field">
    <label :for="id" class="label">
      <slot name="label">{{ label }}</slot>
    </label>
    <div class="control">
      <input
        :id="id"
        :name="name || id"
        :type="type"
        :placeholder="placeholder"
        :value="modelValue"
        :inputmode="inputmode"
        :autocomplete="autocomplete"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        class="input"
      />
    </div>
    <p v-if="hint" class="hint text-muted" :id="`${id}-hint`">{{ hint }}</p>
  </div>
</template>

<script setup lang="ts">
type InputType = 'text' | 'search' | 'email' | 'tel' | 'url'
type InputMode = 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url'  

defineProps<{
  id: string
  label: string
  modelValue: string
  name?: string
  type?: InputType
  placeholder?: string
  hint?: string
  inputmode?: InputMode
  autocomplete?: string
}>()

defineEmits<{ (e: 'update:modelValue', v: string): void }>()
</script>

<style scoped>
.label { display: inline-block; margin-bottom: var(--space-2); font-weight: 600; }
.input {
  width: 100%;
  border-radius: 8px;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-text);
  padding: 10px 12px;
}
.hint { margin-top: var(--space-2); font-size: var(--font-size-sm); }
</style>