import React from 'react';
import {
  Route as ReactDomRoute,
  RouteProps as ReactDomRouteProps,
  Redirect,
} from 'react-router-dom';
import hasPermission from '../authorization/constants';
import { useAuth } from '../hooks/auth';
import AdminTemplate from '../templates/AdminTemplate';
import { routesOptions } from '../templates/AdminTemplate/components/Menu/menu-routes';

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

  function handlePagePermissionAccess(isPrivate: boolean) {
    const route = routesOptions.find(r => r.path === path)
    if (!isPrivate) {
      return true
    }
    if (isPrivate && route && user?.role) {
      return hasPermission(user?.role, route?.action)
    }
    return false
  }

  return (
    <ReactDomRoute
      {...rest}
      path={path}
      render={({ location }) => {
        if (!handlePagePermissionAccess(isPrivate)) {
          return (
            <Redirect
            to={{
              pathname: isPrivate ? '/' : '/profile',
              state: { from: location },
            }}
          />
          )
        }
        return isPrivate === !!user ? isPrivate ? (
          <AdminTemplate>
            <Component />
          </AdminTemplate>
        ) : (
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
