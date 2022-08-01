import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { userReducer } from './store/reducer/user';
import { medicineReducer } from './store/reducer/medicine';
import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';

// let myStore=createStore(combinReducer({u:userReducer,m:medicineReducer}),composeWithDevTools())
 ReactDOM.render(
  <React.StrictMode>    
    <BrowserRouter>
    <App />
    </BrowserRouter>
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
