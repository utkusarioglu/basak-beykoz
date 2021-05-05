import React, { Suspense, lazy } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import FooterLayout from '../../layouts/footer/Footer.layout';
import HeaderLayout from '../../layouts/header/Header.layout';
import { HOME_SLUG, DESKTOP_MIN_WIDTH } from '../../../config';
import LoaderEdgeView from '../../views/loader-edge/LoaderEdge.view';
import { routes } from './routeConfig';
import LoaderHtmlView from '../../views/loader-html/LoaderHtml.view';
import ErrorBoundaryUtil from '../../../utils/ErrorBoundary.util';
import ErrorFallbackView from '../../views/error-fallback/ErrorFallback.view';
import MobileMenuContainerView from '../../views/mobile-menu-container/MobileMenuContainer.view';
import {
  selectMobileNavState,
  selectMobileShareState,
  setMobileNavState,
  setMobileShareState,
} from '../../../slices/app/app.slice';
import { useMediaQuery } from 'react-responsive';

const AppRouter = () => {
  const isDesktop = useMediaQuery({ minWidth: DESKTOP_MIN_WIDTH });

  const LazyMobileNav = lazy(
    () => import('../../views/nav-mobile/NavMobile.view')
  );

  const LazyMobileShare = lazy(
    () => import('../../views/mobile-share/MobileShare.view')
  );

  const LazyMobileMenuContainerView = lazy(
    () => import('../../views/mobile-menu-container/MobileMenuContainer.view')
  );

  return (
    <Router>
      <LoaderEdgeView />

        {!isDesktop && (
          <Suspense fallback={null}>
            <LazyMobileMenuContainerView
              selector={selectMobileNavState}
              closer={setMobileNavState}
            >
              <LazyMobileNav />
            </LazyMobileMenuContainerView>
            <LazyMobileMenuContainerView
              selector={selectMobileShareState}
              closer={setMobileShareState}
            >
              <LazyMobileShare />
            </LazyMobileMenuContainerView>
          </Suspense>
        )}

      <div className="min-height-100-p">
        <HeaderLayout />

        <Switch>
          {routes.map(({ path, component: Component }) => (
            <Route path={path} exact key={path}>
              <ErrorBoundaryUtil fallback={<ErrorFallbackView />}>
                <Suspense fallback={<LoaderHtmlView />}>
                  <Component />
                </Suspense>
              </ErrorBoundaryUtil>
            </Route>
          ))}

          <Route path={`/${HOME_SLUG}`}>
            <Redirect to="/" />
          </Route>

          <Route path="*">
            <Redirect to="/404" />
          </Route>
        </Switch>
      </div>

      <FooterLayout />
    </Router>
  );
};

export default AppRouter;
