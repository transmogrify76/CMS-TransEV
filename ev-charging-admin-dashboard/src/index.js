// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Ensure this import is correct
import App from './App';
import reportWebVitals from './reportWebVitals'; // Ensure this import is correct

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
