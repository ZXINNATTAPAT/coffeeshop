import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter,Route,Routes } from "react-router-dom";
import Login from '../src/logandregis/Login'
import Album from './pageorder/Album';
import Register from "../src/logandregis/Register"
import Coffeepage from './pageorder/Coffeepage';
import Mocha from './Typeorder/coffee/Mocha';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/"element={<App />} />
      <Route path="/Login"element={<Login />} />
      <Route path="/Register"element={<Register />} />
      <Route path="/Album"element={<Album />} />
      <Route path="/Coffee"element={<Coffeepage />} />
      <Route path="/Mocha"element={<Mocha />} />
    </Routes>
  </BrowserRouter>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
