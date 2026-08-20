// Configuración central del sitio. Cambia estos valores una sola vez y se
// propagan a todo el sitio (layout, enlaces de Amazon, JSON-LD, etc).
import type { IconName } from './components/icons';

export const SITE = {
  name: 'MascotasRadar',
  tagline: 'Guías y comparativas para el bienestar de tu mascota',
  description:
    'Reviews, comparativas y guías de compra sobre productos para perros, gatos y acuarios.',
  locale: 'es-ES',
  // El dominio raíz (mascotasradar.com, sin www) hace un 308 permanente a
  // www.mascotasradar.com — ese es el dominio que sirve la web de verdad,
  // sin redirección. Toda URL canónica/OG/JSON-LD/sitemap tiene que
  // apuntar aquí: si apuntara al dominio que redirige, cada canonical
  // añadiría un salto de redirección innecesario para los rastreadores y
  // dividiría la señal de autoridad entre las dos versiones del dominio.
  url: 'https://www.mascotasradar.com',
  contactEmail: 'hola@mascotasradar.com'
};

export const AMAZON = {
  associateTag: 'mascotasradar-21',
  marketplace: 'amazon.es'
};

export const ADSENSE = {
  clientId: 'ca-pub-5934388233296084'
};

export const ANALYTICS = {
  ga4Id: 'G-DYTR67FDYD'
};

// IDs de unidad de anuncio (Anuncios → Por unidad de anuncio en tu cuenta
// de AdSense). Solo existen 3 posiciones distintas en toda la web
// (<AdSlot> las usa por defecto según variant/belowFold, así que rellenar
// estos 3 valores activa la publicidad en las ~488 páginas que usan el
// componente, sin tocar cada página una a una). Deja "[AD_SLOT_ID]" en
// cualquiera que aún no tenga unidad creada — ese slot concreto
// simplemente no se renderiza hasta que lo rellenes.
export const AD_SLOTS = {
  leaderboard: '4805793018',
  inArticle: '4017812187',
  inArticleBelowFold: '1169800335'
};

// Fotos reales de temática (no de producto) para portadas de nivel
// animal/categoría/tipo — home, hubs de categoría y de tipo, y tarjetas
// del blog. Vienen de Unsplash (licencia gratuita, uso comercial
// permitido, sin atribución obligatoria: https://unsplash.com/license) y
// son fotos genéricas del TEMA, nunca del producto concreto que se
// reseña — por eso nunca se usan en una ficha de producto individual: ahí
// la imagen real solo puede venir del propio Amazon (`imageUrl` en cada
// producto), para no dar la impresión de que es la foto real de ese
// artículo. Una foto DISTINTA por cada tipo, para que nunca se repita la
// misma imagen dentro de un mismo animal — clave: `${animal}`,
// `${animal}/${categoria}` o `${animal}/${categoria}/${tipo}` (de más a
// menos general; usa siempre la más específica que exista).
function img(id: string): string {
  // Sin fm=jpg: así auto=format puede negociar WebP/AVIF según el navegador
  // (Unsplash decide el formato real por el header Accept) en vez de forzar
  // siempre JPEG, que pesa un 25-50% más para el mismo resultado visual.
  return `https://images.unsplash.com/photo-${id}?q=75&w=1200&auto=format&fit=crop`;
}

// Texto alternativo específico por foto — describe lo que la imagen
// muestra de verdad (no el nombre de la categoría ni el título de la
// página), tal y como piden las buenas prácticas de SEO de imágenes y
// accesibilidad. Mismas claves que TOPIC_IMAGES; se consulta con
// `getTopicImageAlt()` siguiendo la misma cascada tipo → categoría →
// animal, con un texto genérico de último recurso si no hay nada más
// específico.
export const TOPIC_IMAGE_ALT: Record<string, string> = {
  // Nivel animal
  perros: 'Perro sonriente al aire libre',
  gatos: 'Gato mirando de cerca a cámara',
  acuarios: 'Acuario plantado con peces de colores',
  'otras-mascotas': 'Conejo marrón sobre fondo neutro',

  // Perros — Alimentación
  'perros/alimentacion/antivoracidad': 'Comedero antivoracidad con relieves para ralentizar la comida',
  'perros/alimentacion/elevados': 'Comedero elevado de doble cuenco para perro',
  'perros/alimentacion/bebederos': 'Bebedero antivuelco de base ancha para perro',
  'perros/alimentacion/pienso': 'Croquetas de pienso para perro de cerca',
  'perros/alimentacion/comida-humeda': 'Husky comiendo de un cuenco metálico',
  'perros/alimentacion/snacks': 'Perro recibiendo un premio de la mano',
  'perros/alimentacion/fuentes-de-agua': 'Perro bebiendo de una fuente de agua',
  'perros/alimentacion/pienso-cachorros': 'Cachorro comiendo pienso de un cuenco metálico',
  'perros/alimentacion/pienso-perros-mayores': 'Primer plano de un perro senior de hocico canoso',
  'perros/alimentacion/pienso-razas-pequenas': 'Chihuahua sentado sobre una mesa',
  'perros/alimentacion/pienso-esterilizados': 'Shih Tzu comiendo de un cuenco metálico',
  'perros/alimentacion/comederos-automaticos': 'Border collie comiendo de un comedero lento',

  // Perros — Paseo
  'perros/paseo/antitirones': 'Primer plano de un arnés antitirones en un perro',
  'perros/paseo/ligeros': 'Arnés ligero de malla en un perro pequeño',
  'perros/paseo/seguridad-coche': 'Perro con arnés de seguridad en el coche',
  'perros/paseo/reflectantes': 'Arnés con tiras reflectantes en un perro de paseo nocturno',
  'perros/paseo/collares': 'Collar de cuero en un perro de cerca',
  'perros/paseo/correas': 'Correa de paseo enganchada al collar de un perro',
  'perros/paseo/bolsas-excrementos': 'Bolsas biodegradables para excrementos de perro',
  'perros/paseo/gps': 'Mano sosteniendo un dispositivo GPS de seguimiento',

  // Perros — Juguetes
  'perros/juguetes/mordedores': 'Perro mordiendo un juguete de caucho relleno',
  'perros/juguetes/cuerda': 'Perro tirando de un juguete de cuerda trenzada',
  'perros/juguetes/dispensadores': 'Juguete dispensador de premios para perro',
  'perros/juguetes/acuaticos': 'Juguete flotante para perro en el agua',
  'perros/juguetes/pelotas': 'Perro con una pelota de juguete en la boca',
  'perros/juguetes/peluches': 'Perro tumbado con un juguete de peluche',
  'perros/juguetes/frisbees': 'Perro saltando para atrapar un frisbee',
  'perros/juguetes/inteligencia': 'Perro jugando con un juguete interactivo de comida',

  // Perros — Descanso
  'perros/descanso/viscoelasticas': 'Perro tumbado en una cama ortopédica acolchada',
  'perros/descanso/elevadas': 'Cama elevada transpirable para perro',
  'perros/descanso/antiestres': 'Perro enroscado en una cama tipo donut',
  'perros/descanso/economicas': 'Cama plana básica para perro',
  'perros/descanso/mantas': 'Perro dormido envuelto en una manta de punto',
  'perros/descanso/casetas': 'Caseta de madera para perro en el exterior',
  'perros/descanso/transportines': 'Transportín rígido para perro',

  // Perros — Higiene
  'perros/higiene/cepillos': 'Persona cepillando el pelo de un perro',
  'perros/higiene/champus': 'Perro recibiendo un baño con champú',
  'perros/higiene/cuidado-dental': 'Persona cepillando los dientes de un perro',
  'perros/higiene/cortaunas': 'Persona sujetando la pata de un perro para cortar las uñas',

  // Perros — Viajes y coche
  'perros/viajes-y-coche/fundas-coche': 'Funda protectora impermeable en el maletero del coche',
  'perros/viajes-y-coche/cinturones': 'Labrador con arnés de seguridad dentro de un coche',
  'perros/viajes-y-coche/rejillas-separadoras-maletero': 'Perro sentado en el maletero abierto de un coche',
  'perros/viajes-y-coche/rampas': 'Perro subiendo una rampa metálica',

  // Perros — Tecnología
  'perros/tecnologia/gps-tech': 'Mano sosteniendo un localizador GPS para mascotas',
  'perros/tecnologia/camaras': 'Cámara de vigilancia doméstica montada en el techo',
  'perros/tecnologia/collares-actividad-fitness': 'Perro con collar de actividad de color naranja',

  // Gatos — Alimentación
  'gatos/alimentacion/antivoracidad': 'Comedero antivoracidad con laberinto para gato',
  'gatos/alimentacion/automaticos-basicos': 'Comedero automático con temporizador para gato',
  'gatos/alimentacion/automaticos-camara': 'Comedero automático con cámara integrada para gato',
  'gatos/alimentacion/elevados': 'Comedero elevado para gato',
  'gatos/alimentacion/pienso': 'Gato atigrado comiendo de un cuenco metálico',
  'gatos/alimentacion/comida-humeda': 'Gato plateado comiendo de un cuenco blanco',
  'gatos/alimentacion/fuentes': 'Gato bebiendo de una fuente de agua',
  'gatos/alimentacion/pienso-gatitos': 'Dos gatitos comiendo de un cuenco blanco',
  'gatos/alimentacion/pienso-esterilizados': 'Gato blanco comiendo de un cuenco azul',
  'gatos/alimentacion/pienso-gatos-mayores': 'Gato persa senior descansando',
  'gatos/alimentacion/pienso-control-urinario': 'Gato bebiendo agua de un cuenco',

  // Gatos — Areneros
  'gatos/areneros/automaticos': 'Arenero automático autolimpiable para gato',
  'gatos/areneros/cerrados': 'Arenero cerrado con capota para gato',
  'gatos/areneros/portatiles': 'Arenero portátil plegable para gato',
  'gatos/areneros/xxl-abiertos': 'Arenero grande abierto para gato',

  // Gatos — Juguetes
  'gatos/juguetes/canas': 'Gato jugando con una caña de plumas',
  'gatos/juguetes/juguetes-interactivos': 'Gato jugando con un juguete interactivo con sensor',
  'gatos/juguetes/ratones-y-peluches': 'Gato mordiendo un juguete de ratón',
  'gatos/juguetes/hierba-gatera-y-catnip': 'Planta de hierba gatera (catnip) en flor',

  // Gatos — Rascadores
  'gatos/rascadores/postes-sisal': 'Gato rascando un poste de sisal vertical',
  'gatos/rascadores/torres': 'Gato en lo alto de una torre rascador multinivel',
  'gatos/rascadores/pared': 'Rascador inclinado de pared para gato',
  'gatos/rascadores/carton-horizontal': 'Rascador de cartón horizontal para gato',

  // Gatos — Descanso
  'gatos/descanso/camas-gato': 'Gato durmiendo en una cama con bordes',
  'gatos/descanso/hamacas': 'Gato tumbado en una hamaca de ventana',
  'gatos/descanso/mantas-y-cojines': 'Gato tumbado sobre una manta blanca esponjosa',

  // Gatos — Transporte
  'gatos/transporte/transportines': 'Gato blanco y naranja dentro de un transportín transparente',
  'gatos/transporte/mochilas-transporte': 'Gato asomado desde una mochila de transporte azul',
  'gatos/transporte/bolsos-transportines-blandos': 'Gato dentro de un bolso transportín blando',

  // Gatos — Higiene
  'gatos/higiene/deslanadores-pelo-largo': 'Persona cepillando a un gato de pelo largo',
  'gatos/higiene/cepillos-gato': 'Gato peludo junto a pelo suelto tras el cepillado',
  'gatos/higiene/toallitas-y-champu-seco': 'Gato pomerania envuelto en una toalla rosa',

  // Gatos — Tecnología
  'gatos/tecnologia/collares-gps-gato': 'Gato atigrado plateado con collar rojo',
  'gatos/tecnologia/collares-inteligentes-actividad': 'Gato naranja con collar rojo mirando a cámara',
  'gatos/tecnologia/camaras-gato': 'Gato sentado junto a una cámara sobre la encimera',

  // Acuarios — Acuarios
  'acuarios/kits-y-peceras/kits-estandar': 'Kit de acuario montado con filtro y luz LED',
  'acuarios/kits-y-peceras/nanoacuarios': 'Nanoacuario pequeño sobre una mesa',
  'acuarios/kits-y-peceras/marinos': 'Acuario marino con coral y peces de arrecife',

  // Acuarios — Filtración
  'acuarios/filtracion/filtros-externos': 'Filtro externo tipo canister conectado a un acuario',

  // Acuarios — Temperatura
  'acuarios/temperatura/calentadores': 'Calentador sumergible con termostato en un acuario',
  'acuarios/temperatura/termometros': 'Acuario plantado con termómetro adherido al cristal',

  // Acuarios — Agua
  'acuarios/agua/tests-de-agua': 'Kit de test de agua con tubos de colores',
  'acuarios/agua/acondicionadores': 'Acuario con peces de colores azules y blancos',

  // Acuarios — Decoración
  'acuarios/decoracion/plantas': 'Plantas acuáticas naturales en un acuario',
  'acuarios/decoracion/rocas': 'Rocas naturales apiladas dentro de un acuario',
  'acuarios/decoracion/troncos': 'Tronco de madera decorativo dentro de un acuario',
  'acuarios/decoracion/decoracion-artificial': 'Pez dorado nadando junto a un castillo decorativo',
  'acuarios/decoracion/grava-y-sustratos': 'Grava de colores como sustrato de acuario',
  'acuarios/decoracion/cuevas-y-escondites': 'Peces de arrecife nadando entre coral con escondites',

  // Acuarios — Iluminación
  'acuarios/iluminacion/led': 'Pantalla LED iluminando un acuario plantado',
  'acuarios/iluminacion/iluminacion-rgb': 'Acuario iluminado con luz LED de color púrpura',
  'acuarios/iluminacion/iluminacion-alta-intensidad': 'Acuario plantado bajo una luz cenital intensa',

  // Acuarios — Betta
  'acuarios/betta/equipo-betta': 'Pez Betta de aletas largas en un acuario',
  'acuarios/betta/filtros-caudal-suave': 'Pez Betta de color verde y rojo',
  'acuarios/betta/plantas-y-decoracion-betta': 'Pez Betta rojo nadando en un acuario azul',

  // Acuarios — Gambas
  'acuarios/gambas/gambario': 'Gamba roja sobre sustrato de acuario',
  'acuarios/gambas/comida-para-gambas': 'Gamba de cerca sobre arena de acuario',
  'acuarios/gambas/minerales-y-remineralizantes': 'Pez Oscar dorado en un acuario',

  // Acuarios — Tortugas acuáticas
  'acuarios/tortugas-acuaticas/equipo-tortugas': 'Tortuga acuática nadando en un acuaterrario',
  'acuarios/tortugas-acuaticas/plataformas-y-islas': 'Tortuga tomando el sol sobre un tronco',
  'acuarios/tortugas-acuaticas/lamparas-uvb': 'Dos tortugas descansando junto a unas rocas',

  // Fallback a nivel de categoría en acuarios
  'acuarios/mantenimiento': 'Acuario con peces vistos desde un mercado de peces ornamentales',
  'acuarios/filtracion': 'Pez amarillo nadando bajo el agua',
  'acuarios/alimentacion-peces': 'Banco de peces nadando entre coral',

  // Otras mascotas
  'otras-mascotas/conejos': 'Conejo marrón sobre fondo neutro',
  'otras-mascotas/roedores': 'Hámster o roedor pequeño de cerca',

  // Blog: portadas propias por artículo
  'blog/cuanto-duerme-un-gato': 'Gato de pelo claro durmiendo enroscado',
  'blog/estres-en-gatos-senales': 'Gato escocés fold envuelto en una manta, retraído',
  'blog/gato-amasa-con-las-patas': 'Primer plano de las patas de un gato sobre una manta',
  'blog/gato-maulla-por-la-noche': 'Gato bostezando con la boca bien abierta',
  'blog/gato-trae-presas-a-casa': 'Gato gris y blanco asomando entre la hierba',
  'blog/introducir-gato-nuevo-en-casa': 'Dos gatos juntos, uno junto al otro',
  'blog/cachorro-en-casa-primeras-semanas': 'Cachorro marrón y blanco de pelo corto',
  'blog/perro-come-hierba-por-que': 'Perro olfateando la hierba al aire libre',
  'blog/perro-ladra-a-otros-perros-paseo': 'Perro marrón olfateando a otro perro blanco con correa',
  'blog/perro-tiembla-sin-frio': 'Chihuahua pequeño con un jersey sentado en un sofá',
  'blog/racion-diaria-perro-como-calcular': 'Vaso medidor rojo de plástico',
  'blog/conejo-come-sus-propias-cacas': 'Conejo blanco y negro comiendo de un cuenco',
  'blog/conejo-pipi-fuera-del-arenero': 'Conejo sentado en la hierba comiendo',
  'blog/cobaya-chilla-al-verme': 'Cobaya blanca y marrón sobre una mesa de madera',
  'blog/hamster-primeros-dias-en-casa': 'Hámster dentro de su jaula',
  'blog/rueda-ejercicio-hamster-por-que-imprescindible': 'Hámster junto a una piña dentro de su hábitat',
  'blog/agua-verde-acuario-algas': 'Planta acuática verde dentro de un acuario de cristal',
  'blog/cada-cuanto-cambiar-agua-acuario': 'Niña pequeña tocando el cristal de un acuario',
  'blog/ciclado-acuario-guia-paso-a-paso': 'Pez naranja y blanco nadando en un acuario',
  'blog/cuantos-peces-caben-en-mi-acuario': 'Grupo de peces payaso nadando en un acuario',
  'blog/cuarentena-peces-nuevos-por-que': 'Primer plano de peces rojos en el agua',
  'blog/filtro-acuario-encendido-24-horas': 'Pez rayado azul y naranja nadando',
  'blog/peces-boqueando-en-superficie': 'Pez blanco y dorado nadando cerca de la superficie',
  'blog/primer-acuario-errores-principiante': 'Banco de peces de colores en una pecera',
  'blog/se-va-la-luz-calentador-acuario': 'Peces azules y grises nadando junto a corales',
  'blog/ansiedad-separacion-perros-senales': 'Perro pequeño de pelo rizado marrón',
  'blog/arnes-o-collar-cual-elegir': 'Golden retriever con arnés amarillo y negro',
  'blog/cama-ortopedica-cuando-necesita-tu-perro': 'Pastor alemán tumbado en una cama gris para mascotas',
  'blog/cuanto-debe-dormir-un-perro': 'Perro tumbado y dormido en su cama',
  'blog/perro-da-vueltas-antes-de-tumbarse': 'Perro acostado en su cama',
  'blog/perro-destroza-juguetes-en-minutos': 'Cachorro de beagle mordiendo un juguete de hueso',
  'blog/cuantas-veces-al-dia-debe-comer-un-gato': 'Gato naranja comiendo pienso de un plato blanco',
  'blog/cuantos-areneros-necesitas-varios-gatos': 'Gatito atigrado naranja junto a un recipiente de plástico rosa',
  'blog/gato-no-usa-arenero-soluciones': 'Gato sentado junto a una ventana',
  'blog/gato-rasca-sofa-no-rascador': 'Gato siamés rascando la pata de una silla'
};

