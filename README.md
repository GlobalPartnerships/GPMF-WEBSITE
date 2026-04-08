# GPMF Website - Estado y Roadmap 2026

> **Última actualización:** 28 de marzo de 2026
> **Versión:** 3.0 (Active Development)

## 🎯 Resumen Ejecutivo

**Estado actual:** Sitio web corporativo con navegación centralizada en servicios, menús consistentes y múltiples documentos corporativos.

**Arquitectura principal:** Hub centralizado de servicios (`!Servicios Central.html`) que distribuye la navegación a 4 servicios principales con menús dropdown consistentes en todas las páginas.

**Idiomas:** Implementación parcial (ES/EN/DE/FR) con `data-i18n` en páginas principales y sistema propio en documentos corporativos.

**Objetivo estratégico:** Posicionamiento internacional B2B de alto nivel con SEO impecable en Europa y Norteamérica.

---

## � Sobre GPMF

### ¿Quiénes Somos?
Global Partnerships & Multidisciplinary Firm (GPMF) es una consultora boutique especializada en expansión internacional y transformación digital para empresas PYME y corporaciones.

### Servicios Principales
- **Internacionalización:** Expansión a Europa y Latam con enfoque intercultural
- **Transformación Digital:** IA y analítica aplicada a negocios
- **Gestión Intercultural:** Liderazgo y equipos multiculturales
- **Desarrollo de Negocios:** Alianzas estratégicas sectoriales

### Mercados y Presencia
- **Principal focus:** América Latina ↔ Europa
- **Especialización:** Agro-Tech, Bioeconomía, Construcción 4.0
- **Capacidades:** Trilingüe nativo (ES/EN/DE) + Francés

### Diferenciadores Clave
- **Red global real:** Contactos validados en todos los mercados
- **Enfoque boutique:** Atención directa de socias senior
- **ADN multidisciplinario:** Ingeniería + Negocios + Diplomacia

---

## 🏗️ Arquitectura de Negocio GPMF (Fractional C-Level)

### ICP (Ideal Customer Profile)
**Empresas "Frontera"** en sectores Agro, Real Estate, HealthTech, EdTech
- **Facturación:** $1M-$10M USD
- **Tamaño:** 20-150 empleados
- **Características:** Tienen flujo de caja pero caos operativo o fricción intercultural

### Menú de Servicios (4 Líneas)
1. **Internacionalización B2B** - Expansión y softlanding
2. **Transformación Digital/Data** - IA y analítica aplicada
3. **Formación Intercultural** - Equipos y liderazgo multicultural
4. **Fondos/Grants Sectoriales** - Financiación y cofinanciación

### Modelo de Ventas "Land & Expand" (3 Tiers)

#### Tier 1 (El Gancho / Fase 0)
- **Diagnóstico rápido:** $1k-$3k USD
- **Características:** Baja fricción, aprobación rápida

#### Tier 2 (La Implementación)
- **Proyectos/Softlanding:** $5k-$15k USD
- **Características:** Proyectos específicos de expansión

#### Tier 3 (La Recurrencia)
- **Servicios Directivos Fraccionados:** CXO as-a-Service
- **Precio:** $1.5k-$3k/mes
- **Beneficio:** MRR para estabilidad financiera

---

## �🎨 Identidad de Marca

### Logo y Nomenclatura
- **Nombre oficial:** Global Partnerships & Multidisciplinary Firm (GPMF)
- **Logo:** Assets/GPMF LOGO white.png (versión principal)
- **Uso:** Siempre con espacio adecuado y fondo contrastante

### Colores Corporativos
- **Burgundy:** #7A0F32 (color primario)
- **Charcoal:** #2E2E2E (textos)
- **Warm Gray:** #F5F5F5 (fondos)
- **Black:** #000000 (acentos)

### Tipografía
- **Primaria:** Inter (sans-serif) - textos body
- **Secundaria:** Playfair Display (serif) - headers destacados

### Tono de Voz
- **Profesional pero accesible**
- **Especializado sin jerga excesiva**
- **Orientado a resultados**
- **Trilingüe nativo (ES/EN/DE)**

### Valores de Marca
- **Excelencia técnica** - rigurosidad metodológica
- **Agilidad boutique** - atención directa senior
- **Visión global** - ADN multicultural

---

## 🚀 Cambios Recientes (Última Sesión)

Se ha realizado una actualización integral de contenidos, estructura e internacionalización en varias páginas clave:

### 1. Aliados & Equipo (`aliados-equipo.html`) ✅
- **Limpieza de Contenido:** Eliminada la sección duplicada "Core Team".
- **Internacionalización Completa:** Implementado soporte para ES/EN/DE/FR en:
  - Header & Footer.
  - Sección "Red de Especialistas" (8 perfiles).
  - Sección "Firmas Asociadas" (4 firmas).
  - Sección "CTA / Colaboración Extendida".
