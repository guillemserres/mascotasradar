import type { APIRoute } from 'astro';
import { SITE, ANIMALS, SECTIONS, builtCategories, type CategorizedAnimal } from '../site.config';

// Endpoint dinámico (como robots.txt.ts): índice conciso del sitio en el
// formato llms.txt (https://llmstxt.org) para que un asistente de IA
// entienda de un vistazo qué animales/categorías cubre el sitio sin tener
// que rastrear las 235 páginas del sitemap. Se genera a partir de ANIMALS
// y CATEGORIES ya existentes — no se redacta ni se inventa nada nuevo aquí.
export const GET: APIRoute = () => {
  const lines: string[] = [`# ${SITE.name}`, '', `> ${SITE.description}`, ''];

  for (const a of ANIMALS) {
    lines.push(`## ${a.label}`, '');
    lines.push(`- [${a.label}](${new URL(`/${a.slug}/`, SITE.url).toString()}): ${a.description}`);

    if (a.slug === 'otras-mascotas') {
      for (const s of SECTIONS['otras-mascotas']) {
        lines.push(`  - [${s.label}](${new URL(`/${a.slug}/${s.slug}/`, SITE.url).toString()}): ${s.description}`);
      }
    } else {
      const categorias = builtCategories(a.slug as CategorizedAnimal);
      for (const c of categorias) {
        lines.push(`  - [${c.label}](${new URL(`/${a.slug}/${c.slug}/`, SITE.url).toString()}): ${c.description}`);
      }
    }
    lines.push('');
  }

  lines.push('## Blog', '');
  lines.push(`- [Blog](${new URL('/blog/', SITE.url).toString()}): cuidados, comportamiento y checklists prácticos, más allá de qué producto comprar.`);
  lines.push('');

  const body = lines.join('\n');
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
  });
};
