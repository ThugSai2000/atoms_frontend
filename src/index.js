import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';


const roo = document.getElementById("root") 
const root = ReactDOM.createRoot(roo) ;
root.render(
  <React.StrictMode>
       <App />
  </React.StrictMode>
);


