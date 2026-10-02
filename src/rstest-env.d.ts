/// <reference types="@rstest/core/globals" />
import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';

declare module '@rstest/core' {
  // Module augmentation has to merge into the existing interface, so it can't be a type alias.
  // eslint-disable-next-line @typescript-eslint/no-empty-interface, @typescript-eslint/no-empty-object-type
  interface Assertion<T = any> extends TestingLibraryMatchers<unknown, T> {}
}
