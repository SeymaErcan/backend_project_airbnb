import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { restoreCSRF, csrfFetch } from './store/csrf'; // Only one import needed
import App from './App';
import './index.css';
import configureStore from './store';
import * as sessionActions from './store/session';




// If not in production, restore CSRF and expose csrfFetch and store on window for debugging
// <-- ADD THIS LINE

const store = configureStore();

if (import.meta.env.MODE !== "production") {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions; // <-- ADD THIS LINE
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
