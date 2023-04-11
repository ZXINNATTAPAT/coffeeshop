import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import useAuthentication from './UseAuthentication';

function ProtectedRoute({ component: Component, ...rest }) {
  const authenticated = useAuthentication();

  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
      }
    />
  );
}

export default ProtectedRoute;