import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import jwt from 'jsonwebtoken';
import { BrowserRouter } from 'react-router-dom';

import App from './components/App.jsx';
import setAuthorizationToken from './utils/setAuthorizationToken';
import './assets/css/custom.scss';
import '../node_modules/materialize-css/dist/js/materialize.min';
import '../node_modules/materialize-css/dist/css/materialize.min.css';
import configureStore from './store/configureStore';
import { setCurrentUser, showHomePageForm } from './actions/AuthActions';

const store = configureStore();
if (localStorage.jwtToken) {
  if (jwt.decode(localStorage.jwtToken) === null) {
    Materialize.toast(
      'could not authenticate User signin again',
      3000, 'green', () => {
        localStorage.removeItem('jwtToken');
        window.location = '/';
      }
    );
  } else {
    setAuthorizationToken(localStorage.jwtToken);
    store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)));
  }
} else if (localStorage.homePageNum) {
  store.dispatch(showHomePageForm(Number(localStorage.homePageNum)));
}
render(
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
);
