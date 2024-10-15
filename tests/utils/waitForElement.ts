import { flushPromises, type VueWrapper } from '@vue/test-utils';

export interface WaitForElementOptions {
  timeout: number;
}

const defaultOptions = {
  timeout: 3000
};

export const waitForElement = async (
  selector: string,
  wrapper: VueWrapper,
  options = defaultOptions
) => {
  const startingTime = new Date().getTime();
  let currentTime = startingTime;

  while (!wrapper.find(selector).exists()) {
    await flushPromises();
    currentTime = new Date().getTime();
    if (currentTime - startingTime > options.timeout) {
      throw new Error(
        `Waiting for element ${selector} timed out after ${options.timeout} miliseconds`
      );
    }
  }
};
