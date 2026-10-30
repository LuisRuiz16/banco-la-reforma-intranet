# Integración con el proyecto final

## Arquitectura de esta entrega

```text
Navegador del colaborador
          |
          | HTTP local (HTTPS en la publicación final)
          v
       Nginx
          |
          v
Archivos estáticos de React
          |
          +-- Contenidos compilados desde src/data/content.js
          +-- Favoritos en localStorage del navegador
```

El servidor de desarrollo Vite sustituye a Nginx mientras editas el proyecto. Windows 10 puede acceder mediante navegador; Ubuntu puede alojar el contenedor. Esta entrega no cambia la red, el directorio ni las máquinas virtuales existentes.

## Información que debes pedir al equipo

| Integración         | Datos necesarios                                                  |
| ------------------- | ----------------------------------------------------------------- |
| DNS interno         | Nombre definitivo de la intranet e IP del servidor o proxy        |
| HTTPS               | Certificado y autoridad que confiarán los equipos del laboratorio |
| Keycloak            | URL, realm, client ID, URI de retorno y roles acordados           |
| Mesa de servicios   | URL real y forma de compartir el inicio de sesión                 |
| API, si se requiere | Rutas, métodos, formatos de respuesta y validación de tokens      |

## Keycloak: trabajo pendiente

La propuesta de integración es usar OpenID Connect para la aplicación del navegador, mediante Authorization Code con PKCE, y un cliente público sin secretos incluidos en React. Hay que acordar las URI de retorno exactas, los orígenes y el cierre de sesión. Debe implementarse con la documentación de la versión de Keycloak que utilice el equipo.

Los tokens y los permisos deben validarse en cada API o servicio protegido. El servidor de contenido estático seguirá siendo accesible salvo que se implemente protección adicional en el proxy. Mostrar u ocultar secciones en React no basta para proteger documentos.

No se incluyeron SDKs de autenticación, credenciales, pantallas de login simuladas ni tokens de prueba. No se afirma que exista SSO hasta que se implemente y se pruebe con las aplicaciones reales.

## Mesa de servicios

Ya existe un punto de configuración público: `VITE_HELPDESK_URL`. Sirve para enlazar la aplicación del equipo desde Ayuda. No crea tickets, no llama una API y no implementa SSO por sí mismo.

## Contenido futuro

Para usar una API, sustituye la lectura de las listas de `content.js` por solicitudes autenticadas a los endpoints acordados. Añade estados de carga, error y ausencia de datos. Define responsables de publicación y versiones antes de tratar documentos como oficiales.

## Antes de una demostración conjunta

- Comprueba que los equipos resuelven el DNS interno.
- Abre la intranet desde otra VM y recarga una ruta interna.
- Verifica HTTPS y el certificado del laboratorio.
- Comprueba que Keycloak identifica correctamente al usuario, si ya está integrado.
- Prueba permisos en el servidor usando perfiles distintos, si se implementaron.
- Usa siempre datos ficticios del laboratorio.
