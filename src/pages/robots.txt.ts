import type { APIRoute } from 'astro';
import { SITE } from '../site.config';

// Endpoint dinámico en vez de public/robots.txt estático: así el dominio
// del sitemap se mantiene sincronizado con SITE.url automáticamente cuando
// cambies de dominio, en lugar de tener que recordar editar dos sitios.
export const GET: APIRoute = () => {
  const body = `User-agent: *\nAllow: /\n\nSitemap: ${new URL('sitemap-index.xml', SITE.url).toString()}\n`;
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
  });
};
