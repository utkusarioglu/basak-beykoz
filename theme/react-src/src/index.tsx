import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import ReactGA from 'react-ga';
import reportWebVitals from './reportWebVitals';
import AppRouter from './components/routers/app/App.router';
import { GOOGLE_ANALYTICS_ID } from './config';
import './index.scss';
import 'overlayscrollbars/css/OverlayScrollbars.css';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallbackLayout from './components/layouts/error-fallback/ErrorFallback.layout';
import { HelmetProvider } from 'react-helmet-async';

ReactGA.initialize(GOOGLE_ANALYTICS_ID, { debug: false });

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={ErrorFallbackLayout}>
      <Provider store={store}>
        <HelmetProvider>
          <AppRouter />
        </HelmetProvider>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
