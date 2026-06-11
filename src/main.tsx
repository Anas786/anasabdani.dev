import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';

const rootEl = document.getElementById('root');
if (!rootEl) throw new Error('Root element #root not found');

const app = (
  <StrictMode>
    <App />
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
