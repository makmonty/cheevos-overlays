import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const PREFERENCES_STORAGE_KEY = 'PREFERENCES';

interface GlobalPreferences {
  backgroundColor: string;
  textColor: string;
  gameId: string;
  autoRefresh: boolean;
  autoRefreshFrequency: number;
}

interface ProgressPreferences {
  hideLocked: boolean;
}

interface ProfilePreferences {
  avatarScale: number;
  hideMotto: boolean;
  hideRank: boolean;
  hidePoints: boolean;
  hideAvatar: boolean;
  hideUsername: boolean;
}

interface Preferences {
  global: GlobalPreferences;
  progress: ProgressPreferences;
  profile: ProfilePreferences;
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
    autoRefresh: true,
    autoRefreshFrequency: 5,
    gameId: ''
  },
  progress: {
    hideLocked: false
  },
  profile: {
    avatarScale: 1,
    hideMotto: false,
    hideRank: false,
    hidePoints: false,
    hideAvatar: false,
    hideUsername: false
  }
};

export const useSettingsStore = defineStore('settings', () => {
  const { query } = useRoute();
  const storedPreferences =
    JSON.parse(localStorage.getItem(PREFERENCES_STORAGE_KEY) || 'null') || {};
  const queryPreferences = {
    global: {
      ...(query.backgroundColor ? { backgroundColor: '#' + query.backgroundColor } : {}),
      ...(query.textColor ? { textColor: '#' + query.textColor } : {}),
      ...(query.autoRefresh ? { autoRefresh: !!query.autoRefresh } : {}),
      ...(query.autoRefreshFrequency
        ? { autoRefreshFrequency: parseInt(query.autoRefreshFrequency as string) }
        : {}),
      ...(query.gameId ? { gameId: query.gameId } : {})
    },
    progress: {
      ...(query.hideLocked ? { hideLocked: query.hideLocked } : {})
    },
    profile: {
      ...(query.avatarScale ? { avatarScale: parseInt(query.avatarScale as string) } : {}),
      ...(query.hideMotto ? { hideMotto: !!query.hideMotto } : {}),
      ...(query.hideRank ? { hideRank: !!query.hideRank } : {}),
      ...(query.hidePoints ? { hidePoints: !!query.hidePoints } : {}),
      ...(query.hideAvatar ? { hideAvatar: !!query.hideAvatar } : {}),
      ...(query.hideUsername ? { hideUsername: !!query.hideUsername } : {})
    }
  };

  const preferences = ref<Preferences>(
    deepMerge({}, defaultPreferences, storedPreferences, queryPreferences)
  );

  function setPreferences(newValue: Preferences) {
    preferences.value = newValue;
    localStorage.setItem(PREFERENCES_STORAGE_KEY, JSON.stringify(newValue));
  }

  return {
    preferences,
    setPreferences
  };
});
