<script lang="ts" setup>
import ColorPicker from '@/components/ColorPicker.vue';
import FormGroup from '@/components/FormGroup.vue';
import { useSettingsStore } from '@/stores/settings';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const {
  query: { backgroundColor: queryBackgroundColor, textColor: queryTextColor, hideOptions }
} = useRoute();
const settings = useSettingsStore();
const { setPreferences } = settings;

const backgroundColor = ref(
  (queryBackgroundColor && (('#' + queryBackgroundColor) as string)) ||
    settings.preferences.global.backgroundColor
);
const textColor = ref(
  (queryTextColor && (('#' + queryTextColor) as string)) || settings.preferences.global.textColor
);

const onChange = () => {
  setPreferences({
    ...settings.preferences,
    global: {
      ...settings.preferences.global,
      backgroundColor: backgroundColor.value,
      textColor: textColor.value
    }
  });
};
</script>

<template>
  <main class="overlay-layout">
    <div class="overlay" :style="{ backgroundColor, color: textColor }">
      <slot />
    </div>
    <div v-if="!hideOptions" class="options">
      <FormGroup label="Background color">
        <ColorPicker v-model="backgroundColor" @change="onChange" />
      </FormGroup>

      <FormGroup label="Text color">
        <ColorPicker v-model="textColor" @change="onChange" />
      </FormGroup>

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
}
</style>
