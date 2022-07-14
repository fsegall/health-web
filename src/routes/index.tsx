import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';
import SignIn from '../pages/Signin';
import SignUp from '../pages/Signup';
import Dashboard from '../pages/Dashboard';
import OfflineInterviews from '../pages/OfflineInterviews';
import Accept from '../pages/Accept';
import Interview from '../pages/Interview';
import Profile from '../pages/Profile';
import Project from '../pages/Project';
/* import Household from '../pages/Household'; */
import Interviewers from '../pages/Interviewers';
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
      <Route path="/offline" isPrivate component={OfflineInterviews} />
      <Route path="/accept" isPrivate component={Accept} />
      <Route exact path="/interview" isPrivate component={Interview} />
      <Route path="/interview/:id" isPrivate component={Interview} />
      <Route path="/project" isPrivate component={Project} />
      {/* <Route path="/household" isPrivate component={Household} /> */}
      <Route path="/interviewers" isPrivate component={Interviewers} />
      <Route path="/profile" isPrivate component={Profile} />
    </Switch>
  );
};

export default Routes;
