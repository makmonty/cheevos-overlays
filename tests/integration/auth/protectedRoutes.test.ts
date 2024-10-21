import { USERNAME_STORAGE_KEY, WEB_API_KEY_STORAGE_KEY } from '@/stores/auth';
import { setupApp, type TestAppContext } from 'tests/setup/app';
import { describe, test } from 'vitest';

describe('Integration | Auth | Protected routes', () => {
  setupApp();

  test<TestAppContext>('does not allow accessing protected routes without being authenticated', async ({
    expect,
    router,
    wrapper
  }) => {
    router.push('/catalog');
    await router.isReady();

    expect(wrapper.findAll('[data-testid="login-view"]').length).toBeGreaterThan(0);
  });

  test<TestAppContext>('allows accessing protected routes when user has stored credentials', async ({
    expect,
    router,
    wrapper
  }) => {
    localStorage.setItem(WEB_API_KEY_STORAGE_KEY, 'testWebApiKey');
    localStorage.setItem(USERNAME_STORAGE_KEY, 'testUsername');

    router.push('/catalog');
    await router.isReady();

    expect(wrapper.findAll('[data-testid="catalog-view"]').length).toBeGreaterThan(0);
  });
});
