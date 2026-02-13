# GPMF Website – Estado actual y próximos pasos

## Resumen ejecutivo
- **Objetivo principal:** internacionalización completa (ES/EN/DE/FR) usando un único HTML por página con `data-i18n` + `translations` en `js/main.js`.
- **Progreso:** Home (`index.html`), About, Aliados & Equipo y Contacto ya usan el header global, el menú móvil, el selector de idioma y la lógica de traducciones.
- **Nuevas páginas / assets recientes:**
  - `data-ai.html`: landing IA con el mismo header/nav y botón flotante de WhatsApp.
  - `template-service.html`: plantilla modular para futuros servicios (hero → problemas → metodología → planes → casos → equipo → CTA) ya alineada al header global y con CTA/WhatsApp coherentes.
  - `business-development.html`: versión final del servicio *Expansión & Soluciones Sectoriales* (copy completo, métricas, metodología, planes y casos) lista para enlazarse desde cualquier sección de servicios.
  - `capabilities_EN.html`: Capabilities Statement 2026 en inglés con diseño profesional para export PDF, selector de idiomas y branding corporativo.

## Estructura actual del proyecto
| Página | Propósito | Header/Footers homogéneos | `data-i18n` aplicado | `js/main.js` incluido |
| --- | --- | --- | --- | --- |
| `index.html` | Home | ✅ | ✅ (hero, servicios, why, testimonial, CTA) | ✅ |
| `about.html` | La Firma | ✅ | ✅ (hero, team, vision) | ✅ |
| `aliados-equipo.html` | Aliados & Equipo | ✅ | ✅ | ✅ |
| `contact.html` | Contacto + formulario | ✅ | ✅ (sidebar + form + placeholders) | ✅ |
| `internationalization.html` | Servicio Internacionalización | ✅ (header/nav global + link IA) | ❌ (solo textos fijos) | ❌ |
| `data-governance.html` | Servicio Datos & IA | ✅ (header/nav global + link IA) | ❌ | ❌ |
| `data-ai.html` | Landing IA específica | ✅ (ya enlazada en dropdown) | ❌ (textos aún sin `data-i18n`) | ❌ |
| `template-service.html` | Plantilla reutilizable | ✅ | ❌ (texto base para reemplazar) | ✅ |
| `business-development.html` | Servicio Expansión & Soluciones Sectoriales | ✅ (incluye CTA y botones actualizados) | ❌ (solo nav usa `data-i18n`) | ✅ |
| `capabilities_EN.html` | Capabilities Statement 2026 (EN) | ✅ (diseño profesional propio) | ✅ (selector ES/EN/DE/FR) | ✅ (funcionalidad propia) |

> ⚠️ `internationalization.html` y `data-governance.html` ya usan el header global con el dropdown completo, pero aún no tienen `data-i18n` en el contenido ni cargan `js/main.js`, por lo que el selector de idioma todavía no afecta el cuerpo de la página.

## Documentos Corporativos
- **`capabilities_EN.html`**: Capabilities Statement 2026 en inglés con:
  - Diseño profesional optimizado para export PDF
  - Selector de idiomas funcional (ES/EN/DE/FR)
  - Branding corporativo consistente
  - Estructura completa: hero, servicios, equipo, casos de éxito, contacto
  - Versión móvil responsive
  - Sistema de traducción propio integrado

## Internacionalización
- **`js/main.js`** contiene `translations` para ES/EN/DE/FR, incluyendo navegación (`nav.*`), Home, About, Aliados y Contacto. También se añadió la clave `nav.ai` para la nueva landing de IA.
- **Faltante:** Añadir claves para:
  1. Todo el contenido de `data-ai.html` (problemas, metodología, planes, casos, equipo, CTA, footer).
  2. Contenidos de `template-service.html` cuando se use para un servicio real.
  3. Textos de `internationalization.html` y `data-governance.html` una vez que se etiqueten.

## Header / Footer
- **Header**: Todas las páginas listadas comparten la misma estructura (logo + nav + dropdown servicios con “IA & Analítica” y “Expansión & Soluciones Sectoriales” + selector de idioma + menú móvil). En los servicios viejos aún falta cargar `js/main.js` para que el selector tenga efecto.
- **Footer**: `index` y páginas nuevas todavía emplean variantes distintas (home usa footer oscuro minimalista, otras el footer claro con logo/links). Decidir un patrón único en la próxima sesión.
- **WhatsApp flotante**: Ahora `landing` y `template` usan el mismo botón con ícono Font Awesome. Revisar `index`, `contact`, etc., para reemplazar SVGs antiguos si se busca uniformidad total.

## Pendientes clave
1. **Homologar header/footer en todas las páginas**
   - Actualizar `internationalization.html` y `data-governance.html` para usar el header global y el dropdown con “IA & Analítica”.
   - Unificar el footer (decidir versión clara u oscura).

2. **Cobertura i18n total**
   - Etiquetar todo el contenido visible en las páginas de servicios (`internationalization`, `data-governance`, `landing`, futuras basadas en `template-service`).
   - Añadir las claves correspondientes en `js/main.js` (ES/EN/DE/FR) y cargar el script en cada página para que `changeLanguage` funcione.

3. **Documentar placeholders del template**
   - Cuando se cree un nuevo servicio, reemplazar `FORM_URL`/`WHATSAPP_LINK`, títulos y bullets, y generar las traducciones antes de publicar.

4. **QA general**
   - Validar `localStorage` + `changeLanguage` en todas las páginas una vez que se incluya `js/main.js`.
   - Probar menú móvil y CTA en responsive (especialmente en la landing).

## Recomendaciones para la próxima sesión
- Comenzar por migrar `internationalization.html` al header global (copiar desde `template-service`), agregar `data-i18n` y extender `translations` con sus textos.
- Repetir la misma operación para `data-governance.html`.
- Si se requiere otra versión del servicio de Expansión, reutilizar `business-development.html` como blueprint (hero basado en resultados reales, dolores, metodología 4 etapas, planes y casos) y generar las traducciones correspondientes.
- Definir un footer único (oscuro vs. claro) y replicarlo en todas las páginas.
- Finalmente, abordar la traducción completa de `data-ai.html` usando la tabla de secciones del template para mantener consistencia.
- **Actualizar capabilities statement**: Considerar crear versión en español (`capabilities_ES.html`) basada en la estructura de `capabilities_EN.html` para mantener consistencia en documentos corporativos.

Con este README el equipo podrá retomar rápidamente qué se ha logrado y qué falta para cerrar la internacionalización completa del sitio.
