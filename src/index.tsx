import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import { createBrowserHistory } from "history";

import configureStore from "./saga/main";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

declare global {
  interface Window {
      INITIAL_REDUX_STATE: any;
  }
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const history = createBrowserHistory()

const initialState = window.INITIAL_REDUX_STATE;

const store = configureStore(history, initialState)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
