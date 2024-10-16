import { mount } from '@vue/test-utils';
import { describe, test } from 'vitest';
import BaseButton from './BaseButton.vue';

describe('Component | BaseButton', () => {
  test('should render with defaults', ({ expect }) => {
    const wrapper = mount(BaseButton);
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe('type', () => {
    test('should show a submit button when type is submit', ({ expect }) => {
      const wrapper = mount(BaseButton, {
        props: {
          type: 'submit'
        }
      });

      expect(wrapper.attributes('type')).toBe('submit');
      expect(wrapper.html()).toMatchSnapshot();
    });
  });

  describe('variant', () => {
    test('should show a text button when variant is text', ({ expect }) => {
      const wrapper = mount(BaseButton, {
        props: {
          variant: 'text'
        }
      });

      expect(wrapper.html()).toMatchSnapshot();
    });
  });

  describe('size', () => {
    test('should show a large button when size is large', ({ expect }) => {
      const wrapper = mount(BaseButton, {
        props: {
          size: 'large'
        }
      });

      expect(wrapper.html()).toMatchSnapshot();
    });

    test('should show a small button when size is small', ({ expect }) => {
      const wrapper = mount(BaseButton, {
        props: {
          size: 'small'
        }
      });

      expect(wrapper.html()).toMatchSnapshot();
    });
  });
});
