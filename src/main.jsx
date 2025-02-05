import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { MovieProvider } from './context/MovieContext';
import './index.css';
import App from './App';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MovieProvider>
      <App />
    </MovieProvider>
  </StrictMode>,
);
