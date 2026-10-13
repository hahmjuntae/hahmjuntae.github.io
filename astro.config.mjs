import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://hahmjuntae.github.io',
  integrations: [sitemap()],
  redirects: { '/roadmap': '/' },
});
