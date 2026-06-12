// Build-time prerender: renders every route to its own static HTML file with
// route-specific meta tags and structured data, so the deployed pages are
// fully readable without JavaScript. AI crawlers (GPTBot, ClaudeBot,
// PerplexityBot) don't execute JS — without this step they see an empty
// <div id="root">.
//
// Runs as the last step of `npm run build`:
//   vite build && vite build --ssr src/entry-server.tsx --outDir dist/server
//   && node scripts/prerender.mjs
import { mkdirSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const distDir = join(root, 'dist');
const serverDir = join(distDir, 'server');

const SITE = 'https://www.anasabdani.dev';

const CASE_STUDY_LD = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Cutting customer onboarding effort dramatically with AI-assisted workflows',
  description:
    'Case study: how AI-assisted onboarding and menu-creation workflows significantly cut customer onboarding effort and reduced early-stage churn at food-tech SaaS Flipdish.',
  // Full ISO 8601 datetimes — GSC flags bare dates as invalid (non-critical).
  datePublished: '2026-06-12T18:00:00+05:00',
  dateModified: '2026-06-12T18:00:00+05:00',
  mainEntityOfPage: `${SITE}/case-studies/ai-assisted-onboarding`,
  author: { '@type': 'Person', '@id': `${SITE}/#person`, name: 'Muhammad Anas', url: `${SITE}/` },
  keywords:
    'AI-assisted onboarding, customer onboarding automation, menu digitization, food-tech SaaS, engineering leadership',
};

const RELIABILITY_LD = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'From firefighting to foresight: an observability overhaul that dramatically cut production incidents',
  description:
    'Case study: how observability practices, SLO-driven alerting, and structured incident management dramatically reduced production incidents at Gridware.',
  datePublished: '2026-06-12T18:00:00+05:00',
  dateModified: '2026-06-12T18:00:00+05:00',
  mainEntityOfPage: `${SITE}/case-studies/reliability-observability`,
  author: { '@type': 'Person', '@id': `${SITE}/#person`, name: 'Muhammad Anas', url: `${SITE}/` },
  keywords:
    'observability, SRE, incident management, SLOs, production reliability, engineering leadership',
};

const SERVICES_LD = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Fractional CTO & Engineering Leadership Consulting',
  serviceType: [
    'Fractional CTO',
    'Engineering Leadership',
    'AI-Assisted Delivery Consulting',
    'Architecture & Reliability Advisory',
  ],
  description:
    'Fractional engineering leadership, AI-assisted delivery consulting, and advisory for SaaS and food-tech product companies. Remote, with US/UK/EU overlap.',
  provider: { '@type': 'Person', '@id': `${SITE}/#person`, name: 'Muhammad Anas', url: `${SITE}/` },
  areaServed: 'Remote — US, UK, EU time-zone overlap',
  url: `${SITE}/services`,
};

const CASE_INDEX_LD = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Engineering Leadership Case Studies',
  description:
    'Case studies in delivery leadership, AI adoption, and production reliability by Muhammad Anas.',
  url: `${SITE}/case-studies`,
  hasPart: [
    { '@type': 'Article', url: `${SITE}/case-studies/ai-assisted-onboarding` },
    { '@type': 'Article', url: `${SITE}/case-studies/reliability-observability` },
  ],
};

