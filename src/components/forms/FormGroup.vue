<script lang="ts" setup>
const {
  label,
  checkbox,
  inline,
  size = 'medium'
} = defineProps<{
  label?: string;
  checkbox?: boolean;
  inline?: boolean;
  size?: 'small' | 'medium' | 'large';
}>();
</script>

<template>
  <label class="label" :class="{ checkbox, input: !checkbox, [`size-${size}`]: true, inline }">
    <span v-if="!checkbox" class="label-text">{{ label }}</span>
    <slot />
    <span v-if="checkbox">{{ label }}</span>
  </label>
</template>

<style scoped>
.label {
  display: flex;
  flex-direction: column;
  gap: 4px;

  &.size-large {
    font-size: 1.2rem;
  }

  &.checkbox,
  &.inline {
    flex-direction: row;
    align-items: center;
  }

  &.inline {
    gap: 8px;
  }

  .input {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
}
.label-text {
  display: block;
}
</style>
