import React, {createContext, useContext, useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import {AuthProvider} from "./Auth";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <AuthProvider>
          <div>
              <BrowserRouter>
                  <Routes>
                      <Route path="/*" element={<MainPage/>} />
                  </Routes>
              </BrowserRouter>
          </div>
      </AuthProvider>
  </React.StrictMode>
);

