import { flushPromises } from '@vue/test-utils';
import { setupApp, type TestAppContext } from 'tests/setup/app';
import { describe, test } from 'vitest';

describe('Integration | Overlays | Permanent URL', () => {
  setupApp();

  test<TestAppContext>('shows the content when the user is not logged in but has all the needed query parameters', async ({
    expect,
    router,
    wrapper
  }) => {
    router.push('/overlay/game-progress?username=testUser&webApiKey=testWebApiKey&gameId=1');
    await router.isReady();

    await flushPromises();

    expect(wrapper.findAll('[data-testid="cheevo-item"]').length).toBeGreaterThan(0);
  });
});
