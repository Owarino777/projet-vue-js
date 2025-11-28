import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import AchievementsPage from '@/pages/AchievementsPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomePage },
    { path: '/achievements', name: 'achievements', component: AchievementsPage },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: HomePage },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
