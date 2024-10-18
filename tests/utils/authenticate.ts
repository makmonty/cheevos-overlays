import { USERNAME_STORAGE_KEY, WEB_API_KEY_STORAGE_KEY } from '@/stores/auth';

export const authenticate = (username: string, webApiKey: string) => {
  localStorage.setItem(USERNAME_STORAGE_KEY, username);
  localStorage.setItem(WEB_API_KEY_STORAGE_KEY, webApiKey);
};