export const TOPIC_IMAGES: Record<string, string> = {
  // Nivel animal (home, fallback general)
  perros: img('1765934785570-beb8c9a36446'),
  gatos: img('1743813166745-89e3326f421a'),
  acuarios: img('1691387747539-f681c5fa73d9'),
  'otras-mascotas': img('1535241749838-299277b6305f'),

  // Perros
  'perros/alimentacion/antivoracidad': img('1591946559594-8c6d3b7391eb'),
  'perros/alimentacion/elevados': img('1714068691210-073dc52c6c1d'),
  'perros/alimentacion/bebederos': img('1714068691256-cd3d65f97795'),
  'perros/paseo/antitirones': img('1580459476964-822a39c5697e'),
  'perros/paseo/ligeros': img('1580129518790-0482fc5eed65'),
  'perros/paseo/seguridad-coche': img('1610389959243-774ed80e22ab'),
  'perros/paseo/reflectantes': img('1616999335345-c22d297a2fc1'),
  'perros/juguetes/mordedores': img('1745252752503-2c5eb22167b6'),
  'perros/juguetes/cuerda': img('1624609602652-b8ca6234bace'),
  'perros/juguetes/dispensadores': img('1714068691252-685e1426c055'),
  'perros/juguetes/acuaticos': img('1568483720721-2f5e5e0db2ee'),
  'perros/descanso/viscoelasticas': img('1541587631252-1690b345feca'),
  'perros/descanso/elevadas': img('1600369671236-e74521d4b6ad'),
  'perros/descanso/antiestres': img('1601758123927-4f7acc7da589'),
  'perros/descanso/economicas': img('1653638390484-bc1c263ce9e4'),
  'perros/alimentacion/pienso': img('1764249453850-faace6e57444'),
  'perros/alimentacion/comida-humeda': img('1692906456159-f93a6f3df407'),
  'perros/alimentacion/snacks': img('1649923625461-2638b4a86d8b'),
  'perros/paseo/collares': img('1667716705760-233650f8f3fe'),
  'perros/paseo/correas': img('1678518943095-0fc0eccf58f7'),
  'perros/paseo/bolsas-excrementos': img('1749704491639-970b78b9e4aa'),
  'perros/juguetes/pelotas': img('1718159610145-eb0f3a1fe39a'),
  'perros/juguetes/peluches': img('1591926828257-2eefb8aa42fa'),
  'perros/juguetes/frisbees': img('1697572926136-bf726e4da0eb'),
  'perros/descanso/mantas': img('1601880348117-25c1127a95df'),
  'perros/descanso/casetas': img('1648999636820-cb6182e58fd5'),
  'perros/descanso/transportines': img('1774790479490-dbf0f3a7fb60'),
  'perros/higiene/cepillos': img('1694372550345-9149dddc390f'),
  'perros/higiene/champus': img('1647002380358-fc70ed2f04e0'),
  'perros/higiene/cuidado-dental': img('1632236705239-ac6f4908638d'),
  'perros/viajes-y-coche/fundas-coche': img('1578346693440-3dcedf4b7b81'),
  'perros/viajes-y-coche/cinturones': img('1518155317743-a8ff43ea6a5f'),
  'perros/alimentacion/fuentes-de-agua': img('1541887796712-054f4b0f8e5d'),
  'perros/alimentacion/pienso-cachorros': img('1695023267262-7f4ab64152b2'),
  'perros/alimentacion/pienso-perros-mayores': img('1771292362041-58ca15b2be06'),
  'perros/alimentacion/pienso-razas-pequenas': img('1545326739-1917102eec27'),
  'perros/alimentacion/pienso-esterilizados': img('1723065314557-e2a6b8a41d08'),
  'perros/viajes-y-coche/rejillas-separadoras-maletero': img('1771777400696-3af9b6470ff8'),
  'perros/tecnologia/collares-actividad-fitness': img('1780407138408-02f170d916e3'),
  'perros/higiene/cortaunas': img('1734777491553-aa413c4d025b'),
  'perros/juguetes/inteligencia': img('1679689384991-35f609124c37'),
  'perros/viajes-y-coche/rampas': img('1780866701771-63522fc46f3f'),
  'perros/tecnologia/gps-tech': img('1754821305530-8e3c7b8deda2'),
  'perros/paseo/gps': img('1675602488512-bdd631490fcb'),
  'perros/alimentacion/comederos-automaticos': img('1678783133022-89e103910f76'),
  'perros/tecnologia/camaras': img('1767059439630-ca3844d07d77'),

  // Gatos
  'gatos/alimentacion/antivoracidad': img('1771245906840-7371af0563d6'),
  'gatos/alimentacion/automaticos-basicos': img('1775387307543-4411d4b4863d'),
  'gatos/alimentacion/automaticos-camara': img('1765110278433-7b0d294a1104'),
  'gatos/alimentacion/elevados': img('1722267432520-24755f9e218d'),
  'gatos/areneros/automaticos': img('1727510153658-643787acb16a'),
  'gatos/areneros/cerrados': img('1762781095387-4b50e940d81b'),
  'gatos/areneros/portatiles': img('1754465164903-fbce03e479a3'),
  'gatos/areneros/xxl-abiertos': img('1604494609444-1ae0c54e2b1c'),
  'gatos/rascadores/postes-sisal': img('1640249030221-1b20e8b12dcd'),
  'gatos/rascadores/torres': img('1601758065893-25c11bfa69b5'),
  'gatos/rascadores/pared': img('1637311175624-f78cfccec706'),
  'gatos/rascadores/carton-horizontal': img('1723531055843-b65b09150c83'),
  'gatos/alimentacion/pienso': img('1596854331442-3cf47265cefb'),
  'gatos/alimentacion/comida-humeda': img('1580238169544-86bf7cd8c84c'),
  'gatos/alimentacion/fuentes': img('1764741368227-38ac9fd670a2'),
  'gatos/juguetes/canas': img('1638826595775-e2eae86cda8e'),
  'gatos/juguetes/juguetes-interactivos': img('1669891340245-5b787bb7fa70'),
  'gatos/descanso/camas-gato': img('1541188495357-ad2dc89487f4'),
  'gatos/descanso/hamacas': img('1677126134637-f608e353f5bb'),
  'gatos/transporte/transportines': img('1761614282055-29e039aac354'),
  'gatos/alimentacion/pienso-gatitos': img('1683871287549-852bcc3878b2'),
  'gatos/alimentacion/pienso-esterilizados': img('1622116687909-cef78d530432'),
  'gatos/alimentacion/pienso-gatos-mayores': img('1511044568932-338cba0ad803'),
  'gatos/alimentacion/pienso-control-urinario': img('1571131116858-2295ade82a72'),
  'gatos/juguetes/ratones-y-peluches': img('1573583183199-5b451615c959'),
  'gatos/juguetes/hierba-gatera-y-catnip': img('1765182272682-c1e8edf6251e'),
  'gatos/descanso/mantas-y-cojines': img('1700257949438-2186dcae7d58'),
  'gatos/higiene/deslanadores-pelo-largo': img('1780732659746-8c2276f3ddc6'),
  'gatos/transporte/mochilas-transporte': img('1736470251088-1a891983c511'),
  'gatos/transporte/bolsos-transportines-blandos': img('1671941066220-0216a1d03857'),
  'gatos/tecnologia/collares-gps-gato': img('1595232170847-da4cab9e63ce'),
  'gatos/tecnologia/collares-inteligentes-actividad': img('1710343512729-819eeb456843'),
  'gatos/higiene/cepillos-gato': img('1714659284508-c1db6eb7829c'),
  'gatos/higiene/toallitas-y-champu-seco': img('1611173622933-91942d394b04'),
  'gatos/tecnologia/camaras-gato': img('1639591761717-1a693eaf5c6b'),

  // Acuarios
  'acuarios/kits-y-peceras/kits-estandar': img('1633465091434-117f2bcffd9d'),
  'acuarios/kits-y-peceras/nanoacuarios': img('1519657635301-68bb60c798f7'),
  'acuarios/filtracion/filtros-externos': img('1617994679330-2883951d0073'),
  'acuarios/temperatura/calentadores': img('1560977501-7cb367eccebe'),
  'acuarios/agua/tests-de-agua': img('1583949184685-33fda190a216'),
  'acuarios/decoracion/plantas': img('1754848128322-7f0980d9e914'),
  'acuarios/iluminacion/led': img('1524096414279-c4b7f37e398a'),
  'acuarios/betta/equipo-betta': img('1544943910-4c1dc44aab44'),
  'acuarios/gambas/gambario': img('1703319959677-b8dd4f14c80e'),
  'acuarios/tortugas-acuaticas/equipo-tortugas': img('1605050000972-3c661ca35011'),
  'acuarios/kits-y-peceras/marinos': img('1546026423-cc4642628d2b'),
  'acuarios/decoracion/rocas': img('1779122625195-562872a6fe2c'),
  'acuarios/decoracion/troncos': img('1783171399702-dfa6b699dc61'),
  'acuarios/decoracion/decoracion-artificial': img('1652965816418-03b12b4dcc2e'),
  'acuarios/decoracion/grava-y-sustratos': img('1759695330673-e1bf32e4271f'),
  'acuarios/gambas/comida-para-gambas': img('1722192147966-14444c832f53'),
  'acuarios/iluminacion/iluminacion-rgb': img('1782811560113-4491e27e4db2'),
  'acuarios/tortugas-acuaticas/plataformas-y-islas': img('1600104522376-f34eaa681ee3'),
  'acuarios/temperatura/termometros': img('1781694348973-ab9eaf2f6cc2'),
  'acuarios/betta/filtros-caudal-suave': img('1573472420143-0c68f179bdc7'),
  'acuarios/betta/plantas-y-decoracion-betta': img('1769006604234-8f6e32bb0d77'),
  'acuarios/tortugas-acuaticas/lamparas-uvb': img('1751440278548-65dee95d1ae4'),
  'acuarios/iluminacion/iluminacion-alta-intensidad': img('1781695125669-b21426a2bdf3'),
  'acuarios/decoracion/cuevas-y-escondites': img('1515467699666-4adf84b2fd42'),
  'acuarios/agua/acondicionadores': img('1599492816933-2101fe60bc72'),
  'acuarios/gambas/minerales-y-remineralizantes': img('1504472478235-9bc48ba4d60f'),
  // Fallback a nivel de categoría (no a nivel de animal) para los tipos más
  // difíciles de fotografiar sin banco de imágenes de producto real —
  // agrupa solo dentro de su propia categoría, nunca comparte foto con
  // páginas de otra categoría o animal distintos.
  'acuarios/mantenimiento': img('1550479125-d6ec537f108e'),
  'acuarios/filtracion': img('1520301255226-bf5f144451c1'),
  'acuarios/alimentacion-peces': img('1533713692156-f70938dc0d54'),

  // Otras mascotas (modelo legacy: categoria = sección)
  'otras-mascotas/conejos': img('1535241749838-299277b6305f'),
  'otras-mascotas/roedores': img('1587599140470-acf5dc34e4cb'),

  // Blog: portadas propias para artículos de comportamiento/cuidados que no
  // corresponden a ningún tipo de producto concreto — sin esto, caerían
  // todos en la foto genérica del animal y se repetirían entre sí en el
  // listado del blog.
  'blog/cuanto-duerme-un-gato': img('1755562420699-ebc4475e936f'),
  'blog/estres-en-gatos-senales': img('1494256997604-768d1f608cac'),
  'blog/gato-amasa-con-las-patas': img('1772389304362-cf9d0cefe78c'),
  'blog/gato-maulla-por-la-noche': img('1674681937588-a6dcce145eb6'),
  'blog/gato-trae-presas-a-casa': img('1756756396834-a912f1698a1d'),
  'blog/introducir-gato-nuevo-en-casa': img('1553713425-fa55a5997de3'),
  'blog/cachorro-en-casa-primeras-semanas': img('1599896375807-cf6cf2932e7d'),
  'blog/perro-come-hierba-por-que': img('1777313030830-254d43f2d2a8'),
  'blog/perro-ladra-a-otros-perros-paseo': img('1569825981215-23e35f459d55'),
  'blog/perro-tiembla-sin-frio': img('1713207992558-26f021e83e8f'),
  'blog/racion-diaria-perro-como-calcular': img('1590483085905-40051735fbb1'),
  'blog/conejo-come-sus-propias-cacas': img('1647626546098-d2bcf48551ce'),
  'blog/conejo-pipi-fuera-del-arenero': img('1725206076101-e83d6c93abaf'),
  'blog/cobaya-chilla-al-verme': img('1618252903592-2b8c90c43a6e'),
  'blog/hamster-primeros-dias-en-casa': img('1657076761228-bdb21cf0bc7c'),
  'blog/rueda-ejercicio-hamster-por-que-imprescindible': img('1676918555382-fcd06a483e25'),
  'blog/agua-verde-acuario-algas': img('1579967327980-2a4117da0e4a'),
  'blog/cada-cuanto-cambiar-agua-acuario': img('1489015712802-f490a7a1061d'),
  'blog/ciclado-acuario-guia-paso-a-paso': img('1606137029647-71daa7c9c5c8'),
  'blog/cuantos-peces-caben-en-mi-acuario': img('1706114350113-3063f27619c7'),
  'blog/cuarentena-peces-nuevos-por-que': img('1524704654690-b56c05c78a00'),
  'blog/filtro-acuario-encendido-24-horas': img('1524704796725-9fc3044a58b2'),
  'blog/peces-boqueando-en-superficie': img('1522069169874-c58ec4b76be5'),
  'blog/primer-acuario-errores-principiante': img('1436891461396-6df41158de09'),
  'blog/se-va-la-luz-calentador-acuario': img('1514907283155-ea5f4094c70c'),
  'blog/ansiedad-separacion-perros-senales': img('1605459082189-dc171c418f08'),
  'blog/arnes-o-collar-cual-elegir': img('1581597359121-0f69057e2fb1'),
  'blog/cama-ortopedica-cuando-necesita-tu-perro': img('1598397678815-c5dc869035b8'),
  'blog/cuanto-debe-dormir-un-perro': img('1551928692-6954104dee5a'),
  'blog/perro-da-vueltas-antes-de-tumbarse': img('1534521152192-2e2cb02c6ea1'),
  'blog/perro-destroza-juguetes-en-minutos': img('1715033749994-55f16a83c236'),
  'blog/cuantas-veces-al-dia-debe-comer-un-gato': img('1774797405267-7c452cb85652'),
  'blog/cuantos-areneros-necesitas-varios-gatos': img('1576431031309-fa20d16aa4ba'),
  'blog/gato-no-usa-arenero-soluciones': img('1711856591920-d70831cc5464'),
  'blog/gato-rasca-sofa-no-rascador': img('1759165440303-40ef25cc6053')
};

