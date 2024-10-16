<script lang="ts" setup>
import BaseButton from '@/components/buttons/BaseButton.vue';
import BaseInput from '@/components/forms/BaseInput.vue';
import ColorPicker from '@/components/forms/ColorPicker.vue';
import FormGroup from '@/components/forms/FormGroup.vue';
import { useSettingsStore } from '@/stores/settings';
import { onUnmounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const { refresh } = defineProps<{
  refresh?: () => void;
}>();

const {
  query: {
    backgroundColor: queryBackgroundColor,
    textColor: queryTextColor,
    autoRefresh: queryAutoRefresh,
    autoRefreshFrequency: queryAutoRefreshFrequency,
    hideOptions
  }
} = useRoute();
const settings = useSettingsStore();
const { setPreferences } = settings;

// Colors
const backgroundColor = ref(
  (queryBackgroundColor && (('#' + queryBackgroundColor) as string)) ||
    settings.preferences.global.backgroundColor
);
const textColor = ref(
  (queryTextColor && (('#' + queryTextColor) as string)) || settings.preferences.global.textColor
);

// Auto refresh
let refreshTimeout: any;

const startRefreshTimeout = () => {
  if (refresh) {
    refreshTimeout = setInterval(refresh, autoRefreshFrequency.value * 1000);
  }
};
const clearRefreshTimeout = () => clearInterval(refreshTimeout);

const autoRefresh = ref(
  queryAutoRefresh !== undefined ? !!queryAutoRefresh : settings.preferences.global.autoRefresh
);

const autoRefreshFrequency = ref(
  parseInt((queryAutoRefreshFrequency as string) || '0') ||
    settings.preferences.global.autoRefreshFrequency
);

if (autoRefresh.value) {
  startRefreshTimeout();
}

const onChange = () => {
  setPreferences({
    ...settings.preferences,
    global: {
      ...settings.preferences.global,
      backgroundColor: backgroundColor.value,
      textColor: textColor.value,
      autoRefresh: autoRefresh.value,
      autoRefreshFrequency: autoRefreshFrequency.value
    }
  });
};

const onChangeAutoRefresh = () => {
  if (!autoRefresh.value || !autoRefreshFrequency.value) {
    clearRefreshTimeout();
  } else if (refresh) {
    refresh();
    startRefreshTimeout();
  }
  onChange();
};

const onChangeAutoRefreshFrequency = () => {
  clearRefreshTimeout();
  startRefreshTimeout();
  onChange();
};

onUnmounted(clearRefreshTimeout);
</script>

<template>
  <main class="overlay-layout">
    <div class="overlay" :style="{ backgroundColor, color: textColor }">
      <slot />
    </div>
    <div v-if="!hideOptions" class="options">
      <router-link :to="{ name: 'catalog' }">&lt; Back to catalog</router-link>
      <div class="refresh-options" v-if="refresh">
        <BaseButton size="large" @click="refresh()">Refresh</BaseButton>
        <FormGroup label="Auto refresh?" checkbox>
          <input type="checkbox" v-model="autoRefresh" @change="onChangeAutoRefresh" />
        </FormGroup>

        <form @submit.prevent="onChangeAutoRefreshFrequency" class="frequency-form">
          <FormGroup v-if="autoRefresh" label="Frequency" inline>
            <BaseInput type="number" v-model="autoRefreshFrequency">
              <template #suffix>
                <BaseButton type="submit">Set</BaseButton>
              </template>
            </BaseInput>
          </FormGroup>
        </form>
      </div>
      <div class="color-options">
        <FormGroup label="Background color">
          <ColorPicker v-model="backgroundColor" @change="onChange" />
        </FormGroup>

        <FormGroup label="Text color">
          <ColorPicker v-model="textColor" @change="onChange" />
        </FormGroup>
      </div>

      <slot name="options" />
    </div>
  </main>
</template>

<style scoped>
.overlay-layout {
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.overlay {
  color: var(--background-color);
  flex-grow: 1;
  padding-bottom: 64px;
}

.options {
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: start;
}

.refresh-options {
  display: flex;
  gap: 32px;
  align-items: center;
}

.frequency-form :deep(input) {
  width: 50px;
}

.color-options {
  display: flex;
  gap: 32px;
}
</style>
