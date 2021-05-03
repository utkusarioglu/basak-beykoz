import { routes } from './routeConfig';

export function findRoute(restfulSlug: string) {
  console.log('restful slug', restfulSlug);
  return (
    routes.find((route) => route.path === restfulSlug) ||
    routes.find((route) => route.path === '/:slug')
  );
}
