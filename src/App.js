import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './logandregis/Login';
import Album from './pageorder/Album';
import Register from './logandregis/Register';
import Coffeepage from './pageorder/Coffeepage';
import Mocha from './Typeorder/coffee/Mocha';
import Pay from './Paymentpage/Pay';
import Typepage from './Typeorder/coffee/Typepage';
import CartPage from './pageorder/Cart';
import Dashboardpage from './Dashbord/Dashbord';
import Rreceipt from './Paymentpage/Receipt';
import Orderdbpage from './Dashbord/Orderdbpage';
import Userdbpage from './Dashbord/Userdbpage';

export default function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/album" element={<Album />} />
        <Route path="/coffee" element={<Coffeepage />} />
        <Route path="/Cart" element={<CartPage />} />
        <Route path="/mocha" element={<Mocha />} />
        <Route path="/pay" element={<Pay />} />
        <Route path="/typepage" element={<Typepage />} />
        <Route path="/Rreceipt" element={<Rreceipt/>} />
        <Route path="/Dashbords" element={<Dashboardpage />} />
        <Route path="/Orderdb" element={<Orderdbpage />} />
        <Route path="/Userdb" element={<Userdbpage />} />
        <Route path="/logout" element={<Route element={<Navigate to="/" />} />} />
          <Route element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}
