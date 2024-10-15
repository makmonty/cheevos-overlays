<script lang="ts" setup>
const { type = 'button', variant = 'button' } = defineProps<{
  type?: 'button' | 'submit';
  variant?: 'button' | 'text';
  disabled?: boolean;
}>();

const emit = defineEmits<{
  (e: 'click'): void;
}>();
</script>

<template>
  <button
    :type="type"
    class="button"
    :class="{ [`variant-${variant}`]: true }"
    :disabled="disabled"
    @click="() => emit('click')"
  >
    <slot />
  </button>
</template>

<style scoped>
.button {
  border: 1px solid transparent;
  background: var(--info-color);
  border-radius: var(--default-border-radius);
  color: var(--foreground-color);
  padding: 0 16px;
  height: 30px;
  cursor: pointer;

  &.variant-text {
    background: none;
    text-decoration: underline;
    padding: 0;
    font-size: inherit;
    height: max-content;
    color: var(--anchor-color);
  }

  &[disabled] {
    background-color: var(--disabled-color);
  }
}
</style>
