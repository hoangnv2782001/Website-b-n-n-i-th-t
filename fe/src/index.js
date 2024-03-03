import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import './index.css';
import { HelmetProvider } from 'react-helmet-async';
import SettingsProvider from './contexts/SettingsContext';
import { BrowserRouter } from 'react-router-dom';
import { store } from "./redux/store";
import { Provider as ReduxProvider} from "react-redux";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <HelmetProvider>
    <ReduxProvider store={store}>
      <SettingsProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SettingsProvider>
    </ReduxProvider>
  </HelmetProvider>

);