- **Traducciones:** Generadas y agregadas a `js/main.js`.

### 2. Servicios Central (`!Servicios Central.html`) ✅
- **Hero Update:** Actualizado título ("Soluciones de Expansión & Eficiencia"), kicker y descripción.
- **I18n:** Traducciones sincronizadas en `js/main.js`.

### 3. La Firma (`about.html`) ✅
- **Contenido Hero:** Nueva sección "ADN Multidisciplinario" con textos actualizados.
- **Footer:** (Realizado por usuario) Implementación de año dinámico con JavaScript.
- **I18n:** Traducciones actualizadas.

### 4. Home (`index.html`) ✅
- **Ajustes Visuales:** Corrección de espaciado vertical en Hero y Servicios para evitar huecos grandes al hacer zoom out (responsive).
- **Consistencia:** Actualización de título de enlace "Gestión Intercultural e Interdisciplinaria".

---

## 🏗️ Arquitectura Actual del Sitio

### Páginas Principales (Core Website)
| Página | Propósito | Estado | Menú Servicios | Multi-idioma |
|---|---|---|---|---|
| `index.html` | Home principal | ✅ Completo | ✅ Dropdown actualizado | ✅ `data-i18n` |
| `about.html` | La Firma | ✅ Completo | ✅ Dropdown actualizado | ✅ `data-i18n` |
| `aliados-equipo.html` | Aliados & Equipo | ✅ Completo | ✅ Dropdown actualizado | ✅ `data-i18n` |

### Páginas de Servicios (Individuales)
| Página | Servicio | Estado | Menú Dropdown | Multi-idioma |
|---|---|---|---|
| `internationalization.html` | Internacionalización y Alianzas | ✅ Activa | ✅ Consistente | ❌ Solo navegación |
| `data-ai.html` | Transformación Digital & Cultura de Datos | ✅ Activa | ✅ Consistente | ❌ Solo navegación |
| `Intercultural.html` | Gestión Intercultural | ✅ Activa | ✅ Consistente | ❌ Solo navegación |
| `business-development.html` | Expansión & Soluciones Sectoriales | ✅ Activa | ✅ Consistente | ⚠️ Parcial |

### Hub Central de Servicios
| Página | Servicio | Estado | Menú Dropdown | Multi-idioma |
|---|---|---|---|
| `!Servicios Central.html` | **Hub central de servicios** | ✅ **Activo** | ✅ 4 servicios principales | ✅ `data-i18n` |

### Documentos Corporativos
| Página | Propósito | Estado | Características |
|---|---|---|---|
| `capabilities_EN.html` | Capabilities Statement 2026 (EN) | ✅ Activo | ✅ PDF export, multi-idioma propio |
| `Capabilities GPMF.html` | Capabilities Statement (ES) | ✅ Activo | ✅ Versión español |
| `template-service.html` | Plantilla para nuevos servicios | ✅ Lista | ✅ Estructura modular |

### Estructura Técnica
- **Frontend:** HTML5, Tailwind CSS (CDN), JavaScript Vanilla
- **Internacionalización:** Sistema `data-i18n` con js/main.js
- **Alojamiento:** GitHub Pages (estático)
- **Componentes:** Header global, footer dinámico, menú dropdown

---

## 📋 Estado de Internacionalización (I18n)

El objetivo es tener `data-i18n` en todos los textos y claves en `main.js`.

| Página | Estado I18n | SEO Status | Prioridad | Notas |
|---|---|---|---|---|
| `index.html` | ✅ Completado | ⚠️ Requiere migración | Alta | Necesita HTML estático |
| `about.html` | ✅ Completado | ⚠️ Requiere migración | Alta | Necesita HTML estático |
| `aliados-equipo.html` | ✅ Completado | ⚠️ Requiere migración | Alta | Necesita HTML estático |
| `!Servicios Central.html` | ✅ Completado | ⚠️ Requiere migración | Alta | Necesita HTML estático |
| `contact.html` | ✅ Completado | ⚠️ Requiere migración | Alta | Necesita HTML estático |
| `data-ai.html` | ⚠️ Parcial | ❌ Pendiente migración | Media | Completar i18n primero |
| `internationalization.html` | ❌ Pendiente | ❌ Pendiente migración | Alta | Prioridad alta |
| `Intercultural.html` | ❌ Pendiente | ❌ Pendiente migración | Alta | Prioridad alta |
| `business-development.html` | ⚠️ Parcial | ❌ Pendiente migración | Media | Revisar cobertura |
| `diagnostico.html` | ❌ Pendiente | ❌ Pendiente migración | Baja | Revisar necesidad |

---

## 🌐 Estrategia SEO Internacional (CRÍTICO 2026)

