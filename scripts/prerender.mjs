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

const PERSON = { '@type': 'Person', '@id': `${SITE}/#person`, name: 'Muhammad Anas', url: `${SITE}/` };

// Page titles as rendered in each page's <h1>. Keep these in sync with
// src/pages/*.tsx so the Article headline matches the visible heading.
const ONBOARDING_H1 =
  'AI-assisted customer onboarding at Flipdish: cutting manual effort dramatically for a food-tech SaaS';
const RELIABILITY_H1 =
  'Reliability and observability at Gridware: how an observability overhaul dramatically cut production incidents';

const crumb = (position, name, url) => ({ '@type': 'ListItem', position, name, item: url });
const breadcrumbs = (...items) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, url], i) => crumb(i + 1, name, url)),
});

// Copied verbatim from the FAQ section in src/pages/Services.tsx (the Q4
// answer's inline link is flattened to plain text).
const SERVICES_FAQ = [
  {
    q: 'What does a fractional CTO do?',
    a: 'A fractional CTO is a senior technology leader who works with a company part-time instead of as a full-time executive. In my case that means owning architecture decisions, the delivery process, hiring, and the translation between business goals and engineering reality. You get the judgment of an experienced engineering leader without the cost or commitment of a full-time hire. Day to day I set technical direction, unblock delivery, and build the team and processes so the company can eventually run without me.',
  },
  {
    q: 'How does a fractional CTO engagement work?',
    a: 'A fractional CTO engagement with me starts with a scoped discovery conversation: what you are trying to achieve, where things are stuck, and whether I am the right person to help. From there we agree on the business outcomes the engagement is accountable for and a recurring slice of my week. I work embedded with your existing team, fully remote, with regular checkpoints. Every engagement is designed around a clean handoff so your company never becomes dependent on me long term.',
  },
  {
    q: 'What kinds of companies do you work with?',
    a: 'I work mostly with SaaS and food-tech product companies. I lead engineering at Flipdish, a restaurant ordering and management SaaS platform, and previously managed cloud-native and mobile-first platforms at Gridware. I am most useful where delivery has slowed down, reliability is hurting customers, or an AI initiative needs someone who has shipped one in production. The stack I know best is TypeScript, Node.js, React, and serverless microservices on AWS.',
  },
  {
    q: 'How do you bring AI into software delivery?',
    a: 'I start with the bottleneck and choose the model second. I map the workflow, find where the hours actually go, and apply LLM-assisted workflows with human review on the quality gate. Then I measure the result against the pre-AI baseline. I also help teams adopt AI tooling such as GitHub Copilot, Claude, and ChatGPT across the development lifecycle. The Flipdish onboarding case study walks through this approach end to end.',
  },
  {
    q: 'Where are you based and which time zones do you cover?',
    a: 'I am based in Karachi, Pakistan and work fully remote. I keep structured overlap with US, UK, and EU time zones, and I have spent years working directly with US-based stakeholders and customers. I run engagements async-first so progress does not depend on meetings.',
  },
];

const SERVICES_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': `${SITE}/services#service`,
      name: 'Fractional CTO and Engineering Leadership Consulting',
      serviceType: [
        'Fractional CTO',
        'Engineering Leadership Consulting',
        'AI-Assisted Delivery Consulting',
        'Architecture and Reliability Advisory',
      ],
      description:
        'Muhammad Anas offers fractional CTO and engineering leadership consulting, AI-assisted delivery consulting, and advisory calls for SaaS and food-tech product companies. Engagements are fully remote with US, UK and EU time-zone overlap.',
      provider: PERSON,
      areaServed: ['United States', 'United Kingdom', 'European Union', 'Remote'],
      availableChannel: {
        '@type': 'ServiceChannel',
        serviceUrl: `${SITE}/#work`,
        availableLanguage: 'English',
      },
      url: `${SITE}/services`,
    },
    {
      '@type': 'FAQPage',
      '@id': `${SITE}/services#faq`,
      mainEntity: SERVICES_FAQ.map(({ q, a }) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a },
      })),
    },
    breadcrumbs(['Home', `${SITE}/`], ['Services', `${SITE}/services`]),
  ],
};

