# MascotasRadar

Sitio Astro en español sobre mascotas, monetizado con Amazon Associates
(afiliados) y Google AdSense. Dominio: mascotasradar.com. El nombre de marca
vive en [`SITE.name`](src/site.config.ts), un único punto de cambio si vuelve
a renombrarse en el futuro.

## Cómo arrancar en local

Node.js no está en el PATH del sistema por defecto en esta máquina (se
instaló una copia portátil en `~/.local/node-toolchain`, sin tocar el
sistema). Se añadió a tu `~/.zshrc`, así que en una terminal nueva basta con:

```sh
npm install
npm run dev
```

Si en algún momento `node`/`npm` no se encuentran, exporta el PATH a mano:

```sh
export PATH="$HOME/.local/node-toolchain/bin:$PATH"
```

## Arquitectura de contenido: Animal → Categoría → Tipo → Producto

Dos modelos conviven a propósito, sin mezclarse:

**Modelo nuevo** (`perros`, `gatos`, `acuarios`) — 4 niveles:

```text
/perros/                          ← hub de animal (lista de categorías con contenido)
/perros/descanso/                 ← hub de categoría: intro + "¿Qué tipo buscas?" + destacados
/perros/descanso/viscoelasticas/  ← hub de tipo: guía + comparativa + FILTROS + grid
/perros/descanso/viscoelasticas/cama-...  ← landing individual de UN producto
```

El hub de categoría (`CategoryHub.astro`) es el punto de descubrimiento:
muestra una tarjeta visual por cada tipo `built: true` de esa categoría
(icono, nombre, descripción, nº de productos) bajo el título "¿Qué tipo
buscas?", y debajo agrega los productos mejor valorados de toda la
categoría cruzando tipos ("Destacados en..."). Categorías con varios tipos
reales ahora mismo: `perros/juguetes` (mordedores, cuerda, dispensadores,
acuáticos), `perros/descanso` (viscoelásticas, elevadas, antiestrés,
económicas), `perros/paseo` (antitirones, ligeros, seguridad-coche,
reflectantes), `gatos/areneros` (automáticos, cerrados, portátiles, XXL
abiertos) y `gatos/rascadores` (postes de sisal, torres, pared, cartón
horizontal) — cada tipo con 1 producto real, recategorizado desde su
`variante` ya existente, nunca inventado.

**Modelo legacy** (`otras-mascotas`, conejos/roedores) — 3 niveles, sin
tocar, tal y como estaba:

```text
/otras-mascotas/conejos/          ← hub de sección: guía + grid de productos
/otras-mascotas/conejos/corral-.. ← landing individual de UN producto
```

- **Categorías y tipos**: viven en `CATEGORIES` dentro de
  [`site.config.ts`](src/site.config.ts) — un árbol completo con TODAS las
  categorías y tipos que se puedan necesitar a futuro, cada tipo con un
  flag `built: boolean`. **Un tipo sin `built: true` no genera página ni
  aparece en ningún menú** — así se evita el problema de páginas finas o
  vacías. En cuanto escribas la guía y los productos de un tipo, cambia su
  `built` a `true` y aparece solo, sin tocar rutas ni componentes.
- **Guía** (colección `guias`): un `.mdx` por tipo en `src/content/guias/`,
  con `categoria`+`tipo` en el frontmatter (modelo nuevo) o `seccion`
  (modelo legacy) — nunca los dos a la vez, se valida en build. Puede
  llevar `faqs: [{question, answer}]`, que alimenta un bloque visual +
  FAQPage schema automáticamente.
- **Producto** (colección `productos`): una landing por producto con su
  reseña, pros/contras, valoración editorial y el CTA de Amazon — la única
  colección con enlaces de afiliado. Puede llevar facetas opcionales
  `marca`, `variante`, `tamanos`, `necesidades` que alimentan los
  **filtros** de la página de tipo (`FilterBlocks.astro`, 100% client-side,
  no genera ninguna URL nueva por combinación).

