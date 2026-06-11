import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import App from './App';

/**
 * Build-time render used by scripts/prerender.mjs. Returns the app's HTML and
 * the styled-components critical CSS so the static page is fully styled and
 * readable before (or without) JavaScript — which is what AI crawlers see.
 */
export function render(): { html: string; styleTags: string } {
  const sheet = new ServerStyleSheet();
  try {
    const html = renderToString(
      sheet.collectStyles(
        <StrictMode>
          <App />
        </StrictMode>
      )
    );
    return { html, styleTags: sheet.getStyleTags() };
  } finally {
    sheet.seal();
  }
}
