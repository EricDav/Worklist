import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App.jsx';
import Dashboard from './components/dashboard/Dashboard.jsx';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={requireAuthForHome(HomePage)} />
    <Route path="dashboard" component={requireAuth(Dashboard)}/>
    <Route path="forgotPassword"
      component={requireAuthForHome(ForgotPasswordPage)}/>
    <Route path="signup" component={requireAuthForHome(SignupPage)}/>
    <Route path="*" component={NotFound}/>
  </Route>
);