// Fotos EXCLUSIVAS para las tarjetas de categoría/sección de AnimalHub (el
// primer nivel de navegación tras la home: /perros/, /gatos/, /acuarios/,
// /otras-mascotas/). Deliberadamente en un mapa aparte de TOPIC_IMAGES: si
// esta tarjeta reutilizara la foto de uno de sus tipos, esa misma imagen
// aparecería otra vez un clic después (en la tarjeta de tipo o en la
// cabecera del hub), perdiendo su función de pista visual distinta para
// saber en qué categoría estás.
export const CATEGORY_CARD_ALT: Record<string, string> = {
  'perros/alimentacion': 'Cuenco de pienso para perro',
  'perros/paseo': 'Perro paseando con correa',
  'perros/juguetes': 'Perro jugando con un juguete',
  'perros/descanso': 'Perro descansando en su cama',
  'perros/viajes-y-coche': 'Perro dentro de un coche viajando',

  'gatos/alimentacion': 'Gato comiendo de un cuenco',
  'gatos/areneros': 'Arenero para gato',
  'gatos/rascadores': 'Gato usando un rascador',
  'gatos/juguetes': 'Gatito jugando con un juguete',
  'gatos/descanso': 'Gato bostezando tumbado en una manta',
  'gatos/transporte': 'Gato dentro de un transportín',

  'acuarios/kits-y-peceras': 'Acuario completo con peces y decoración',
  'acuarios/filtracion': 'Filtro de acuario en funcionamiento',
  'acuarios/temperatura': 'Termómetro y calentador en un acuario',
  'acuarios/agua': 'Test de agua de acuario',
  'acuarios/decoracion': 'Decoración natural dentro de un acuario',
  'acuarios/iluminacion': 'Acuario con iluminación LED',
  'acuarios/betta': 'Pez Betta de colores',
  'acuarios/gambas': 'Gamba de acuario de cerca',
  'acuarios/tortugas-acuaticas': 'Tortuga acuática en su hábitat',

  'otras-mascotas/conejos': 'Conejo en su jaula o corral',
  'otras-mascotas/roedores': 'Hámster o roedor pequeño'
};

export const CATEGORY_CARD_IMAGES: Record<string, string> = {
  'perros/alimentacion': img('1695023264743-7f1448deb7f2'),
  'perros/paseo': img('1638368885112-463ef3dd2f61'),
  'perros/juguetes': img('1620180728616-c77b79a8891d'),
  'perros/descanso': img('1742520660892-3f1143f6aae4'),
  'perros/viajes-y-coche': img('1694085982499-3985e75cccc4'),

  'gatos/alimentacion': img('1558993457-4bc6ec2c3734'),
  'gatos/areneros': img('1572266071126-492372e7a001'),
  'gatos/rascadores': img('1636543459642-ea9df9cc8f5a'),
  'gatos/juguetes': img('1691351942745-0e2858a09bf3'),
  'gatos/descanso': img('1596921825946-d738194fac80'),
  'gatos/transporte': img('1533413924355-a5797409980e'),

  'acuarios/kits-y-peceras': img('1636045466232-539c7bd7817e'),
  'acuarios/filtracion': img('1596487162379-fbab6c590a42'),
  'acuarios/temperatura': img('1599601619121-1b6e770b15ca'),
  'acuarios/agua': img('1755996244192-0240ab35bb91'),
  'acuarios/decoracion': img('1711539137981-ddf32f60c77b'),
  'acuarios/iluminacion': img('1707580640921-42d78bfa19cc'),
  'acuarios/betta': img('1534575180408-b7d7c0136ee8'),
  'acuarios/gambas': img('1711612901199-ffad39e8aa13'),
  'acuarios/tortugas-acuaticas': img('1726795203378-ce87cd77d5e2'),

  'otras-mascotas/conejos': img('1609151354448-c4a53450c6e9'),
  'otras-mascotas/roedores': img('1610271772377-379a23021795')
};

/** Foto de tema para una página: intenta tipo → categoría → animal, de más
 * a menos específico, usando siempre la más concreta que exista. */
export function getTopicImage(animal: string, categoria?: string, tipo?: string): string | undefined {
  if (categoria && tipo) {
    const byType = TOPIC_IMAGES[`${animal}/${categoria}/${tipo}`];
    if (byType) return byType;
  }
  if (categoria) {
    const byCategory = TOPIC_IMAGES[`${animal}/${categoria}`];
    if (byCategory) return byCategory;
  }
  return TOPIC_IMAGES[animal];
}

/** Alt text específico de la foto de tema, con la misma cascada que
 * `getTopicImage` (siempre debe resolverse a la misma clave que la URL). */
export function getTopicImageAlt(animal: string, categoria?: string, tipo?: string): string | undefined {
  if (categoria && tipo) {
    const byType = TOPIC_IMAGE_ALT[`${animal}/${categoria}/${tipo}`];
    if (byType) return byType;
  }
  if (categoria) {
    const byCategory = TOPIC_IMAGE_ALT[`${animal}/${categoria}`];
    if (byCategory) return byCategory;
  }
  return TOPIC_IMAGE_ALT[animal];
}

