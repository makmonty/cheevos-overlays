import { setupServer, SetupServerApi } from 'msw/node';

import { handlers } from './handlers';
import { afterEach, beforeEach } from 'vitest';

const apiServer = setupServer(...handlers);

export interface TestBackendContext {
  apiServer: SetupServerApi;
}

declare module 'vitest' {
  export type BackendContext = TestBackendContext;
}

export const setupMockApi = () => {
  beforeEach<TestBackendContext>((context) => {
    context.apiServer = apiServer;
    apiServer.listen();
  });

  afterEach<TestBackendContext>(() => {
    apiServer.resetHandlers();
  });

  // afterAll<TestBackendContext>(() => {
  //   apiServer.close();
  // });
};

export const setupMockBackend = () => {
  setupMockApi();
};
