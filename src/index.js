import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./styles/style.css";
import Notifications from "react-notify-toast";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
    <Notifications />
    <App />
  </div>
);