const CASE_INDEX_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': `${SITE}/case-studies#page`,
      name: 'Engineering Leadership Case Studies',
      description:
        'Case studies by Muhammad Anas, Engineering Manager and fractional CTO, covering AI-assisted delivery, customer onboarding automation, and production reliability at SaaS product companies.',
      url: `${SITE}/case-studies`,
      author: PERSON,
      hasPart: [
        { '@type': 'Article', url: `${SITE}/case-studies/ai-assisted-onboarding`, headline: ONBOARDING_H1 },
        { '@type': 'Article', url: `${SITE}/case-studies/reliability-observability`, headline: RELIABILITY_H1 },
      ],
    },
    breadcrumbs(['Home', `${SITE}/`], ['Case studies', `${SITE}/case-studies`]),
  ],
};

const CASE_STUDY_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      '@id': `${SITE}/case-studies/ai-assisted-onboarding#article`,
      headline: ONBOARDING_H1,
      description:
        'Case study: how Muhammad Anas and his teams at Flipdish rebuilt customer onboarding around AI-assisted menu creation, significantly cutting onboarding effort and reducing early-stage churn for a food-tech SaaS platform.',
      // Full ISO 8601 datetimes — GSC flags bare dates as invalid (non-critical).
      datePublished: '2026-06-12T18:00:00+05:00',
      dateModified: '2026-09-23T00:00:00+05:00',
      mainEntityOfPage: `${SITE}/case-studies/ai-assisted-onboarding`,
      author: PERSON,
      keywords:
        'AI-assisted onboarding, customer onboarding automation, menu digitization, food-tech SaaS, engineering leadership, AI-assisted delivery',
    },
    breadcrumbs(
      ['Home', `${SITE}/`],
      ['Case studies', `${SITE}/case-studies`],
      [ONBOARDING_H1, `${SITE}/case-studies/ai-assisted-onboarding`]
    ),
  ],
};

const RELIABILITY_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      '@id': `${SITE}/case-studies/reliability-observability#article`,
      headline: RELIABILITY_H1,
      description:
        'Case study: how Muhammad Anas, as Engineering Manager at Gridware, introduced observability practices, SLO-driven alerting, and structured incident management that dramatically reduced production incidents.',
      datePublished: '2026-06-12T18:00:00+05:00',
      dateModified: '2026-09-23T00:00:00+05:00',
      mainEntityOfPage: `${SITE}/case-studies/reliability-observability`,
      author: PERSON,
      keywords:
        'observability, SRE, incident management, SLOs, production reliability, cloud-native, AWS, engineering leadership',
    },
    breadcrumbs(
      ['Home', `${SITE}/`],
      ['Case studies', `${SITE}/case-studies`],
      [RELIABILITY_H1, `${SITE}/case-studies/reliability-observability`]
    ),
  ],
};

const ROUTES = [
  // The home route keeps the template's own title/meta/ProfilePage schema.
  { path: '/', out: 'index.html' },
  {
    path: '/services',
    out: join('services', 'index.html'),
    title: 'Fractional CTO and Engineering Leadership | Muhammad Anas',
    description:
      'Fractional CTO, engineering leadership consulting, and AI-assisted delivery from Muhammad Anas for SaaS and food-tech companies. Fully remote, with US, UK and EU time-zone overlap.',
    canonical: `${SITE}/services`,
    jsonLd: SERVICES_LD,
  },
  {
    path: '/case-studies',
    out: join('case-studies', 'index.html'),
    title: 'Engineering Leadership Case Studies | Muhammad Anas',
    description:
      'Case studies by Muhammad Anas, Engineering Manager and fractional CTO: AI-assisted delivery, customer onboarding automation, and production reliability in SaaS.',
    canonical: `${SITE}/case-studies`,
    jsonLd: CASE_INDEX_LD,
  },
  {
    path: '/case-studies/reliability-observability',
    out: join('case-studies', 'reliability-observability', 'index.html'),
    title: 'Reliability and Observability Case Study | Muhammad Anas',
    description:
      'How Muhammad Anas, Engineering Manager at Gridware, used observability, SLO-driven alerting, and incident management to dramatically cut production incidents.',
    canonical: `${SITE}/case-studies/reliability-observability`,
    jsonLd: RELIABILITY_LD,
  },
  {
    path: '/case-studies/ai-assisted-onboarding',
    out: join('case-studies', 'ai-assisted-onboarding', 'index.html'),
    title: 'AI-Assisted Customer Onboarding Case Study | Muhammad Anas',
    description:
      'How Muhammad Anas and his Flipdish teams used AI-assisted onboarding and menu creation workflows to significantly cut onboarding effort and reduce early churn.',
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
