import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import './index.css';
import App from './app/App';
import { ThemeProvider } from './context/ThemeProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  </StrictMode>,
);
