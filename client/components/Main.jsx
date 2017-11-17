import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from './home/container/HomePage';
import Dashboard from './dashboard/container/Dashboard';
import requireAuth from '../utils/requiresAuth';
import requireAuthForHome from '../utils/requireAuthForHome';

const Main = () => (
  <div>
    <Switch>
      <Route exact path="/" component={requireAuthForHome(HomePage)}/>
      <Route path="/dashboard" component={requireAuth(Dashboard)}/>
    </Switch>
  </div>
);

export default Main;
