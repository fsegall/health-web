import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';
import { routesHandler } from './routes-options';
const Routes: React.FC = () => {
  return (
    <Switch>
      {routesHandler?.map((r, index) => (
        <Route key={index} {...r} />
      ))}
    </Switch>
  );
};

export default Routes;
