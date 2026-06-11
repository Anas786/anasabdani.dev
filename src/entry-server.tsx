import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { ServerStyleSheet } from 'styled-components';
import App from './App';

/**
 * Build-time render used by scripts/prerender.mjs — one call per route.
 * Returns the route's HTML and the styled-components critical CSS so each
 * static page is fully styled and readable before (or without) JavaScript —
 * which is what AI crawlers see.
 */
export function render(url: string): { html: string; styleTags: string } {
  const sheet = new ServerStyleSheet();
  try {
    const html = renderToString(
      sheet.collectStyles(
        <StrictMode>
          <StaticRouter location={url}>
            <App />
          </StaticRouter>
        </StrictMode>
      )
    );
    return { html, styleTags: sheet.getStyleTags() };
  } finally {
    sheet.seal();
  }
}
