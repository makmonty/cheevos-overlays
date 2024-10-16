import { describe, test } from 'vitest';
import { setupApp, type TestAppContext } from 'tests/setup/app';
import { waitForElement } from 'tests/utils/waitFor';

describe('Integration | Login Flow', () => {
  setupApp();

  test<TestAppContext>('should show the login form when opening the app', async ({
    expect,
    router,
    wrapper
  }) => {
    router.push('/');
    await router.isReady();

    expect(wrapper.html()).toContain('Username');
    expect(wrapper.html()).toContain('Web API Key');
  });

  test<TestAppContext>('should login when the credentials are valid', async ({
    expect,
    router,
    wrapper
  }) => {
    router.push('/');
    await router.isReady();

    const usernameInput = wrapper.find('[data-testid="login-form-input-username"] input');
    const webApiKeyInput = wrapper.find('[data-testid="login-form-input-webapikey"] input');
    await usernameInput.setValue('testUser');
    await webApiKeyInput.setValue('testWebApiKey');

    const submitButton = wrapper.find('[data-testid="login-form-submit"]');
    await submitButton.trigger('click');

    await waitForElement('[data-testid="catalog-view"]', wrapper);

    expect(wrapper.html()).toContain('Game progress');
  });

  test<TestAppContext>('should show an error when the username is missing', async ({
    expect,
    router,
    wrapper
  }) => {
    router.push('/');
    await router.isReady();

    const webApiKeyInput = wrapper.find('[data-testid="login-form-input-webapikey"] input');
    await webApiKeyInput.setValue('testWebApiKey');

    const submitButton = wrapper.find('[data-testid="login-form-submit"]');
    await submitButton.trigger('click');

    expect(wrapper.find('[data-testid="login-errors"]').html()).toContain('Username is required');
  });

  test<TestAppContext>('should show an error when the Web API Key is missing', async ({
    expect,
    router,
    wrapper
  }) => {
    router.push('/');
    await router.isReady();

    const usernameInput = wrapper.find('[data-testid="login-form-input-username"] input');
    await usernameInput.setValue('testUser');

    const submitButton = wrapper.find('[data-testid="login-form-submit"]');
    await submitButton.trigger('click');

    expect(wrapper.find('[data-testid="login-errors"]').html()).toContain(
      'Web API key is required'
    );
  });
});
