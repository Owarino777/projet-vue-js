<script setup lang="ts"></script>

<template>
  <div>
    <header class="container" role="banner" style="padding: var(--space-6) 0 var(--space-4);">
      <h1 style="margin: 0;">CinéTrack</h1>
      <p class="text-muted" style="margin: 0;">Recherche OMDb • Suivi de films • Statistiques</p>
    </header>
    <main id="main" class="container" role="main">
      <router-view />
    </main>
  </div>
</template>

<style scoped></style>
