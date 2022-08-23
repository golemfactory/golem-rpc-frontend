import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <div>
          <BrowserRouter>
              <Routes>
                  <Route path="/*" element={<MainPage/>} />
              </Routes>
          </BrowserRouter>
      </div>
  </React.StrictMode>
);

