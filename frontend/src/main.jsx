import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { restoreCSRF, csrfFetch } from './store/csrf'; // Only one import needed
import App from './App';
import './index.css';
import configureStore from './store';

const store = configureStore();

// If not in production, restore CSRF and expose csrfFetch and store on window for debugging
if (import.meta.env.MODE !== 'production') {
  restoreCSRF();
  window.csrfFetch = csrfFetch;
  window.store = store;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
