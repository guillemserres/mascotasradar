// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  // www.mascotasradar.com es el dominio que sirve la web sin redirección
  // (mascotasradar.com, sin www, hace 308 hacia aquí) — tiene que coincidir
  // con SITE.url en site.config.ts, de donde sale el resto de URLs
  // canónicas/OG/JSON-LD del sitio.
  site: 'https://www.mascotasradar.com',
  integrations: [sitemap(), mdx()]
});