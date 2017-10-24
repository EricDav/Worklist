import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from './homepage/HomePage.jsx';

const Main = () => (
  <div>
    <Switch>
      <Route exact path="/" component={HomePage}/>
    </Switch>
  </div>
);

export default Main;
