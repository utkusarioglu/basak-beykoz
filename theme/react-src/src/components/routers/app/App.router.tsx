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
import LoaderDesktopView from '../../views/loader-desktop/LoaderDesktop.view';
import { routes } from './routeConfig';
import LoaderHtmlView from '../../views/loader-html/LoaderHtml.view';
import ErrorBoundaryUtil from '../../../utils/ErrorBoundary.util';
import {
  selectMobileNavState,
  selectMobileShareState,
  setMobileNavState,
  setMobileShareState,
} from '../../../slices/app/app.slice';
import ErrorFallbackLazyView from '../../views/error-fallback-lazy/ErrorFallbackLazy.view';
import { useMediaQuery } from 'react-responsive';
import ErrorRoute from '../../routes/error/Error.route';

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
    <ErrorBoundaryUtil
      fallback={<ErrorFallbackLazyView errorCode="routing_level_error" />}
    >
      <Router>
        <HeaderLayout />

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

        {isDesktop ? <LoaderDesktopView /> : <LoaderEdgeView />}

        <div className="min-height-100-p">
          <Switch>
            <Route path={`/${HOME_SLUG}`} exact>
              <Redirect to="/" />
            </Route>

            <Route path="/error" exact>
              <ErrorRoute />
            </Route>

            {routes.map(({ path, component: Component }) => (
              <Route path={path} exact key={path}>
                <ErrorBoundaryUtil
                  fallback={
                    <ErrorFallbackLazyView errorCode="routing_level_error" />
                  }
                >
                  <Suspense fallback={<LoaderHtmlView />}>
                    <Component />
                  </Suspense>
                </ErrorBoundaryUtil>
              </Route>
            ))}

            <Route>
              <Redirect to="/404" />
            </Route>
          </Switch>
        </div>

        <FooterLayout />
      </Router>
    </ErrorBoundaryUtil>
  );
};

export default AppRouter;
