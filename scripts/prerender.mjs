// Build-time prerender: injects the server-rendered app + critical CSS into
// dist/index.html so the deployed page is fully readable without JavaScript.
// AI crawlers (GPTBot, ClaudeBot, PerplexityBot) don't execute JS — without
// this step they see an empty <div id="root">.
//
// Runs as the last step of `npm run build`:
//   vite build && vite build --ssr src/entry-server.tsx --outDir dist/server
//   && node scripts/prerender.mjs
import { readFileSync, writeFileSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const indexPath = join(root, 'dist', 'index.html');
const serverDir = join(root, 'dist', 'server');

const { render } = await import(pathToFileURL(join(serverDir, 'entry-server.js')).href);
const { html, styleTags } = render();

let page = readFileSync(indexPath, 'utf8');

// Tolerant of attribute-order/whitespace normalization by Vite's HTML pipeline.
const rootRe = /<div\s+id="root"\s*>\s*<\/div>/;
if (!rootRe.test(page)) {
  throw new Error('prerender: could not find empty #root in dist/index.html');
}
page = page.replace(rootRe, `<div id="root">${html}</div>`);
page = page.replace('</head>', `${styleTags}\n  </head>`);

writeFileSync(indexPath, page);

// The SSR bundle is build tooling, not a deployable asset.
rmSync(serverDir, { recursive: true, force: true });

const words = html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
console.log(`prerender: injected ${words} words of static content into dist/index.html`);
