<script lang="ts" setup>
const {
  label,
  description,
  checkbox,
  inline,
  size = 'medium'
} = defineProps<{
  label?: string;
  description?: string;
  checkbox?: boolean;
  inline?: boolean;
  size?: 'small' | 'medium' | 'large';
}>();
</script>

<template>
  <div class="form-group-wrapper" :class="{ [`size-${size}`]: true }">
    <label class="label" :class="{ checkbox, input: !checkbox, inline }">
      <span v-if="!checkbox" class="label-text">{{ label }}</span>
      <slot />
      <span v-if="checkbox">{{ label }}</span>
    </label>
    <div v-if="description" class="description" v-html="description"></div>
  </div>
</template>

<style scoped>
.form-group-wrapper {
  &.size-large {
    font-size: 1.2rem;
  }
}

.label {
  display: flex;
  flex-direction: column;
  gap: 4px;

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

.description {
  font-size: 0.8em;
  margin-top: 4px;
  color: var(--dimmed-foreground-color);
}
</style>
