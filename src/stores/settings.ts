import { defineStore } from 'pinia';
import { ref } from 'vue';

const PREFERENCES_STORAGE_KEY = 'PREFERENCES';

interface Preferences {
  global: {
    backgroundColor: string;
    textColor: string;
    gameId: string;
    autoRefresh: boolean;
    autoRefreshFrequency: number;
  };
  progress: {
    hideLocked: boolean;
  };
}

function isObject(item: any) {
  return item && typeof item === 'object' && !Array.isArray(item);
}

function deepMerge(target: any, ...sources: any[]) {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        deepMerge(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return deepMerge(target, ...sources);
}

export const defaultPreferences: Preferences = {
  global: {
    backgroundColor: '#ff00ff',
    textColor: '#000000',
    autoRefresh: false,
    autoRefreshFrequency: 5,
    gameId: ''
  },
  progress: {
    hideLocked: false
  }
};

export const useSettingsStore = defineStore('settings', () => {
  const storedPreferences =
    JSON.parse(localStorage.getItem(PREFERENCES_STORAGE_KEY) || 'null') || {};
  const preferences = ref<Preferences>(deepMerge({}, defaultPreferences, storedPreferences));

  function setPreferences(newValue: Preferences) {
    preferences.value = newValue;
    localStorage.setItem(PREFERENCES_STORAGE_KEY, JSON.stringify(newValue));
  }

  const getPreference = (context: keyof Preferences, key: string) => {
    return preferences.value[context][key] || preferences.value.global[key];
  };

  return {
    preferences,
    setPreferences
  };
});