// Portada de un artículo de blog: la colección "blog" es independiente a
// propósito (no cuelga de ningún animal/categoría), así que la foto se
// infiere del título — una elección visual, nunca un dato mostrado como
// hecho. Se intenta primero una coincidencia de TIPO concreto (para que
// dos artículos sobre el mismo animal no compartan siempre la misma
// foto), y solo si no hay ninguna coincidencia específica se cae en la
// foto general del animal. Sin ninguna coincidencia, se queda sin foto
// (icono/gradiente ilustrado).
export function inferBlogCover(title: string): { seccion: string; icon: IconName; imageUrl?: string; alt?: string } {
  const t = title.toLowerCase();

  // Coincidencias específicas de tipo, comprobadas antes que las genéricas
  // de animal para dar variedad real entre artículos del mismo animal.
  // El nombre de un animal concreto (conejo, hámster...) es una señal
  // inequívoca y va primero: si no, un título como "mi conejo y el
  // arenero" caería en el patrón genérico /arenero/ de gatos antes de
  // llegar a /conejo/, dando la portada del animal equivocado.
  const specific: [RegExp, string, string, IconName][] = [
    // Portada propia por artículo — necesarios para que estos 19 posts no
    // acaben compartiendo la misma foto que su tipo/categoría emparentado
    // (o entre ellos), comprobados antes que cualquier patrón genérico.
    [/agua.*se pone verde|algas en suspensi[oó]n/, 'acuarios', 'blog/agua-verde-acuario-algas', 'droplet'],
    [/cada cu[aá]nto hay que cambiar el agua/, 'acuarios', 'blog/cada-cuanto-cambiar-agua-acuario', 'droplet'],
    [/ciclado de un acuario/, 'acuarios', 'blog/ciclado-acuario-guia-paso-a-paso', 'fish'],
    [/cu[aá]ntos peces caben/, 'acuarios', 'blog/cuantos-peces-caben-en-mi-acuario', 'fish'],
    [/cuarentena de peces/, 'acuarios', 'blog/cuarentena-peces-nuevos-por-que', 'fish'],
    [/filtro del acuario encendido/, 'acuarios', 'blog/filtro-acuario-encendido-24-horas', 'filter'],
    [/boqueando en la superficie/, 'acuarios', 'blog/peces-boqueando-en-superficie', 'fish'],
    [/primer acuario: los errores/, 'acuarios', 'blog/primer-acuario-errores-principiante', 'fish'],
    [/se va la luz.*calentador/, 'acuarios', 'blog/se-va-la-luz-calentador-acuario', 'thermometer'],
    [/ansiedad por separaci[oó]n/, 'perros', 'blog/ansiedad-separacion-perros-senales', 'paw'],
    [/arn[eé]s o collar/, 'perros', 'blog/arnes-o-collar-cual-elegir', 'harness'],
    [/cama ortop[eé]dica/, 'perros', 'blog/cama-ortopedica-cuando-necesita-tu-perro', 'bed'],
    [/cu[aá]nto debe dormir un perro/, 'perros', 'blog/cuanto-debe-dormir-un-perro', 'bed'],
    [/da vueltas antes de tumbarse/, 'perros', 'blog/perro-da-vueltas-antes-de-tumbarse', 'bed'],
    [/destroza los? juguetes/, 'perros', 'blog/perro-destroza-juguetes-en-minutos', 'toy'],
    [/cu[aá]ntas veces al d[ií]a debe comer un gato/, 'gatos', 'blog/cuantas-veces-al-dia-debe-comer-un-gato', 'bowl'],
    [/cu[aá]ntos areneros necesitas/, 'gatos', 'blog/cuantos-areneros-necesitas-varios-gatos', 'litterbox'],
    [/no usa el arenero/, 'gatos', 'blog/gato-no-usa-arenero-soluciones', 'litterbox'],
    [/rasca el sof[aá]/, 'gatos', 'blog/gato-rasca-sofa-no-rascador', 'cat'],
    // Portada propia por artículo, comprobado antes que los patrones
    // genéricos de conejo/hámster de abajo (si no, el genérico intercepta
    // primero por contener la misma palabra).
    [/come sus propias cacas/, 'otras-mascotas', 'blog/conejo-come-sus-propias-cacas', 'rabbit'],
    [/pip[íi] fuera del arenero/, 'otras-mascotas', 'blog/conejo-pipi-fuera-del-arenero', 'rabbit'],
    [/cobaya chilla/, 'otras-mascotas', 'blog/cobaya-chilla-al-verme', 'cage'],
    [/primeros d[íi]as de un hámster|primeros d[íi]as de un hamster/, 'otras-mascotas', 'blog/hamster-primeros-dias-en-casa', 'cage'],
    [/rueda de ejercicio/, 'otras-mascotas', 'blog/rueda-ejercicio-hamster-por-que-imprescindible', 'cage'],
    [/conejo/, 'otras-mascotas', 'otras-mascotas/conejos', 'rabbit'],
    [/hámster|hamster|roedor|cobaya/, 'otras-mascotas', 'otras-mascotas/roedores', 'cage'],
    // Artículos de comportamiento con portada propia (deben ir antes que
    // los patrones genéricos de abajo, o caerían en ellos por error).
    [/duerme.*gato|gato.*duerme/, 'gatos', 'blog/cuanto-duerme-un-gato', 'cat'],
    [/estr[ée]s.*gato/, 'gatos', 'blog/estres-en-gatos-senales', 'cat'],
    [/amasa/, 'gatos', 'blog/gato-amasa-con-las-patas', 'cat'],
    [/ma[uú]lla/, 'gatos', 'blog/gato-maulla-por-la-noche', 'cat'],
    [/presas a casa/, 'gatos', 'blog/gato-trae-presas-a-casa', 'cat'],
    [/introducir.*gato|gato nuevo en casa/, 'gatos', 'blog/introducir-gato-nuevo-en-casa', 'cat'],
    [/primeras semanas/, 'perros', 'blog/cachorro-en-casa-primeras-semanas', 'paw'],
    [/come hierba/, 'perros', 'blog/perro-come-hierba-por-que', 'paw'],
    [/ladra a otros perros/, 'perros', 'blog/perro-ladra-a-otros-perros-paseo', 'paw'],
    [/tiembla/, 'perros', 'blog/perro-tiembla-sin-frio', 'paw'],
    [/cu[aá]nta comida|ci[oó]n diaria/, 'perros', 'blog/racion-diaria-perro-como-calcular', 'bowl'],
    // Segundo lote de portadas propias — artículos añadidos después, mismo
    // criterio: específico antes que el genérico equivalente de abajo.
    [/cada cu[aá]nto hay que cepillar/, 'perros', 'perros/higiene/cepillos', 'brush'],
    [/tiene sarro/, 'perros', 'perros/higiene/cuidado-dental', 'brush'],
    [/cortar las u[ñn]as/, 'perros', 'perros/higiene/cortaunas', 'brush'],
    [/gps para perros/, 'perros', 'perros/tecnologia/gps-tech', 'compass'],
    [/c[aá]maras para perros/, 'perros', 'perros/tecnologia/camaras', 'camera'],
    [/viajar en coche/, 'perros', 'perros/viajes-y-coche/cinturones', 'harness'],
    [/bebe poco agua/, 'perros', 'perros/alimentacion/fuentes-de-agua', 'droplet'],
    [/comida h[uú]meda.*combinar|pienso.*comida h[uú]meda/, 'perros', 'perros/alimentacion/comida-humeda', 'bowl'],
    [/arenero cerrado o abierto/, 'gatos', 'gatos/areneros/cerrados', 'litterbox'],
    [/no usa el rascador nuevo/, 'gatos', 'gatos/rascadores/torres', 'cat'],
    [/pienso sin cereales/, 'perros', 'perros/alimentacion/pienso', 'bowl'],
    [/deslanador para perros/, 'perros', 'perros/higiene/cepillos', 'brush'],
    [/hipoalerg[eé]nico, renal o gastrointestinal/, 'perros', 'perros/alimentacion/pienso', 'bowl'],
    [/comedero|comida.*rápido|ración/, 'perros', 'perros/alimentacion/antivoracidad', 'bowl'],
    [/arnés|arnes|collar/, 'perros', 'perros/paseo/antitirones', 'harness'],
    [/juguete/, 'perros', 'perros/juguetes/cuerda', 'toy'],
    [/cama|dormir|tumbarse|ortopédic/, 'perros', 'perros/descanso/viscoelasticas', 'bed'],
    [/come.*gato|toma.*gato/, 'gatos', 'gatos/alimentacion/automaticos-basicos', 'bowl'],
    [/arenero/, 'gatos', 'gatos/areneros/automaticos', 'litterbox'],
    [/rascador|rasca/, 'gatos', 'gatos/rascadores/postes-sisal', 'cat'],
    [/cicl|nitr|amon[ií]aco/, 'acuarios', 'acuarios/kits-y-peceras/kits-estandar', 'fish'],
    [/agua.*acuario|cambiar.*agua/, 'acuarios', 'acuarios/agua/tests-de-agua', 'droplet'],
    [/filtro/, 'acuarios', 'acuarios/filtracion/filtros-externos', 'filter'],
    [/calentador|temperatura.*acuario/, 'acuarios', 'acuarios/temperatura/calentadores', 'thermometer'],
    [/primer acuario|principiante/, 'acuarios', 'acuarios/kits-y-peceras/kits-estandar', 'fish']
  ];
  for (const [re, seccion, key, icon] of specific) {
    if (re.test(t)) return { seccion, icon, imageUrl: TOPIC_IMAGES[key], alt: TOPIC_IMAGE_ALT[key] };
  }

  if (/perro|cachorro/.test(t))
    return { seccion: 'perros', icon: 'paw', imageUrl: getTopicImage('perros'), alt: getTopicImageAlt('perros') };
  if (/gato/.test(t))
    return { seccion: 'gatos', icon: 'cat', imageUrl: getTopicImage('gatos'), alt: getTopicImageAlt('gatos') };
  if (/acuario|pez|peces|pecera/.test(t))
    return { seccion: 'acuarios', icon: 'fish', imageUrl: getTopicImage('acuarios'), alt: getTopicImageAlt('acuarios') };
  return { seccion: 'blog', icon: 'compass' };
}

// Animales con la taxonomía nueva (Categoría → Tipo, con filtros dentro de
// cada Tipo). "otras-mascotas" se queda deliberadamente en el modelo
// anterior (Animal → Sección) porque no forma parte del rediseño pedido —
// sigue viva como un cuarto bloque aparte, sin tocar sus URLs.
export type CategorizedAnimal = 'perros' | 'gatos' | 'acuarios';
export type LegacyAnimal = 'otras-mascotas';
export type Animal = CategorizedAnimal | LegacyAnimal;

export interface Section {
  slug: string;
  label: string;
  description: string;
  icon: IconName;
  // Párrafo(s) de contenido real para la página hub de esta sección —
  // sin esto, la página es solo un título, una frase y una rejilla de
  // tarjetas, sin apenas texto propio que Google pueda valorar como
  // contenido único de la página.
  intro?: string;
}

// Modelo legacy — solo para otras-mascotas (conejos, roedores). No añadas
// animales nuevos aquí: los animales nuevos usan CATEGORIES.
export const SECTIONS: Record<LegacyAnimal, Section[]> = {
  'otras-mascotas': [
    {
      slug: 'conejos',
      label: 'Conejos',
      description: 'Jaulas, corrales y accesorios para conejos de interior.',
      icon: 'rabbit',
      intro:
        'Un conejo de interior necesita bastante más espacio del que suele venir en la jaula estándar de tienda — la mayoría de jaulas "para conejos" del mercado están pensadas para dormir, no para vivir, y funcionan mejor como base de sueño dentro de un corral más amplio que como recinto único. El error más habitual es subestimar cuánto se mueve un conejo sano a lo largo del día: necesita poder dar varios saltos seguidos en línea recta, algo que ninguna jaula pequeña permite por sí sola. Al elegir entre jaula y corral, la pregunta real no es solo el tamaño en litros o centímetros, sino si el conejo puede estirarse por completo, ponerse de pie sobre las patas traseras y moverse sin chocar constantemente con los laterales. El suelo importa tanto como el espacio: una base de rejilla metálica sin zona sólida de descanso puede dañar las patas a medio plazo, así que conviene que al menos una parte del suelo sea continua. Combinar una jaula base con un corral plegable para las horas de más actividad suele dar mejor resultado que intentar resolverlo todo con un único recinto grande y caro.'
    },
    {
      slug: 'roedores',
      label: 'Roedores',
      description: 'Jaulas y enriquecimiento para hámsters, cobayas y ratas.',
      icon: 'cage',
      intro:
        'Hámster, cobaya y rata no comparten ni de lejos las mismas necesidades de jaula, aunque las tiendas físicas suelan mezclarlas en el mismo pasillo. Un hámster sirio es solitario y territorial, necesita una jaula con suelo profundo para poder cavar (comportamiento natural, no un capricho) y una rueda de tamaño adecuado a su especie concreta. Una cobaya, en cambio, es social — vive mejor en pareja o grupo pequeño que sola — y no cava ni usa rueda, así que ese espacio vertical de la jaula de hámster se desperdicia con ella; necesita superficie horizontal amplia. Una rata es la más activa e inteligente de las tres, se beneficia de una jaula con varios niveles y elementos para trepar, y su curiosidad hace que la calidad del cierre de la puerta importe más de lo que parece. Antes de fijarse en el precio o el diseño de una jaula, conviene identificar qué especie concreta va a vivir en ella — el mismo recinto que le queda cómodo a una rata puede ser demasiado pequeño para una cobaya y completamente inadecuado para un hámster que necesita profundidad para cavar.'
    }
  ]
};

export function getSection(animal: LegacyAnimal, seccion: string): Section {
  return SECTIONS[animal].find((s) => s.slug === seccion) ?? SECTIONS[animal][0];
}

export interface TypeDef {
  slug: string;
  label: string;
  description: string;
  icon: IconName;
  // false = existe en la taxonomía (para crecer en el futuro) pero todavía
  // no tiene guía ni productos reales, así que no genera página ni aparece
  // en ningún menú — evita páginas finas/vacías (regla del cliente: calidad
  // > cantidad de páginas). Cuando escribas la guía + productos de un tipo,
  // cambia esto a true y ya se muestra solo.
  built: boolean;
}

export interface CategoryDef {
  slug: string;
  label: string;
  description: string;
  icon: IconName;
  // Párrafo(s) de contenido real para el hub de la categoría — qué cubre,
  // qué factores importan al elegir entre sus tipos, cómo decidir. Sin
  // esto, la página es casi solo una rejilla de tarjetas sin texto propio.
  intro?: string;
  types: TypeDef[];
}

