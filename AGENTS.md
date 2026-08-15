# Reglas Generales de Desarrollo para Antigravity

Estas son instrucciones críticas que el agente debe leer y seguir **SIEMPRE** antes de realizar cualquier cambio o proponer soluciones en este repositorio.

## 1. Verificación de Rutas y Enlaces (Links & Paths)
- **NUNCA** asumas la ruta de los recursos (imágenes, hojas de estilo, scripts).
- **SIEMPRE** verifica la existencia real de un archivo usando los comandos del sistema o herramientas de búsqueda antes de enlazarlo en el código.
- **REFERENCIA CRUZADA**: Si vas a implementar un elemento que ya existe en otra parte del sitio (ej. headers, footers, logos), revisa primero los archivos principales como `index.html` para confirmar exactamente qué ruta o clase se está usando en el entorno de producción que ya funciona.
- **NO INVENTES RUTAS**: Evita crear rutas temporales o subcarpetas lógicas (como `assets/img/` o `assets/Bogotá/`) sin antes comprobar mediante `list_dir` o `run_command` (con comandos de shell/PowerShell) dónde están ubicados realmente los archivos.

## 2. Consistencia de Diseño (Headers, Footers, Estilos)
- Antes de insertar un header, footer o cualquier componente visual en una página nueva, debes asegurarte de que cumpla con el estándar del proyecto.
- Revisa siempre si el archivo destino utiliza `TailwindCSS` o estilos nativos (`style`), y adapta el código en consecuencia para no romper la tipografía o los márgenes globales de la página (`Tailwind Preflight` suele resetear estilos si no se maneja adecuadamente).

## 3. Revisión Antes de Actuar
- Entiende el contexto del archivo antes de sobreescribir contenido.
- Haz preguntas al usuario solo cuando el contexto o la ambigüedad te impidan avanzar, pero asegúrate de proponer soluciones con la información disponible.
- Una vez finalizada una tarea, haz una auto-revisión rápida para asegurarte de que no dejaste enlaces rotos o sintaxis incorrecta.

## 4. Estándar Global de Footer
- **SIEMPRE** que crees o modifiques el footer de una página, debe incluir el logo blanco, el nombre completo "Global Partnerships Multidisciplinary Firm", las ciudades, el copyright con el año dinámico, y los íconos de LinkedIn y GitHub alineados a la derecha.
- Asegúrate de que los íconos de FontAwesome estén disponibles en el `<head>` si vas a añadir el footer.
- **Estructura Exacta a Utilizar**:
```html
    <footer class="bg-black text-white py-12 border-t border-gray-900">
        <div class="max-w-7xl mx-auto px-6">
            <div class="flex flex-col md:flex-row justify-between items-center gap-6">
                <div class="flex items-center gap-8">
                    <img src="Assets/GPMF LOGO white.png" alt="GPMF Logo" class="h-8 w-auto">
                    <div class="text-xs">
                        <p class="font-medium text-white">Global Partnerships Multidisciplinary Firm</p>
                        <p class="text-gray-400">Bogotá • Clermont-Ferrand • Montreal</p>
                    </div>
                </div>
                <div class="flex items-center gap-6">
                    <p class="text-xs text-gray-500">© 2019 - <span id='year'></span> GPMF Consultoría S.A.S. Todos los derechos reservados.</p>
                    <div class="flex gap-4">
                        <a href="https://www.linkedin.com/company/gpmf" class="text-gray-600 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-linkedin text-lg"></i></a>
                        <a href="https://github.com/GlobalPartnerships" class="text-gray-600 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-github text-lg"></i></a>
                    </div>
                </div>
            </div>
        </div>
    </footer>
    <!-- En el body, asegúrate de tener este script: -->
    <!-- <script>document.getElementById('year').textContent = new Date().getFullYear();</script> -->
```
Nota: Ajusta la ruta de `Assets/` dependiendo del nivel de directorios (ej: `../assets/` o `../Assets/`).