### Contexto Crítico
El actual sistema de internacionalización con JavaScript (`data-i18n`) **no es SEO-friendly**. Google y otros crawlers no indexan correctamente el contenido traducido, afectando el posicionamiento internacional de GPMF.

### Problemas del Sistema Actual
- ❌ Googlebot ve contenido vacío/inicial (marcadores `data-i18n`)
- ❌ Sin URLs específicas por idioma
- ❌ Sin `hreflang` tags estáticos
- ❌ WhatsApp/LinkedIn no ejecutan JavaScript para traducciones

### Solución: Arquitectura SEO World-Class
**Implementar subcarpetas con HTML estático:**
```
/                    (español - principal)
/en/                (inglés)
/de/                (alemán)  
/fr/                (francés)
```

### Roadmap Migración SEO

#### Fase 1: Completar I18n Actual (Q1 2026) - PRIORIDAD INMEDIATA
- **Tareas pendientes:**
  - `internationalization.html`: Agregar `data-i18n` a todo el contenido
  - `Intercultural.html`: Mismo proceso completo
  - `business-development.html`: Validar y completar traducciones
  - `data-ai.html`: Etiquetar textos faltantes
- **Objetivo:** Tener todo el contenido listo para migración

#### Fase 2: Migración SEO (Q2 2026) - **CRÍTICO**
1. **Crear estructura de carpetas** `/en/`, `/de/`, `/fr/`
2. **Generar HTML estático** por idioma (reemplazar `data-i18n` con texto fijo)
3. **Implementar hreflang tags** estáticos en cada página
4. **Configurar URLs canónicas** por idioma
5. **Crear sitemap.xml** multilingüe
6. **Actualizar robots.txt** para nueva estructura

#### Fase 3: Optimización Avanzada (Q3 2026)
- Schema markup multilingüe
- Meta descripciones específicas por idioma/página
- Open Graph tags localizados

### Impacto Esperado
- ✅ **Posicionamiento internacional** en búsquedas nativas
- ✅ **Visibilidad completa** en WhatsApp, LinkedIn, etc.
- ✅ **Autoridad de dominio** sin duplicación de contenido
- ✅ **Imagen profesional** de firma global

### Tiempo Estimado
- **Fase 1:** 8-10 horas (completar traducciones)
- **Fase 2:** 15-20 horas (migración completa)
- **Fase 3:** 6-8 horas (optimización avanzada)

---

## 📅 Plan de Acción 2026

### Q1 2026 (Inmediato - Marzo 2026)
- [ ] **Footer dinámico** en todas las páginas (1 hora)
- [ ] **Completar i18n:** `internationalization.html` (2-3 horas)
- [ ] **Completar i18n:** `Intercultural.html` (2-3 horas)
- [ ] **Validar i18n:** `business-development.html` (1-2 horas)
- [ ] **Validar i18n:** `data-ai.html` (1-2 horas)
- [ ] **QA final y limpieza** general (2-3 horas)

### Q2 2026 (Crítico - Abril-Junio 2026)
- [ ] **MIGRACIÓN SEO:** Crear estructura `/en/`, `/de/`, `/fr/` (2 horas)
- [ ] **MIGRACIÓN SEO:** Generar HTML estático por idioma (8-10 horas)
- [ ] **MIGRACIÓN SEO:** Implementar hreflang tags estáticos (3-4 horas)
- [ ] **MIGRACIÓN SEO:** Configurar URLs canónicas (2 horas)
- [ ] **MIGRACIÓN SEO:** Crear sitemap.xml multilingüe (1 hora)
- [ ] **MIGRACIÓN SEO:** Actualizar robots.txt (1 hora)
- [ ] **Optimización performance** (Core Web Vitals) (5-8 horas)
- [ ] **Implementar analytics y tracking** (3-5 horas)

### Q3 2026 (Julio-Septiembre 2026)
- [ ] **Añadir casos de éxito** por servicio (4-6 horas)
- [ ] **Rediseño footer unificado** (3-4 horas)
- [ ] **Testing accesibilidad** WCAG (2-3 horas)
- [ ] **Implementar búsqueda** en sitio (4-5 horas)

### Q4 2026 (Octubre-Diciembre 2026)
- [ ] **Optimización conversión** (4-6 horas)
- [ ] **Implementar A/B testing** (6-8 horas)
- [ ] **Preparar versión 2027** (2-3 horas)
- [ ] **Auditoría de seguridad** (3-4 horas)

---

## 🛠️ Guía de Desarrollo

### Para Crear Nuevo Servicio
1. **Copiar template:** Usar `template-service.html` como base
2. **Actualizar contenido:** Reemplazar placeholders con contenido real
3. **Configurar navegación:** Añadir a menú dropdown del Hub Central
4. **Actualizar menús:** Modificar todas las páginas para incluir nuevo servicio
5. **Agregar traducciones:** Extender `js/main.js` con nuevos textos
6. **Testing:** Validar en desktop, móvil y todos los idiomas

