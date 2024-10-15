import { describe, expect, it } from 'vitest';
import { setupApp } from 'tests/setup/app';
import { waitForElement } from 'tests/utils/waitForElement';
import { flushPromises } from '@vue/test-utils';

describe('Integration | Login Flow', () => {
  const app = setupApp();

  it('should show the login form when opening the app', async () => {
    app.router.push('/');
    await app.router.isReady();

    expect(app.wrapper.html()).toContain('Username');
    expect(app.wrapper.html()).toContain('Web API Key');
  });

  it('should allow to login', async () => {
    app.router.push('/');
    await app.router.isReady();

    const usernameInput = app.wrapper.find('[data-testid="login-form-input-username"] input');
    const webApiKeyInput = app.wrapper.find('[data-testid="login-form-input-webapikey"] input');
    await usernameInput.setValue('testUser');
    await webApiKeyInput.setValue('testWebApiKey');

    const submitButton = app.wrapper.find('[data-testid="login-form-submit"]');
    await submitButton.trigger('click');

    await waitForElement('[data-testid="catalog-view"]', app.wrapper);

    expect(app.wrapper.html()).toContain('Game progress');
  });
});
