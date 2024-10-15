import { setupServer } from 'msw/node';

import { handlers } from './handlers';
import { afterAll, afterEach, beforeEach } from 'vitest';

const apiServer = setupServer(...handlers);

export const setupMockApi = () => {
  beforeEach(() => {
    apiServer.listen();
  });

  afterEach(() => {
    apiServer.resetHandlers();
  });

  afterAll(() => {
    apiServer.close();
  });
};

export const setupMockBackend = () => {
  setupMockApi();
};
