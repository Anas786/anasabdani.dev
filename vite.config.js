import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          // ssr: true keeps styled-components class hashes identical between
          // the client bundle and the prerender (SSR) bundle, so hydration
          // matches the build-time HTML.
          ['babel-plugin-styled-components', { ssr: true, displayName: false }],
        ],
      },
    }),
  ],
  ssr: {
    // styled-components ships CJS whose default export breaks under Node ESM
    // interop when externalized — bundle it into the prerender build instead.
    noExternal: ['styled-components'],
  },
  server: {
    port: 5173,
    host: true,
  },
});