export const CATEGORIES: Record<CategorizedAnimal, CategoryDef[]> = {
  perros: [
    {
      slug: 'alimentacion',
      label: 'Alimentación',
      description: 'Pienso, comida húmeda, snacks y comederos.',
      intro:
        'La primera decisión real no es la marca, es leer la lista de ingredientes en vez del envase: términos como "premium" o "natural" no tienen definición legal, mientras que el orden de los ingredientes sí dice cuánto pesa cada uno en la fórmula. A partir de ahí, la etapa vital del perro pesa más que cualquier otro factor — un cachorro necesita casi el doble de energía por kilo que un adulto en mantenimiento, y un perro esterilizado o senior necesita justo lo contrario, menos densidad calórica para no acumular sobrepeso. El tamaño de la raza también cambia la fórmula que conviene: una raza pequeña tiene un metabolismo proporcionalmente más rápido y una boca que exige una croqueta distinta a la de una raza grande. Comida húmeda, comederos antivoracidad y fuentes de agua no son alternativas al pienso, son complementos que resuelven problemas concretos (hidratación, ingesta demasiado rápida, perros que beben poco) — vale la pena mirarlos como parte de la rutina de alimentación completa, no como un extra opcional.',
      icon: 'bowl',
      types: [
        {
          slug: 'pienso',
          label: 'Pienso',
          description: 'Cómo leer una etiqueta de pienso y elegir según edad, tamaño y actividad.',
          icon: 'bowl',
          built: true
        },
        {
          slug: 'comida-humeda',
          label: 'Comida húmeda',
          description: 'Cuándo compensa combinarla con pienso y cómo conservarla una vez abierta.',
          icon: 'bowl',
          built: true
        },
        {
          slug: 'snacks',
          label: 'Snacks y premios',
          description: 'Cuánto deben pesar en la ración diaria y qué evitar en la etiqueta.',
          icon: 'bowl',
          built: true
        },
        {
          slug: 'antivoracidad',
          label: 'Comederos antivoracidad',
          description: 'Ralentizan la ingesta en perros que comen demasiado rápido.',
          icon: 'bowl',
          built: true
        },
        {
          slug: 'elevados',
          label: 'Comederos elevados',
          description: 'Reducen la tensión en el cuello, pensados para perros grandes.',
          icon: 'bowl',
          built: true
        },
        {
          slug: 'bebederos',
          label: 'Bebederos antivuelco',
          description: 'Base ancha y estable, para perros que vuelcan el agua al beber.',
          icon: 'bowl',
          built: true
        },
        {
          slug: 'fuentes-de-agua',
          label: 'Fuentes de agua',
          description: 'Por qué algunos perros beben más de una fuente en movimiento que de un cuenco quieto.',
          icon: 'droplet',
          built: true
        },
        {
          slug: 'comederos-automaticos',
          label: 'Comederos automáticos',
          description: 'Raciones programadas a horas fijas, para rutinas irregulares.',
          icon: 'bowl',
          built: true
        },
        {
          slug: 'pienso-cachorros',
          label: 'Pienso para cachorros',
          description: 'Más energía y calcio por gramo para una etapa de crecimiento que un pienso de adulto no cubre bien.',
          icon: 'bowl',
          built: true
        },
        {
          slug: 'pienso-perros-mayores',
          label: 'Pienso para perros mayores',
          description: 'Croqueta más blanda y menos calorías, pensado para articulaciones y metabolismo que ya no son los de un adulto joven.',
          icon: 'bowl',
          built: true
        },
        {
          slug: 'pienso-razas-pequenas',
          label: 'Pienso para razas pequeñas',
          description: 'Croqueta de menor tamaño y mayor densidad calórica, ajustada a un metabolismo más rápido que el de una raza grande.',
          icon: 'bowl',
          built: true
        },
        {
          slug: 'pienso-esterilizados',
          label: 'Pienso para perros esterilizados',
          description: 'Menor densidad calórica para compensar un metabolismo que baja de ritmo tras la esterilización.',
          icon: 'bowl',
          built: true
        }
      ]
    },
    {
      slug: 'paseo',
      label: 'Paseo',
      description: 'Arneses, correas y todo lo necesario para salir a la calle.',
      intro:
        'Un collar y un arnés no cumplen la misma función pese a que muchas tiendas los presenten como intercambiables: el collar concentra toda la fuerza de un tirón en el cuello, mientras que un arnés bien ajustado la reparte por el pecho y el torso, algo especialmente importante en perros que tiran con fuerza o en razas con tráquea sensible. Dentro de los arneses, el antitirones (con enganche frontal) resuelve un problema de comportamiento en el paseo, mientras que el de seguridad para coche resuelve un problema de sujeción durante el trayecto — no son la misma pieza aunque ambas se llamen "arnés". La correa importa casi tanto como el arnés: una extensible da libertad de movimiento pero peor control inmediato que una de longitud fija, relevante sobre todo en ciudad o cerca de tráfico. Y dos accesorios que se subestiman: las tiras reflectantes no son un capricho estético en paseos con poca luz, y un localizador GPS tiene sentido real solo si el perro tiene acceso habitual al exterior sin correa.',
      icon: 'harness',
      types: [
        {
          slug: 'collares',
          label: 'Collares',
          description: 'Ajuste correcto, materiales y cuándo un collar no es suficiente por sí solo.',
          icon: 'harness',
          built: true
        },
        {
          slug: 'antitirones',
          label: 'Arneses antitirones',
          description: 'Doble punto de enganche para redirigir el tirón hacia ti, no hacia el cuello.',
          icon: 'harness',
          built: true
        },
        {
          slug: 'ligeros',
          label: 'Arneses ligeros',
          description: 'Malla transpirable para razas pequeñas y paseos en climas cálidos.',
          icon: 'harness',
          built: true
        },
        {
          slug: 'seguridad-coche',
          label: 'Arneses de seguridad para coche',
          description: 'Anclaje tipo cinturón homologable para viajar seguro en el vehículo.',
          icon: 'harness',
          built: true
        },
        {
          slug: 'reflectantes',
          label: 'Arneses reflectantes',
          description: 'Acolchados con tiras reflectantes para paseos con poca luz.',
          icon: 'harness',
          built: true
        },
        {
          slug: 'correas',
          label: 'Correas',
          description: 'Longitud fija, extensible o de tiro: cuál se ajusta a cada situación de paseo.',
          icon: 'harness',
          built: true
        },
        {
          slug: 'bolsas-excrementos',
          label: 'Bolsas para excrementos',
          description: 'Biodegradables, gruesas o con dispensador: qué mirar antes de comprar por bulto.',
          icon: 'bag',
          built: true
        },
        {
          slug: 'gps',
          label: 'GPS y localizadores',
          description: 'Autonomía real, cobertura y cuándo compensa frente a un simple collar con chapa.',
          icon: 'compass',
          built: true
        }
      ]
    },
    {
      slug: 'juguetes',
      label: 'Juguetes',
      description: 'Pelotas, mordedores y juguetes interactivos.',
      intro:
        'El error más caro al comprar juguetes para perro es elegir por precio o por aspecto en vez de por la forma de morder de ese perro concreto — un mordedor pensado para un perro que mastica con suavidad no dura ni un día con uno que muerde con fuerza sostenida, y eso no es un defecto del juguete, es un desajuste con el uso real. Los juguetes de inteligencia y los dispensadores de premios no son solo entretenimiento: canalizan el instinto de búsqueda de comida y reducen el aburrimiento en perros que pasan horas solos, algo que un juguete pasivo (una pelota, un peluche) no consigue por sí solo. El tamaño también es un factor de seguridad, no solo de comodidad: una pelota demasiado pequeña para la mandíbula del perro es un riesgo real de atragantamiento, no un detalle menor. Los juguetes acuáticos y los frisbees tienen sentido si el perro nada o corre con regularidad — comprarlos sin esa actividad real detrás suele terminar en un juguete sin usar.',
      icon: 'toy',
      types: [
        {
          slug: 'mordedores',
          label: 'Mordedores rellenos',
          description: 'Caucho denso rellenable, ideales contra el aburrimiento y la ansiedad por separación.',
          icon: 'toy',
          built: true
        },
        {
          slug: 'cuerda',
          label: 'Juguetes de cuerda',
          description: 'Algodón trenzado para tirar y para limpieza dental mecánica.',
          icon: 'toy',
          built: true
        },
        {
          slug: 'dispensadores',
          label: 'Dispensadores de premios',
          description: 'Liberan comida al jugar, para ralentizar la ingesta y estimular la mente.',
          icon: 'toy',
          built: true
        },
        {
          slug: 'acuaticos',
          label: 'Juguetes acuáticos',
          description: 'Flotan en agua, pensados para perros que nadan en playa, río o piscina.',
          icon: 'toy',
          built: true
        },
        {
          slug: 'pelotas',
          label: 'Pelotas',
          description: 'Tamaño seguro según la mandíbula del perro y materiales que aguantan mordidas.',
          icon: 'toy',
          built: true
        },
        {
          slug: 'inteligencia',
          label: 'Juguetes de inteligencia',
          description: 'Puzles y dispensadores que trabajan la cabeza, no solo el cuerpo.',
          icon: 'toy',
          built: true
        },
        {
          slug: 'peluches',
          label: 'Peluches',
          description: 'Con y sin relleno chirriante: para qué perro tiene sentido cada uno.',
          icon: 'toy',
          built: true
        },
        {
          slug: 'frisbees',
          label: 'Frisbees',
          description: 'Flexibilidad y borde blando, claves para no dañar la boca al atraparlos al vuelo.',
          icon: 'toy',
          built: true
        }
      ]
    },
    {
      slug: 'descanso',
      label: 'Descanso',
      description: 'Camas, mantas, casetas y transportines.',
      intro:
        'No todas las camas resuelven el mismo problema, aunque en la tienda se vean todas parecidas. Una cama viscoelástica u ortopédica está pensada para perros senior o con problemas articulares — la espuma de densidad alta reduce la presión sobre las articulaciones, algo que una cama plana económica no ofrece por mucho acolchado visual que tenga. Una cama antiestrés, con borde elevado tipo donut, responde a un comportamiento muy distinto: perros que duermen enroscados y buscan sentirse rodeados, no una necesidad médica. Las camas elevadas ganan sentido sobre todo en exterior o climas cálidos, por la circulación de aire por debajo. Casetas y transportines no son intercambiables con una cama: una caseta protege de la intemperie a un perro que pasa tiempo fuera, y un transportín es, ante todo, un elemento de seguridad para viajar en coche homologado, no solo un sitio donde dormir. Antes de comprar, conviene identificar qué problema real se quiere resolver — comodidad diaria, salud articular o seguridad en viaje — porque cada uno pide un producto distinto.',
      icon: 'bed',
      types: [
        {
          slug: 'viscoelasticas',
          label: 'Camas viscoelásticas y ortopédicas',
          description: 'Espuma de densidad alta para perros senior o con problemas articulares.',
          icon: 'bed',
          built: true
        },
        {
          slug: 'elevadas',
          label: 'Camas elevadas y transpirables',
          description: 'Estructura elevada del suelo, ideal para el calor y el exterior.',
          icon: 'bed',
          built: true
        },
        {
          slug: 'antiestres',
          label: 'Camas antiestrés',
          description: 'Forma tipo donut con borde elevado para perros que duermen enroscados.',
          icon: 'bed',
          built: true
        },
        {
          slug: 'economicas',
          label: 'Camas económicas',
          description: 'Camas planas de diario, lavables y a buen precio para cachorros y adultos jóvenes.',
          icon: 'bed',
          built: true
        },
        {
          slug: 'mantas',
          label: 'Mantas y colchonetas',
          description: 'El complemento ligero para el coche, el sofá o encima de una cama ya existente.',
          icon: 'bed',
          built: true
        },
        {
          slug: 'casetas',
          label: 'Casetas',
          description: 'Aislamiento y tamaño real para perros que pasan tiempo en el exterior.',
          icon: 'bed',
          built: true
        },
        {
          slug: 'transportines',
          label: 'Transportines y jaulas',
          description: 'Talla según el perro, no según la caja, y qué exige viajar homologado en coche.',
          icon: 'cage',
          built: true
        }
      ]
    },
    {
      slug: 'higiene',
      label: 'Higiene',
      description: 'Cepillos, champús y cuidado dental.',
      intro:
        'El tipo de pelo del perro determina el cepillo, no al revés: un cepillo de púa funciona bien en pelo corto, pero un perro de doble capa necesita una cardadora que llegue al subpelo, sin la cual la muda se queda atrapada y se apelmaza. El champú tampoco es un producto genérico intercambiable con el de uso humano — el pH de la piel de un perro es distinto, y usar un champú no formulado para ellos puede resecar o irritar la piel a medio plazo. El cuidado dental es el bloque que más se posterga y el que más consecuencias reales tiene: la acumulación de sarro no tratada deriva en enfermedad periodontal, y ni los huesos masticables ni los sprays de aliento fresco sustituyen el cepillado mecánico regular cuando ya hay sarro formado. Cortar las uñas, por último, es más una cuestión de técnica que de herramienta — el riesgo real no es el tipo de cortaúñas, sino cortar la parte viva de la uña por no distinguirla bien, algo que conviene aprender a identificar antes de la primera vez.',
      icon: 'brush',
      types: [
        {
          slug: 'cepillos',
          label: 'Cepillos y peines',
          description: 'Según el tipo de pelo: de púa, cardadora o guante, para reducir la muda real.',
          icon: 'brush',
          built: true
        },
        {
          slug: 'champus',
          label: 'Champús',
          description: 'pH específico para perro y cuándo conviene uno hipoalergénico o antiparasitario.',
          icon: 'bottle',
          built: true
        },
        {
          slug: 'cuidado-dental',
          label: 'Productos dentales',
          description: 'Pastas, huesos y sprays: qué reduce sarro de verdad y qué es solo aliento fresco.',
          icon: 'tooth',
          built: true
        },
        {
          slug: 'cortaunas',
          label: 'Cortaúñas',
          description: 'De guillotina o tijera, y cómo evitar cortar la parte viva de la uña.',
          icon: 'clippers',
          built: true
        }
      ]
    },
    {
      slug: 'viajes-y-coche',
      label: 'Viajes y coche',
      description: 'Transportines, fundas y accesorios para el coche.',
      intro:
        'Viajar con un perro suelto en el coche no es solo una cuestión de comodidad, es un riesgo real en caso de frenazo — para el perro y para las personas dentro del vehículo. Un arnés o cinturón de seguridad homologado limita el movimiento del perro durante el trayecto, mientras que una rejilla separadora de maletero añade una barrera física que impide que invada los asientos delanteros; son medidas complementarias, no alternativas entre sí, y lo ideal es combinarlas en trayectos largos. Las fundas y protectores resuelven un problema distinto y menos urgente: proteger la tapicería del maletero o el asiento trasero del pelo, el barro o los arañazos, sin aportar nada a la seguridad del trayecto. Las rampas tienen sentido sobre todo con perros grandes, senior o con problemas articulares, para quienes saltar directamente al maletero supone un esfuerzo o un riesgo real para las articulaciones — comprobar el ángulo y la capacidad de carga real antes de elegir una es más importante que el precio.',
      icon: 'car',
      types: [
        {
          slug: 'fundas-coche',
          label: 'Fundas y protectores',
          description: 'Impermeables y antideslizantes, para proteger el maletero o el asiento trasero.',
          icon: 'car',
          built: true
        },
        {
          slug: 'cinturones',
          label: 'Cinturones y arneses de coche',
          description: 'La diferencia entre un arnés homologado de verdad y uno solo etiquetado como tal.',
          icon: 'harness',
          built: true
        },
        {
          slug: 'rampas',
          label: 'Rampas',
          description: 'Ángulo y capacidad de carga para perros grandes, senior o con problemas articulares.',
          icon: 'compass',
          built: true
        },
        {
          slug: 'rejillas-separadoras-maletero',
          label: 'Rejillas separadoras de maletero',
          description: 'Evitan que el perro invada los asientos delanteros en una frenada, sin depender solo del arnés.',
          icon: 'car',
          built: true
        }
      ]
    },
    {
      slug: 'tecnologia',
      label: 'Tecnología',
      description: 'GPS, cámaras y collares de actividad.',
      intro:
        'Estos tres tipos de producto responden a preguntas distintas, aunque a veces se venden mezclados en el mismo dispositivo. Un GPS responde a "¿dónde está mi perro?" — tiene sentido real sobre todo si el perro tiene acceso al exterior sin correa o tiende a escaparse, y su factor más importante no es el precio sino la autonomía real de batería y el coste mensual de la cobertura de red, algo que muchas fichas de producto no destacan. Un collar de actividad responde a una pregunta distinta, "¿cuánto se mueve y cómo descansa mi perro?" — el dato relevante no está tanto en un día concreto como en la tendencia a lo largo de semanas, útil para detectar si una raza muy energética se está quedando corta de ejercicio real. Una cámara doméstica responde a "¿qué hace mi perro solo en casa?", con diferencias reales entre modelos básicos y los que incluyen audio bidireccional o dispensador de premios integrado. Ninguno de los tres sustituye a los otros dos — cubren necesidades distintas y conviene elegir según cuál sea la pregunta real que se quiere resolver.',
      icon: 'camera',
      types: [
        {
          slug: 'gps-tech',
          label: 'GPS',
          description: 'Autonomía, cobertura de red y coste mensual real antes de decidirte.',
          icon: 'compass',
          built: true
        },
        {
          slug: 'camaras',
          label: 'Cámaras',
          description: 'Visión nocturna, audio bidireccional y dispensador integrado: qué merece la pena.',
          icon: 'camera',
          built: true
        },
        {
          slug: 'collares-actividad-fitness',
          label: 'Collares de actividad',
          description: 'Miden movimiento y descanso, útiles para ajustar ejercicio real sin la función de localización de un GPS.',
          icon: 'compass',
          built: true
        }
      ]
    }
  ],
  gatos: [
    {
      slug: 'alimentacion',
      label: 'Alimentación',
      description: 'Pienso, comida húmeda, comederos y fuentes de agua.',
      intro:
        'Un gato es carnívoro estricto, algo distinto a un perro, que es más omnívoro — esa diferencia debería notarse en la composición del pienso: proteína animal como ingrediente principal, no un relleno vegetal genérico. La etapa vital pesa tanto como en perros: un gatito necesita mucha más densidad calórica que un adulto, mientras que un gato esterilizado necesita justo lo contrario tras el cambio de metabolismo que sigue a la operación. El pienso de control urinario merece mención aparte porque no es una moda de marketing — los problemas del tracto urinario están entre los motivos más frecuentes de visita al veterinario en gatos, sobre todo en machos castrados. La comida húmeda no compite con el pienso, lo complementa aportando una hidratación que el pienso seco no cubre por sí solo, algo especialmente relevante porque muchos gatos beben poca agua de forma natural — de ahí que una fuente en movimiento suela funcionar mejor que un cuenco quieto para animar a beber más.',
      icon: 'bowl',
      types: [
        {
          slug: 'pienso',
          label: 'Pienso',
          description: 'Cómo elegir según edad, esterilización y tendencia al sobrepeso.',
          icon: 'bowl',
          built: true
        },
        {
          slug: 'comida-humeda',
          label: 'Comida húmeda',
          description: 'Por qué aporta hidratación real que el pienso solo no cubre.',
          icon: 'bowl',
          built: true
        },
        {
          slug: 'antivoracidad',
          label: 'Comederos antivoracidad',
          description: 'Ralentizan la ingesta en gatos que comen demasiado rápido.',
          icon: 'bowl',
          built: true
        },
        {
          slug: 'automaticos-basicos',
          label: 'Comederos automáticos con temporizador',
          description: 'Reparten raciones a horas fijas para hogares con horarios irregulares.',
          icon: 'bowl',
          built: true
        },
        {
          slug: 'automaticos-camara',
          label: 'Comederos automáticos con cámara',
          description: 'Además de programar raciones, dejan ver y grabar al gato mientras come.',
          icon: 'bowl',
          built: true
        },
        {
          slug: 'elevados',
          label: 'Comederos elevados',
          description: 'Reducen la fatiga de bigotes y la tensión en el cuello al comer.',
          icon: 'bowl',
          built: true
        },
        {
          slug: 'fuentes',
          label: 'Fuentes de agua',
          description: 'Los gatos beben más de agua en movimiento: por qué compensa frente a un cuenco.',
          icon: 'droplet',
          built: true
        },
        {
          slug: 'pienso-gatitos',
          label: 'Pienso para gatitos',
          description: 'Más energía y proteína por gramo para un crecimiento que exige mucho más aporte que el de un adulto.',
          icon: 'bowl',
          built: true
        },
        {
          slug: 'pienso-esterilizados',
          label: 'Pienso para gatos esterilizados',
          description: 'Menos densidad calórica para compensar un metabolismo que baja de ritmo tras la esterilización.',
          icon: 'bowl',
          built: true
        },
        {
          slug: 'pienso-gatos-mayores',
          label: 'Pienso para gatos mayores',
          description: 'Croqueta más blanda y digestible, pensada para riñones y articulaciones que ya no son las de un adulto joven.',
          icon: 'bowl',
          built: true
        },
        {
          slug: 'pienso-control-urinario',
          label: 'Pienso de control urinario',
          description: 'Formulado para reducir el riesgo de cristales y cálculos, uno de los problemas de salud más frecuentes en gatos.',
          icon: 'bowl',
          built: true
        }
      ]
    },
    {
      slug: 'areneros',
      label: 'Areneros',
      description: 'Bandejas de arena, autolimpiables y con control de olores.',
      intro:
        'La regla más citada en areneros —"uno por gato más uno"— no es un capricho, tiene una explicación real de comportamiento: los gatos son territoriales también con sus recursos de higiene, y compartir arenero es una causa habitual de que un gato deje de usarlo o empiece a hacerlo fuera. Dentro de los tipos, cerrado y abierto no son una cuestión solo estética: un arenero cerrado retiene mejor el olor para las personas, pero algunos gatos lo viven como un espacio reducido y lo evitan, así que la preferencia real del gato pesa más que cualquier ventaja teórica del diseño. Los automáticos autolimpiables ahorran tiempo real en el mantenimiento diario, a cambio de un coste inicial mayor y de que algunos gatos tardan en acostumbrarse al mecanismo. El tamaño casi siempre se queda corto: la mayoría de gatos necesita un arenero notablemente más grande de lo que ofrece el estándar de tienda, y un arenero XXL abierto suele resolver más problemas de rechazo que cambiar de marca de arena.',
      icon: 'litterbox',
      types: [
        {
          slug: 'automaticos',
          label: 'Areneros automáticos',
          description: 'Autolimpiables con sensor de peso y control por app, para hogares con poco tiempo.',
          icon: 'litterbox',
          built: true
        },
        {
          slug: 'cerrados',
          label: 'Areneros cerrados',
          description: 'Con capota y filtro de carbón, retienen mejor los olores para las personas.',
          icon: 'litterbox',
          built: true
        },
        {
          slug: 'portatiles',
          label: 'Areneros portátiles',
          description: 'Plegables de tela, pensados para viajes y estancias fuera de casa.',
          icon: 'litterbox',
          built: true
        },
        {
          slug: 'xxl-abiertos',
          label: 'Areneros XXL abiertos',
          description: 'Máxima capacidad y espacio para gatos grandes o multi-gato.',
          icon: 'litterbox',
          built: true
        }
      ]
    },
    {
      slug: 'juguetes',
      label: 'Juguetes',
      description: 'Cañas, pelotas, ratones, catnip y juguetes interactivos.',
      intro:
        'La caña es el juguete que más se acerca a la caza real —movimiento errático, dirigido por una persona— y por eso suele ser el que menos aburre a largo plazo, aunque exige tiempo activo de quien juega, no vale con dejarla tirada. Los ratones y peluches cubren un tipo de juego distinto: el ataque en solitario, cuando no hay nadie manejando una caña, así que no son sustitutos entre sí sino complementarios. Los juguetes interactivos con sensor o circuito están pensados sobre todo para gatos que pasan muchas horas solos, canalizando parte del instinto de caza sin depender de que alguien juegue con ellos. El catnip no es un juguete en sí, es un potenciador que aumenta el interés por un juguete o rascador ya existente — y conviene saber que hasta un tercio de los gatos no reacciona a él en absoluto, algo genético y completamente normal, no un fallo del producto ni del gato.',
      icon: 'toy',
      types: [
        {
          slug: 'canas',
          label: 'Cañas y varitas',
          description: 'El juguete que más imita la caza real y por qué es el que menos aburre.',
          icon: 'toy',
          built: true
        },
        {
          slug: 'juguetes-interactivos',
          label: 'Juguetes interactivos',
          description: 'Circuitos, pelotas con sensor y puzles para gatos que se quedan solos muchas horas.',
          icon: 'toy',
          built: true
        },
        {
          slug: 'ratones-y-peluches',
          label: 'Ratones y peluches',
          description: 'El juguete de siempre, pensado para el ataque en solitario más que para el juego con el dueño.',
          icon: 'toy',
          built: true
        },
        {
          slug: 'hierba-gatera-y-catnip',
          label: 'Hierba gatera y catnip',
          description: 'Por qué unos gatos reaccionan con euforia y otros no reaccionan en absoluto ante el mismo catnip.',
          icon: 'leaf',
          built: true
        }
      ]
    },
    {
      slug: 'rascadores',
      label: 'Rascadores',
      description: 'Rascadores verticales, horizontales y torres para gatos.',
      intro:
        'Rascar no es un comportamiento que se pueda eliminar entrenando al gato, es una necesidad física —marca territorio y mantiene las uñas en condiciones— así que la pregunta real no es "cómo evito que rasque" sino "cómo le doy un sitio mejor que el sofá para hacerlo". Un poste vertical de sisal permite el estiramiento completo típico del rascado en gatos, algo que un rascador de cartón horizontal, mucho más económico, no ofrece de la misma forma. Las torres multinivel con hamaca añaden una función distinta —trepar y descansar en altura— que va más allá de rascar, especialmente valiosa en pisos donde el gato no tiene forma de ganar altura de otro modo. Los rascadores de pared son la opción cuando el espacio en el suelo es limitado, con el mismo ángulo de estiramiento que uno vertical pero sin ocupar superficie. Da igual el tipo elegido: colocarlo cerca de donde el gato ya rasca de forma espontánea (muchas veces cerca de su zona de descanso) tiene más impacto en si lo usa que la calidad del propio rascador.',
      icon: 'cat',
      types: [
        {
          slug: 'postes-sisal',
          label: 'Rascadores poste de sisal',
          description: 'Verticales, para el estiramiento completo típico del rascado en gatos.',
          icon: 'cat',
          built: true
        },
        {
          slug: 'torres',
          label: 'Torres rascador multinivel',
          description: 'Varios niveles con hamaca, para rascar, trepar y descansar en altura.',
          icon: 'cat',
          built: true
        },
        {
          slug: 'pared',
          label: 'Rascadores de pared',
          description: 'Tablas inclinadas que ahorran espacio en el suelo.',
          icon: 'cat',
          built: true
        },
        {
          slug: 'carton-horizontal',
          label: 'Rascadores de cartón horizontales',
          description: 'La opción más económica, ideal como segundo rascador de la casa.',
          icon: 'cat',
          built: true
        }
      ]
    },
    {
      slug: 'descanso',
      label: 'Descanso',
      description: 'Camas, cuevas y hamacas para ventana.',
      intro:
        'La mayoría de gatos prefiere un espacio con bordes elevados o completamente cerrado antes que una cama plana y abierta — no es una preferencia estética, responde a la necesidad de sentirse protegido mientras duerme, que es cuando más vulnerable está un animal en estado salvaje. Por eso una cueva o una cama con borde alto suele tener más éxito real que una cama de aspecto más lujoso pero completamente plana. Las hamacas de ventana cubren una necesidad distinta: aprovechar el calor del sol y la vista al exterior, algo que muchos gatos valoran por encima de la comodidad del acolchado — aquí el factor que más importa no es el diseño sino la capacidad de peso real de las ventosas, no la decorativa que aparece en el envase. Las mantas y cojines son el complemento más flexible de los tres: no sustituyen a una cama con bordes, pero amplían los puntos de descanso disponibles por la casa sin apenas coste ni espacio.',
      icon: 'bed',
      types: [
        {
          slug: 'camas-gato',
          label: 'Camas y cuevas',
          description: 'Cerradas o abiertas: por qué la mayoría de gatos prefiere un espacio con bordes.',
          icon: 'bed',
          built: true
        },
        {
          slug: 'hamacas',
          label: 'Hamacas de ventana',
          description: 'Capacidad de peso y ventosas reales, no decorativas, antes de fiarte del cristal.',
          icon: 'bed',
          built: true
        },
        {
          slug: 'mantas-y-cojines',
          label: 'Mantas y cojines',
          description: 'El complemento ligero para encima de cualquier cama, sofá o incluso el propio arenero cerrado.',
          icon: 'bed',
          built: true
        }
      ]
    },
    {
      slug: 'higiene',
      label: 'Higiene',
      description: 'Cepillos, deslanadores, toallitas y cuidado dental.',
      intro:
        'El cepillado regular es, con diferencia, la medida más efectiva contra las bolas de pelo — mucho más directa que depender de un pienso "anti-hairball", que ayuda pero no sustituye el retirar el pelo suelto antes de que el gato se lo trague al asearse. El tipo de herramienta depende del pelo, no del gusto: un cepillo normal funciona bien en pelo corto, pero un gato de pelo largo necesita un deslanador que llegue al subpelo enredado, sin el cual se forman nudos que un cepillo convencional no deshace. Las toallitas y el champú seco no son un capricho de comodidad, tienen un uso real concreto: gatos mayores, con movilidad reducida o con ansiedad extrema al agua, para quienes un baño tradicional supone más estrés del que compensa la limpieza. El cuidado dental es el bloque que más se olvida y el de consecuencias más serias si se ignora durante años — la acumulación de sarro no tratada deriva en enfermedad periodontal real, no solo en mal aliento.',
      icon: 'brush',
      types: [
        {
          slug: 'cepillos-gato',
          label: 'Cepillos para pelo corto',
          description: 'Reducen la muda mejor que cualquier pienso "anti-hairball", con cerdas suaves que no irritan la piel.',
          icon: 'brush',
          built: true
        },
        {
          slug: 'deslanadores-pelo-largo',
          label: 'Deslanadores para pelo largo',
          description: 'Llegan al subpelo enredado que un cepillo normal no consigue desenmarañar en razas de pelo largo.',
          icon: 'brush',
          built: true
        },
        {
          slug: 'toallitas-y-champu-seco',
          label: 'Toallitas y champú seco',
          description: 'La alternativa cuando un baño con agua no es viable, para gatos mayores, ansiosos o con movilidad reducida.',
          icon: 'bottle',
          built: true
        }
      ]
    },
    {
      slug: 'transporte',
      label: 'Transporte',
      description: 'Transportines rígidos, mochilas y bolsos blandos.',
      intro:
        'Para el veterinario o un trayecto en coche, un transportín rígido con anclaje de cinturón sigue siendo la opción más segura — ofrece una protección estructural que ningún modelo blando puede igualar en caso de frenazo o golpe, además de ser mucho más fácil de desinfectar si el gato tiene un accidente dentro. Las mochilas de transporte resuelven un problema distinto: trayectos más largos a pie o en transporte público, donde repartir el peso en la espalda marca una diferencia real frente a cargar un transportín de asa. Los bolsos y transportines blandos son la opción más ligera y fácil de guardar, pensada para trayectos cortos y ocasionales, con la contrapartida de ofrecer menos protección física y retener más los olores que uno rígido. Sea cual sea el tipo, la introducción gradual pesa tanto como el propio producto — dejar el transportín accesible en casa varios días antes del primer uso real, asociado a algo positivo, reduce mucho el estrés del gato frente a meterlo dentro solo el día del viaje.',
      icon: 'cage',
      types: [
        {
          slug: 'transportines',
          label: 'Transportines rígidos',
          description: 'La opción más segura para el coche y el veterinario, con anclaje de cinturón homologable.',
          icon: 'cage',
          built: true
        },
        {
          slug: 'mochilas-transporte',
          label: 'Mochilas de transporte',
          description: 'Con ventana de burbuja o malla, pensadas para paseos y trayectos más largos a pie o en transporte público.',
          icon: 'cage',
          built: true
        },
        {
          slug: 'bolsos-transportines-blandos',
          label: 'Bolsos y transportines blandos',
          description: 'Ligeros y plegables para trayectos cortos, aunque ofrecen menos protección que uno rígido en un golpe.',
          icon: 'bag',
          built: true
        }
      ]
    },
    {
      slug: 'tecnologia',
      label: 'Tecnología',
      description: 'Cámaras, collares GPS y collares de actividad.',
      intro:
        'Estos tres productos responden a preguntas distintas sobre un gato, aunque a veces se combinan en un mismo dispositivo. Una cámara doméstica responde a "¿qué hace mi gato solo en casa?", con diferencias reales entre un modelo básico y uno con dispensador de comida integrado. Un collar GPS responde a "¿dónde está?" — tiene sentido sobre todo en gatos con acceso libre al exterior, y el factor que más debería pesar en la decisión es la autonomía real de batería, no solo el precio del dispositivo. Un collar de actividad responde a una tercera pregunta, "¿cómo se mueve y descansa?" — los gatos son especialmente buenos ocultando signos de malestar por instinto de supervivencia, así que un cambio sostenido de actividad detectado por el collar puede ser la primera señal visible de que algo no va bien, antes de que sea evidente a simple vista. Ninguno de los tres sustituye la observación diaria del dueño, pero cada uno aporta un dato objetivo que esa observación por sí sola no siempre capta.',
      icon: 'camera',
      types: [
        {
          slug: 'camaras-gato',
          label: 'Cámaras',
          description: 'Para saber qué hace tu gato solo en casa, con o sin dispensador integrado.',
          icon: 'camera',
          built: true
        },
        {
          slug: 'collares-gps-gato',
          label: 'Collares GPS',
          description: 'Localización en tiempo real para gatos con acceso al exterior, con autonomía real muy distinta según el modelo.',
          icon: 'compass',
          built: true
        },
        {
          slug: 'collares-inteligentes-actividad',
          label: 'Collares de actividad',
          description: 'Miden movimiento, descanso y a veces salud general, sin la función de localización de un GPS.',
          icon: 'compass',
          built: true
        }
      ]
    }
  ],
  acuarios: [
    {
      slug: 'kits-y-peceras',
      label: 'Kits y peceras',
      description: 'Kits completos, nanoacuarios y peceras para empezar.',
      intro:
        'El volumen del acuario debería ser la primera decisión, no la última — un acuario más pequeño de lo recomendado tiene parámetros de agua mucho menos estables y perdona muchos menos errores de principiante que uno de 60 litros o más, pese a que suele venderse como "la opción fácil para empezar". Un kit estándar completo (filtro y luz incluidos) evita el error más común de montar la parte bonita del acuario sin la filtración adecuada para ese volumen. Los nanoacuarios (20 litros o menos) no son una versión reducida de lo mismo: exigen más estabilidad y menos margen de error, así que encajan mejor con gambas o Betta que con un primer acuario comunitario. Los acuarios marinos son otra categoría por completo, con exigencias de equipo y experiencia previa muy superiores a un acuario de agua dulce — no es un paso natural desde un kit estándar, sino un proyecto distinto que conviene abordar solo con ese conocimiento previo ya adquirido.',
      icon: 'fish',
      types: [
        {
          slug: 'kits-estandar',
          label: 'Kits estándar para principiantes',
          description: 'Acuarios completos con filtro y luz, listos para montar, 60+ litros.',
          icon: 'fish',
          built: true
        },
        {
          slug: 'nanoacuarios',
          label: 'Nanoacuarios',
          description: 'Acuarios pequeños (20 litros o menos), pensados para gambas o Betta.',
          icon: 'fish',
          built: true
        },
        {
          slug: 'marinos',
          label: 'Acuarios marinos',
          description: 'Por qué exigen más equipo y experiencia previa que un acuario dulce.',
          icon: 'fish',
          built: true
        }
      ]
    },
    {
      slug: 'filtracion',
      label: 'Filtración',
      description: 'Filtros internos, externos, mochila y de esponja.',
      intro:
        'Un filtro interno es la opción más habitual para acuarios pequeños y medianos, sencillo de instalar y silencioso, pero con capacidad limitada según el volumen del tanque. Un filtro externo (canister) da el salto necesario cuando ese volumen o esa carga de peces supera lo que un interno puede procesar bien — mueve más agua y ofrece más espacio para material filtrante, a cambio de mayor coste y una instalación algo más compleja. El material filtrante en sí no es un accesorio menor: tiene tres funciones distintas (mecánica, biológica y química) que actúan en capas, y saber cuándo cambiar cada una sin destruir las bacterias beneficiosas acumuladas es más importante que la marca del propio filtro. Un error frecuente es apagar el filtro por la noche pensando en ahorrar — el filtro debe funcionar de forma continua las 24 horas, porque las bacterias que procesan el amoniaco y los nitritos dependen de ese flujo constante para sobrevivir.',
      icon: 'filter',
      types: [
        {
          slug: 'filtros-internos',
          label: 'Filtros internos',
          description: 'Sencillos y silenciosos, la opción más habitual para acuarios pequeños y medianos.',
          icon: 'filter',
          built: true
        },
        {
          slug: 'filtros-externos',
          label: 'Filtros externos',
          description: 'Filtros de bote (canister) para acuarios medianos y grandes.',
          icon: 'filter',
          built: true
        },
        {
          slug: 'material-filtrante',
          label: 'Material filtrante',
          description: 'Mecánico, biológico y químico: para qué sirve cada capa y cuándo cambiarla.',
          icon: 'filter',
          built: true
        }
      ]
    },
    {
      slug: 'iluminacion',
      label: 'Iluminación',
      description: 'Pantallas LED, RGB decorativo y luz de alta intensidad para plantado.',
      intro:
        'Los lúmenes que aparecen en la caja miden brillo percibido por el ojo humano, no lo que las plantas pueden aprovechar para la fotosíntesis — dos pantallas LED con los mismos lúmenes pueden dar resultados de crecimiento muy distintos según el espectro real de luz que emitan, sobre todo en las bandas roja y azul. Una pantalla LED estándar es suficiente para plantas de bajo requerimiento (Anubias, helecho de Java) y para acuarios sin plantas exigentes. La iluminación de alta intensidad tiene sentido cuando el objetivo es un acuario densamente plantado con especies de crecimiento rápido o colores vivos — pero subir la intensidad sin ajustar CO2 y nutrientes es un error habitual que no acelera las plantas, sino que favorece el crecimiento de algas. El RGB decorativo cubre un objetivo distinto y puramente estético, para resaltar el acuario por la noche, y no debería ser la única fuente de luz si hay plantas reales que mantener.',
      icon: 'lightbulb',
      types: [
        {
          slug: 'led',
          label: 'Pantallas LED',
          description: 'Espectro e intensidad reales que necesitan las plantas, no solo lúmenes en la caja.',
          icon: 'lightbulb',
          built: true
        },
        {
          slug: 'iluminacion-rgb',
          label: 'Iluminación RGB decorativa',
          description: 'Color programable para resaltar el acuario por la noche, sin ser la fuente principal de luz para las plantas.',
          icon: 'lightbulb',
          built: true
        },
        {
          slug: 'iluminacion-alta-intensidad',
          label: 'Iluminación de alta intensidad para plantado',
          description: 'El PAR real que exigen las plantas de crecimiento rápido, muy por encima de lo que da una pantalla básica.',
          icon: 'lightbulb',
          built: true
        }
      ]
    },
    {
      slug: 'temperatura',
      label: 'Temperatura',
      description: 'Calentadores, termómetros y controladores.',
      intro:
        'Un termómetro independiente sigue siendo necesario incluso si el calentador ya trae un dial propio — el dial del calentador indica a qué temperatura está regulado, no necesariamente la temperatura real del agua, y esa diferencia puede pasar desapercibida durante semanas sin un segundo punto de medición independiente. El calentador en sí debería elegirse por la potencia adecuada al volumen real del acuario, no por el precio más bajo: uno insuficiente para el volumen tarda demasiado en corregir caídas de temperatura, algo crítico en la mayoría de peces tropicales, sensibles a fluctuaciones bruscas. Un corte de luz prolongado en invierno es uno de los escenarios donde más rápido se puede perder toda una población de peces si no hay forma de detectar la caída de temperatura a tiempo — de ahí que un termómetro visible y fácil de comprobar de un vistazo valga más que uno decorativo escondido en una esquina del acuario.',
      icon: 'thermometer',
      types: [
        {
          slug: 'calentadores',
          label: 'Calentadores',
          description: 'Calentadores con termostato para mantener la temperatura estable.',
          icon: 'thermometer',
          built: true
        },
        {
          slug: 'termometros',
          label: 'Termómetros',
          description: 'Por qué conviene uno independiente aunque el calentador ya tenga dial propio.',
          icon: 'thermometer',
          built: true
        }
      ]
    },
    {
      slug: 'decoracion',
      label: 'Decoración',
      description: 'Rocas, troncos, cuevas, plantas, grava y decoración artificial.',
      intro:
        'No toda decoración es neutra para la química del agua, y ese es el primer filtro real antes de pensar en estética. Una roca de origen no verificado puede contener carbonatos que suben la dureza del agua de forma progresiva, y un tronco de madera sin preparar libera taninos que tiñen el agua de color té durante semanas — ninguno de los dos problemas es peligroso en sí, pero conviene saberlo antes de montarlo, no después. Las plantas naturales aportan un beneficio real de filtración biológica que ningún elemento artificial replica, a cambio de mantenimiento; las artificiales dan cero mantenimiento pero cero beneficio para el agua. Las cuevas y escondites no son un capricho decorativo: reducen el estrés incluso en peces que nadan a la vista la mayor parte del tiempo, con solo tener la opción disponible. La grava y el sustrato, por último, cambian más de lo que parece: el grosor decide si una planta con raíz puede agarrarse bien o si los restos de comida quedan atrapados sin que el sifón llegue a limpiarlos.',
      icon: 'leaf',
      types: [
        {
          slug: 'plantas',
          label: 'Plantas naturales y artificiales',
          description: 'Cuándo compensa el mantenimiento de una planta natural frente a una artificial.',
          icon: 'leaf',
          built: true
        },
        {
          slug: 'rocas',
          label: 'Rocas naturales y artificiales',
          description: 'Estructura y textura para crear escondites y delimitar zonas sin alterar la química del agua.',
          icon: 'rock',
          built: true
        },
        {
          slug: 'troncos',
          label: 'Troncos y raíces',
          description: 'Aportan taninos naturales y refugio, pero según la madera pueden oscurecer el agua si no se preparan antes.',
          icon: 'rock',
          built: true
        },
        {
          slug: 'cuevas-y-escondites',
          label: 'Cuevas y escondites',
          description: 'Refugio real para peces territoriales o estresados, y punto de puesta para especies que necesitan una zona oscura.',
          icon: 'cave',
          built: true
        },
        {
          slug: 'decoracion-artificial',
          label: 'Decoración artificial',
          description: 'Barcos, calaveras y castillos de resina: cero mantenimiento, sin ningún beneficio biológico para el agua.',
          icon: 'tag',
          built: true
        },
        {
          slug: 'grava-y-sustratos',
          label: 'Grava y sustratos decorativos',
          description: 'El color y el grosor del sustrato influyen en el aspecto del acuario y en qué plantas pueden enraizar bien.',
          icon: 'rock',
          built: true
        }
      ]
    },
    {
      slug: 'mantenimiento',
      label: 'Mantenimiento',
      description: 'Sifones, redes, limpiacristales y esterilizadores UV.',
      intro:
        'Sifonar la grava es el hábito de mantenimiento que más se salta, precisamente porque sus consecuencias no son inmediatas — los restos de comida y desechos se acumulan de forma gradual hasta que el problema ya lleva tiempo instalado, sin ningún síntoma visible previo. Las redes merecen más atención de la que reciben: una malla demasiado gruesa araña escamas y puede enganchar aletas largas, así que el grosor de la malla importa más que el tamaño de la red en sí. Los cepillos limpiacristales imantados resuelven el mantenimiento diario sin mojarse las manos, pero no llegan bien a las esquinas, donde sigue haciendo falta uno de mango largo. El esterilizador UV es el equipo que más se malinterpreta: no sustituye al filtro ni resuelve un acuario mal mantenido, pero ataca un problema muy concreto —agua verde recurrente por algas en suspensión— que ningún filtro convencional cubre por sí solo.',
      icon: 'filter',
      types: [
        {
          slug: 'sifones',
          label: 'Sifones y aspiradores',
          description: 'Por qué limpiar la grava sin cambiar agua de más es el hábito que más se olvida.',
          icon: 'filter',
          built: true
        },
        {
          slug: 'redes-y-pinzas',
          label: 'Redes y pinzas',
          description: 'Malla fina para no dañar aletas y pinzas largas para plantar o retirar restos sin meter la mano en el agua.',
          icon: 'filter',
          built: true
        },
        {
          slug: 'cepillos-limpiacristales',
          label: 'Cepillos limpiacristales',
          description: 'Imantados o de mango largo: cómo quitar las algas del cristal sin rayarlo ni remover el sustrato.',
          icon: 'filter',
          built: true
        },
        {
          slug: 'esterilizadores-uv',
          label: 'Esterilizadores UV',
          description: 'Reducen algas en suspensión y patógenos en el agua, un complemento al filtro, nunca un sustituto.',
          icon: 'lightbulb',
          built: true
        }
      ]
    },
    {
      slug: 'agua',
      label: 'Agua',
      description: 'Tests de pH, nitratos, amoníaco y acondicionadores.',
      intro:
        'Un kit de test de agua es probablemente la compra que más impacto real tiene en las primeras semanas de un acuario nuevo, y a la vez la que más se posterga por parecer poco vistosa comparada con la decoración. El ciclado del acuario —el proceso por el que las bacterias beneficiosas se establecen para procesar el amoniaco que generan los peces— no se puede verificar a simple vista, solo con un test que mida amoniaco, nitritos, nitratos y pH; meter peces antes de que ese ciclo esté completo es la causa más habitual de que un acuario nuevo fracase en el primer mes. El acondicionador de agua cubre un problema distinto y constante: neutralizar el cloro y las cloraminas del agua del grifo al instante, algo que simplemente dejar reposar el agua no garantiza siempre, sobre todo con cloraminas, más estables que el cloro simple. Ninguno de los dos sustituye al otro — el test diagnostica, el acondicionador corrige un problema conocido de origen.',
      icon: 'droplet',
      types: [
        {
          slug: 'tests-de-agua',
          label: 'Tests de agua',
          description: 'Kits para medir amoniaco, nitritos, nitratos y pH.',
          icon: 'droplet',
          built: true
        },
        {
          slug: 'acondicionadores',
          label: 'Acondicionadores',
          description: 'Neutralizan el cloro del grifo al instante, algo que reposar el agua sola no garantiza.',
          icon: 'droplet',
          built: true
        }
      ]
    },
    {
      slug: 'alimentacion-peces',
      label: 'Alimentación',
      description: 'Comida para peces tropicales, de fondo, herbívoros, alevines y gambas.',
      intro:
        'El formato de la comida decide si llega a donde el pez realmente se alimenta, más que la marca o el precio: las escamas flotan y sirven para peces de superficie, los gránulos se hunden más rápido para especies de media agua, y las pastillas van directas al fondo para peces como corydoras o plecos que rara vez suben a comer. Los peces herbívoros necesitan una base distinta —espirulina o alga en vez de proteína animal concentrada— porque su sistema digestivo, con un intestino más largo, no está preparado para procesar bien un exceso de proteína a largo plazo. La comida viva o congelada (artemia, dafnia, gusano de sangre) aporta un extra nutricional que ninguna comida seca iguala, especialmente valioso antes de la cría. Y los alevines recién nacidos necesitan partícula microscópica durante las primeras semanas, incapaces de tragar ni la escama más triturada de un adulto — es, con diferencia, la causa más común de que una puesta no sobreviva sus primeros días.',
      icon: 'bowl',
      types: [
        {
          slug: 'comida-peces',
          label: 'Comida para peces',
          description: 'Escamas, gránulos y pastillas: cuál se ajusta a cada especie y evita ensuciar el agua.',
          icon: 'bowl',
          built: true
        },
        {
          slug: 'comida-viva-y-congelada',
          label: 'Comida viva y congelada',
          description: 'Artemia, dafnia y gusano de sangre: el aporte nutricional que las escamas solas no cubren, sobre todo antes de la cría.',
          icon: 'bowl',
          built: true
        },
        {
          slug: 'alimento-herbivoros',
          label: 'Alimento para peces herbívoros',
          description: 'Base de espirulina y obleas de alga, pensado para especies que en su dieta natural comen sobre todo vegetal.',
          icon: 'leaf',
          built: true
        },
        {
          slug: 'alimento-alevines',
          label: 'Alimento para alevines',
          description: 'Partícula microscópica imprescindible en las primeras semanas, cuando un alevín no puede comer escamas de adulto.',
          icon: 'bowl',
          built: true
        }
      ]
    },
    {
      slug: 'gambas',
      label: 'Gambas',
      description: 'Acuarios, comida y minerales específicos para gambario.',
      intro:
        'Las gambas de acuario toleran mucho peor las fluctuaciones de parámetros que la mayoría de peces — un cambio que en un acuario comunitario sería una variación tolerable puede ser letal en un gambario, así que la estabilidad del agua pesa más aquí que en casi cualquier otro tipo de acuario. El cobre es el elemento a evitar por completo: presente en algunos medicamentos para peces y a veces en tuberías antiguas, resulta tóxico para las gambas en concentraciones que a un pez no le afectan en absoluto, de ahí que un alimento genérico no formulado específicamente para gambas sea un riesgo real como base diaria. El GH y el KH del agua explican buena parte de los problemas de muda: un GH demasiado bajo no aporta el calcio necesario para formar el nuevo caparazón, y una muda incompleta es de las causas más habituales de mortalidad en gambario con agua demasiado blanda. Usar agua de osmosis como base exige remineralizarla siempre antes de usarla, ya que sale prácticamente sin minerales.',
      icon: 'fish',
      types: [
        {
          slug: 'gambario',
          label: 'Equipo para gambario',
          description: 'Por qué las gambas necesitan parámetros de agua mucho más estables que los peces.',
          icon: 'fish',
          built: true
        },
        {
          slug: 'comida-para-gambas',
          label: 'Comida para gambas',
          description: 'Pastillas de bajo contenido en cobre y aporte extra de calcio, claves para la muda del caparazón.',
          icon: 'bowl',
          built: true
        },
        {
          slug: 'minerales-y-remineralizantes',
          label: 'Minerales y remineralizantes',
          description: 'Ajustan GH y KH del agua, los parámetros que más mudas fallidas explican en gambario.',
          icon: 'droplet',
          built: true
        }
      ]
    },
    {
      slug: 'betta',
      label: 'Betta',
      description: 'Acuarios, filtros y decoración pensados para Betta.',
      intro:
        'La imagen popular del Betta en un vaso pequeño sin filtro ni calentador está muy alejada de lo que la especie necesita realmente — tolera volúmenes más reducidos que otras especies, pero un acuario de al menos 10-20 litros con filtración y calentador da una calidad de vida y una estabilidad de parámetros muy superior al vaso tradicional. El filtro es el punto donde más se equivocan los principiantes con Betta: sus aletas largas dificultan nadar contra corrientes fuertes, así que el caudal importa más que la potencia del filtro, y uno de esponja o con caudal ajustable suele ser mejor elección que un filtro estándar de acuario comunitario. La decoración exige el mismo cuidado — cualquier borde afilado o rugoso puede rasgar sus aletas con el roce diario, así que conviene comprobar cada pieza con la mano antes de introducirla. Las plantas de hoja ancha, como Anubias, no son solo estética: le dan un punto de apoyo cerca de la superficie donde descansar entre sesiones de nado, un comportamiento natural de la especie.',
      icon: 'fish',
      types: [
        {
          slug: 'equipo-betta',
          label: 'Equipo para Betta',
          description: 'Corriente suave y espacio de superficie: lo que un kit genérico no siempre da.',
          icon: 'fish',
          built: true
        },
        {
          slug: 'filtros-caudal-suave',
          label: 'Filtros de caudal suave',
          description: 'Un Betta con aletas largas nada mal contra una corriente fuerte: por qué el caudal importa más que la potencia.',
          icon: 'filter',
          built: true
        },
        {
          slug: 'plantas-y-decoracion-betta',
          label: 'Plantas y decoración para Betta',
          description: 'Hojas anchas cerca de la superficie para que descanse, y ningún borde afilado que pueda rasgarle las aletas.',
          icon: 'leaf',
          built: true
        }
      ]
    },
    {
      slug: 'tortugas-acuaticas',
      label: 'Tortugas acuáticas',
      description: 'Acuaterrarios, plataformas y lámparas UV.',
      intro:
        'A pesar del nombre, ninguna tortuga acuática vive exclusivamente en el agua — necesita salir con regularidad a una zona seca para secar el caparazón y tomar luz UVB, dos elementos que un acuario de peces convencional no incluye por defecto. La plataforma o isla de descanso no es opcional ni decorativa: sin acceso fácil a una zona seca, aumenta el riesgo real de problemas de piel y caparazón a medio plazo, y una rampa de acceso demasiado empinada puede ser tan problemática como no tener plataforma en absoluto. La lámpara UVB es el elemento que más se subestima: sin ella, la tortuga no puede sintetizar vitamina D3 y no absorbe bien el calcio de la dieta, por buena que esta sea — y a diferencia de la luz visible, la emisión UVB se degrada con el uso mucho antes de que la lámpara "deje de funcionar" a simple vista, así que el recambio periódico importa tanto como la instalación inicial. La filtración, por último, necesita ser más potente de lo esperado: las tortugas generan bastante más residuo orgánico que la mayoría de peces de tamaño similar.',
      icon: 'turtle',
      types: [
        {
          slug: 'equipo-tortugas',
          label: 'Equipo para tortugas',
          description: 'Por qué una tortuga acuática necesita zona seca y luz UVB, no solo agua.',
          icon: 'turtle',
          built: true
        },
        {
          slug: 'plataformas-y-islas',
          label: 'Plataformas e islas de descanso',
          description: 'Zona seca de acceso fácil, imprescindible para que la tortuga pueda salir del agua y tomar el sol artificial.',
          icon: 'turtle',
          built: true
        },
        {
          slug: 'lamparas-uvb',
          label: 'Lámparas UVB',
          description: 'Sin luz UVB una tortuga acuática no sintetiza bien la vitamina D3, algo que ninguna luz decorativa normal sustituye.',
          icon: 'lightbulb',
          built: true
        }
      ]
    }
  ]
};

