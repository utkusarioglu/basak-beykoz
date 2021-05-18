import type { useHistory } from 'react-router-dom';
import { HOME_SLUG } from '../config';
import { linkCorrectInjection } from '../injections/link-correct.injection';
import type { useErrorHandler } from 'react-error-boundary';
import { iletisimInjection } from '../injections/iletisim';

type UnmountFunction = () => void;

/**
 * Standard injection function that accepts standard injection
 * function params
 *
 * @remarks
 * If you need custom params for your injection, use WrappedInjectionFunction
 */
export type InjectionFunction = (params: {
  ref: HTMLElement;
  historyHandler: ReturnType<typeof useHistory>;
  errorHandler: ReturnType<typeof useErrorHandler>;
}) => UnmountFunction;

/**
 * Injection function that has been wrapped by another function to
 * supply custom params. WrappedInjectionFunction returns the standard
 * InjectionFunction
 */
export type WrappedInjectionFunction<T extends Record<string, any>> = (
  params: T
) => InjectionFunction;

class Injection {
  /**
   * Determines which injections are required for the current slug
   * and executes them with the `rest` params.
   *
   * @param slug slug for which to curate the injections
   * @param params array of params needed for injection functions
   * @returns unmount function to be executed by useLayoutEffect
   */
  public inject(
    slug: string,
    params: Parameters<InjectionFunction>[0]
  ): UnmountFunction {
    switch (slug) {
      case HOME_SLUG:
        return this.execFunctions([homeInjection, interceptLinks], params);

      case 'hizmetlerim':
        return this.execFunctions(
          [hizmetlerimInjection, interceptLinks],
          params
        );

      case 'iletisim':
        return this.execFunctions([iletisimInjection, interceptLinks], params);

      default:
        return this.execFunctions([interceptLinks], params);
    }
  }

  /**
   * Executes the injection functions with the params provided by the
   * Singular.view component
   * @param funcArray an array of functions to execute with the injection params
   * @param params params that are needed for the injection functions
   * @returns unmount function for the useLayoutEffect
   */
  public execFunctions(
    funcArray: InjectionFunction[],
    params: Parameters<InjectionFunction>[0]
  ): UnmountFunction {
    const execs = funcArray.map((func) => func(params));
    return () => execs.forEach((unmount) => unmount());
  }

  /**
   * Attaches the given listeners to the element. Function returns another
   * function that will remove the event listeners if called.
   *
   * @param events Listeners to be added
   * @param element the element to attach event listeners
   * @param eventMethod the method that will be called when the listened events
   * occur
   */
  public unmountableEventListener(
    elements: HTMLElement[],
    events: string[],
    eventMethod: (e: Event) => void
  ): UnmountFunction {
    elements.forEach((element) => {
      events.forEach((event) => {
        element.addEventListener(event, eventMethod);
      });
    });

    return () =>
      elements.forEach((element) => {
        events.forEach((event) => {
          element.removeEventListener(event, eventMethod);
        });
      });
  }

  /**
   * If an injection function has no unmount function to return,
   * it can use this dummy, this allows a standardized response which
   * can be altered easily in the future
   */
  public dummyInjectionFunction = () => {};
}

export default new Injection();
