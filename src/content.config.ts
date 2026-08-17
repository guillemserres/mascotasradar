import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const animalEnum = z.enum(['perros', 'gatos', 'acuarios', 'otras-mascotas']);

// FAQ reutilizable en guías (alimenta el bloque visual + FAQPage schema).
const faqSchema = z.object({ question: z.string(), answer: z.string() });

// Guías: la página "hub" de cada Tipo (p.ej. /perros/descanso/camas/) para
// perros/gatos/acuarios, o de cada Sección legacy (p.ej.
// /otras-mascotas/conejos/) para otras-mascotas. Contenido editorial — cómo
// elegir, qué mirar — que enlaza a las landings de producto individuales.
// No lleva enlaces de Amazon propios; esos viven solo en `productos`.
//
// `categoria`+`tipo` son el modelo NUEVO (perros/gatos/acuarios). `seccion`
// es el modelo LEGACY (solo otras-mascotas). Cada guía usa un juego u otro,
// nunca los dos — se valida en tiempo de build con `superRefine`.
const guias = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/guias' }),
  schema: z
    .object({
      title: z.string(),
      description: z.string(),
      animal: animalEnum,
      seccion: z.string().optional(),
      categoria: z.string().optional(),
      tipo: z.string().optional(),
      pubDate: z.date(),
      updatedDate: z.date().optional(),
      faqs: z.array(faqSchema).optional()
    })
    .superRefine((data, ctx) => {
      const isLegacy = data.animal === 'otras-mascotas';
      if (isLegacy && !data.seccion) {
        ctx.addIssue({ code: 'custom', message: 'otras-mascotas necesita "seccion"' });
      }
      if (!isLegacy && (!data.categoria || !data.tipo)) {
        ctx.addIssue({ code: 'custom', message: `${data.animal} necesita "categoria" y "tipo"` });
      }
    })
});

// Productos: una landing por producto. Cada una necesita reseña propia (no
// solo specs) para no ser "thin content"/doorway page ante Google Ads,
// AdSense y las normas de Amazon Associates sobre contenido original.
const productos = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/productos' }),
  schema: z
    .object({
      title: z.string(),
      description: z.string(),
      animal: animalEnum,
      seccion: z.string().optional(),
      categoria: z.string().optional(),
      tipo: z.string().optional(),
      pubDate: z.date(),
      updatedDate: z.date().optional(),
      asinOrUrl: z.string(),
      price: z.string().optional(),
      priceCheckedDate: z.string().optional(),
      // URL de imagen de Amazon (enlazada, nunca descargada/alojada aquí —
      // así lo exige Amazon Associates). Opcional: mientras no haya
      // productos reales, CoverArt.astro usa una portada ilustrada.
      imageUrl: z.string().url().optional(),
      // Valoración EDITORIAL propia (no es la media de reseñas de Amazon,
      // que no tenemos vía API). Se etiqueta siempre como "nuestra valoración".
      rating: z.number().min(1).max(5),
      bestFor: z.string(),
      pros: z.array(z.string()).min(2),
      cons: z.array(z.string()).min(1),
      // --- Facetas de filtro (todas opcionales; solo se usan si existen) ---
      // Marca real del producto — sistema independiente, NUNCA inventada.
      marca: z.string().optional(),
      // "Tipo" de producto DENTRO de la página (p.ej. "Viscoelástica" dentro
      // de la página Camas). Distinto del `tipo` de arriba, que es el
      // segmento de URL (p.ej. "camas").
      variante: z.string().optional(),
      tamanos: z.array(z.string()).optional(),
      necesidades: z.array(z.string()).optional()
    })
    .superRefine((data, ctx) => {
      const isLegacy = data.animal === 'otras-mascotas';
      if (isLegacy && !data.seccion) {
        ctx.addIssue({ code: 'custom', message: 'otras-mascotas necesita "seccion"' });
      }
      if (!isLegacy && (!data.categoria || !data.tipo)) {
        ctx.addIssue({ code: 'custom', message: `${data.animal} necesita "categoria" y "tipo"` });
      }
    })
});

// Blog: contenido editorial independiente de las guías de compra. Las
// guías responden "qué producto elegir dentro de X"; el blog responde
// preguntas más amplias (comportamiento, cuidados, checklists) que no
// están atadas a un único tipo de producto y enlazan de forma natural
// hacia varias categorías/guías/productos a la vez. No lleva su propio
// sistema de afiliados: si enlaza a un producto, usa los mismos enlaces
// centralizados de siempre.
const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    faqs: z.array(faqSchema).optional()
  })
});

export const collections = { guias, productos, blog };
