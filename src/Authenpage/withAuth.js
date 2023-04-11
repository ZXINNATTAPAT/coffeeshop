import React from 'react';
import { useNavigate } from 'react-router-dom';

const withAuth = (Component) => {
  const AuthenticatedComponent = (props) => {
    const navigate = useNavigate();
    const isAuthenticated = true; // replace with your authentication logic

    if (!isAuthenticated) {
      navigate('/login');
      return null;
    }

    return <Component {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
