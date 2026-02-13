# GPMF Website v3.0 - Estado Actual y Roadmap 2026

## 🎯 Resumen Ejecutivo

**Estado actual:** Sitio web corporativo con navegación centralizada en servicios, menús consistentes y múltiples documentos corporativos.

**Arquitectura principal:** Hub centralizado de servicios (`!Servicios Central.html`) que distribuye la navegación a 4 servicios principales con menús dropdown consistentes en todas las páginas.

**Idiomas:** Implementación parcial (ES/EN/DE/FR) con `data-i18n` en páginas principales y sistema propio en documentos corporativos.

---

## 🏗️ Arquitectura Actual del Sitio

### Páginas Principales (Core Website)
| Página | Propósito | Estado | Menú Servicios | Multi-idioma |
|---|---|---|---|---|
| `index.html` | Home principal | ✅ Completo | ✅ Dropdown actualizado | ✅ `data-i18n` |
| `about.html` | La Firma | ✅ Completo | ✅ Dropdown actualizado | ✅ `data-i18n` |
| `aliados-equipo.html` | Aliados & Equipo | ✅ Completo | ✅ Dropdown actualizado | ✅ `data-i18n` |
| `contact.html` | Contacto + formulario | ✅ Completo | ✅ Dropdown actualizado | ✅ `data-i18n` |

### Hub Central de Servicios
| Página | Propósito | Estado | Servicios Mapeados |
|---|---|---|---|
| `!Servicios Central.html` | **Hub central de servicios** | ✅ **Activo** | ✅ 4 servicios principales |

### Páginas de Servicios (Individuales)
| Página | Servicio | Estado | Menú Dropdown | Multi-idioma |
|---|---|---|---|
| `internationalization.html` | Internacionalización y Alianzas | ✅ Activa | ✅ Consistente | ❌ Solo navegación |
| `data-ai.html` | Transformación Digital & Cultura de Datos | ✅ Activa | ✅ Consistente | ❌ Solo navegación |
| `Intercultural.html` | Gestión Intercultural e Interdisciplinaria | ✅ Activa | ✅ Consistente | ❌ Solo navegación |
| `business-development.html` | Desarrollo de Negocios | ✅ Activa | ✅ Consistente | ❌ Solo navegación |

### Documentos Corporativos
| Página | Propósito | Estado | Características |
|---|---|---|---|
| `capabilities_EN.html` | Capabilities Statement 2026 (EN) | ✅ Activo | ✅ PDF export, multi-idioma propio |
| `Capabilities GPMF.html` | Capabilities Statement (ES) | ✅ Activo | ✅ Versión español |
| `template-service.html` | Plantilla para nuevos servicios | ✅ Lista | ✅ Estructura modular |

### Proyectos Especiales
| Página | Propósito | Estado |
|---|---|---|
| `casa-normandia/` | Proyecto inmobiliario independiente | ✅ Activo |
| `Orden_Servicio_GPMF_Optasalud_FINAL_FIRMABLE.html` | Orden de servicio específica | ✅ Activo |

---

## 🔄 Sistema de Navegación Centralizado

### Mapeo de Servicios (Actualizado)
```
!Servicios Central.html (Hub)
├── Internacionalización y Alianzas → internationalization.html
├── Transformación Digital & Cultura de Datos → data-ai.html
├── Gestión Intercultural e Interdisciplinaria → Intercultural.html
└── Desarrollo de Negocios → business-development.html
```

### Consistencia de Menús
- ✅ **Desktop dropdown**: Todas las páginas usan la misma estructura
- ✅ **Mobile menu**: Panel desplegable consistente
- ✅ **Estilos CSS**: Clases uniformes (`rounded-md`, `hover:bg-gray-50`)
- ✅ **Enlaces**: Todos apuntan a las URLs correctas

---

## 🌐 Internacionalización

### Estado Actual
- **Páginas con `data-i18n` completo**: index.html, about.html, aliados-equipo.html, contact.html
- **Páginas con solo navegación traducida**: Todos los servicios individuales
- **Documentos corporativos**: Sistema propio de traducción (capabilities statements)

### Archivo de Traducciones
- **Ubicación**: `js/main.js`
- **Idiomas**: ES (base), EN, DE, FR
- **Cobertura**: Navegación completa, contenido parcial

---

## 📁 Assets y Recursos

### Imágenes Actualizadas
- ✅ `Assets/logo.png` - Logo principal
- ✅ `Assets/IMG_0664.jpg` - Foto taller (convertida de HEIC)
- ✅ `Assets/marceperfil.jpg` - Perfil Marcela
- ✅ `Assets/Jorge.jpg` - Perfil Jorge
- ✅ Múltiples imágenes de equipo y proyectos

### Estilos y Frameworks
- ✅ Tailwind CSS configurado con colores corporativos
- ✅ Font Awesome para iconos
- ✅ Google Fonts (Inter, Playfair Display, Urbanist)

---

## ⚠️ Issues y Pendientes Críticos

### Alta Prioridad
1. **Completar internacionalización de servicios**
   - Agregar `data-i18n` al contenido de las 4 páginas de servicios
   - Extender `translations` en `js/main.js` con todos los textos
   - Cargar `js/main.js` en páginas de servicios

2. **Unificar sistemas de traducción**
   - Decidir entre sistema `data-i18n` vs. sistema propio
   - Estandarizar approach en todos los documentos

3. **Optimización móvil**
   - Testing completo de menús dropdown en móviles
   - Validar responsive en todos los dispositivos

