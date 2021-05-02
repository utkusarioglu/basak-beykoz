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
import { lazyRoutes } from './lazyRouteConfig';

const AppRouter = () => {
  return (
    <Router>
      <IsLoadingView />
      <HeaderLayout />

      <Switch>
        <Route path={`/${HOME_SLUG}`}>
          <Redirect to="/" />
        </Route>

        {lazyRoutes.map(({ path, component: Component }) => (
          <Route path={path} exact key={path}>
            <Suspense fallback={<LoadingPlaceholder />}>
              <Component />
            </Suspense>
          </Route>
        ))}
      </Switch>

      <FooterLayout />
    </Router>
  );
};

const LoadingPlaceholder = () => <div>Loading...</div>;

export default AppRouter;
