# GPMF Web Legacy (v1.0) & Special Projects Hub

Repositorio de resguardo para la versión estática original de GPMF y landing pages de proyectos especiales.

## 📌 Estado del Activo
- **Modo:** Mantenimiento / Archivo Estático.
- **Hosting:** GitHub Pages (`https://globalpartnerships.github.io/...`).
- **Uso:** Alojamiento de casos de estudio independientes y portafolios estáticos de visualización rápida.

## ⚠️ Reglas de Edición
- No realizar cambios estructurales de marca sin previa validación con el repositorio central (`gpmf-data-gral`).

---

## 🗺️ Matriz de Asignación y Estado de Activos

Para entender cómo encaja este repositorio en el ecosistema digital de GPMF, aquí está la matriz oficial de activos:

| Activo | Ubicación Técnica | Propósito | Enlace Recomendado |
|---|---|---|---|
| **GPMF Core 2.0** | Vercel (Next.js 16) | Vitrina institucional B2B y 4 idiomas. | Dominio principal (`gpmf.com`). |
| **GPMF Histórica (v1.0)** | GitHub Pages (*Este repositorio*) | Resguardo de memoria y hub para proyectos digitales que requieren publicarse online. | Enlace estático de respaldo. |
| **Casa Normandía** | Repositorio GitHub Independiente | Caso de éxito en optimización y automatización. | Mapeo vía Rewrite (`/casos/casa-normandia`). |

---

## 📁 Estructura y Uso

Actualmente, este repositorio tiene dos funciones críticas:

### 1. Hub de Proyectos Especiales (`Publicar/`)
La carpeta `Publicar/` se utiliza para desplegar documentos estáticos o landing pages independientes que no encajan en la estructura rígida de Vercel. 
- **Ejemplo:** Propuestas comerciales, kits logísticos (ej. `local_kit_logistic_hub_26.html`).
- Cualquier archivo HTML subido a esta carpeta estará disponible inmediatamente a través de GitHub Pages para compartir con clientes.

### 2. Enrutador de Enlaces Antiguos (`404.html`)
Dado que se eliminaron todas las páginas redundantes de la antigua web 1.0, el repositorio utiliza un archivo `404.html` inteligente. 
Si un cliente hace clic en un enlace viejo (ej. `tusitio.com/about.html`), el archivo 404 lo captura y lo redirige automáticamente a la nueva plataforma en Vercel.

---

> [!NOTE]
> Para detalles técnicos sobre cómo agregar nuevos proyectos especiales o modificar las reglas de redirección, consulta el archivo [`ARCHITECTURE.md`](ARCHITECTURE.md).
El Lugar Principal (La "Casa Matriz" de la Información)
📍 En la raíz del repositorio privado gpmf-data-gral:

Archivo: README.md (o 01_estrategia_y_core/01_ARQUITECTURA_REPOSITORIOS.md).