# Cómo explicar tu parte del proyecto

## Presentación breve

“Mi parte del proyecto es la intranet informativa de Banco La Reforma. La desarrollé con React y Vite en Visual Studio Code, en mi computadora física. Centraliza información institucional, comunicados, guías y el directorio de las cinco áreas del banco. El diseño se adapta al tamaño de la pantalla y permite localizar información con un buscador.

En esta etapa, el contenido es estático y está organizado en un archivo de datos. No usamos información de clientes ni realizamos transacciones. La aplicación está preparada para publicarse con Docker y Nginx. El equipo integrará después la autenticación con Keycloak y los demás servicios.”

## Recorrido de demostración (5 minutos)

1. **Inicio:** muestra el menú, la información central y los accesos rápidos.
2. **Nuestro banco:** explica la organización ficticia, la sede y la necesidad de centralizar información.
3. **Comunicados:** filtra por Tecnología y abre un comunicado.
4. **Documentos:** busca “seguridad”, previsualiza la guía, descarga el TXT y guárdalo en favoritos. Explica que los favoritos están en este navegador.
5. **Directorio:** filtra Tecnología y muestra los perfiles. Aclara que los contactos son de ejemplo.
6. **Búsqueda global:** escribe “bienvenida” y abre un resultado.
7. **Ayuda:** muestra las preguntas frecuentes y explica que el envío real de tickets pertenece a otra aplicación.
8. **Código:** abre `src/data/content.js`, modifica un título y guarda para mostrar la actualización automática.
9. **Docker:** muestra `docker compose ps` y la dirección local `http://127.0.0.1:8095`, si ejecutaste el contenedor.

## Respuestas cortas

**¿Qué es React?** Es la biblioteca que usamos para construir la interfaz mediante componentes reutilizables.

**¿Qué es Vite?** Es la herramienta que inicia el servidor de desarrollo y construye los archivos para publicarlos.

**¿Dónde están los datos?** En `src/data/content.js`. No hay una base de datos ni una API en esta etapa.

**¿Para qué sirve Docker?** Para empaquetar el portal y su servidor Nginx en una imagen que podamos ejecutar de forma consistente en el laboratorio.

**¿Nginx ejecuta React?** Nginx entrega los archivos HTML, CSS y JavaScript ya construidos. React se ejecuta en el navegador del usuario.

**¿Ya tiene SSO?** No. Keycloak se integrará después con un cliente OpenID Connect y un flujo apropiado para una aplicación web. No mostramos un inicio de sesión simulado.

**¿Cómo se protegerán los datos?** Con autenticación y autorización en los servicios del servidor, además de HTTPS y controles de red. El portal estático no proporciona por sí solo esa protección.

**¿Por qué los documentos son TXT?** Para que la demostración tenga descargas reales de contenido propio sin presentar archivos inexistentes. Después pueden reemplazarse por documentos institucionales aprobados.

**¿Dónde están los permisos de Gerencia o Recursos Humanos?** Se describen las áreas en el portal, pero los permisos reales están pendientes de la integración del directorio, Keycloak y el backend.

**¿Necesita Internet para navegar?** Una vez instaladas las dependencias y levantado el servidor, el portal no requiere servicios externos para mostrar el contenido. La instalación inicial y la construcción de imágenes sí requieren descargas.
