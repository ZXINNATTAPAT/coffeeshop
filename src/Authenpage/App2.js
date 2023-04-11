import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Create a new context to store the authentication state
const SessionContext = React.createContext();

// A component that sets the authentication state in the context
function SessionProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // A function to toggle the authentication state
  function toggleAuth() {
    setIsAuthenticated(!isAuthenticated);
  }

  return (
    <SessionContext.Provider value={{ isAuthenticated, toggleAuth }}>
      {children}
    </SessionContext.Provider>
  );
}

// A private route that requires authentication to access
function PrivateRoute({ element, ...rest }) {
  const { isAuthenticated } = React.useContext(SessionContext);

  return isAuthenticated ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/login" replace />
  );
}

// A public route that doesn't require authentication
function PublicRoute({ element: Component, ...rest }) {
    const isLoggedIn = true; // Check if user is logged in or not
  
    return (
      <Route {...rest} element={isLoggedIn ? <Navigate to="/" /> : <Component />} />
    );
  }

// A component for the login page
function LoginPage() {
  const { toggleAuth } = React.useContext(SessionContext);

  function handleLogin() {
    // Simulate a login request
    setTimeout(() => {
      toggleAuth();
    }, 1000);
  }

  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

// A component for the protected page
function ProtectedPage() {
  const { toggleAuth } = React.useContext(SessionContext);

  function handleLogout() {
    toggleAuth();
  }

  return (
    <div>
      <h1>Protected Page</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

// The main app component
function App() {
  return (
    <Router>
      <SessionProvider>
        <Routes>
            <PublicRoute path="/login" element={<LoginPage />} />
            <PrivateRoute path="/" element={<ProtectedPage />} />
        </Routes>
      </SessionProvider>
    </Router>
  );
}

export default App;
