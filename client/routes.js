import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App.jsx';
import HomePage from './components/homepage/SignupForm.jsx';

export default (
  <Route path="/" components={App}>
    <IndexRoute components={HomePage} />
  </Route>
);
