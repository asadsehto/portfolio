import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

const root = document.getElementById('root');
const app = (
  <StrictMode>
    <App url={window.location.pathname} />
  </StrictMode>
);

// Pages are pre-rendered at build time, so hydrate when HTML is already there.
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
