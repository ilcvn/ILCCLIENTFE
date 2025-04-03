// src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import '/i18n.js';
import { LanguageProvider } from './context/LanguageContext';

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  // </StrictMode>,
);