**Para añadir un tipo nuevo dentro de una categoría ya construida** (p. ej.
"Mantas" dentro de "Descanso" en perros): busca la entrada en `CATEGORIES`
→ `perros` → `descanso` → `types` → `mantas` en `site.config.ts`, cambia
`built` a `true` y rellénale un icono real; crea
`src/content/guias/perros-descanso-mantas.mdx` con
`animal: perros / categoria: descanso / tipo: mantas`; añade productos con
ese mismo trío. Las rutas son genéricas, no hay que tocarlas.

**Para añadir una categoría o un animal nuevo por completo**: añade la
entrada en `CATEGORIES` (o un animal nuevo siguiendo el patrón de
`acuarios`) y sigue el mismo proceso de arriba para su primer tipo.

**Para añadir un producto nuevo**: crea un `.mdx` en
`src/content/productos/` con un slug único y descriptivo como nombre de
archivo (esa es la URL final). Repasa el schema en
[`content.config.ts`](src/content.config.ts): `pros` necesita al menos 2
elementos, `cons` al menos 1 — están para dar una reseña honesta, no para
vender sin matices.

## Blog (colección independiente)

`src/content/blog/*.mdx` — artículos de cuidados y comportamiento que **no**
cuelgan de ningún animal/categoría/tipo (a diferencia de `guias`, que sí).
Sirven para responder preguntas más amplias ("¿por qué mi gato no usa el
arenero?") y enlazar de forma natural hacia categorías, tipos y productos
concretos — refuerzo de enlazado interno, no solo contenido de relleno.
Cada entrada admite `faqs` igual que `guias`. Rutas: `/blog/` (listado) y
`/blog/[slug]/` (`BlogPostLayout.astro`, con Article + FAQPage schema).
Para añadir un artículo: crea el `.mdx`, enlaza 2-3 páginas reales del
catálogo desde el cuerpo, no inventes datos de producto que no estén ya
publicados en su propia landing.

## Marcas

Sistema independiente y deliberadamente vacío (`BRANDS` en
`site.config.ts`): no se ha inventado ninguna marca para los productos de
ejemplo actuales. El campo `marca` de un producto ya se muestra en su ficha
y ya es filtrable — solo falta que rellenes marcas reales según añadas
productos reales.

## Por qué cada producto tiene su propia landing (y no un enlace suelto)

Con muchas secciones y muchos productos, el riesgo real es acabar con
**páginas finas o "puerta"** (poco contenido propio, solo un enlace de
salida) — algo que penalizan tanto la revisión de contenido de AdSense como
las políticas de destino de Google Ads, y que además incumple el requisito
de "contenido original" del programa de Amazon Associates. Por eso cada
landing de producto en `ProductLayout.astro` obliga a tener:

- Reseña propia en prosa (no solo una ficha de specs).
- Pros y contras reales, incluyendo al menos un contra — una página sin
  ningún "pero" se lee como publicidad encubierta, no como reseña.
- Una **valoración editorial** (`rating`, 1-5) — es la opinión del sitio,
  no la media de reseñas de Amazon (no tenemos acceso a esos datos vía
  API). El componente `RatingStars` siempre la etiqueta como "Nuestra
  valoración" para no dar la impresión de ser un dato de terceros.
- Enlace de vuelta a la guía de la sección y a otros productos relacionados
  — refuerza que la página vive dentro de un sitio con navegación real, no
  aislada.

**Nunca fabricar reseñas de clientes ni contadores de valoraciones**: no
tenemos esos datos reales, y mostrarlos como si lo fueran es contenido
engañoso tanto para Google como para el usuario.

## Antes de publicar de verdad — checklist

Este scaffold sigue las reglas de Amazon Associates, AdSense y Google Ads,
pero hay piezas que **solo tú puedes rellenar**:

1. **Dominio real.** Cambia `site` en [`astro.config.mjs`](astro.config.mjs)
   y `url` en `site.config.ts` (ahora mismo apuntan a un dominio de ejemplo).
2. **Cuenta de Amazon Associates.** En `site.config.ts`, sustituye
   `AMAZON.associateTag` por tu Tracking ID real
   (formato tipo `tunombre-21` para amazon.es). **No publiques el sitio con
   el tag placeholder** — no generará comisión, y los 36 productos de
   ejemplo (ASIN `B0EXAMPLE1`...`B0EXAMPLE36`) deben cambiarse por productos
   reales antes de salir a producción.
3. **API de Amazon.** No hay integración automática de precios: Amazon
   cerró la antigua PA-API en mayo de 2026 y la sustituyó por la
   **Creators API**, que exige 10 ventas cualificadas en 30 días — un umbral
   que un sitio nuevo no puede cumplir todavía. Por eso los precios se
   introducen a mano en cada producto vía `AmazonProductLink`, con fecha de
   consulta. Cuando cumplas ese umbral, puedes automatizarlo.
4. **Google Ads (si haces campañas de pago):** nunca envíes tráfico pagado
   directo a una página de producto de Amazon — las compras de esos clics
   ya no generan comisión desde abril de 2026. Además, Google Ads exige que
   la landing de destino tenga contenido original suficiente y navegación
   funcional (nada de "doorway pages"); las landings de producto de este
   sitio ya cumplen esto por diseño, pero revísalo si escribes más.
5. **Páginas legales.** `politica-privacidad.astro`, `politica-cookies.astro`,
   `aviso-legal.astro`, `aviso-afiliados.astro` y `sobre-nosotros.astro` son
   plantillas de partida con campos entre corchetes (`[NIF]`,
   `[Dirección]`...). Rellénalos y, si vas a operar como negocio, haz que un
   profesional las revise antes de publicar.
6. **CMP certificado.** Antes de activar AdSense o cualquier cookie de
   seguimiento de Amazon, integra una Consent Management Platform
   certificada por Google (ej. Cookiebot, Complianz, Osano) — un banner de
   cookies casero no es suficiente y hace que los anuncios se sirvan sin
   personalizar (menos ingresos).
7. **Contenido antes de AdSense.** Google revisa el sitio en vivo, no
   promesas. Ahora mismo hay 34 guías de tipo/sección + 42 landings de
   producto + 17 artículos de blog + varios hubs de categoría y animal =
   117 páginas de contenido en total, más las páginas legales — ya muy por
   encima del mínimo orientativo de ~20 páginas originales, pero cuantas más
   categorías/tipos añadas siguiendo esta misma plantilla, mejor señal de
   calidad da el conjunto del sitio.
8. **Activar los anuncios.** El script de AdSense y los `<ins
   class="adsbygoogle">` reales ya están conectados condicionalmente a
   `ADSENSE.clientId` en `site.config.ts` (ver `BaseLayout.astro` y
   `AdSlot.astro`) — no hay que tocar ningún componente a mano. Sustituye
   `[ADSENSE_ID]` por tu Publisher ID real y, en cada `<AdSlot>` que quieras
   monetizar, pásale un `slotId` real (por defecto es `[AD_SLOT_ID]`, que
   sigue mostrando el placeholder). Hasta que ambos estén rellenos, el sitio
   no carga ningún script de AdSense ni renderiza anuncios reales.

## Estructura de archivos

```text
src/
├── site.config.ts          # marca, tag de Amazon, ADSENSE, BRANDS, ANIMALS,
│                            # CATEGORIES (perros/gatos/acuarios) y SECTIONS (legacy)
├── content.config.ts       # colecciones "guias", "productos" y "blog"
├── lib/amazon.ts           # generador único de URLs de Amazon con tag
├── components/
│   ├── AffiliateDisclosure.astro  # aviso legal, antes de cualquier enlace de afiliado
│   ├── AmazonProductLink.astro    # ÚNICO componente para enlazar productos de Amazon
│   ├── AdSlot.astro               # hueco de anuncio reservado (evita CLS), conectado a ADSENSE
│   ├── AnimalHub.astro            # /animal/ — categorías (nuevo) o secciones (legacy)
│   ├── CategoryHub.astro          # /animal/categoria/ — tipos dentro de la categoría
│   ├── FilterBlocks.astro         # filtros client-side por tipo/tamaño/necesidad/marca
│   ├── FaqSection.astro           # bloque de preguntas frecuentes + FAQPage schema
│   ├── ProductCard.astro / RatingStars.astro / ComparisonTable.astro
│   ├── Breadcrumbs.astro          # + BreadcrumbList schema
│   └── Header.astro / Footer.astro
├── layouts/
│   ├── BaseLayout.astro           # SEO (canonical/OG/Twitter), AdSense script condicional
│   ├── SectionHubLayout.astro     # hub de tipo (nuevo) o de sección (legacy) + filtros + FAQ
│   ├── ProductLayout.astro        # landing de producto + JSON-LD Product/Review
│   └── BlogPostLayout.astro       # artículo de blog + JSON-LD Article/FAQPage
├── content/
│   ├── guias/*.mdx                # 34 guías (32 modelo nuevo + 2 otras-mascotas)
│   ├── productos/*.mdx            # 42 landings de producto
│   └── blog/*.mdx                 # 17 artículos, colección independiente de animal/categoría
└── pages/
    ├── index.astro, perros/, gatos/, acuarios/, otras-mascotas/, blog/
    ├── [animal]/[categoria]/index.astro                    # nuevo
    ├── [animal]/[categoria]/[tipo]/index.astro              # nuevo
    ├── [animal]/[categoria]/[tipo]/[producto]/index.astro   # nuevo
    ├── [animal]/[seccion]/index.astro                       # legacy (solo otras-mascotas)
    ├── [animal]/[seccion]/[producto]/index.astro            # legacy (solo otras-mascotas)
    ├── blog/index.astro, blog/[slug]/index.astro
    ├── robots.txt.ts                                        # sincronizado con SITE.url
    └── aviso-afiliados.astro, politica-privacidad.astro, politica-cookies.astro,
        aviso-legal.astro, sobre-nosotros.astro, contacto.astro
```

## Diseño y experiencia de usuario

- **Sin fotos falsas de producto.** Como todavía no hay productos reales de
  Amazon, cada producto/sección usa una portada ilustrada propia
  (`CoverArt.astro`: gradiente + patrón + icono, un color por sección) en
  vez de fingir una fotografía. En cuanto un producto tenga ASIN real, pásale
  `imageUrl` con la URL de imagen de Amazon (enlazada, nunca alojada aquí) y
  esa misma pieza la muestra automáticamente.
- **Buscador (Pagefind).** Indexación 100% estática, sin backend ni coste de
  hosting adicional. Solo funciona sobre el build (`npm run build`), no en
  `astro dev` — en desarrollo el buscador avisa de eso en vez de fallar en
  silencio. Para probarlo en local usa `npm run preview` (ver más abajo).
  El índice ignora el header, footer, breadcrumbs y los huecos de anuncios
  (`data-pagefind-ignore`) para que los resultados no salgan con texto de
  navegación repetido.
- **Contraste y teclado.** Los tonos de texto secundario cumplen WCAG AA
  (4.5:1+) y el menú móvil se cierra con `Escape` devolviendo el foco al
  botón que lo abrió.
- **Fuentes estáticas, no variables.** Solo se cargan los pesos que el
  sitio usa de verdad (Fraunces 600, Inter 400/500/600/700) en vez del eje
  variable completo — menos peso de descarga, mejor LCP.

## Despliegue

Cualquier hosting de sitios estáticos vale (Vercel, Netlify, Cloudflare
Pages, GitHub Pages): `npm run build` genera `./dist/` (incluye el índice
de búsqueda de Pagefind en `./dist/pagefind/`). No hay backend ni base de
datos — el buscador corre entero en el navegador del visitante.

## Comandos

| Comando            | Acción                                    |
| ------------------- | ------------------------------------------ |
| `npm install`       | Instala dependencias                       |
| `npm run dev`       | Servidor local en `localhost:4321` (sin buscador funcional) |
| `npm run build`     | Genera `./dist/` + indexa la búsqueda con Pagefind |
| `npm run preview`   | Sirve el build ya generado — usa esto para probar el buscador |
