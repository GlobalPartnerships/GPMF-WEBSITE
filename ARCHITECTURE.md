# Arquitectura GPMF Histórica (v1.0) & Proyectos Especiales

Este documento define las reglas técnicas y el funcionamiento de la carpeta `GPMF-WEBSITE-CLEAN` (GPMF Web Legacy), tras su transición de ser la web principal a convertirse en un repositorio de archivo y hub de publicación secundaria.

## 1. El Redireccionador Legacy (`404.html`)

Para asegurar la continuidad SEO y evitar enlaces rotos de la antigua web, este repositorio utiliza un mecanismo de redirección de "Catch-All" a través de GitHub Pages.

### ¿Cómo funciona?
1. Se han eliminado las más de 20 páginas `.html` de la versión antigua.
2. Si un usuario intenta acceder a `tusitio.github.io/about.html`, el servidor lanzará un error 404 por archivo no encontrado.
3. GitHub Pages captura este error y muestra el archivo `404.html` personalizado que creamos.
4. El script dentro de `404.html` identifica la ruta solicitada (`/about.html`), busca en su diccionario interno y redirige inmediatamente al usuario a `https://globalpartnerships.vercel.app/es/...`.

### ¿Cómo actualizar el diccionario de redirecciones?
Si en el futuro se crea una nueva página en Vercel que deba mapearse con una página vieja específica, simplemente abre `404.html` y añade el par clave-valor en el objeto `redirects`:

```javascript
var redirects = {
    '/contact.html': '/es/contact',
    '/nueva-pagina-vieja.html': '/es/nueva-ruta-vercel'
};
```

## 2. Hub de Proyectos Especiales (`Publicar/`)

El principal uso activo de este repositorio es alojar proyectos digitales que necesitan un enlace público pero que, por razones técnicas o de negocio, no deben mezclarse con el código fuente de Next.js en Vercel.

### Flujo de Publicación
Cualquier archivo depositado dentro de la carpeta `/Publicar` estará automáticamente disponible bajo el dominio de GitHub Pages del proyecto. 

- **Archivos Independientes:** Subir archivos únicos como `local_kit_logistic_hub_26.html`. Se accederá mediante `[dominio-github]/Publicar/local_kit_logistic_hub_26.html`.
- **Mini-Sitios:** Para publicar un mini-sitio con múltiples archivos (CSS, JS, Imágenes), crea una subcarpeta dentro de `/Publicar` (ej. `/Publicar/Proyecto-X/index.html`).

### Gestión de Assets (Imágenes y Estilos)
- **Regla de Aislamiento:** Los proyectos en `/Publicar` deben utilizar de preferencia CDN's externos para CSS/JS (ej. Tailwind via CDN) para evitar depender de los archivos de la raíz.
- **Imágenes:** Si un proyecto especial requiere imágenes pesadas, deben guardarse en la misma subcarpeta del proyecto (ej. `/Publicar/Proyecto-X/img/`) en lugar de sobrecargar la carpeta global `Assets/`, manteniéndolo completamente modular.

## 3. Archivos Conservados en la Raíz
Únicamente se conservan en la raíz aquellos archivos `.html` que actúan como landing pages estáticas críticas y que no deben pasar por el sistema de redirección del `404.html`:
- `index.html`
- `DACH.html`
- `diagnostico.html`
