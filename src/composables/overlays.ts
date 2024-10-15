import { useAuthStore } from '@/stores/auth';
import { useSettingsStore } from '@/stores/settings';
import { baseUrl } from '@/utils/config';
import { paramsToQueryString } from '@/utils/url';

export const useOverlayPermanentUrl = (overlay: string) => {
  const auth = useAuthStore();
  const settings = useSettingsStore();

  const generate = (params: Record<string, string>) => {
    const queryString = paramsToQueryString({
      username: auth.username,
      webApiKey: auth.webApiKey,
      backgroundColor: settings.preferences.global.backgroundColor.substring(1),
      textColor: settings.preferences.global.textColor.substring(1),
      ...params
    });

    return `${baseUrl}/overlay/${overlay}?${queryString}`;
  };

  return {
    generate
  };
};
