import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import jwt from 'jsonwebtoken';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App.jsx';

// import setAuthorizationToken from './utils/setAuthorizationToken';
import './assets/css/custom.scss';
import '../node_modules/materialize-css/dist/js/materialize.min';
import '../node_modules/materialize-css/dist/css/materialize.min.css';

// import { setCurrentUser } from './actions/UserAction';
import configureStore from './store/configureStore';

const store = configureStore();
render(
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
);
