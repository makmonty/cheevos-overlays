<script lang="ts" setup>
const {
  type = 'button',
  variant = 'button',
  size = 'medium'
} = defineProps<{
  type?: 'button' | 'submit';
  variant?: 'button' | 'text';
  size?: 'small' | 'medium' | 'large';
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
    :class="{ [`variant-${variant}`]: true, [`size-${size}`]: true }"
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
  padding: 0 12px;
  height: 30px;
  cursor: pointer;

  &[disabled] {
    background-color: var(--disabled-color);
  }

  &.variant-text {
    background: none;
    text-decoration: underline;
    padding: 0;
    font-size: inherit;
    height: max-content;
    color: var(--anchor-color);
  }

  &.size-large {
    font-size: 1.2rem;
    height: 40px;
    padding: 0 16px;
  }

  &.size-small {
    font-size: 0.9rem;
    height: 26px;
  }
}
</style>