export function getCategory(animal: CategorizedAnimal, categoria: string): CategoryDef {
  return (
    CATEGORIES[animal].find((c) => c.slug === categoria) ?? CATEGORIES[animal][0]
  );
}

export function getType(animal: CategorizedAnimal, categoria: string, tipo: string): TypeDef {
  const cat = getCategory(animal, categoria);
  return cat.types.find((t) => t.slug === tipo) ?? cat.types[0];
}

/** Categorías con al menos un tipo construido — las únicas que se muestran
 * en navegación (evita enlaces a categorías vacías). */
export function builtCategories(animal: CategorizedAnimal): CategoryDef[] {
  return CATEGORIES[animal]
    .map((c) => ({ ...c, types: c.types.filter((t) => t.built) }))
    .filter((c) => c.types.length > 0);
}

export const ANIMALS: { slug: Animal; label: string; icon: IconName; description: string; intro: string }[] = [
  {
    slug: 'perros',
    label: 'Perros',
    icon: 'paw',
    description: 'Camas, arneses y juguetes puestos a prueba.',
    intro:
      'Organizamos todo lo que compra un dueño de perro en siete bloques: alimentación (pienso por edad y tamaño, comederos y bebederos), paseo (arneses, correas y GPS), juguetes, descanso (camas, mantas y transportines), higiene, viajes y coche, y tecnología. Dentro de cada bloque, la segmentación real no es por marca ni por precio, sino por lo que de verdad cambia según el perro: un pienso de cachorro no es intercambiable con uno de perro senior, un arnés antitirones resuelve un problema distinto al de uno pensado para el coche, y una cama viscoelástica no cumple la misma función que una simplemente económica para el día a día. Cada tipo de producto tiene su propia página con lo que hay que mirar antes de comprar — no una lista de características copiadas del fabricante, sino los factores que marcan la diferencia real entre una opción que funciona y otra que se queda sin usar a las pocas semanas. Si no sabes por dónde empezar, la alimentación y el descanso son los dos bloques con más impacto directo en el bienestar diario del perro, y buen punto de partida antes de mirar accesorios más específicos.'
  },
  {
    slug: 'gatos',
    label: 'Gatos',
    icon: 'cat',
    description: 'Rascadores, comederos y todo lo que de verdad usan.',
    intro:
      'Un gato tiene menos margen de error que un perro a la hora de aceptar un producto nuevo — un rascador, arenero o cama que no encaja con sus preferencias simplemente se queda sin usar, por bueno que parezca sobre el papel. Por eso organizamos todo en ocho bloques (alimentación, areneros, juguetes, rascadores, descanso, higiene, transporte y tecnología) y, dentro de cada uno, separamos por lo que realmente decide si un gato lo va a usar: un arenero cerrado no es mejor ni peor que uno abierto en abstracto, depende de si ese gato concreto tolera espacios reducidos; un rascador vertical de sisal cubre una necesidad distinta a una torre multinivel con hamaca. Cada tipo de producto tiene su propia guía con los factores que de verdad importan al elegir, no una lista genérica de características. Si tienes más de un gato en casa, presta especial atención a los bloques de areneros y rascadores — son los dos puntos donde más frecuentemente aparecen problemas de convivencia si no hay suficientes recursos repartidos por la casa.'
  },
  {
    slug: 'acuarios',
    label: 'Acuarios',
    icon: 'fish',
    description: 'Kits, filtración, temperatura y agua para empezar bien.',
    intro:
      'La acuariofilia tiene una curva de aprendizaje más exigente que la mayoría de mascotas de interior, porque el equilibrio del agua no se ve a simple vista hasta que ya ha fallado. Organizamos el contenido en once bloques — desde los kits para montar el primer acuario hasta especialidades como gambario, Betta o tortugas acuáticas, pasando por filtración, temperatura, iluminación, decoración, calidad del agua y alimentación de los peces. Si estás empezando, el orden de prioridad real no es el que sugiere la tienda: primero el volumen y el kit base, después la filtración correcta para ese volumen, y solo entonces la decoración y el resto de accesorios — montar un acuario bonito con una filtración insuficiente es la causa más común de que un acuario nuevo fracase en las primeras semanas. Cada bloque tiene sus propios tipos de producto con lo que hay que mirar antes de comprar, pensado para evitar justamente ese error de orden. Las especialidades (gambas, Betta, tortugas) tienen necesidades bastante distintas a un acuario comunitario estándar, así que si vas a montar uno de esos, empieza directamente por su bloque específico en vez de por la guía general.'
  },
  {
    slug: 'otras-mascotas',
    label: 'Otras mascotas',
    icon: 'rabbit',
    description: 'Conejos y roedores del hogar.',
    intro:
      'Conejos y roedores comparten pasillo en la mayoría de tiendas de animales, pero tienen necesidades de alojamiento bastante distintas entre sí — y distintas también dentro del propio grupo de roedores, donde un hámster, una cobaya y una rata no encajan en el mismo tipo de jaula pese a venderse muchas veces bajo la misma etiqueta genérica de "jaula para roedores". El error más habitual al empezar es fijarse solo en el tamaño o el precio de la jaula sin tener en cuenta el comportamiento real de la especie concreta: un hámster necesita profundidad para cavar, una cobaya necesita superficie horizontal y compañía, y un conejo necesita bastante más espacio del que cabe en una jaula estándar de tienda. Cada una de las dos secciones tiene su propia guía con lo que de verdad importa a la hora de elegir jaula, corral y accesorios según la especie.'
  }
];

// Marcas — sistema independiente de las categorías/tipos. Vacío a
// propósito: no se inventan marcas para los 36 productos de ejemplo
// actuales (serían datos falsos). Rellénalo con las marcas reales de tus
// productos según los vayas añadiendo; `marca` en cada producto ya se
// muestra y se puede filtrar aunque esta lista esté vacía.
export const BRANDS: { slug: string; name: string }[] = [];

export const NAV = [
  { label: 'Perros', href: '/perros/' },
  { label: 'Gatos', href: '/gatos/' },
  { label: 'Acuarios', href: '/acuarios/' },
  { label: 'Otras mascotas', href: '/otras-mascotas/' },
  { label: 'Blog', href: '/blog/' }
];
