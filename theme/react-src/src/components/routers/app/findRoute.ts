import { routes } from './routeConfig';

export function findRoute(restfulSlug: string) {
  return (
    routes.find((route) => route.path === restfulSlug) ||
    routes.find((route) => route.path === '/:slug')
  );
}
