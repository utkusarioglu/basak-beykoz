import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import FooterLayout from '../../layouts/footer/Footer.layout';
import HeaderLayout from '../../layouts/header/Header.layout';
import { HOME_SLUG } from '../../../config';
import IsLoadingView from '../../views/is-loading/IsLoading.view';
import { routes } from './routeConfig';
import InlineLoaderView from '../../views/inline-loader/InlineLoader.view';
import ErrorBoundaryUtil from '../../../utils/ErrorBoundary.util';
import ErrorFallbackView from '../../views/error-fallback/ErrorFallback.view';

const AppRouter = () => {
  return (
    <Router>
      <IsLoadingView />
      <div className="min-height-100-p">
        <HeaderLayout />

        <Switch>
          {routes.map(({ path, component: Component }) => (
            <Route path={path} exact key={path}>
              <ErrorBoundaryUtil fallback={<ErrorFallbackView />}>
                <Suspense fallback={<InlineLoaderView />}>
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