### Para Modificar Servicios Existentes
1. **Editar página principal:** Modificar contenido en archivo HTML
2. **Actualizar traducciones:** Añadir/modificar claves en `js/main.js`
3. **Validar consistencia:** Revisar navegación y estilos
4. **Testing cross-device:** Validar responsive design

### Sistema de Traducciones
- **Archivos:** `js/main.js`
- **Idiomas:** ES (base), EN, DE, FR
- **Método:** `data-i18n` attributes + JavaScript
- **Estructura:** `translations[idioma]["clave"] = "texto traducido"`

### Mantenimiento
- Actualizar este README con cada cambio importante
- Mantener consistencia en navegación y estilos
- Validar en mobile y desktop después de cambios
- Documentar decisiones técnicas importantes

---

## 📊 Métricas y KPIs

### SEO Internacional
- **Posicionamiento:** Búsquedas nativas (ES/EN/DE/FR)
- **Tráfico orgánico:** Por idioma y página
- **Indexabilidad:** Todas las páginas indexadas correctamente
- **Hreflang:** Implementación validada

### Performance
- **Core Web Vitals:** LCP < 2.5s, FID < 100ms, CLS < 0.1
- **Tiempo de carga:** < 3s por página
- **Mobile-friendly:** Score > 90
- **PageSpeed Insights:** Verde en todas las métricas

### Conversión
- **Formularios:** Tasa de completado > 5%
- **Sesiones de diagnóstico:** Agendadas por mes
- **Tasa conversión:** Por idioma y página
- **Calidad leads:** B2B high-ticket vs general

### Usabilidad
- **Mobile:** Tiempo en página > 2 minutos
- **Desktop:** Tasa de rebote < 60%
- **Navegación:** Clicks a servicios > 30%
- **Internacional:** Uso multi-idioma > 15%

---

## 📞 Contacto y Soporte

**Responsables:**
- **Desarrollo:** Equipo GPMF
- **Contenido:** Marcela Sánchez & Adriana Halleux
- **Estrategia SEO:** Consultoría externa (si aplica)

**Comunicación:**
- **Actualizaciones:** Este README
- **Urgencias:** Canal directo del equipo
- **Documentación:** Repositorio GitHub
- **Versionado:** Git tags por releases importantes

---

## 🗺️ Roadmap Técnico: Arquitectura SEO Multilingüe (Próxima Implementación)

**Decisión Arquitectónica:** Se descarta el uso de parámetros de URL (`?lang=en`) y traducción dinámica vía JavaScript (DOM manipulation) para las páginas públicas. Para garantizar un posicionamiento SEO "World-Class" en mercados internacionales, el sitio migrará a una **arquitectura de subcarpetas físicas estáticas**.

**Estructura Física a Implementar:**
* `/` (Raíz) -> Versión en Español (Default para LatAm/España)
* `/en/` -> Versión en Inglés (Global default)
* `/de/` -> Versión en Alemán
* `/fr/` -> Versión en Francés

**Reglas de SEO a aplicar:**
1. Cada archivo físico tendrá sus propias etiquetas `<title>`, `<meta description>` y `<link rel="hreflang">` hardcodeadas en el HTML.
2. Se creará un `sitemap.xml` y un `robots.txt` que apunten a estas subcarpetas.

**⚠️ EXCEPCIÓN ESTRATÉGICA: Embudo de Lead Qualification (Diagnóstico)**
* La herramienta de diagnóstico (`diagnostico.html`) **SOLO** existirá en Español (`/diagnostico.html`) e Inglés (`/en/diagnostic.html`).
* **Razón de negocio:** Alineación estricta con las capacidades operativas del equipo directivo y el sistema de automatización de ventas (GAS/n8n) para el cierre de leads B2B.
* **UX/UI Requirement:** En las versiones del sitio en Alemán y Francés, los botones de "Agendar Diagnóstico" apuntarán a la versión en Inglés (`/en/diagnostic.html`) y deberán incluir un indicador visual (ej: "EN") para gestionar la expectativa del usuario antes del clic. Las etiquetas `hreflang` del diagnóstico solo mapearán a "es", "en" y "x-default".

---

**Nota Estratégica:** Esta migración SEO es FUNDAMENTAL para el crecimiento internacional de GPMF. Sin ella, el sitio no competirá efectivamente en búsquedas B2B en Europa y Norteamérica. La inversión en Q2 2026 es crítica para el éxito a largo plazo.

---

*Última actualización: 28 de marzo de 2026*  
*Próxima revisión: 15 de abril de 2026*  
*Versión: 3.0 - Active Development*
