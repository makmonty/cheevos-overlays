<script lang="ts" setup>
import BaseButton from './BaseButton.vue';
</script>

<template>
  <BaseButton class="icon-button">
    <slot />
  </BaseButton>
</template>

<style scoped>
.icon-button {
  padding: 0;
  height: 30px;
  width: 30px;
}
</style>
