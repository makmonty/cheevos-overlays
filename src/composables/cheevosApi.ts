import { ref } from 'vue';
import { type GameProgress, type Game, type UserProfile, type UserSummary } from './types';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { paramsToQueryString } from '@/utils/url';
import { cheevosBaseUrl } from '@/utils/config';

export class CredentialsError extends Error {}

export const useCheevosGet = <DataT>() => {
  const data = ref<DataT | null>(null);
  const isLoading = ref(false);
  const isSuccess = ref(false);
  const isError = ref(false);
  const error = ref('');

  const run = async (action: string, params: Record<string, string> = {}) => {
    const auth = useAuthStore();
    const { username, webApiKey } = storeToRefs(auth);

    try {
      isLoading.value = true;
      const query = paramsToQueryString({
        ...params,
        y: webApiKey.value || '',
        z: username.value || ''
      });
      const response = await fetch(`${cheevosBaseUrl}/API/API_${action}.php?${query}`);
      if (!response.ok) {
        if (response.status === 401) {
          throw new CredentialsError('Wrong credentials');
        }
        throw new Error('Server error');
      }

      data.value = await response.json();
      error.value = '';
      isSuccess.value = true;
      isError.value = false;
    } catch (e) {
      error.value = (e as Error).message;
      isSuccess.value = false;
      isError.value = true;
    } finally {
      isLoading.value = false;
    }

    return data.value;
  };

  return {
    data,
    error,
    isLoading,
    isError,
    isSuccess,
    run
  };
};

export const useGetUserProfile = () => {
  const result = useCheevosGet<UserProfile>();
  const { run: baseRun } = result;
  const run = (username: string) => {
    return baseRun('GetUserProfile', {
      u: username
    });
  };

  return {
    ...result,
    run
  };
};

export const useGetUserSummary = () => {
  const result = useCheevosGet<UserSummary>();
  const { run: baseRun } = result;
  const run = (username: string) => {
    return baseRun('GetUserSummary', {
      u: username,
      a: '0'
    });
  };

  return {
    ...result,
    run
  };
};

export const useGetCurrentUserSummary = () => {
  const auth = useAuthStore();
  const result = useGetUserSummary();
  const { run: baseRun } = result;
  const run = () => {
    return baseRun(auth.username);
  };

  return {
    ...result,
    run
  };
};

export const useGetGame = () => {
  const result = useCheevosGet<Game>();
  const { run: baseRun } = result;
  const run = (gameId: string) => {
    return baseRun('GetGame', { i: gameId });
  };

  return {
    ...result,
    run
  };
};

export const useGetGameInfoAndUserProgress = () => {
  const result = useCheevosGet<GameProgress>();
  const { run: baseRun } = result;
  const run = (gameId: string, username: string) => {
    return baseRun('GetGameInfoAndUserProgress', { g: gameId, u: username });
  };

  return {
    ...result,
    run
  };
};
