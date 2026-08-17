import { AMAZON } from '../site.config';

/**
 * Construye la URL de un producto de Amazon con el Tracking ID de Associates
 * inyectado. Punto único de generación de enlaces: así el tag y el
 * formato nunca se escriben a mano en un artículo y no pueden olvidarse.
 *
 * No hay integración con la Creators API todavía (requiere cuenta de
 * Associates activa con 10 ventas cualificadas en 30 días). Hasta entonces,
 * el ASIN/URL y el precio se introducen a mano en cada artículo — ver
 * AmazonProductLink.astro para el aviso de "precio a fecha de" obligatorio.
 */
export function buildAmazonUrl(asinOrUrl: string): string {
  const isFullUrl = /^https?:\/\//i.test(asinOrUrl);
  const base = isFullUrl
    ? asinOrUrl
    : `https://www.${AMAZON.marketplace}/dp/${asinOrUrl}`;

  const url = new URL(base);
  url.searchParams.set('tag', AMAZON.associateTag);
  return url.toString();
}
