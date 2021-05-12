import type { useHistory } from 'react-router-dom';
import { PreloadableRouteConfig, NormalRouteConfig } from '../@types/routing';
import {
  enableIsLoadingDelayed,
  disableIsLoadingDelayed,
} from '../slices/app/app.slice';
import { jumpTop } from '../utils/scroll.util';
import { restSlug } from '../utils/slug.util';
import { routes } from '../components/routers/app/routeConfig';
import type { RouteConfigComponent } from '../@types/routing';

interface GetRoutePropsReturn {
  component: RouteConfigComponent;
  prefetchFunc: () => Promise<void>;
  path: string;
}

interface PreloadAndRedirectArgs {
  to: string;
  history: ReturnType<typeof useHistory>;
  errorHandler: (error: unknown) => void;
  jumpTop: boolean;
}

const fallbackRoute = (() => {
  const route = routes.find((route) => route.path === '/:slug');
  if (!route) {
    throw new Error('fallback_route_not_found');
  }
  return route;
})();

function getRouteProps(urlfulSlug: string): GetRoutePropsReturn {
  const restfulSlug = restSlug(urlfulSlug);
  const route =
    routes.find((route) => route.path === restfulSlug) || fallbackRoute;

  if (!('preload' in route.component)) {
    const { component, path } = route as NormalRouteConfig;
    return { component, path, prefetchFunc: () => Promise.resolve() };
  }

  const { component, prefetch, path } = route as PreloadableRouteConfig;

  const prefetchFunc = prefetch
    ? () => prefetch({ slug: restfulSlug })
    : () => Promise.resolve();

  return { component, path, prefetchFunc };
}

export function preloadAndRoute({
  to,
  history,
  errorHandler,
  jumpTop: jumpTopEnabled,
}: PreloadAndRedirectArgs): Promise<void> {
  const { component, prefetchFunc } = getRouteProps(to);

  if (!('preload' in component)) {
    history.push(to);
    jumpTopEnabled && jumpTop();
    return Promise.resolve();
  }

  const cancelIsLoading = enableIsLoadingDelayed();

  return Promise.all([component.preload(), prefetchFunc()])
    .then(() => {
      history.push(to);
    })
    .catch(errorHandler)
    .finally(() => {
      cancelIsLoading();
      disableIsLoadingDelayed();
      jumpTopEnabled && jumpTop();
    });
}
