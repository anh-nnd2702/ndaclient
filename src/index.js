import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging/sw";
const firebaseConfig = {
  apiKey: "AIzaSyCctqeXKJYZmRLeeoyW9qrA5y9Pq8CMnnc",
  authDomain: "datn-nda.firebaseapp.com",
  projectId: "datn-nda",
  storageBucket: "datn-nda.appspot.com",
  messagingSenderId: "1073024301321",
  appId: "1:1073024301321:web:fbcaa8fa6e1307c319fbd8",
  measurementId: "G-HS5GDXFTV6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
