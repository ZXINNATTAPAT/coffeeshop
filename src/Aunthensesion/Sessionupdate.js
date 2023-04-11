import React, { createContext, useState } from 'react';
import { getSession, setSession } from 'react-session';

export const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [session, setLocalSession] = useState(getSession());

  const updateSession = (newSession) => {
    setSession(newSession);
    setLocalSession(newSession);
  };

  return (
    <SessionContext.Provider value={{ session, updateSession }}>
      {children}
    </SessionContext.Provider>
  );
};
