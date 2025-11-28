import { defineStore } from 'pinia'
import { ref } from 'vue'
import { ACHIEVEMENTS, type Stats, type AchievementDef } from '@/constants/achievements'

const LS_KEY = 'achievements:v1'
const LS_KEY_HISTORY = 'achievements-history:v1'

export interface UnlockedEntry {
  id: string
  unlockedAt: number
}

export const useAchievementsStore = defineStore('achievements', () => {
  const unlocked = ref<string[]>(loadUnlocked())
  const history = ref<UnlockedEntry[]>(loadHistory())

  function loadUnlocked() {
    try {
      const raw = localStorage.getItem(LS_KEY)
      return raw ? (JSON.parse(raw) as string[]) : []
    } catch {
      return []
    }
  }

  function loadHistory(): UnlockedEntry[] {
    try {
      const raw = localStorage.getItem(LS_KEY_HISTORY)
      return raw ? (JSON.parse(raw) as UnlockedEntry[]) : []
    } catch {
      return []
    }
  }

  function persist() {
    localStorage.setItem(LS_KEY, JSON.stringify(unlocked.value))
    localStorage.setItem(LS_KEY_HISTORY, JSON.stringify(history.value))
  }

  function isUnlocked(id: string) {
    return unlocked.value.includes(id)
  }

  function unlock(id: string) {
    if (!isUnlocked(id)) {
      unlocked.value.push(id)
      history.value.push({ id, unlockedAt: Date.now() })
      persist()
    }
  }

  function checkAndUnlock(stats: Stats): AchievementDef[] {
    const newly: AchievementDef[] = []
    for (const a of ACHIEVEMENTS) {
      if (a.check(stats) && !isUnlocked(a.id)) {
        unlock(a.id)
        newly.push(a)
      }
    }
    return newly
  }

  function getAllWithStatus(stats: Stats) {
    return ACHIEVEMENTS.map((a) => ({
      ...a,
      achieved: a.check(stats),
    }))
  }

  function getLastUnlocked(limit = 5): AchievementDef[] {
    const sorted = [...history.value].sort((a, b) => b.unlockedAt - a.unlockedAt)
    const ids = sorted.slice(0, limit).map((e) => e.id)
    return ids
      .map((id) => ACHIEVEMENTS.find((a) => a.id === id))
      .filter((a): a is AchievementDef => !!a)
  }

  return { unlocked, history, isUnlocked, unlock, checkAndUnlock, getAllWithStatus, getLastUnlocked }
})