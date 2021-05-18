import type { InjectionFunction } from '../services/injection.service';
import injection from '../services/injection.service';
import { anchorCorrectInjection } from './anchor-correct.injection';

/**
 * Injects homepage enhancements
 * @param root {@link OverlayScrollbars} refs object from the store
 * @param history {@link react-router-dom} history object
 */
export const hizmetlerimInjection: InjectionFunction = (params) => {
  return injection.execFunctions(
    [
      anchorCorrectInjection({
        elem: params.ref,
        parentSelector: '.wp-block-column',
      }),
    ],
    params
  );
};
