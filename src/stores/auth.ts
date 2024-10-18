import { useGetUserSummary } from '@/composables/cheevosApi';
import type { UserSummary } from '@/composables/types';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

export const WEB_API_KEY_STORAGE_KEY = 'WEB_API_KEY';
export const USERNAME_STORAGE_KEY = 'USERNAME';
export const USER_PROFILE_STORAGE_KEY = 'USER_PROFILE';

export const useAuthStore = defineStore('auth', () => {
  const { query } = useRoute();
  const { data, run: fetchSummary, isLoading, isSuccess, isError, error } = useGetUserSummary();

  const webApiKey = ref(
    (query.webApiKey as string) || localStorage.getItem(WEB_API_KEY_STORAGE_KEY) || ''
  );
  const username = ref(
    (query.username as string) || localStorage.getItem(USERNAME_STORAGE_KEY) || ''
  );
  const profile = ref<UserSummary | null>(
    JSON.parse(localStorage.getItem(USER_PROFILE_STORAGE_KEY) || 'null')
  );

  const setProfile = (newValue: UserSummary | null) => {
    profile.value = newValue;
    localStorage.setItem(USER_PROFILE_STORAGE_KEY, JSON.stringify(newValue));
  };

  const setCredentials = (newUsername: string, newWebApiKey: string) => {
    username.value = newUsername;
    webApiKey.value = newWebApiKey;
    localStorage.setItem(USERNAME_STORAGE_KEY, username.value);
    localStorage.setItem(WEB_API_KEY_STORAGE_KEY, webApiKey.value);
  };

  const login = async () => {
    await fetchSummary(username.value);

    if (isError.value) {
      return;
    }

    profile.value = data.value;

    localStorage.setItem(USER_PROFILE_STORAGE_KEY, JSON.stringify(data.value));
  };

  const logout = () => {
    webApiKey.value = '';
    username.value = '';
    profile.value = null;
    localStorage.removeItem(WEB_API_KEY_STORAGE_KEY);
    localStorage.removeItem(USERNAME_STORAGE_KEY);
    localStorage.removeItem(USER_PROFILE_STORAGE_KEY);
  };

  return {
    webApiKey,
    username,
    profile,
    error,
    isLoading,
    isSuccess,
    isError,
    login,
    logout,
    setProfile,
    setCredentials
  };
});
