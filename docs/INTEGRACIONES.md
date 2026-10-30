# Conectar Keycloak y el mensaje del día

El frontend está preparado. Faltan las direcciones y la configuración reales del equipo para verificar el flujo completo. No se incluye ni se sustituye la API del compañero.

## Datos que deben acordar

| Dato                                            | Variable                                          |
| ----------------------------------------------- | ------------------------------------------------- |
| URL base de Keycloak, sin /realms/...           | VITE_KEYCLOAK_URL                                 |
| Realm                                           | VITE_KEYCLOAK_REALM                               |
| Cliente público de la intranet                  | VITE_KEYCLOAK_CLIENT_ID=intranet                  |
| Origen de roles                                 | VITE_KEYCLOAK_ROLE_SOURCE=client o realm          |
| Cliente donde están los roles, si se usa client | VITE_KEYCLOAK_ROLE_CLIENT_ID=intranet             |
| URL completa de consulta                        | VITE_MESSAGE_READ_URL                             |
| URL completa de actualización                   | VITE_MESSAGE_WRITE_URL (vacía reutiliza consulta) |
| Método de actualización                         | VITE_MESSAGE_WRITE_METHOD=PUT o PATCH             |

Los roles distinguen mayúsculas: ADMIN y EMPLEADO. No se mezclan roles del realm con los del cliente, ni se acepta ADMIN de la mesa de servicios. Una cuenta sin los roles acordados recibe “Acceso no asignado”.

## 1. Configurar el frontend

Copia `.env.example` a `.env`. **Estos dominios y rutas son ilustrativos**; reemplázalos con los del compañero:

```dotenv
VITE_AUTH_ENABLED=true
VITE_KEYCLOAK_URL=https://auth.example
VITE_KEYCLOAK_REALM=banco-reforma
VITE_KEYCLOAK_CLIENT_ID=intranet
VITE_KEYCLOAK_ROLE_SOURCE=client
VITE_KEYCLOAK_ROLE_CLIENT_ID=intranet
VITE_MESSAGE_READ_URL=https://api.example/api/daily-message
VITE_MESSAGE_WRITE_URL=https://api.example/api/daily-message
VITE_MESSAGE_WRITE_METHOD=PUT
```

No pongas contraseñas, secretos ni tokens en variables VITE_: se publican en JavaScript. La SPA utiliza un cliente público. Los tokens permanecen en memoria, sin guardarse en localStorage ni sessionStorage. Keycloak administra sus cookies y el estado temporal del intercambio OIDC.

HTTP solo se admite en localhost para desarrollo. Para otras VMs, usa HTTPS confiable: PKCE necesita un contexto seguro. No desactives PKCE para compensar la falta de HTTPS. Docker entrega HTTP al proxy que termina TLS. Este código no instala el proxy ni certificados.

Las rutas relativas /api/... requieren un proxy real en ese mismo origen. El Nginx incluido **no redirige /api a un backend**; sirve el portal. Si no hay proxy, usa la URL HTTPS completa de la API.

Reinicia Vite o reconstruye Docker al cambiar .env:

```bash
docker compose up -d --build
# En Ubuntu, en lugar del comando anterior:
sudo docker compose -f compose.ubuntu.yaml up -d --build
```

La construcción genera la CSP de Nginx con los orígenes exactos de los servicios; no añade comodines. Cambiar variables al iniciar una imagen ya construida no cambia el JavaScript ni la CSP.

## 2. Configurar Keycloak

En el realm acordado, el cliente OpenID Connect necesita:

- Client ID intranet (o el valor acordado).
- Client authentication **Off**: cliente público sin secreto en React.
- Standard flow **On**: Authorization Code con PKCE S256.
- Valid redirect URIs restringidas al portal, por ejemplo `https://intranet.example/*`. En desarrollo: `http://127.0.0.1:5173/*`. Registrar solo las direcciones utilizadas.
- Web Origins con el origen exacto, por ejemplo `https://intranet.example`.
- Valid post logout redirect URIs con la raíz del portal, por ejemplo `https://intranet.example/`.
- Mapeadores que incluyan `resource_access.intranet.roles` en el access token, o `realm_access.roles` si se acordó realm.
- Un usuario ADMIN, otro EMPLEADO y otro sin roles para probar el acceso.
- Audience mapper para que el token tenga la audiencia que espera la API.

