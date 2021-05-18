import { preloadAndRoute } from '../utils/preload.util';
import type { InjectionFunction } from '../services/injection.service';
import injection from '../services/injection.service';
import { graceScroll } from '../utils/scroll.util';

/**
 * Intercepts anchor elements to make sure that in-site links are handled by
 * react-router-dom. This prevents needless page reloads.
 *
 * @param root root html element for which the links will be intercepted
 * @param history history handler from react-router-dom
 * @param handleError error handler from react-error-boundary
 * @returns Unmount function for the useLayoutEffect to execute while the
 * component is being unmounted
 */
export const interceptLinks: InjectionFunction = ({
  ref,
  historyHandler,
  errorHandler,
}) => {
  if (!ref) throw new Error('singular_view_not_available');

  const anchors = ref.getElementsByTagName('a');

  const clickEventHandler: (e: any) => void = (e) => {
    /// external links are posit default behavior
    if (!e.target.origin.includes(window.location.host)) {
      return;
    }
    e.preventDefault();

    /// bookmarks
    if (e.target.hash) {
      const id = e.target.hash.slice(1);
      graceScroll('main', id);
      return;
    }

    // route changes
    preloadAndRoute({
      to: e.target.pathname,
      history: historyHandler,
      errorHandler,
      jumpTop: true,
    });
  };

  return injection.unmountableEventListener(
    Array.from(anchors),
    ['click', 'touch'],
    clickEventHandler
  );
};
