# Banco La Reforma · Intranet

Portal informativo del proyecto del curso de Intranet. Está construido con **React y Vite**, en JavaScript y CSS, para editarlo en Visual Studio Code en la computadora física. No requiere iniciar Ubuntu ni VirtualBox.

![Vista de la intranet del Banco La Reforma](docs/evidencias/inicio-escritorio.png)

## Descargar y ejecutar el proyecto compartido

Repositorio: https://github.com/LuisRuiz16/banco-la-reforma-intranet

```bash
git clone https://github.com/LuisRuiz16/banco-la-reforma-intranet.git
cd banco-la-reforma-intranet
docker compose up -d --build
docker compose ps
```

Con Docker y el complemento Compose instalados, abre **http://127.0.0.1:8095/** en el equipo donde ejecutaste el comando. No necesitas instalar Node.js en ese equipo para construir con Docker: el Dockerfile lo incluye. La primera construcción necesita Internet para descargar imágenes y dependencias.

Si no tienes Git, usa **Code → Download ZIP**, descomprime el archivo y abre una terminal en la carpeta que contiene `compose.yaml`.

### Publicar desde Ubuntu para otras máquinas del laboratorio

1. Comprueba la IP de tu VM con `ip -br address`.
2. Copia `.env.example` a `.env` con `cp .env.example .env` y pon esa IP en `LAB_BIND_IP`. El valor de ejemplo es `127.0.0.1` (solo acceso local); cámbialo por la IP de tu VM para permitir el acceso desde otros equipos.
3. Ejecuta **solo la variante de Ubuntu**:

```bash
sudo docker compose -f compose.ubuntu.yaml up -d --build
sudo docker compose -f compose.ubuntu.yaml ps
```

Las otras máquinas deben poder comunicarse con esa IP y entrar en `http://IP_DE_UBUNTU:8095/`. Sustituye `IP_DE_UBUNTU` por la IP real del servidor de tu laboratorio. El firewall del laboratorio debe permitir el puerto TCP 8095 desde los clientes autorizados. El archivo Compose no cambia la red de VirtualBox ni la IP del sistema operativo.

`compose.yaml` y `compose.ubuntu.yaml` son alternativas para el mismo contenedor: no los levantes simultáneamente en el mismo equipo. Si ya ejecutaste la variante local, detenla antes con `docker compose down`; después inicia la variante de Ubuntu.

Para editar en Visual Studio Code sin Docker, instala **Node.js 24**, abre la carpeta y ejecuta `npm ci` y `npm run dev`. En PowerShell puedes utilizar `npm.cmd`.

**Alcance actual:** portal informativo con integración configurable de Keycloak y un mensaje del día mediante API externa. `ADMIN` puede editar el mensaje y `EMPLEADO` puede leerlo. Por defecto `VITE_AUTH_ENABLED=false`: se conserva la vista informativa mientras el equipo proporciona sus servicios; no hay usuarios ni roles simulados en la aplicación. El resto del contenido sigue en `src/data/content.js`. Consulta [la guía de conexión](docs/INTEGRACIONES.md).

## Activar Keycloak y el mensaje del día

1. Copia `.env.example` a `.env` (PowerShell: `Copy-Item .env.example .env`). No publiques `.env`.
2. Solicita al compañero la URL HTTPS de Keycloak, el realm, el cliente `intranet`, el origen de los roles y las URL/métodos de la API.
3. Completa las variables y cambia `VITE_AUTH_ENABLED=true`. Las rutas de ejemplo de la guía son una propuesta, no servicios ya disponibles.
4. Reinicia Vite o reconstruye con `docker compose up -d --build` (Ubuntu: agrega `-f compose.ubuntu.yaml`).
5. Registra en Keycloak las URL de retorno y el origen exacto de la intranet. Para otras VMs necesitas HTTPS confiable en la intranet, Keycloak y API; HTTP se admite solo en localhost para desarrollo.

Al abrir la intranet habilitada, el navegador va a Keycloak. Después del login, una cuenta con `ADMIN` o `EMPLEADO` puede entrar; solo `ADMIN` ve el editor del mensaje. Las consultas y actualizaciones envían el token renovado. El frontend **no se conecta directamente a la base de datos**: la API del compañero valida permisos, guarda el contenido y registra autor/fecha.

Ejecuta `npm.cmd test` en Windows o `npm test` en Ubuntu para comprobar las pruebas automatizadas. Estas usan dobles de prueba; la comprobación con Keycloak y API reales sigue pendiente hasta disponer de sus datos. [Contrato y pasos para tu compañero](docs/INTEGRACIONES.md).

