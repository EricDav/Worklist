import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import jwt from 'jsonwebtoken';
import { Router, browserHistory } from 'react-router';

import setAuthorizationToken from './utils/setAuthorizationToken';
import routes from './routes';
// import { setCurrentUser } from './actions/UserAction';
import configureStore from './store/configureStore';

// import './assets/css/custom.scss';
// import '../node_modules/materialize-css/dist/js/materialize.min';
// import '../node_modules/materialize-css/dist/css/materialize.min.css';

const store = configureStore();

if (localStorage.jwtToken) {
  if (jwt.decode(localStorage.jwtToken) === null) {
    Materialize.toast('could not authenticate User signin again',
      3000, 'green', () => {
        localStorage.removeItem('jwtToken');
        window.location = '/';
      });
  } else {
    setAuthorizationToken(localStorage.jwtToken);
    store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)));
  }
}
render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('app'));
