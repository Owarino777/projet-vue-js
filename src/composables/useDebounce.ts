import { ref, watch, type Ref } from 'vue'

export function useDebounce<T>(source: Ref<T>, delay = 300) {
  const debounced = ref(source.value) as Ref<T>
  let t: number | undefined
  watch(
    source,
    (v) => {
      if (t) window.clearTimeout(t)
      t = window.setTimeout(() => (debounced.value = v), delay)
    },
    { immediate: true }
  )
  return debounced
}

export function useDebouncedFn<F extends (...args: unknown[]) => void>(fn: F, delay = 300) {
  let t: number | undefined
  return (...args: Parameters<F>) => {
    if (t) window.clearTimeout(t)
    t = window.setTimeout(() => fn(...args), delay)
  }
}