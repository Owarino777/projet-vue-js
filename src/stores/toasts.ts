import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { IconName } from '@/constants/achievements'

export interface Toast {
  id: number
  title: string
  message?: string
  icon?: IconName
  variant?: 'success' | 'info'
  timeout?: number
}

let seed = 1

export const useToastsStore = defineStore('toasts', () => {
  const list = ref<Toast[]>([])

  function push(t: Omit<Toast, 'id'>) {
    const toast: Toast = { id: seed++, timeout: 3500, variant: 'info', ...t }
    list.value.push(toast)
    if (toast.timeout && toast.timeout > 0) {
      setTimeout(() => remove(toast.id), toast.timeout)
    }
    return toast.id
  }

  function success(title: string, message?: string, icon?: IconName) {
    return push({ title, message, icon, variant: 'success' })
  }

  function remove(id: number) {
    list.value = list.value.filter((t) => t.id !== id)
  }

  return { list, push, success, remove }
})