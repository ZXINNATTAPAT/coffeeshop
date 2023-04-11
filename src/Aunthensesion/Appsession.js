import React from 'react';
import Album from '../pageorder/Album';
import SignInSide from './Loginssesion';
import PrivateRoute from './PrivateRoute';
import { SessionProvider } from './Sessionupdate';
import { Routes, Route } from 'react-router-dom';

function Appssession() {
  return (
    <SessionProvider>
      <Routes>
        <Route path="/login" element={<SignInSide />} />
        <PrivateRoute path="/dashboard" element={<Album />} />
      </Routes>
    </SessionProvider>
  );
}

export default Appssession;
