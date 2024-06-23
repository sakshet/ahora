// jest.d.ts

import '@testing-library/jest-dom';

declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveStyleRule(property: string, value?: any): R;
    }
  }
}