La aplicación ejecuta login-required. Renueva el token antes de cada petición y al vencer. Si falla, cierra el acceso local y pide iniciar sesión de nuevo. La comprobación periódica por iframe está desactivada; un cierre desde otra aplicación se detecta al renovar, no necesariamente al instante.

Referencia: [adaptador JavaScript oficial de Keycloak](https://www.keycloak.org/securing-apps/javascript-adapter).

## 3. Contrato propuesto para la API

**Pendiente de confirmar con el backend.** Rutas y método de actualización son configurables. Los formatos esperados son los siguientes.

### GET /api/daily-message

Token válido con ADMIN o EMPLEADO. Cabeceras Authorization: Bearer <access_token> y Accept: application/json.

Respuesta 200 con objeto directo, sin envoltorio data:

```json
{
  "id": 1,
  "content": "Bienvenidos a la intranet del Banco La Reforma.",
  "updated_by": 7,
  "updated_at": "2026-10-30T06:00:00Z"
}
```

id debe ser numérico, content texto plano y updated_at fecha ISO 8601 con zona horaria o null. updated_by puede enviarse; el frontend no lo modifica ni necesita mostrarlo. Si no hay mensaje, devolver 204. Un 404 se trata como error de ruta/recurso.

### PUT /api/daily-message (o PATCH acordado)

Solo ADMIN. Cabeceras Authorization: Bearer <access_token> y Content-Type: application/json.

```json
{ "content": "El viernes tendremos una capacitación institucional." }
```

- Texto de 1 a 2000 caracteres después de quitar espacios al inicio/final. Validarlo también en servidor.
- Devolver 200 con el objeto actualizado, o 204. Tras un 204, el frontend vuelve a consultar para confirmar lo guardado.
- Actualizar **un único mensaje vigente**, sin historial. El backend garantiza este comportamiento y resuelve la primera publicación si aún no existe fila.
- Obtener el autor del token y generar updated_at en servidor; no confiar en autor/rol/fecha enviados por el navegador.
- Si updated_by referencia users(id) numérico, mapear el sub de Keycloak al usuario interno; sub no es necesariamente BIGINT.
- 401: token no aceptado. 403: sin permiso. 400/422: texto inválido. 5xx: error de servicio. El frontend no anuncia éxito ante esas respuestas.
- Si dos administradores guardan simultáneamente, este contrato usa el último guardado aceptado; no implementa control de versiones.

### Seguridad y CORS

La API debe validar firma, emisor, audiencia, caducidad y roles en **cada** lectura/escritura. No basta con decodificar JWT. Una petición de actualización directa con token EMPLEADO debe responder 403.

CORS debe permitir únicamente el origen real de la intranet, métodos GET/PUT (o PATCH)/OPTIONS y cabeceras Authorization/Content-Type. El preflight OPTIONS se atiende sin bearer; la operación real sí lo exige. Se envían tokens, no cookies de API. Las rutas deben responder directamente, sin redirecciones. Usar Cache-Control: no-store.

## 4. Prueba conjunta pendiente

1. Sin sesión: abrir la intranet habilitada y verificar redirección a Keycloak.
2. EMPLEADO: leer sin editor.
3. ADMIN: editar y guardar.
4. Recargar desde otra máquina con EMPLEADO y ver el cambio persistido.
5. Petición directa PUT/PATCH con token EMPLEADO: 403.
6. Sesión vencida, usuario sin rol y API detenida: errores sin guardados ficticios.
7. Entrar a la mesa de servicios del mismo realm para comprobar SSO real entre aplicaciones.

Hasta completar esa lista, la validación es la del código con pruebas automatizadas. El contenido institucional sigue compilado en archivos públicos: los documentos privados requieren autorización adicional en servidor/API. El frontend nunca se conecta directamente a la BD.