const ROUTES = [
  // The home route keeps the template's own title/meta/ProfilePage schema.
  { path: '/', out: 'index.html' },
  {
    path: '/services',
    out: join('services', 'index.html'),
    title:
      'Fractional CTO & Engineering Leadership Consulting — SaaS / Food-tech | Muhammad Anas',
    description:
      'Fractional CTO, engineering leadership, and AI-assisted delivery consulting for SaaS and food-tech companies. Remote with US/UK/EU overlap. Book an intro call.',
    canonical: `${SITE}/services`,
    jsonLd: SERVICES_LD,
  },
  {
    path: '/case-studies',
    out: join('case-studies', 'index.html'),
    title: 'Engineering Leadership Case Studies — Delivery, AI, Reliability | Muhammad Anas',
    description:
      'Real initiatives, real outcomes: case studies in AI-assisted delivery, customer onboarding automation, and production reliability from Muhammad Anas.',
    canonical: `${SITE}/case-studies`,
    jsonLd: CASE_INDEX_LD,
  },
  {
    path: '/case-studies/reliability-observability',
    out: join('case-studies', 'reliability-observability', 'index.html'),
    title:
      'Reliability & Observability Case Study — Dramatically Fewer Incidents | Muhammad Anas',
    description:
      'How observability practices, SLO-driven alerting, and structured incident management dramatically reduced production incidents at Gridware.',
    canonical: `${SITE}/case-studies/reliability-observability`,
    jsonLd: RELIABILITY_LD,
  },
  {
    path: '/case-studies/ai-assisted-onboarding',
    out: join('case-studies', 'ai-assisted-onboarding', 'index.html'),
    title:
      'AI-Assisted Customer Onboarding Case Study — Faster Onboarding, Lower Churn | Muhammad Anas',
    description:
      'How AI-assisted onboarding and menu-creation workflows significantly cut customer onboarding effort and reduced early-stage churn at food-tech SaaS Flipdish.',
    canonical: `${SITE}/case-studies/ai-assisted-onboarding`,
    jsonLd: CASE_STUDY_LD,
  },
];

const { render } = await import(pathToFileURL(join(serverDir, 'entry-server.js')).href);
const template = readFileSync(join(distDir, 'index.html'), 'utf8');

// Tolerant of attribute-order/whitespace normalization by Vite's HTML pipeline.
const rootRe = /<div\s+id="root"\s*>\s*<\/div>/;
if (!rootRe.test(template)) {
  throw new Error('prerender: could not find empty #root in dist/index.html');
}

/**
 * Server rendering bakes in motion's pre-animation state — whole sections
 * carry style="opacity:0;..." until JS runs. Text extractors don't care, but
 * visibility-aware SEO parsers (e.g. Bing's analyzer) may discount hidden
 * headings, and no-JS readers would see a blank page. Drop any inline style
 * that pins an element at opacity:0; the client re-applies animation state
 * on hydration. (`opacity:0.16` etc. must NOT match — boundary required.)
 */
function stripHiddenState(html) {
  return html.replace(/ style="([^"]*)"/g, (attr, css) =>
    /(?:^|;)opacity:0(?:;|$)/.test(css) ? '' : attr
  );
}

for (const route of ROUTES) {
  const { html: rawHtml, styleTags } = render(route.path);
  const html = stripHiddenState(rawHtml);
  let page = template;

  if (route.title) {
    const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
    page = page
      .replace(/<title>[^<]*<\/title>/, `<title>${esc(route.title)}</title>`)
      .replace(
        /(<link rel="canonical" href=")[^"]*(")/,
        `$1${route.canonical}$2`
      )
      .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${route.canonical}$2`)
      .replace(
        /(<meta\s+name="description"\s+content=")[^"]*(")/,
        `$1${esc(route.description)}$2`
      )
      .replace(
        /(<meta property="og:title" content=")[^"]*(")/,
        `$1${esc(route.title)}$2`
      )
      .replace(
        /(<meta name="twitter:title" content=")[^"]*(")/,
        `$1${esc(route.title)}$2`
      )
      .replace(
        /(<meta\s+property="og:description"\s+content=")[^"]*(")/,
        `$1${esc(route.description)}$2`
      )
      .replace(
        /(<meta\s+name="twitter:description"\s+content=")[^"]*(")/,
        `$1${esc(route.description)}$2`
      );
  }
  if (route.jsonLd) {
    page = page
      .replace(/<!-- Structured data:[\s\S]*?-->/, '<!-- Structured data -->')
      .replace(
        /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
        `<script type="application/ld+json">\n${JSON.stringify(route.jsonLd, null, 2)}\n    </script>`
      );
  }

  page = page.replace(rootRe, `<div id="root">${html}</div>`);
  page = page.replace('</head>', `${styleTags}\n  </head>`);

  const outPath = join(distDir, route.out);
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, page);

  const words = html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  console.log(`prerender: ${route.path} → ${route.out} (${words} words)`);
}

// The SSR bundle is build tooling, not a deployable asset.
rmSync(serverDir, { recursive: true, force: true });
