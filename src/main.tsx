import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const rootEl = document.getElementById('root');
if (!rootEl) throw new Error('Root element #root not found');

const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// Production HTML is prerendered at build time (see scripts/prerender.mjs)
// so AI crawlers that don't execute JS can read the content — hydrate it.
// Dev serves an empty root and mounts fresh.
if (rootEl.hasChildNodes()) {
  hydrateRoot(rootEl, app);
} else {
  createRoot(rootEl).render(app);
}
