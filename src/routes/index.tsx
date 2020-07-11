import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';
import SignIn from '../pages/Signin';
import SignUp from '../pages/Signup';

import Dashboard from '../pages/Dashboard';
import Interview from '../pages/Interview';
import Profile from '../pages/Profile';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/dashboard" isPrivate component={Dashboard} />
      <Route path="/interview" isPrivate component={Interview} />
      <Route path="/profile" isPrivate component={Profile} />
    </Switch>
  );
};

export default Routes;
