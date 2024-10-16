import App from '@/App.vue';
import { routes } from '@/router';
import { mount, type VueWrapper } from '@vue/test-utils';
import { createPinia } from 'pinia';
import { afterEach, beforeEach } from 'vitest';
import { createRouter, createWebHistory, type Router } from 'vue-router';
import { setupMockBackend, type TestBackendContext } from './backend';

export interface TestAppContext extends TestBackendContext {
  wrapper: VueWrapper;
  router: Router;
  container: HTMLDivElement;
}

declare module 'vitest' {
  export type AppContext = TestAppContext;
}

export const setupApp = () => {
  setupMockBackend();

  beforeEach<TestAppContext>((context) => {
    context.router = createRouter({
      history: createWebHistory(),
      routes: routes
    });

    context.container = document.createElement('div');
    context.container.id = 'app';
    document.body.appendChild(context.container);

    context.wrapper = mount(App, {
      global: {
        plugins: [context.router, createPinia()]
      },
      attachTo: '#app'
    });
  });

  afterEach<TestAppContext>(({ container }) => {
    container?.parentNode?.removeChild(container);
  });
};
