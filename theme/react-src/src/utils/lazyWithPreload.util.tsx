import { lazy, createElement } from 'react';

import { ComponentType } from 'react';

/**
 * Lazy React component with an additional .preload property that allows
 * preloading of the lazy component before consumption
 */
export type PreloadableComponent<T extends ComponentType<any>> = T & {
  preload: () => Promise<void>;
};

/**
 * Creates a preloadable component from the import factory input
 * @example
 * ```ts
 * const component = lazyWithPreload(() => import(...))
 * component.preload();
 * ```
 * You can use the `preload()` method to preload the component at any time.
 *
 * @param factory () => import statement
 * @returns Preloadable component
 */
export const lazyWithPreload = <T extends ComponentType<any>>(
  factory: () => Promise<{ default: T }>
) => {
  let LoadedComponent: T | undefined;
  let factoryPromise: Promise<void> | undefined;

  const LazyComponent = lazy(factory);

  const loadComponent = () =>
    factory().then((module) => {
      LoadedComponent = module.default;
    });

  const Component = ((props) =>
    createElement(
      LoadedComponent || LazyComponent,
      props
    )) as PreloadableComponent<T>;

  Component.preload = () => factoryPromise || loadComponent();

  return Component;
};
