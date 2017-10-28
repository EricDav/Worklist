import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from './homepage/HomePage.jsx';
import Dashboard from './dashboard/Dashboard.jsx';

const Main = () => (
  <div>
    <Switch>
      <Route exact path="/" component={HomePage}/>
      <Route path="/dashboard" component={Dashboard}/>
    </Switch>
  </div>
);

export default Main;
