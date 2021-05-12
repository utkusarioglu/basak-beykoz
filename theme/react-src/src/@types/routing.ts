import type { PreloadableComponent } from '../utils/lazyWithPreload.util';
import type { FC } from 'react';
import type { PrefetcherArgs } from '../services/prefetch.service';

type FcAny = FC<Record<keyof any, any>>;
export type RouteConfigComponent = PreloadableComponent<FcAny> | FcAny;

export type RouteConfig = PreloadableRouteConfig | NormalRouteConfig;
export interface PreloadableRouteConfig {
  path: string; // restful slug
  component: PreloadableComponent<FC<Record<keyof any, any>>>;
  prefetch?: (config: PrefetcherArgs) => Promise<void>;
}

export interface NormalRouteConfig {
  path: string;
  component: FC<Record<keyof any, any>>;
}
