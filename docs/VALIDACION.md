# Comprobación de la entrega

Fecha de verificación: **25 de octubre de 2026**.

## Preparación para compartir en GitHub — 29 de octubre de 2026

- Se volvió a ejecutar `npm run build`: compilación de producción correcta.
- `docker compose -f compose.yaml config --quiet` y `docker compose -f compose.ubuntu.yaml config --quiet` terminaron correctamente.
- La variante Ubuntu acepta `LAB_BIND_IP` para reutilizar el proyecto en otra VM, usando `127.0.0.1` como valor predeterminado para la copia pública.
- Se incluyeron instrucciones para clonar, editar y arrancar con Docker. Se excluyeron dependencias instaladas, compilaciones y archivos `.env` personales.
- En esta revisión no se volvió a arrancar un contenedor: Docker Desktop estaba apagado. Las pruebas de ejecución de la instalación original se conservan abajo con su fecha.

## Resultados comprobados

| Prueba | Resultado observado |
| --- | --- |
| Instalación con `npm ci` | Dependencias instaladas desde el archivo de bloqueo |
| `npm run build` | Compilación de producción completada sin errores |
| Biblioteca | La búsqueda “seguridad” devuelve una guía |
| Filtro de documentos | Tecnología muestra dos recursos |
| Lectura y descarga | La guía de seguridad abre en una ventana y se descarga como TXT con su contenido |
| Favoritos | Se guardan, permanecen al recargar y pueden quitarse |
| Lista vacía | Se muestra un mensaje y un botón para restablecer los filtros |
| Comunicados | El filtro de Tecnología y la lectura del artículo funcionan |
| Búsqueda global | “bienvenida” devuelve dos resultados; “seguridad” devuelve dos resultados |
| Directorio | Filtrar Tecnología muestra una sola área; su enlace lleva al departamento correspondiente |
| Copiar contacto | Se muestra la confirmación de copia de la dirección de ejemplo |
| Ventanas de lectura | Se cierran con Escape o con el botón de cierre |
| Navegación móvil | El menú abre, permite navegar y se cierra al seleccionar una página |
| Preguntas frecuentes | Se abre la respuesta sobre Keycloak y aclara que la integración está pendiente |
| Adaptación a 390 px | Las siete secciones no presentan desbordamiento horizontal |
| Vista de escritorio | Inicio revisado a 1440 px de ancho |
| Docker Compose | Imagen construida y contenedor `banco-reforma-intranet` en ejecución |
| Salud del contenedor | Estado `healthy`; `/health` responde `ok` |
| Nginx | `nginx -t` correcto |
| Rutas de producción | `/documentos` abre y se puede recargar directamente |
| Cabeceras | Se verificaron `X-Frame-Options: DENY` y Content Security Policy |
| Navegador en producción | Sin errores ni advertencias en la consola durante el recorrido comprobado |

No se evaluaron SSO, APIs, bases de datos ni permisos de servidor: no forman parte de esta implementación estática. Las comprobaciones anteriores no constituyen una auditoría de seguridad.

## Capturas de la aplicación real

- [Inicio en escritorio](evidencias/inicio-escritorio.png).
- [Inicio en pantalla pequeña](evidencias/inicio-celular.png).

## Direcciones locales

- Desarrollo editable: **http://127.0.0.1:5173**.
- Contenedor Nginx: **http://127.0.0.1:8095**.

Para cambiar contenido, modifica `src/data/content.js`. Vite lo actualiza automáticamente; el contenedor requiere `docker compose up -d --build`.
