import type { APIRoute } from 'astro';
import { ADSENSE } from '../site.config';

// Endpoint dinámico (como robots.txt.ts): declara a Google como vendedor
// autorizado del inventario publicitario de este dominio. Sin este
// archivo, AdSense puede limitar o bloquear la publicidad aunque el resto
// de la integración esté bien — no es opcional.
// El ID de pub- es el mismo que ADSENSE.clientId sin el prefijo "ca-".
export const GET: APIRoute = () => {
  const pubId = ADSENSE.clientId.replace(/^ca-/, '');
  const body = `google.com, ${pubId}, DIRECT, f08c47fec0942fa0\n`;
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
  });
};
