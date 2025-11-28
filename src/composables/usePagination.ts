import { computed, ref } from 'vue'

export function usePagination(totalItems: () => number, pageSize = 5) {
  const page = ref(1)
  const pageCount = computed(() => Math.max(1, Math.ceil(totalItems() / pageSize)))
  const start = computed(() => (page.value - 1) * pageSize)
  const end = computed(() => start.value + pageSize)

  function to(p: number) {
    page.value = Math.min(Math.max(1, p), pageCount.value)
  }

  function next() {
    to(page.value + 1)
  }

  function prev() {
    to(page.value - 1)
  }

  return { page, pageCount, start, end, next, prev, to, pageSize }
}