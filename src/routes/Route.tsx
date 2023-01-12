import React from 'react';
import {
  Route as ReactDomRoute,
  RouteProps as ReactDomRouteProps,
  Redirect,
} from 'react-router-dom';
import { useAuth } from '../hooks/auth';
import AdminTemplate from '../templates/AdminTemplate';

interface RouteProps extends ReactDomRouteProps {
  isPrivate?: boolean;
  path: string;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  path,
  ...rest
}) => {
  const { user } = useAuth();
  return (
    <ReactDomRoute
      {...rest}
      path={path}
      render={({ location }) => {
        return isPrivate === !!user ? isPrivate ? (
          <AdminTemplate>
            <Component />
          </AdminTemplate>
        ) :  (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/profile',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;
