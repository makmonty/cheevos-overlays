<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
</script>

<template>
  <div>
    <NavBar />
    <main class="default-layout">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.default-layout {
  height: 100%;
  padding: 32px;
}
</style>
