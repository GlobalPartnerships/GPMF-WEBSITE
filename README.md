# GPMF Website – Estado actual y próximos pasos

## Resumen ejecutivo
- **Objetivo principal:** internacionalización completa (ES/EN/DE/FR) usando un único HTML por página con `data-i18n` + `translations` en `js/main.js`.
- **Progreso:** Home (`index.html`), About, Aliados & Equipo y Contacto ya usan el header global, el menú móvil, el selector de idioma y la lógica de traducciones.
- **Nuevas páginas:**
  - `landing_GEN_IA_consultora_boutique.html`: landing IA con el mismo header/nav y botón flotante de WhatsApp.
  - `template-service.html`: plantilla modular para futuros servicios (hero → problemas → metodología → planes → casos → equipo → CTA) ya alineada al header global y con CTA/WhatsApp coherentes.

## Estructura actual del proyecto
| Página | Propósito | Header/Footers homogéneos | `data-i18n` aplicado | `js/main.js` incluido |
| --- | --- | --- | --- | --- |
| `index.html` | Home | ✅ | ✅ (hero, servicios, why, testimonial, CTA) | ✅ |
| `about.html` | La Firma | ✅ | ✅ (hero, team, vision) | ✅ |
| `aliados-equipo.html` | Aliados & Equipo | ✅ | ✅ | ✅ |
| `contact.html` | Contacto + formulario | ✅ | ✅ (sidebar + form + placeholders) | ✅ |
| `internationalization.html` | Servicio Internacionalización | ⚠️ (header viejo, sin link IA) | ❌ (solo textos fijos) | ❌ |
| `data-governance.html` | Servicio Datos & IA | ⚠️ (header viejo, sin link IA) | ❌ | ❌ |
| `landing_GEN_IA_consultora_boutique.html` | Landing IA específica | ✅ (ya enlazada en dropdown) | ❌ (textos aún sin `data-i18n`) | ❌ |
| `template-service.html` | Plantilla reutilizable | ✅ | ❌ (texto base para reemplazar) | ✅ |

> ⚠️ `internationalization.html` y `data-governance.html` siguen con el header anterior, no usan `nav.ai` ni cargan `js/main.js`, por lo que todavía no responden al selector de idioma.

## Internacionalización
- **`js/main.js`** contiene `translations` para ES/EN/DE/FR, incluyendo navegación (`nav.*`), Home, About, Aliados y Contacto. También se añadió la clave `nav.ai` para la nueva landing de IA.
- **Faltante:** Añadir claves para:
  1. Todo el contenido de `landing_GEN_IA_consultora_boutique.html` (problemas, metodología, planes, casos, equipo, CTA, footer).
  2. Contenidos de `template-service.html` cuando se use para un servicio real.
  3. Textos de `internationalization.html` y `data-governance.html` una vez que se etiqueten.

## Header / Footer
- **Header**: `index`, `about`, `aliados`, `contact`, `landing`, `template` ya comparten la misma estructura (logo + nav + dropdown servicios + selector de idioma + menú móvil). Falta replicarlo en `internationalization` y `data-governance`.
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
- Definir un footer único (oscuro vs. claro) y replicarlo en todas las páginas.
- Finalmente, abordar la traducción completa de `landing_GEN_IA_consultora_boutique.html` usando la tabla de secciones del template para mantener consistencia.

Con este README el equipo podrá retomar rápidamente qué se ha logrado y qué falta para cerrar la internacionalización completa del sitio.
