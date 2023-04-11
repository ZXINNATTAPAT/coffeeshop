import React, { useContext } from 'react';
import { Navigate, Route } from 'react-router-dom';
import { SessionContext } from './Sessionupdate';

function PrivateRoute({ element, ...rest }) {
  const { session } = useContext(SessionContext);

  return session.user ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/login" replace />
  );
}

export default PrivateRoute;
