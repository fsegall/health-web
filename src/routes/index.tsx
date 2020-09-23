import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';
import SignIn from '../pages/Signin';
import SignUp from '../pages/Signup';

import Dashboard from '../pages/Dashboard';
import Interview from '../pages/Interview';
import Profile from '../pages/Profile';
import Project from '../pages/Project';
import ForgotPasword from '../pages/ForgotPassword';
import ResetPasword from '../pages/ResetPassword';
const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/forgot-password" component={ForgotPasword} />
      <Route path="/reset-password" component={ResetPasword} />
      <Route path="/dashboard" isPrivate component={Dashboard} />
      <Route path="/interview" isPrivate component={Interview} />
      <Route path="/project" isPrivate component={Project} />
      {/* <Route path="/household" isPrivate component={Household} /> */}
      <Route path="/profile" isPrivate component={Profile} />
    </Switch>
  );
};

export default Routes;
