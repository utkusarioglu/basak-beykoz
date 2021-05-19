import React, { Suspense, lazy } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import FooterLayout from '../../layouts/footer/Footer.layout';
import HeaderLayout from '../../layouts/header/Header.layout';
import { HOME_SLUG, W_MD } from '../../../config';
import LoaderEdgeView from '../../views/loader-edge/LoaderEdge.view';
import LoaderDesktopView from '../../views/loader-desktop/LoaderDesktop.view';
import { routes } from './routeConfig';
import LoaderHtmlView from '../../views/loader-html/LoaderHtml.view';
import {
  selectMobileNavState,
  selectMobileShareState,
  setMobileNavState,
  setMobileShareState,
} from '../../../slices/app/app.slice';
import { useMediaQuery } from 'react-responsive';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallbackLayout from '../../layouts/error-fallback/ErrorFallback.layout';
import GraceTopView from '../../views/grace-top/GraceTop.view';
import { restSlug } from '../../../utils/slug.util';
import ScrollbarView from '../../views/scrollbar/Scrollbar.view';

const AppRouter = () => {
  const isWMd = useMediaQuery({ minWidth: W_MD });

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
      <HeaderLayout />

      {!isWMd && (
        <Suspense fallback={null}>
          <LazyMobileMenuContainerView
            menuStateSelector={selectMobileNavState}
            menuStateSetter={setMobileNavState}
          >
            <LazyMobileNav />
          </LazyMobileMenuContainerView>
          <LazyMobileMenuContainerView
            menuStateSelector={selectMobileShareState}
            menuStateSetter={setMobileShareState}
          >
            <LazyMobileShare />
          </LazyMobileMenuContainerView>
        </Suspense>
      )}

      {isWMd ? <LoaderDesktopView /> : <LoaderEdgeView />}

      <Switch>
        <Route path={restSlug(HOME_SLUG)} exact>
          <Redirect to="/" />
        </Route>

        {routes.map(({ path, component: Component }) => (
          <Route path={path} exact key={path}>
            <ErrorBoundary FallbackComponent={ErrorFallbackLayout}>
              <Suspense fallback={<LoaderHtmlView />}>
                <ScrollbarView
                  id="main"
                  enableGraceTop={true}
                  graceTopComponent={GraceTopView}
                >
                  <Component />
                  <FooterLayout />
                </ScrollbarView>
              </Suspense>
            </ErrorBoundary>
          </Route>
        ))}

        <Route>
          <Redirect to="/404" />
        </Route>
      </Switch>
    </Router>
  );
};

export default AppRouter;
