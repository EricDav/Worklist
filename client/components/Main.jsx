import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from './home/container/HomePage.jsx';
import Dashboard from './dashboard/container/Dashboard.jsx';
import requireAuth from '../utils/requiresAuth.jsx';
import requireAuthForHome from '../utils/requireAuthForHome.jsx';

const Main = () => (
  <div>
    <Switch>
      <Route exact path="/" component={requireAuthForHome(HomePage)}/>
      <Route path="/dashboard" component={requireAuth(Dashboard)}/>
    </Switch>
  </div>
);

export default Main;
