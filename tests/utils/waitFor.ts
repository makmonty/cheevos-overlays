import { flushPromises, type VueWrapper } from '@vue/test-utils';

export interface WaitForElementOptions {
  timeout: number;
}

const defaultOptions = {
  timeout: 3000
};

class WaitForTimeoutError extends Error {}

export const waitFor = async (predicate: () => boolean, options = defaultOptions) => {
  const startingTime = new Date().getTime();
  let currentTime = startingTime;

  while (!predicate()) {
    await flushPromises();
    currentTime = new Date().getTime();
    if (currentTime - startingTime > options.timeout) {
      throw new WaitForTimeoutError(
        `Waiting for predicate timed out after ${options.timeout} miliseconds`
      );
    }
  }
};

export const waitForElement = async (
  selector: string,
  wrapper: VueWrapper,
  options = defaultOptions
) => {
  try {
    await waitFor(() => wrapper.find(selector).exists(), options);
  } catch (e) {
    if (e instanceof WaitForTimeoutError) {
      throw new WaitForTimeoutError(
        `Waiting for element ${selector} timed out after ${options.timeout} miliseconds`
      );
    }
    throw e;
  }
};