## Abrirlo en esta computadora

1. Abre esta carpeta en Visual Studio Code: **Archivo → Abrir carpeta**.
2. Haz doble clic en **INICIAR-INTRANET.cmd** desde el Explorador de archivos. También puedes ejecutar la tarea **Abrir la intranet** desde el menú Terminal de VS Code.
3. El navegador abrirá **http://127.0.0.1:5173**.
4. Deja abierta la ventana que ejecuta el servidor. Para detenerlo, presiona **Ctrl+C** en esa ventana.

El archivo de inicio utiliza Node.js y npm instalados en el PATH de Windows. Instala primero [Node.js 24](https://nodejs.org/), abre una terminal nueva y usa los mismos pasos. La primera instalación de dependencias necesita Internet.

Si aparece “Port 5173 is already in use”, normalmente ya existe una instancia de esta intranet: abre la dirección del paso 3. Para un segundo servidor utiliza `npm.cmd run dev -- --port 5174` y la dirección que muestre Vite.

## Ejecutarlo desde la terminal de VS Code

Abre una terminal nueva después de instalar Node.js y abrir la carpeta. Comprueba `node --version` y `npm.cmd --version` antes de ejecutar los siguientes comandos.

```powershell
npm.cmd ci
npm.cmd run dev
```

`npm.cmd` evita problemas de permisos de ejecución de scripts de PowerShell. No es necesario cambiar la política de seguridad de Windows.

Para comprobar y construir la versión de entrega:

```powershell
npm.cmd run build
npm.cmd run preview
```

La compilación se guarda en `dist/`. La vista previa se abre en **http://127.0.0.1:4173**. No abras `index.html` con doble clic: React necesita servirse mediante Vite o Nginx para que funcionen los módulos y las rutas.

## Lo que ya funciona

- Inicio con accesos rápidos, comunicados y agenda de ejemplo.
- Nuestro banco: descripción, sede y propósito de la intranet.
- Comunicados: búsqueda, categorías y lectura completa.
- Documentos: búsqueda por contenido descriptivo, filtro por área, vista previa y descarga real en `.txt`.
- Favoritos guardados en este navegador; no requieren cuenta.
- Directorio: perfiles de las cinco áreas, filtro y copia de contactos de ejemplo.
- Departamentos y enlaces a sus perfiles.
- Centro de ayuda con preguntas frecuentes y guía de soporte.
- Búsqueda global en comunicados, documentos y departamentos; también se enfoca con **Ctrl+K**.
- Diseño adaptable a escritorio, tableta y celular; navegación por teclado y ventanas que se cierran con **Escape**.

## Cambiar el contenido

Empieza por **`src/data/content.js`**. Cada sección tiene una lista fácil de editar:

| Lista         | Contenido que modifica                             |
| ------------- | -------------------------------------------------- |
| `bank`        | Descripción y propósito del banco                  |
| `departments` | Áreas, cargos, funciones y contactos               |
| `news`        | Comunicados, fechas, categorías y textos completos |
| `documents`   | Guías, versiones y secciones descargables          |
| `events`      | Agenda de demostración                             |
| `faqs`        | Preguntas y respuestas                             |

Ejemplo de un comunicado:

```js
{
  id: 'nuevo-comunicado', // Identificador único, sin espacios.
  title: 'Título del comunicado',
  category: 'Institucional',
  department: 'Gerencia General',
  date: '2026-10-26', // AAAA-MM-DD.
  readTime: '2 min',
  featured: false, // true para mostrarlo también en Inicio.
  visual: 'building', // building, security, people o documents.
  excerpt: 'Resumen breve.',
  body: ['Primer párrafo.', 'Segundo párrafo.'],
}
```

Guarda con **Ctrl+S**. Mientras Vite está abierto, el navegador se actualiza automáticamente. Los identificadores deben ser únicos. Mantén las comas, comillas y corchetes del ejemplo.

Para cambiar el diseño, edita **`src/styles.css`**. Al inicio están los colores principales (`--green`, `--lime`, etc.). Las páginas y componentes están en **`src/App.jsx`**. El punto de entrada es **`src/main.jsx`**.

## Qué viene de la propuesta y qué es demostrativo

Se utilizó como referencia **Proyecto Final - Entregable 0-1.pdf**, proporcionado por el equipo:

- Banco La Reforma es ficticio, de tamaño mediano, con una sede en Ciudad de Guatemala, y atiende a personas y pymes.
- Las cinco áreas son Gerencia General, Recursos Humanos, Tecnología, Operaciones y Cumplimiento. Los perfiles del directorio se basan en la propuesta.
- La necesidad es centralizar información y facilitar la colaboración.

Los comunicados, las fechas de agenda, las guías y los principios editoriales son **ejemplos redactados para la demostración**. Los correos usan el dominio reservado `.example` y las extensiones son ficticias. No se publicaron carnés, correos personales de los integrantes ni el PDF del equipo dentro de la aplicación.

## Alcance de esta entrega

La aplicación se distribuye como archivos estáticos de React. Incluye el cliente de inicio de sesión con Keycloak, presentación según roles y consumo de la API del mensaje. No incluye servidor de Keycloak, API ni base de datos propios. No envía tickets y no procesa transacciones. Los botones de consulta, búsqueda y descarga sí funcionan.

Los archivos compilados y los documentos de ejemplo siguen siendo descargables de Nginx: ocultar un botón o bloquear la navegación con React no protege esos archivos. La API debe validar firma, emisor, audiencia, caducidad y roles del token en cada operación. Los documentos privados requieren protección adicional del servidor. La demostración utiliza únicamente información ficticia.

## Llevarlo a Docker

Con Docker Desktop abierto y el motor de contenedores Linux funcionando, abre una terminal en esta carpeta:

```powershell
docker compose up -d --build
docker compose ps
```

Abre **http://127.0.0.1:8095**. El contenedor se llama `banco-reforma-intranet`. El puerto se eligió para no utilizar el 8080 de prácticas anteriores.

- `Dockerfile` construye React con Node.js y publica `dist/` con Nginx.
- `nginx.conf` es la plantilla: `npm run build` genera `.generated/nginx.conf`, con los orígenes exactos de Keycloak/API permitidos por CSP. Docker utiliza ese archivo. Nginx permite recargar rutas como `/documentos` y proporciona `/health`.
- `compose.yaml` publica el servicio únicamente en la computadora anfitriona para esta demostración.
- Para ver registros: `docker compose logs --tail 50`.
- Para detenerlo sin eliminar la imagen: `docker compose stop`.
- Tras cambiar el contenido: `docker compose up -d --build`.

Para Ubuntu y el acceso desde otras VMs utiliza `compose.ubuntu.yaml` y la variable `LAB_BIND_IP`, siguiendo los pasos del inicio de esta guía. Consulta [la guía genérica de Ubuntu](docs/DESPLIEGUE-UBUNTU.md). La red y la IP del servidor se configuran en cada laboratorio; no se crean automáticamente al clonar este repositorio.

Este contenedor usa HTTP local. Para la entrega final, configura HTTPS en el proxy y aplica HSTS **después** de disponer de un certificado confiable y HTTPS operativo. Las cabeceras no sustituyen a autenticación o permisos.

## Conectar después la mesa de servicios

1. Copia `.env.example` como `.env`.
2. Escribe una URL real en `VITE_HELPDESK_URL`.
3. Reinicia Vite o reconstruye Docker.

En Ayuda aparecerá un botón hacia la mesa externa. Solo se aceptan URL `http` o `https`. Si está vacío, se mantiene la guía de soporte. Las variables `VITE_` son públicas y se incorporan a la compilación; **nunca pongas contraseñas, tokens ni secretos en ellas**.

Consulta **`docs/INTEGRACIONES.md`** para activar Keycloak y acordar el contrato de la API, y **`docs/EXPOSICION.md`** para presentar esta entrega con claridad. Cambiar `.env` requiere reconstruir el contenedor: las variables `VITE_` se incorporan durante la compilación, no al arrancar Nginx.

## Archivos principales

```text
src/
  App.jsx                 Páginas, navegación y componentes
  data/content.js         Contenido editable del banco
  main.jsx                Arranque de React y fuentes locales
  styles.css              Diseño y adaptación a pantallas
public/favicon.svg        Símbolo del banco
docs/                     Guía de exposición e integración
Dockerfile                Construcción y publicación
compose.yaml              Ejecución con Docker
nginx.conf                Configuración del servidor web
INICIAR-INTRANET.cmd       Inicio sencillo en Windows
```

Las fuentes DM Sans y Manrope se distribuyen mediante paquetes locales; la aplicación compilada no necesita descargar fuentes de Google. El símbolo y las ilustraciones se construyeron en SVG para este proyecto.