### Media Prioridad
4. **Contenido de servicios**
   - Completar casos de éxito en todas las páginas
   - Añadir testimonials específicos por servicio
   - Optimizar SEO por página

5. **Documentación técnica**
   - Crear guía de desarrollo para nuevos servicios
   - Documentar sistema de traducciones
   - Crear checklist de QA

### Baja Prioridad
6. **Proyectos especiales**
   - Casa Normandía: Proyecto inmobiliario independiente con branding GPMF
   - Órdenes de servicio: Documentos específicos para clientes
   - Mantener como proyectos separados del sitio principal

---

## 🚀 Roadmap 2026

### Q1 2026 (Ene-Mar)
- [ ] Completar internacionalización de servicios (4 páginas)
- [ ] Unificar sistema de traducciones
- [ ] Testing móvil completo
- [ ] Optimización SEO básica

### Q2 2026 (Abr-Jun)
- [ ] Añadir casos de éxito por servicio
- [ ] Implementar analytics y tracking
- [ ] Mejoras de performance (Core Web Vitals)
- [ ] Documentación técnica completa

### Q3 2026 (Jul-Sep)
- [ ] Rediseño de footer unificado
- [ ] Implementar búsqueda en sitio
- [ ] Añadir blog/resources section
- [ ] Testing de accesibilidad (WCAG)

### Q4 2026 (Oct-Dic)
- [ ] Optimización para conversión
- [ ] Implementar A/B testing
- [ ] Preparar versión 2027
- [ ] Auditoría de seguridad

---

## 🛠️ Guía de Desarrollo

### Para Crear Nuevo Servicio
1. **Copiar template**: Usar `template-service.html` como base
2. **Actualizar contenido**: Reemplazar placeholders con contenido real
3. **Configurar navegación**: Añadir a menú dropdown del Hub Central
4. **Actualizar menús**: Modificar todas las páginas para incluir nuevo servicio
5. **Agregar traducciones**: Extender `js/main.js` con nuevos textos
6. **Testing**: Validar en desktop, móvil y todos los idiomas

### Para Modificar Servicios Existentes
1. **Editar página principal**: Modificar contenido en archivo HTML
2. **Actualizar traducciones**: Modificar `js/main.js` si afecta textos traducibles
3. **Verificar consistencia**: Asegurar que cambios no rompan navegación
4. **Testing completo**: Probar en todos los navegadores y dispositivos

---

## 📊 Métricas y KPIs

### Actuales
- **Páginas totales**: 24 (incluyendo proyectos especiales)
- **Servicios principales**: 4
- **Idiomas configurados**: 4 (ES/EN/DE/FR)
- **Consistencia de navegación**: 100% en páginas principales

### Objetivos 2026
- **Internacionalización completa**: 100% de contenido traducido
- **Performance**: <3s load time en móvil
- **SEO**: Primer página en búsquedas brand
- **Accesibilidad**: WCAG 2.1 AA compliance

---

## 📞 Contacto y Soporte

### Para Desarrolladores
- **Documentación técnica**: Ver sección "Guía de Desarrollo"
- **Issues**: Reportar en sistema de seguimiento del proyecto
- **Code review**: Seguir estándares del código existente

### Para Contenido
- **Actualizaciones de servicios**: Coordinar con equipo de contenido
- **Traducciones**: Validar con hablantes nativos
- **Casos de éxito**: Seguir template establecido

---

## 📝 Notas de Versión

### v3.1 (Feb 13, 2026) - Visual Identity & Consistency
- ✅ **Estandarización de Colores**: Implementación rigurosa de paleta corporativa (Burgundy, Black, Charcoal, Warmgray) en `internationalization.html`, eliminando gradientes no corporativos.
- ✅ **Sincronización de Tarjetas**: Las tarjetas de servicios en `index.html` ahora replican el estilo visual (colores y temas) del Hub `!Servicios Central.html` para mayor coherencia.
- ✅ **Corrección de Enlaces**: Actualización de enlaces rotos en `!Servicios Central.html` (apuntando correctamente a `data-ai.html`).
- ✅ **Refinamiento de UI**: Ajustes de contraste y legibilidad en tarjetas de servicios, con temas específicos:
    - Internacionalización: Burgundy
    - Transformación Digital: Black
    - Gestión Intercultural: Charcoal
    - Expansión: Warmgray

### v3.0 (Feb 2026)
- ✅ Hub central de servicios implementado
- ✅ Menús consistentes en todas las páginas
- ✅ Navegación unificada
- ✅ Documentos corporativos actualizados
- ✅ Assets organizados
- ✅ Casa Normandía documentada como proyecto independiente

### v2.0 (2025)
- ✅ Sistema `data-i18n` implementado
- ✅ Menú móvil funcional
- ✅ Selector de idiomas
- ✅ Header global unificado

### v1.0 (2024)
- ✅ Estructura base del sitio
- ✅ Páginas principales funcionales
- ✅ Diseño responsive inicial

---

**Nota importante:** Casa Normandía es un proyecto inmobiliario independiente que utiliza el branding y estructura técnica de GPMF, pero no está integrado al sitio principal de la consultora. Funciona como un sitio autónomo de hospedaje boutique.

**Última actualización:** Febrero 2026  
**Próxima revisión:** Marzo 2026  
**Responsable:** Equipo de Desarrollo GPMF

*Este documento refleja el estado actual del proyecto y sirve como guía para el desarrollo futuro.*
