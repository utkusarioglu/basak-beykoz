import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import ReactGA from 'react-ga';
import reportWebVitals from './reportWebVitals';
import { GOOGLE_ANALYTICS_ID } from './config';

ReactGA.initialize(GOOGLE_ANALYTICS_ID, { debug: false });

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
