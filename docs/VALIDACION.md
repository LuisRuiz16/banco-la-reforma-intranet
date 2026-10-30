# Comprobación de la entrega

## Keycloak configurable y mensaje del día — 30 de octubre de 2026

- `npm test`: **32 pruebas correctas** de configuración, sesión, permisos, API e interfaz. Se usan adaptadores y respuestas de prueba; no son accesos a los servicios reales del equipo.
- Se comprobó que EMPLEADO puede leer sin editor y ADMIN puede editar, cancelar y guardar el contenido confirmado por la API.
- Las pruebas verifican PKCE/login obligatorio, una única inicialización de Keycloak, actualización del token, retiro de roles, sesión vencida, 401/403/5xx, formato inválido, validación de texto y cancelación de peticiones.
- La escritura envía únicamente `content` y bearer; nunca envía el autor o la fecha como datos editables. El token no se guarda en almacenamiento del navegador.
- `npm run build`: compilación de producción correcta y generación de CSP con orígenes configurables.
- Las dos variantes Compose pasan `config --quiet`.
- Se validó la sintaxis de la configuración Nginx generada con orígenes HTTPS de ejemplo usando el ejecutable Nginx local de Windows, dentro de una configuración de prueba con rutas temporales y puerto local. No sustituye la prueba de la imagen Linux.
- La vista informativa compilada abre en el navegador y muestra el nuevo bloque “Mensaje del día”, sin errores de consola. Sin conexión real configurada se muestra como pendiente y no permite editar.
- Docker Desktop está apagado: en esta revisión no se construyó ni se ejecutó la nueva imagen del contenedor.
- **Pendiente:** probar el login/SSO, CORS, validación de tokens y persistencia compartida con Keycloak y API reales. Faltan URL, realm y contrato definitivo del compañero. Ver [INTEGRACIONES.md](INTEGRACIONES.md).

Las comprobaciones históricas de la primera versión se conservan abajo con sus fechas.

## Verificación inicial — 25 de octubre de 2026

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

En la verificación inicial del 25 de octubre no se evaluaron SSO, APIs, bases de datos ni permisos de servidor. El avance posterior y sus límites se describen al inicio de este documento. Las comprobaciones no constituyen una auditoría de seguridad.

## Capturas de la aplicación real

- [Inicio en escritorio](evidencias/inicio-escritorio.png).
- [Inicio en pantalla pequeña](evidencias/inicio-celular.png).

## Direcciones locales

- Desarrollo editable: **http://127.0.0.1:5173**.
- Contenedor Nginx: **http://127.0.0.1:8095**.

Para cambiar contenido, modifica `src/data/content.js`. Vite lo actualiza automáticamente; el contenedor requiere `docker compose up -d --build`.
