import App from '@/App.vue';
import { routes } from '@/router';
import { mount, type VueWrapper } from '@vue/test-utils';
import { createPinia } from 'pinia';
import { afterEach, beforeEach } from 'vitest';
import { createRouter, createWebHistory, type Router } from 'vue-router';
import { setupMockBackend } from './backend';

type Nullable<T> = { [K in keyof T]: T[K] | null };

interface TestAppSetup {
  wrapper: VueWrapper;
  router: Router;
}

export const setupApp = () => {
  setupMockBackend();

  const app: Nullable<TestAppSetup> = {
    wrapper: null,
    router: null
  };
  let container: HTMLDivElement;

  beforeEach(() => {
    app.router = createRouter({
      history: createWebHistory(),
      routes: routes
    });

    container = document.createElement('div');
    container.id = 'app';
    document.body.appendChild(container);

    app.wrapper = mount(App, {
      global: {
        plugins: [app.router, createPinia()]
      },
      attachTo: '#app'
    });
  });

  afterEach(() => {
    container?.parentNode?.removeChild(container);
  });

  return app as TestAppSetup;
};
